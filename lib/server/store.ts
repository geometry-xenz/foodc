/**
 * In-Memory Data Store for DRISHYAM.
 * Pre-loaded with FlavorDB volatiles, USDA nutrition fixtures, recipes, and demo kitchen.
 */

import recipesFixture from "@/lib/data/recipes.json";
import flavordbFixture from "@/lib/data/flavordb.json";
import nutritionFixture from "@/lib/data/nutrition.json";
import demoFixture from "@/lib/data/foodoscope_demo.json";
import { calculateMacroTargets } from "./goals";

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  expiresAt: number;
}

export interface UserAccount {
  id: string;
  email: string;
  passwordHash: string; // or plain for demo
  name: string;
  createdAt: string;
  profile: {
    age: number;
    gender: string;
    height_cm: number;
    weight_kg: number;
    activity_level: string;
    experience_level: string;
    version: number;
  };
  preferences: {
    lifestyle: string;
    restrictions: string[];
    allergies: string[];
    cuisine_preferences: string[];
    version: number;
  };
  goals: {
    primary_goal: string;
    version: number;
  };
  settings: {
    sound_enabled: boolean;
    haptics_enabled: boolean;
    measurement_units: string;
    version: number;
  };
  targets: any;
  pantry: Array<{
    id: string;
    name: string;
    displayName: string;
    category: string;
    quantity: number;
    unit: string;
    isAvailable: boolean;
    source: string;
    confidence: number;
    updatedAt: string;
  }>;
  savedRecipeIds: Set<string>;
  mealLogs: Array<{
    id: string;
    timestamp: string;
    recipe_id: string;
    recipe_title: string;
    meal_type: string;
    portions: number;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
  }>;
  plannedMeals: Array<{
    id: string;
    date: string;
    mealType: string;
    recipeId: string;
    recipeTitle: string;
    servings: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
  shoppingItems: Array<{
    id: string;
    name: string;
    displayName: string;
    category: string;
    quantity: number;
    unit: string;
    checked: boolean;
    source: string;
  }>;
}

// Global in-memory singleton across hot reloads in development
const globalStore = global as unknown as {
  __DRISHYAM_STORE_V2__?: {
    users: Map<string, UserAccount>; // keyed by email
    sessions: Map<string, UserSession>; // keyed by token
    recipes: any[];
    compoundMap: Record<string, string[]>;
    nutritionMap: Record<string, any>;
    catalog: Array<{
      name: string;
      displayName: string;
      category: string;
      calories: number;
      protein: number;
      compounds: string[];
    }>;
  };
};

function initStore() {
  if (globalStore.__DRISHYAM_STORE_V2__) {
    return globalStore.__DRISHYAM_STORE_V2__;
  }

  // 1. Process recipes
  const rawRecipes = (recipesFixture as any).recipes || [];
  const recipes = rawRecipes.map((r: any) => ({
    id: String(r.recipe_id || r.id),
    recipe_id: String(r.recipe_id || r.id),
    title: r.title,
    cuisine: r.cuisine || "Indian",
    diet: r.diet || "vegetarian",
    prep_time_minutes: r.prep_time_minutes || 10,
    cook_time_minutes: r.cook_time_minutes || 20,
    total_time_minutes: r.total_time_minutes || 30,
    minutes: r.total_time_minutes || 30,
    servings: r.servings || 4,
    image_url: r.image_url || "/images/hero-poster.webp",
    core_ingredients: r.core_ingredients || [],
    ingredients: r.ingredients || [],
    utensils: r.utensils || [],
    instructions: r.instructions || [],
    instruction_steps: (r.instructions || []).map((text: string, idx: number) => ({
      step_number: idx + 1,
      instruction: text,
      timer_seconds: text.toLowerCase().includes("minute") ? 180 : null,
      technique: text.toLowerCase().includes("sauté")
        ? "Sautéing"
        : text.toLowerCase().includes("boil")
        ? "Boiling"
        : text.toLowerCase().includes("fry")
        ? "Tempering"
        : "Simmering",
    })),
    nutrition_per_serving: r.nutrition_per_serving || {
      calories: 350,
      protein: 15,
      carbs: 45,
      fat: 10,
      fibre: 5,
    },
    calories: r.nutrition_per_serving?.calories || 350,
    protein_g: r.nutrition_per_serving?.protein || 15,
    carbs_g: r.nutrition_per_serving?.carbs || 45,
    fat_g: r.nutrition_per_serving?.fat || 10,
    fiber_g: r.nutrition_per_serving?.fibre || 5,
    molecular_profile: r.molecular_profile || {
      dominant_aroma: "aromatic",
      coherence_score: 0.9,
      notes: "Volatile aromatic harmony",
    },
  }));

  // 2. Process flavordb volatiles
  const compoundMap: Record<string, string[]> = {};
  const entities = (flavordbFixture as any).entities || {};
  for (const [name, entity] of Object.entries<any>(entities)) {
    const key = name.toLowerCase().trim();
    compoundMap[key] = entity.volatile_compounds || [];
  }

  // 3. Process nutrition
  const nutritionMap: Record<string, any> = {};
  const rawNutrition = (nutritionFixture as any).ingredients || {};
  for (const [key, val] of Object.entries<any>(rawNutrition)) {
    nutritionMap[key.toLowerCase().trim()] = val.per_100g || {};
  }

  // 4. Catalog for pantry auto-complete
  const catalogNames = new Set<string>();
  const catalog: any[] = [];
  for (const r of recipes) {
    for (const ing of r.ingredients) {
      const name = typeof ing === "string" ? ing : ing.name;
      const lower = name.toLowerCase().trim();
      if (!catalogNames.has(lower)) {
        catalogNames.add(lower);
        const nut = nutritionMap[lower] || {};
        catalog.push({
          name: lower,
          displayName: name.charAt(0).toUpperCase() + name.slice(1),
          category: compoundMap[lower] ? "Spices & Aromatics" : "Produce & Staples",
          calories: nut.calories || 50,
          protein: nut.protein || 2,
          compounds: compoundMap[lower] || [],
        });
      }
    }
  }

  // 5. Demo user
  const demoEmail = "demo@drishyam.ai";
  const defaultTargets = calculateMacroTargets("male", 75, 178, 28, "moderate", "lean_bulk");

  const baseDemoPantry = (demoFixture as any).demo_pantry || [];
  const demoPantryNames = Array.from(
    new Set([
      ...baseDemoPantry,
      "tomato",
      "onion",
      "yogurt",
      "mint",
      "basmati rice",
      "ginger",
      "garlic",
      "green chilli",
      "coriander",
      "ghee",
      "cumin",
      "turmeric",
      "red chilli",
      "toor dal",
      "paneer",
      "egg",
      "black pepper",
      "lemon",
      "butter",
    ])
  );

  let pId = 100;
  const demoPantry = demoPantryNames.map((name: string) => {
    pId++;
    const lower = name.toLowerCase().trim();
    return {
      id: `pantry_${pId}`,
      name: lower,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      category: compoundMap[lower] ? "Spices & Aromatics" : "Produce & Staples",
      quantity: 200,
      unit: "g",
      isAvailable: true,
      source: "system",
      confidence: 1.0,
      updatedAt: new Date().toISOString(),
    };
  });

  const demoUser: UserAccount = {
    id: "user_demo_001",
    email: demoEmail,
    passwordHash: "drishyam2026",
    name: "Drishyam Chef",
    createdAt: new Date().toISOString(),
    profile: {
      age: 28,
      gender: "male",
      height_cm: 178,
      weight_kg: 75,
      activity_level: "moderate",
      experience_level: "intermediate",
      version: 1,
    },
    preferences: {
      lifestyle: "none",
      restrictions: [],
      allergies: [],
      cuisine_preferences: ["North Indian", "South Indian", "Coastal"],
      version: 1,
    },
    goals: {
      primary_goal: "lean_bulk",
      version: 1,
    },
    settings: {
      sound_enabled: true,
      haptics_enabled: true,
      measurement_units: "metric",
      version: 1,
    },
    targets: defaultTargets,
    pantry: demoPantry,
    savedRecipeIds: new Set(["rec_001", "rec_002"]),
    mealLogs: [
      {
        id: "log_001",
        timestamp: new Date().toISOString(),
        recipe_id: "rec_001",
        recipe_title: "Homestyle Dal Tadka",
        meal_type: "lunch",
        portions: 1,
        calories: 215,
        protein_g: 11.8,
        carbs_g: 33.4,
        fat_g: 4.6,
      },
    ],
    plannedMeals: [
      {
        id: "plan_001",
        date: new Date().toISOString().split("T")[0],
        mealType: "lunch",
        recipeId: "rec_001",
        recipeTitle: "Homestyle Dal Tadka",
        servings: 1,
        calories: 215,
        protein: 11.8,
        carbs: 33.4,
        fat: 4.6,
      },
      {
        id: "plan_002",
        date: new Date().toISOString().split("T")[0],
        mealType: "dinner",
        recipeId: "rec_002",
        recipeTitle: "Paneer Tikka Masala (Skillet Style)",
        servings: 1,
        calories: 380,
        protein: 18.2,
        carbs: 14.5,
        fat: 28.0,
      },
    ],
    shoppingItems: [
      {
        id: "shop_001",
        name: "fenugreek",
        displayName: "Fenugreek Leaves",
        category: "Produce",
        quantity: 100,
        unit: "g",
        checked: false,
        source: "unlock",
      },
    ],
  };

  const users = new Map<string, UserAccount>();
  users.set(demoEmail, demoUser);

  const sessions = new Map<string, UserSession>();
  // Pre-seed a permanent demo session
  const demoToken = "demo_session_token_drishyam";
  sessions.set(demoToken, {
    userId: demoUser.id,
    email: demoEmail,
    name: demoUser.name,
    expiresAt: Date.now() + 30 * 24 * 3600 * 1000,
  });

  globalStore.__DRISHYAM_STORE_V2__ = {
    users,
    sessions,
    recipes,
    compoundMap,
    nutritionMap,
    catalog,
  };

  return globalStore.__DRISHYAM_STORE_V2__;
}

export const store = initStore();

export function getUserByToken(token?: string | null): UserAccount | null {
  if (!token) return null;
  const sess = store.sessions.get(token);
  if (!sess) return null;
  if (sess.expiresAt < Date.now()) {
    store.sessions.delete(token);
    return null;
  }
  return store.users.get(sess.email) || null;
}

export function createSession(user: UserAccount): string {
  const token = `drishyam_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  store.sessions.set(token, {
    userId: user.id,
    email: user.email,
    name: user.name,
    expiresAt: Date.now() + 30 * 24 * 3600 * 1000,
  });
  return token;
}
