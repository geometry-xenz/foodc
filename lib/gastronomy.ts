import {
  computeMolecularCoherence,
  displayName,
  getEntityProfile,
  normalizeIngredient,
} from "@/lib/flavor";
import type {
  GoalId,
  RecipeRecord,
  ScoredRecipe,
  ScoreBreakdown,
  UnlockRecommendation,
} from "@/lib/types";

const BASIC_STAPLES = new Set(["salt", "oil", "water", "sugar"]);

export type ScoreResult = {
  recipe: RecipeRecord;
  available: string[];
  missing: string[];
  hardMissing: string[];
  score: ScoreBreakdown;
  matchPercentage: number;
};

/**
 * Ported 1:1 from ComputationalGastronomyEngine.score_recipe.
 * Score = 0.30*C_core + 0.20*U_pantry + 0.20*F_flavor + 0.30*G_gap
 */
export function scoreRecipe(
  pantryItems: string[],
  recipe: RecipeRecord,
): ScoreResult {
  const normPantry = new Set(pantryItems.map(normalizeIngredient));

  const recipeIngredientNames = recipe.ingredients.map((item) =>
    normalizeIngredient(item.name),
  );
  const recipeSet = new Set(recipeIngredientNames);

  const available = [...recipeSet].filter((name) => normPantry.has(name));
  const missing = [...recipeSet].filter((name) => !normPantry.has(name));

  // 1. Core coverage — dish-defining ingredients present.
  const coreRaw = recipe.core_ingredients ?? [];
  const normCore =
    coreRaw.length > 0
      ? coreRaw.map(normalizeIngredient)
      : recipeIngredientNames.slice(0, 3);

  const coreCoverage =
    normCore.length > 0
      ? normCore.filter((name) => normPantry.has(name)).length / normCore.length
      : 0.5;

  // 2. Counter utilisation — share of pantry consumed by this recipe.
  let pantryUtilisation =
    normPantry.size > 0 ? available.length / normPantry.size : 0;
  pantryUtilisation = Math.min(pantryUtilisation, 1);

  // 3. Molecular flavour coherence from the FlavorDB profiles.
  const flavourCoherence = computeMolecularCoherence(
    [...normPantry],
    recipeIngredientNames,
  );

  // 4. Gap fit — hard missing items, staples exempted.
  const totalItems = Math.max(recipeSet.size, 1);
  const hardMissing = missing.filter((name) => !BASIC_STAPLES.has(name));
  let gapFit = 1 - hardMissing.length / totalItems;
  gapFit = Math.max(0, Math.min(gapFit, 1));

  const composite = Math.round(
    Math.min(
      Math.max(
        0.3 * coreCoverage +
          0.2 * pantryUtilisation +
          0.2 * flavourCoherence +
          0.3 * gapFit,
        0,
      ),
      1,
    ) * 1000,
  ) / 1000;

  const score: ScoreBreakdown = {
    coreCoverage: round2(coreCoverage),
    pantryUtilisation: round2(pantryUtilisation),
    flavourCoherence: round2(flavourCoherence),
    gapFit: round2(gapFit),
    composite,
  };

  const matchPercentage =
    Math.round((available.length / Math.max(recipeSet.size, 1)) * 1000) / 10;

  return {
    recipe,
    available,
    missing,
    hardMissing,
    score,
    matchPercentage,
  };
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

/** Ported from routes/recommend.py — personalized goal multiplier. */
export function personalizeScore(
  result: ScoreResult,
  goal: GoalId,
): { finalScore: number; goalNote: string } {
  const { protein, calories } = result.recipe.nutrition_per_serving;
  let multiplier = 1;
  let goalNote = "";

  if (goal === "fat_loss") {
    if (protein >= 14 && calories <= 300) {
      multiplier = 1.15;
      goalNote = `Ideal high-protein (${protein}g) / low-calorie (${calories} kcal) ratio for fat loss.`;
    } else if (calories > 400) {
      multiplier = 0.85;
      goalNote = `Higher calories (${calories} kcal) for a cutting phase.`;
    }
  } else if (goal === "lean_bulk" || goal === "bulk") {
    if (protein >= 15) {
      multiplier = 1.12;
      goalNote = `Solid muscle protein synthesis fuel (${protein}g protein).`;
    }
  } else if (goal === "recomposition") {
    if (protein >= 15) {
      multiplier = 1.1;
      goalNote = `Elevated protein (${protein}g) for body recomposition.`;
    }
  } else if (goal === "athletic_performance" && result.recipe.nutrition_per_serving.carbs >= 30) {
    multiplier = 1.08;
    goalNote = `Carbohydrate-dense (${result.recipe.nutrition_per_serving.carbs}g) fueling for athletic output.`;
  }

  return {
    finalScore:
      Math.round(Math.min(result.score.composite * multiplier, 1) * 1000) / 1000,
    goalNote,
  };
}

export function toScoredRecipe(
  result: ScoreResult,
  goal: GoalId,
): ScoredRecipe {
  const { recipe, score, available, missing, hardMissing, matchPercentage } =
    result;
  const { finalScore, goalNote } = personalizeScore(result, goal);
  const nutrition = recipe.nutrition_per_serving;
  const pantryUse = Math.round(score.pantryUtilisation * 100);
  const why = [
    `Uses ${pantryUse}% of your current pantry.`,
    goalNote,
    `Built on ${recipe.molecular_profile.dominant_aroma} volatile compounds.`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    recipeId: recipe.recipe_id,
    title: recipe.title,
    cuisine: recipe.cuisine,
    diet: recipe.diet,
    mealType: recipe.meal_type ?? "lunch",
    prepTimeMinutes: recipe.prep_time_minutes,
    cookTimeMinutes: recipe.cook_time_minutes,
    totalTimeMinutes: recipe.total_time_minutes,
    servings: recipe.servings,
    imageUrl: recipe.image_url,
    ingredientsAvailable: available,
    ingredientsMissing: missing,
    matchPercentage,
    score,
    finalScore,
    whyRecommended: why,
    calories: nutrition.calories,
    protein: nutrition.protein,
    carbs: nutrition.carbs,
    fat: nutrition.fat,
    fibre: nutrition.fibre,
    oneIngredientToBuy: hardMissing[0] ?? null,
    molecularNotes: recipe.molecular_profile.notes,
    dominantAroma: recipe.molecular_profile.dominant_aroma,
  };
}

export function rankRecipes(
  pantry: string[],
  recipes: RecipeRecord[],
  goal: GoalId,
): ScoredRecipe[] {
  return recipes
    .map((recipe) => toScoredRecipe(scoreRecipe(pantry, recipe), goal))
    .sort((a, b) => b.finalScore - a.finalScore);
}

/**
 * The killer feature: one ingredient that unlocks the most complementary dishes.
 * Only recipes blocked by exactly one hard-to-source ingredient participate.
 * Positive molecular pairing is required via shared volatiles or a known
 * culinary synergy bridge with the existing pantry.
 */
export function computeUnlockRecommendation(
  pantry: string[],
  ranked: ScoredRecipe[],
  actionableOnly = true,
): UnlockRecommendation | null {
  type Candidate = {
    ingredient: string;
    dishes: ScoredRecipe[];
    shared: Set<string>;
    synergy: boolean;
  };

  const candidates = new Map<string, Candidate>();
  const eligible = ranked.filter((recipe) => {
    const hardMissing = recipe.ingredientsMissing.filter(
      (name) => !BASIC_STAPLES.has(name),
    );
    return hardMissing.length === 1;
  });

  for (const recipe of eligible) {
    const hardMissing = recipe.ingredientsMissing.filter(
      (name) => !BASIC_STAPLES.has(name),
    );
    const ingredient = hardMissing[0];
    if (!ingredient) continue;

    const existing = candidates.get(ingredient) ?? {
      ingredient,
      dishes: [],
      shared: new Set<string>(),
      synergy: false,
    };
    existing.dishes.push(recipe);

    const candidateEntity = getEntityProfile(ingredient);
    for (const pantryItem of pantry) {
      const pantryEntity = getEntityProfile(pantryItem);
      if (!candidateEntity || !pantryEntity) continue;
      const shared = candidateEntity.volatile_compounds.filter((compound) =>
        pantryEntity.volatile_compounds.includes(compound),
      );
      shared.forEach((compound) => existing.shared.add(compound));
      if (pantryEntity.synergistic_pairs?.includes(ingredient)) {
        existing.synergy = true;
      }
    }
    candidates.set(ingredient, existing);
  }

  const scored = [...candidates.values()]
    .map((candidate) => {
      const pairingScore = computeMolecularCoherence(
        [candidate.ingredient],
        pantry,
      );
      const positive = candidate.shared.size > 0 || candidate.synergy;
      return {
        ...candidate,
        pairingScore,
        positive,
      };
    })
    .filter((candidate) => (actionableOnly ? candidate.positive : true))
    .sort(
      (a, b) =>
        b.dishes.length - a.dishes.length ||
        b.pairingScore - a.pairingScore,
    );

  if (scored.length === 0) return null;
  const best = scored[0];
  const totalUnlockable = Math.max(ranked.length, 1);

  return {
    ingredient: best.ingredient,
    displayName: displayName(best.ingredient),
    unlockedCount: best.dishes.length,
    unlockedDishes: best.dishes.map((dish) => ({
      recipeId: dish.recipeId,
      title: dish.title,
      imageUrl: dish.imageUrl,
      calories: dish.calories,
      protein: dish.protein,
      pairingScore: computeMolecularCoherence(
        [best.ingredient],
        dish.ingredientsAvailable,
      ),
    })),
    pairingScore: Math.round(best.pairingScore * 1000) / 1000,
    impactPercent:
      Math.round((best.dishes.length / totalUnlockable) * 1000) / 10,
    description: `A single purchase of ${displayName(
      best.ingredient,
    ).toLowerCase()} unlocks ${best.dishes.length} complementary ${
      best.dishes.length === 1 ? "dish" : "dishes"
    } with ${best.shared.size > 0 ? `${best.shared.size} shared volatile compound${best.shared.size === 1 ? "" : "s"}` : "a known culinary synergy bridge"} already in your pantry.`,
    sharedCompounds: [...best.shared].slice(0, 6),
    alternatives: scored.slice(1, 4).map((candidate) => ({
      ingredient: candidate.ingredient,
      displayName: displayName(candidate.ingredient),
      unlockedCount: candidate.dishes.length,
      pairingScore: Math.round(candidate.pairingScore * 1000) / 1000,
    })),
  };
}
