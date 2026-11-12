import { NextRequest, NextResponse } from "next/server";
import {
  store,
  getUserByToken,
  createSession,
  UserAccount,
} from "@/lib/server/store";
import {
  rankRecipes,
  computeUnlockSuggestion,
  norm,
} from "@/lib/server/gastronomy";
import { computeFlavourGraph3D } from "@/lib/server/flavour-graph";
import { calculateMacroTargets } from "@/lib/server/goals";

function getAuthUser(req: NextRequest): UserAccount | null {
  const token =
    req.cookies.get("drishyam_session")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    null;

  let user = getUserByToken(token);
  if (!user) {
    // If running in development without cookie, fallback to demo user
    user = store.users.get("demo@drishyam.ai") || null;
  }
  return user;
}

function jsonResponse(data: any, status = 200, cookieToken?: string) {
  const res = NextResponse.json(data, { status });
  if (cookieToken) {
    res.cookies.set("drishyam_session", cookieToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 3600,
    });
    res.cookies.delete("drishyam_logged_out");
  }
  return res;
}

// Handler dispatcher for all HTTP methods
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const { route } = await params;
  const path = route.join("/");
  const url = new URL(req.url);

  // 1. Health
  if (path === "health" || path === "health/integrations") {
    const { foodoscope } = await import("@/lib/server/foodoscope");
    return jsonResponse({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        engine: "active",
        database: "in-memory-fixtures",
        volatiles: "FlavorDB",
        provenance: "USDA FoodData Central",
        foodoscope: foodoscope.getStatus(),
        vision: {
          engine: "gemini",
          model: process.env.VISION_MODEL || "gemini-3.8-flash",
        },
      },
    });
  }

  // 2. Public Showcase
  if (path === "public/showcase") {
    const showcaseIngs = [
      "cardamom", "clove", "cinnamon", "cumin", "turmeric", "black pepper", "ginger", "garlic"
    ];
    const graph3d = computeFlavourGraph3D(showcaseIngs, store.compoundMap);

    return jsonResponse({
      counts: {
        ingredients: store.catalog.length,
        recipes: store.recipes.length,
        compounds: Object.keys(store.compoundMap).length,
        molecules: 2287,
        metabolic_protocols: 8,
      },
      flavour_graph_3d: graph3d,
      provenance: {
        counts: "in_memory_fixtures",
        compounds: "FlavorDB",
        nutrition: "USDA_FDC",
        ranking: "computational_gastronomy_engine",
      },
    });
  }

  // Auth User
  const user = getAuthUser(req);

  // 3. Auth Me
  if (path === "auth/me") {
    if (!user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    return jsonResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }

  if (!user) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  // 4. Profile & Goals
  if (path === "profile") {
    return jsonResponse(user.profile);
  }
  if (path === "preferences") {
    return jsonResponse(user.preferences);
  }
  if (path === "goals") {
    return jsonResponse(user.goals);
  }
  if (path === "settings") {
    return jsonResponse(user.settings);
  }
  if (path === "nutrition/targets") {
    return jsonResponse({
      targets: user.targets,
      goal: { primaryGoal: user.goals.primary_goal },
      profile: user.profile,
      ...user.targets,
    });
  }

  // 5. Pantry
  if (path === "pantry/catalog") {
    return jsonResponse(store.catalog);
  }
  if (path === "pantry") {
    return jsonResponse(user.pantry);
  }

  // 6. Recipes
  if (path === "recipes") {
    const cuisine = url.searchParams.get("cuisine");
    const diet = url.searchParams.get("diet");
    let list = store.recipes;
    if (cuisine) list = list.filter((r) => r.cuisine.toLowerCase() === cuisine.toLowerCase());
    if (diet) list = list.filter((r) => r.diet.toLowerCase() === diet.toLowerCase());
    return jsonResponse(list);
  }

  if (path.startsWith("recipes/")) {
    const id = path.replace("recipes/", "");
    const recipe = store.recipes.find((r) => r.id === id || r.recipe_id === id);
    if (!recipe) return jsonResponse({ error: "Recipe not found" }, 404);
    return jsonResponse({
      recipe,
      isSaved: user.savedRecipeIds.has(recipe.id),
      ...recipe,
    });
  }

  if (path === "saved") {
    const saved = store.recipes
      .filter((r) => user.savedRecipeIds.has(r.id))
      .map((r) => ({
        id: `saved_${r.id}`,
        recipe_id: r.id,
        recipe: r,
        saved_at: new Date().toISOString(),
      }));
    return jsonResponse(saved);
  }

  // 7. Flavour graph
  if (path === "flavour/graph" || path === "flavour/graph/data") {
    const ingParam = url.searchParams.get("ingredients");
    let ingList: string[] = [];
    if (ingParam) {
      ingList = ingParam.split(",").map((s) => s.trim().toLowerCase());
    } else {
      ingList = user.pantry.slice(0, 14).map((p) => p.name);
    }
    const graph = computeFlavourGraph3D(ingList, store.compoundMap);
    return jsonResponse(graph);
  }

  if (path.startsWith("flavour/")) {
    const ing = decodeURIComponent(path.replace("flavour/", "")).toLowerCase().trim();
    const compounds = store.compoundMap[ing] || [];
    return jsonResponse({
      ingredient: ing,
      compounds,
      compound_count: compounds.length,
    });
  }

  // 8. Planner
  if (path === "planner") {
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];
    const entries = user.plannedMeals.filter((m) => m.date === date);
    const totals = entries.reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fat: acc.fat + m.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    return jsonResponse({
      date,
      entries,
      totals,
      targets: user.targets,
    });
  }

  // 9. Nutrition history & summary
  if (path === "nutrition/history") {
    return jsonResponse(user.mealLogs);
  }
  if (path === "nutrition/summary") {
    const today = new Date().toISOString().split("T")[0];
    const todayLogs = user.mealLogs.filter((l) => l.timestamp.startsWith(today));
    const consumed = todayLogs.reduce(
      (acc, l) => ({
        calories: acc.calories + l.calories,
        protein: acc.protein + l.protein_g,
        carbs: acc.carbs + l.carbs_g,
        fat: acc.fat + l.fat_g,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    return jsonResponse({
      consumed,
      targets: user.targets,
      logged_count: todayLogs.length,
    });
  }

  // 10. Shopping
  if (path === "shopping") {
    return jsonResponse(user.shoppingItems);
  }
  if (path === "shopping/suggestions") {
    const pantryNames = user.pantry.map((p) => p.name);
    const ranked = rankRecipes(store.recipes, pantryNames, {
      userDiet: user.preferences.lifestyle,
      userAllergies: user.preferences.allergies,
    });
    const unlock = computeUnlockSuggestion(ranked, pantryNames);
    const suggestions = unlock
      ? [
          {
            name: unlock.ingredient,
            displayName: unlock.displayName,
            reason: unlock.description,
            unlocked_count: unlock.unlockedCount,
          },
        ]
      : [];
    return jsonResponse(suggestions);
  }

  // 11. Sync stubs
  if (path.startsWith("sync/")) {
    return jsonResponse({
      version: 1,
      status: "synced",
      server_time: new Date().toISOString(),
      changes: [],
    });
  }

  return jsonResponse({ error: `Route /api/${path} not found` }, 404);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const { route } = await params;
  const path = route.join("/");

  let body: any = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text);
  } catch {
    body = {};
  }

  // 1. Auth Demo
  if (path === "auth/demo") {
    const demoUser = store.users.get("demo@drishyam.ai")!;
    const token = createSession(demoUser);
    return jsonResponse(
      {
        token,
        user: {
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
        },
      },
      200,
      token
    );
  }

  // 2. Auth Login
  if (path === "auth/login") {
    const email = (body.email || "").toLowerCase().trim();
    const user = store.users.get(email) || store.users.get("demo@drishyam.ai")!;
    const token = createSession(user);
    return jsonResponse(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      200,
      token
    );
  }

  // 3. Auth Register
  if (path === "auth/register") {
    const email = (body.email || `user_${Date.now()}@drishyam.ai`).toLowerCase().trim();
    const name = body.name || "Drishyam Chef";
    const demoUser = store.users.get("demo@drishyam.ai")!;

    // Clone demo data for new user
    const newUser: UserAccount = {
      ...demoUser,
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date().toISOString(),
      pantry: [...demoUser.pantry],
      savedRecipeIds: new Set(demoUser.savedRecipeIds),
      mealLogs: [],
      plannedMeals: [],
      shoppingItems: [],
    };
    store.users.set(email, newUser);

    const token = createSession(newUser);
    return jsonResponse(
      {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      201,
      token
    );
  }

  // 4. Password forgot / reset
  if (path === "auth/password/forgot") {
    return jsonResponse({
      message: "Reset link dispatched (development logged).",
      status: "dispatched",
    });
  }
  if (path === "auth/password/reset") {
    return jsonResponse({
      message: "Password updated successfully.",
      status: "updated",
    });
  }

  // 5. Auth Logout
  if (path === "auth/logout" || path === "auth/logout-all") {
    const res = NextResponse.json({ message: "Logged out" });
    res.cookies.delete("drishyam_session");
    res.cookies.set("drishyam_logged_out", "1", { path: "/", sameSite: "lax" });
    return res;
  }

  // Auth User
  const user = getAuthUser(req);
  if (!user) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  // 6. Recommendation
  if (path === "recommend") {
    const pantryNames = user.pantry.map((p) => p.name);
    const topK = body.top_k || 25;
    const ranked = rankRecipes(store.recipes, pantryNames, {
      userDiet: user.preferences.lifestyle,
      userAllergies: user.preferences.allergies,
      dailyTarget: user.targets,
      flavorCompoundMap: store.compoundMap,
      topK,
    });
    const unlock = computeUnlockSuggestion(ranked, pantryNames);
    return jsonResponse({
      recipes: ranked,
      unlock,
      total_candidates: store.recipes.length,
      pantry_count: pantryNames.length,
    });
  }

  // 7. Goals Calculate
  if (path === "goals/calculate") {
    const gender = body.gender || user.profile.gender;
    const weight = Number(body.weight_kg) || user.profile.weight_kg;
    const height = Number(body.height_cm) || user.profile.height_cm;
    const age = Number(body.age) || user.profile.age;
    const activity = body.activity_level || user.profile.activity_level;
    const goal = body.primary_goal || user.goals.primary_goal;

    const targets = calculateMacroTargets(gender, weight, height, age, activity, goal, body.overrides);
    return jsonResponse(targets);
  }

  // 8. Updates to profile / goals / settings / preferences
  if (path === "profile") {
    user.profile = { ...user.profile, ...body, version: user.profile.version + 1 };
    user.targets = calculateMacroTargets(
      user.profile.gender,
      user.profile.weight_kg,
      user.profile.height_cm,
      user.profile.age,
      user.profile.activity_level,
      user.goals.primary_goal
    );
    return jsonResponse(user.profile);
  }

  if (path === "preferences") {
    user.preferences = { ...user.preferences, ...body, version: user.preferences.version + 1 };
    return jsonResponse(user.preferences);
  }

  if (path === "goals") {
    user.goals = { ...user.goals, ...body, version: user.goals.version + 1 };
    user.targets = calculateMacroTargets(
      user.profile.gender,
      user.profile.weight_kg,
      user.profile.height_cm,
      user.profile.age,
      user.profile.activity_level,
      user.goals.primary_goal
    );
    return jsonResponse(user.goals);
  }

  if (path === "nutrition/targets") {
    user.targets = { ...user.targets, ...body };
    return jsonResponse(user.targets);
  }

  if (path === "settings") {
    user.settings = { ...user.settings, ...body, version: user.settings.version + 1 };
    return jsonResponse(user.settings);
  }

  // 9. Pantry add / batch add
  if (path === "pantry") {
    const rawItems = Array.isArray(body) ? body : body.items ? body.items : [body];
    for (const item of rawItems) {
      if (!item.name) continue;
      const cleanName = norm(item.name);
      const existing = user.pantry.find((p) => norm(p.name) === cleanName);
      if (existing) {
        existing.quantity = (existing.quantity || 100) + (Number(item.quantity) || 100);
        existing.isAvailable = true;
        existing.updatedAt = new Date().toISOString();
      } else {
        const display =
          item.displayName || item.name.charAt(0).toUpperCase() + item.name.slice(1);
        user.pantry.unshift({
          id: `pantry_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          name: cleanName,
          displayName: display,
          category: item.category || "Pantry",
          quantity: Number(item.quantity) || 100,
          unit: item.unit || "g",
          isAvailable: true,
          source: item.source || "manual",
          confidence: Number(item.confidence) || 1.0,
          updatedAt: new Date().toISOString(),
        });
      }
    }
    return jsonResponse(user.pantry, 201);
  }

  // 10. Save recipe toggle
  if (path.match(/^recipes\/[^/]+\/save$/)) {
    const recipeId = path.split("/")[1];
    user.savedRecipeIds.add(recipeId);
    return jsonResponse({ saved: true, recipe_id: recipeId });
  }

  // 11. Planner add
  if (path === "planner") {
    const recipe = store.recipes.find((r) => r.id === body.recipeId || r.recipe_id === body.recipeId);
    const entry = {
      id: `plan_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      date: body.date || new Date().toISOString().split("T")[0],
      mealType: body.mealType || "dinner",
      recipeId: String(body.recipeId),
      recipeTitle: recipe?.title || "Custom Plate",
      servings: Number(body.servings) || 1,
      calories: Math.round((recipe?.calories || 400) * (Number(body.servings) || 1)),
      protein: Math.round((recipe?.protein_g || 20) * (Number(body.servings) || 1) * 10) / 10,
      carbs: Math.round((recipe?.carbs_g || 45) * (Number(body.servings) || 1) * 10) / 10,
      fat: Math.round((recipe?.fat_g || 15) * (Number(body.servings) || 1) * 10) / 10,
    };
    user.plannedMeals.push(entry);
    return jsonResponse(entry, 201);
  }

  // 12. Log Meal
  if (path === "nutrition/meal-log") {
    const recipe = store.recipes.find((r) => r.id === body.recipe_id || r.recipe_id === body.recipe_id);
    const log = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      recipe_id: String(body.recipe_id || ""),
      recipe_title: recipe?.title || body.recipe_title || "Plate Execution",
      meal_type: body.meal_type || "dinner",
      portions: Number(body.portions) || 1,
      calories: Math.round((recipe?.calories || body.calories || 350) * (Number(body.portions) || 1)),
      protein_g: Math.round((recipe?.protein_g || body.protein_g || 18) * (Number(body.portions) || 1) * 10) / 10,
      carbs_g: Math.round((recipe?.carbs_g || body.carbs_g || 40) * (Number(body.portions) || 1) * 10) / 10,
      fat_g: Math.round((recipe?.fat_g || body.fat_g || 12) * (Number(body.portions) || 1) * 10) / 10,
    };
    user.mealLogs.unshift(log);
    return jsonResponse(log, 201);
  }

  // 13. Shopping items add
  if (path === "shopping/items") {
    const raw = Array.isArray(body) ? body : [body];
    const created: any[] = [];
    for (const it of raw) {
      if (!it.name) continue;
      const item = {
        id: `shop_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: norm(it.name),
        displayName: it.displayName || it.name.charAt(0).toUpperCase() + it.name.slice(1),
        category: it.category || "Produce",
        quantity: Number(it.quantity) || 1,
        unit: it.unit || "item",
        checked: false,
        source: it.source || "user",
      };
      user.shoppingItems.push(item);
      created.push(item);
    }
    return jsonResponse(created, 201);
  }

  // 14. Deep inspect camera scan mock
  if (path === "scan/deep-inspect") {
    return jsonResponse({
      detected_ingredients: [
        { name: "coriander", confidence: 0.94, bounding_box: [120, 100, 320, 300] },
        { name: "ginger", confidence: 0.89, bounding_box: [340, 180, 500, 380] },
      ],
      processing_time_ms: 180,
      provenance: "edge_accumulator",
    });
  }

  return jsonResponse({ error: `POST /api/${path} not handled` }, 404);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const { route } = await params;
  const path = route.join("/");
  const user = getAuthUser(req);
  if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  // Pantry item update
  if (path.startsWith("pantry/")) {
    const id = path.replace("pantry/", "");
    const item = user.pantry.find((p) => p.id === id);
    if (!item) return jsonResponse({ error: "Item not found" }, 404);
    Object.assign(item, body, { updatedAt: new Date().toISOString() });
    return jsonResponse(item);
  }

  // Shopping item update
  if (path.startsWith("shopping/items/")) {
    const id = path.replace("shopping/items/", "");
    const item = user.shoppingItems.find((s) => s.id === id);
    if (!item) return jsonResponse({ error: "Item not found" }, 404);
    Object.assign(item, body);
    return jsonResponse(item);
  }

  return jsonResponse({ error: `PATCH /api/${path} not handled` }, 404);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const { route } = await params;
  const path = route.join("/");
  const user = getAuthUser(req);
  if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

  // 1. Account deletion
  if (path === "auth/account") {
    store.users.delete(user.email);
    const res = NextResponse.json({ message: "Account deleted" });
    res.cookies.delete("drishyam_session");
    return res;
  }

  // 2. Pantry item deletion
  if (path.startsWith("pantry/")) {
    const id = path.replace("pantry/", "");
    user.pantry = user.pantry.filter((p) => p.id !== id);
    return jsonResponse({ success: true, id });
  }

  // 3. Saved recipe un-save
  if (path.match(/^recipes\/[^/]+\/save$/)) {
    const recipeId = path.split("/")[1];
    user.savedRecipeIds.delete(recipeId);
    return jsonResponse({ saved: false, recipe_id: recipeId });
  }

  // 4. Meal log deletion
  if (path.startsWith("nutrition/meal-log/")) {
    const id = path.replace("nutrition/meal-log/", "");
    user.mealLogs = user.mealLogs.filter((l) => l.id !== id);
    return jsonResponse({ success: true, id });
  }

  // 5. Planner meal deletion
  if (path.startsWith("planner/")) {
    const id = path.replace("planner/", "");
    user.plannedMeals = user.plannedMeals.filter((m) => m.id !== id);
    return jsonResponse({ success: true, id });
  }

  // 6. Shopping item deletion
  if (path.startsWith("shopping/items/")) {
    const id = path.replace("shopping/items/", "");
    user.shoppingItems = user.shoppingItems.filter((s) => s.id !== id);
    return jsonResponse({ success: true, id });
  }

  return jsonResponse({ error: `DELETE /api/${path} not handled` }, 404);
}
