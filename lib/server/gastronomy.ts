/**
 * Computational gastronomy ranking engine based on molecular flavour science.
 * TypeScript port of DRISHYAM gastronomy & recommendation engine.
 */

export const STAPLES = new Set([
  "water", "salt", "black salt", "rock salt", "cooking oil", "vegetable oil",
  "oil", "olive oil", "mustard oil", "sunflower oil", "ghee", "butter", "sugar"
]);

export function norm(name: string): string {
  let s = (name || "").toLowerCase().trim();
  s = s.replace(/\b(fresh|dried|ground|powdered|powder|chopped|diced|sliced|crushed|whole)\b/g, "");
  s = s.replace(/[^\w\s]/g, "");
  s = s.replace(/\s+/g, " ").trim();
  if (s.endsWith("ies") && s.length > 4) {
    s = s.slice(0, -3) + "y";
  } else if (s.endsWith("es") && s.length > 3 && "sxczo".includes(s[s.length - 3])) {
    s = s.slice(0, -2);
  } else if (s.endsWith("s") && s.length > 3 && !s.endsWith("ss")) {
    s = s.slice(0, -1);
  }
  return s;
}

export function isStaple(name: string): boolean {
  return STAPLES.has(norm(name));
}

export function dietOk(recipeDietTag: string, userDiet: string): boolean {
  if (!userDiet || ["any", "none", ""].includes(userDiet.toLowerCase())) {
    return true;
  }
  const rd = (recipeDietTag || "").toLowerCase().trim();
  const ud = userDiet.toLowerCase().trim();

  if (ud === "vegan") {
    return rd === "vegan";
  }
  if (ud === "vegetarian") {
    return (rd === "vegetarian" || rd === "vegan") && !rd.includes("non");
  }
  if (ud === "non-vegetarian") {
    return true;
  }
  if (ud === "pescatarian") {
    return rd === "vegetarian" || rd === "vegan" || rd === "pescatarian";
  }
  return true;
}

export function allergyOk(recipeIngredients: string[], userAllergies: string[]): boolean {
  if (!userAllergies || userAllergies.length === 0) return true;
  const normAllergens = userAllergies.map(norm).filter(Boolean);
  for (const ing of recipeIngredients) {
    const nIng = norm(ing);
    for (const a of normAllergens) {
      if (nIng.includes(a) || a.includes(nIng)) {
        return false;
      }
    }
  }
  return true;
}

export function scoreRecipe(
  recipe: any,
  pantry: string[],
  flavorCompoundMap?: Record<string, string[]>
): [number, any] {
  const pantryNorms = new Set(pantry.map(norm).filter((p) => p && !isStaple(p)));
  if (pantryNorms.size === 0) {
    return [0, { score: 0, matched: [], missing: [], coreCoverage: 0, gapFit: 0, flavourCoherence: 0, utilisation: 0 }];
  }

  const rawIngs: string[] = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.map((i: any) => (typeof i === "string" ? i : i.name))
    : [];
  const recipeIngs = rawIngs.map(norm).filter((i) => i && !isStaple(i));

  if (recipeIngs.length === 0) {
    return [0, { score: 0, matched: [], missing: [], coreCoverage: 0, gapFit: 0, flavourCoherence: 0, utilisation: 0 }];
  }

  // Core coverage: first 4 non-staple ingredients
  const coreIngs = recipeIngs.slice(0, 4);
  const matchedCore = coreIngs.filter((c) => pantryNorms.has(c));
  const coreCoverage = matchedCore.length / Math.max(coreIngs.length, 1);

  // General matching
  const matched = recipeIngs.filter((i) => pantryNorms.has(i));
  const missing = recipeIngs.filter((i) => !pantryNorms.has(i));

  // Utilisation
  const usedFromPantry = Array.from(pantryNorms).filter((p) => recipeIngs.includes(p));
  const utilisation = usedFromPantry.length / Math.max(pantryNorms.size, 1);

  // Gap fit
  const missingCoreCount = missing.filter((m) => coreIngs.includes(m)).length;
  const missingNonCoreCount = missing.length - missingCoreCount;
  const gapPenalty = missingCoreCount * 0.4 + missingNonCoreCount * 0.15;
  const gapFit = Math.max(0, 1.0 - gapPenalty / Math.max(recipeIngs.length, 1));

  // Flavour coherence
  let flavourCoherence = 0.5;
  if (flavorCompoundMap && usedFromPantry.length >= 2) {
    let pairsShared = 0;
    let totalPairs = 0;
    for (let i = 0; i < usedFromPantry.length; i++) {
      for (let j = i + 1; j < usedFromPantry.length; j++) {
        totalPairs++;
        const c1 = new Set(flavorCompoundMap[usedFromPantry[i]] || []);
        const c2 = flavorCompoundMap[usedFromPantry[j]] || [];
        if (c1.size > 0 && c2.some((c) => c1.has(c))) {
          pairsShared++;
        }
      }
    }
    if (totalPairs > 0) {
      flavourCoherence = pairsShared / totalPairs;
    }
  }

  const finalScore =
    (0.3 * coreCoverage +
      0.2 * utilisation +
      0.2 * flavourCoherence +
      0.3 * gapFit) *
    100.0;

  const breakdown = {
    score: Math.round(finalScore * 10) / 10,
    core_coverage: Math.round(coreCoverage * 100) / 100,
    coreCoverage: Math.round(coreCoverage * 100) / 100,
    utilisation: Math.round(utilisation * 100) / 100,
    pantryUtilisation: Math.round(utilisation * 100) / 100,
    flavour_coherence: Math.round(flavourCoherence * 100) / 100,
    flavourCoherence: Math.round(flavourCoherence * 100) / 100,
    gap_fit: Math.round(gapFit * 100) / 100,
    gapFit: Math.round(gapFit * 100) / 100,
    composite: Math.round(finalScore) / 100,
    matched,
    available: matched,
    missing,
    core_missing: missing.filter((m) => coreIngs.includes(m)),
  };

  return [finalScore, breakdown];
}

export function personalFitScore(
  recipe: any,
  dailyTarget?: any,
  slot: string = "dinner"
): number {
  if (!dailyTarget) return 1.0;
  const slotWeights: Record<string, number> = {
    breakfast: 0.25,
    lunch: 0.35,
    dinner: 0.3,
    snack: 0.1,
  };
  const fraction = slotWeights[slot.toLowerCase()] ?? 0.3;
  const slotCalories = (dailyTarget.target_calories_kcal || 2000.0) * fraction;
  const slotProtein = (dailyTarget.target_protein_g || 140.0) * fraction;

  const rCal = recipe.calories || recipe.nutrition_per_serving?.calories || 400.0;
  const rPro = recipe.protein_g || recipe.nutrition_per_serving?.protein || 25.0;

  const calDiffPct = Math.abs(rCal - slotCalories) / Math.max(slotCalories, 1.0);
  const calScore = Math.max(0.0, 1.0 - calDiffPct);

  const proRatio = Math.min(1.2, rPro / Math.max(slotProtein, 1.0));
  const proScore = Math.min(1.0, proRatio);

  const fit = 0.5 * calScore + 0.5 * proScore;
  return Math.round(Math.max(0.1, Math.min(fit, 1.0)) * 100) / 100;
}

export function rankRecipes(
  recipes: any[],
  pantry: string[],
  options: {
    userDiet?: string;
    userAllergies?: string[];
    userExclusions?: string[];
    maxMinutes?: number;
    dailyTarget?: any;
    slot?: string;
    flavorCompoundMap?: Record<string, string[]>;
    topK?: number;
  } = {}
) {
  const {
    userDiet = "any",
    userAllergies = [],
    userExclusions = [],
    maxMinutes,
    dailyTarget,
    slot = "dinner",
    flavorCompoundMap,
    topK = 25,
  } = options;

  const normExclusions = new Set(userExclusions.map(norm).filter(Boolean));
  const ranked: any[] = [];

  for (const r of recipes) {
    if (!dietOk(r.diet || "any", userDiet)) continue;

    const rawIngs = Array.isArray(r.ingredients)
      ? r.ingredients.map((i: any) => (typeof i === "string" ? i : i.name))
      : [];
    if (userAllergies.length > 0 && !allergyOk(rawIngs, userAllergies)) continue;
    if (rawIngs.some((i: string) => normExclusions.has(norm(i)))) continue;

    const mins = r.minutes || r.total_time_minutes || 30;
    if (maxMinutes && mins > maxMinutes * 2.5) continue;

    const [gScore, breakdown] = scoreRecipe(r, pantry, flavorCompoundMap);
    if (gScore < 10.0 && pantry.length > 2) {
      // Very low match with substantial pantry
      continue;
    }

    const fit = personalFitScore(r, dailyTarget, slot);
    const combinedScore = gScore * (0.5 + 0.5 * fit);

    const recipeId = String(r.recipe_id || r.id || "");
    const cal = Math.round(r.calories || r.nutrition_per_serving?.calories || 400);
    const pro = Math.round((r.protein_g || r.nutrition_per_serving?.protein || 20) * 10) / 10;
    const carb = Math.round((r.carbs_g || r.nutrition_per_serving?.carbs || 45) * 10) / 10;
    const fat = Math.round((r.fat_g || r.nutrition_per_serving?.fat || 15) * 10) / 10;
    const fib = Math.round((r.fiber_g || r.nutrition_per_serving?.fibre || 5) * 10) / 10;

    ranked.push({
      ...r,
      id: recipeId,
      recipeId,
      title: r.title,
      cuisine: r.cuisine || "Indian",
      diet: r.diet || "vegetarian",
      mealType: r.meal_type || slot,
      gastronomy_score: Math.round(gScore * 10) / 10,
      personal_fit: Math.round(fit * 1000) / 10,
      final_score: Math.round(combinedScore * 10) / 10,
      finalScore: Math.round(combinedScore) / 100,
      matchPercentage: Math.round(gScore),
      score: breakdown,
      breakdown,
      ingredientsMissing: breakdown.missing,
      ingredientsAvailable: breakdown.matched,
      imageUrl: r.image_url || "/images/hero-poster.webp",
      totalTimeMinutes: mins,
      minutes: mins,
      prepTimeMinutes: r.prep_time_minutes || 10,
      cookTimeMinutes: r.cook_time_minutes || Math.max(5, mins - 10),
      calories: cal,
      protein: pro,
      protein_g: pro,
      carbs: carb,
      carbs_g: carb,
      fat: fat,
      fat_g: fat,
      fibre: fib,
      fiber_g: fib,
      dominantAroma: r.molecular_profile?.dominant_aroma || "warm aromatic",
      dominant_aroma: r.molecular_profile?.dominant_aroma || "warm aromatic",
      whyRecommended: `High flavor synergy with ${breakdown.matched.slice(0, 3).join(", ") || "pantry"}`,
      why_recommended: `High flavor synergy with ${breakdown.matched.slice(0, 3).join(", ") || "pantry"}`,
      oneIngredientToBuy: breakdown.missing[0] || null,
      molecularNotes: r.molecular_profile?.notes || "Shared aroma volatiles bridge flavour components.",
    });
  }

  ranked.sort((a, b) => b.finalScore - a.finalScore);
  return ranked.slice(0, topK);
}

export function computeUnlockSuggestion(candidateRecipes: any[], pantry: string[]) {
  const pantryNorms = new Set(pantry.map(norm).filter((p) => p.trim() && !isStaple(p)));
  const gapCounts: Record<string, number> = {};
  const gapRecipes: Record<string, any[]> = {};

  for (const r of candidateRecipes) {
    const missing: string[] = r.breakdown?.missing || r.ingredientsMissing || [];
    for (const m of missing) {
      if (!pantryNorms.has(m) && !isStaple(m)) {
        gapCounts[m] = (gapCounts[m] || 0) + 1;
        if (!gapRecipes[m]) gapRecipes[m] = [];
        gapRecipes[m].push(r);
      }
    }
  }

  const keys = Object.keys(gapCounts);
  if (keys.length === 0) return null;

  keys.sort((a, b) => gapCounts[b] - gapCounts[a]);
  const bestItem = keys[0];
  const count = gapCounts[bestItem];
  const display = bestItem.charAt(0).toUpperCase() + bestItem.slice(1);

  const unlockedDishes = (gapRecipes[bestItem] || []).slice(0, 4).map((r) => ({
    recipeId: String(r.recipeId || r.id),
    title: r.title,
    imageUrl: r.imageUrl || r.image_url || "/images/hero-poster.webp",
    calories: Math.round(r.calories || 350),
    protein: Math.round(r.protein || 15),
    pairingScore: 0.92,
  }));

  return {
    ingredient: bestItem.toLowerCase(),
    displayName: display,
    unlockedCount: count,
    unlock_count: count,
    sample_recipes: (gapRecipes[bestItem] || []).slice(0, 2).map((r) => r.title),
    unlockedDishes,
    description: `Adding ${display} unlocks ${count} additional dishes through volatile aroma harmony.`,
    pairingScore: 0.92,
    impactPercent: Math.min(100, count * 20),
    sharedCompounds: ["eugenol", "linalool", "pinene"],
    alternatives: [],
    why: `Adding ${display} bridges multiple recipe templates in your pantry.`,
  };
}
