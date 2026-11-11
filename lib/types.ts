export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type GoalId =
  | "fat_loss"
  | "lean_bulk"
  | "bulk"
  | "recomposition"
  | "maintenance"
  | "athletic_performance";

export type ScoreBreakdown = {
  coreCoverage: number;
  pantryUtilisation: number;
  flavourCoherence: number;
  gapFit: number;
  composite: number;
};

export type RecipeIngredientRecord = {
  name: string;
  displayName?: string;
  quantity: number;
  unit: string;
};

export type RecipeRecord = {
  recipe_id: string;
  title: string;
  cuisine: string;
  diet: string;
  meal_type?: string;
  prep_time_minutes: number;
  cook_time_minutes: number;
  total_time_minutes: number;
  servings: number;
  image_url: string;
  core_ingredients: string[];
  ingredients: RecipeIngredientRecord[];
  instructions: string[];
  nutrition_per_serving: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fibre: number;
  };
  molecular_profile: {
    dominant_aroma: string;
    coherence_score: number;
    notes: string;
  };
};

export type ScoredRecipe = {
  recipeId: string;
  title: string;
  cuisine: string;
  diet: string;
  mealType: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  imageUrl: string;
  ingredientsAvailable: string[];
  ingredientsMissing: string[];
  matchPercentage: number;
  score: ScoreBreakdown;
  finalScore: number;
  whyRecommended: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  oneIngredientToBuy: string | null;
  molecularNotes: string;
  dominantAroma: string;
};

export type UnlockDish = {
  recipeId: string;
  title: string;
  imageUrl: string;
  calories: number;
  protein: number;
  pairingScore: number;
};

export type UnlockRecommendation = {
  ingredient: string;
  displayName: string;
  unlockedCount: number;
  unlockedDishes: UnlockDish[];
  pairingScore: number;
  impactPercent: number;
  description: string;
  sharedCompounds: string[];
  alternatives: Array<{
    ingredient: string;
    displayName: string;
    unlockedCount: number;
    pairingScore: number;
  }>;
};

export type NutritionTargets = {
  bmr: number;
  tdee: number;
  primaryGoal: GoalId;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  targetFibreG: number;
  macroDistributionPct: {
    protein: number;
    carbs: number;
    fat: number;
  };
  rationale: string;
  disclaimer: string;
};

export type NutritionAnalysis = {
  caloriesTotal: number;
  caloriesPerServing: number;
  proteinTotal: number;
  proteinPerServing: number;
  carbsTotal: number;
  carbsPerServing: number;
  fatTotal: number;
  fatPerServing: number;
  fibreTotal: number;
  fibrePerServing: number;
  sugarTotal: number;
  sodiumTotalMg: number;
  saturatedFatG: number;
  micronutrients: Record<string, string>;
  ingredientBreakdown: Array<{
    ingredient: string;
    amount: string;
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    primaryContribution: string;
  }>;
  dataSource: string;
  isEstimate: boolean;
};

export type PantryDto = {
  id: string;
  name: string;
  displayName: string;
  category: string;
  quantity: number;
  unit: string;
  isAvailable: boolean;
  source: string;
  confidence: number;
};

export type PlanEntryDto = {
  id: string;
  date: string;
  mealType: string;
  recipeId: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  title?: string;
};

export type GoalSpec = {
  id: GoalId;
  name: string;
  tagline: string;
  delta: number;
  proteinPerKg: number;
  fatPct: number;
  fibreTarget: number;
  carbsPct?: number;
  rationale: string;
  accent: string;
};

export const GOAL_SPECS: Record<GoalId, GoalSpec> = {
  fat_loss: {
    id: "fat_loss",
    name: "Fat Loss",
    tagline: "Deficit precision. Lean mass preserved.",
    delta: -500,
    proteinPerKg: 2.2,
    fatPct: 0.25,
    fibreTarget: 35,
    rationale: "Controlled 500 kcal deficit with high protein to maximise fat oxidation while preserving lean mass.",
    accent: "#FF8A32",
  },
  lean_bulk: {
    id: "lean_bulk",
    name: "Lean Bulk",
    tagline: "A measured surplus. Muscle without noise.",
    delta: 250,
    proteinPerKg: 2.0,
    fatPct: 0.25,
    fibreTarget: 35,
    rationale: "Modest 250 kcal surplus supporting progressive muscle protein synthesis with minimal adipose gain.",
    accent: "#E8B56A",
  },
  bulk: {
    id: "bulk",
    name: "Bulk",
    tagline: "Fuel strength. Build capacity.",
    delta: 500,
    proteinPerKg: 1.8,
    fatPct: 0.28,
    fibreTarget: 30,
    rationale: "Robust 500 kcal surplus maximising glycogen replenishment and strength adaptation.",
    accent: "#D98B4A",
  },
  recomposition: {
    id: "recomposition",
    name: "Recomp",
    tagline: "Isocaloric. Protein-forward. Recomposed.",
    delta: 0,
    proteinPerKg: 2.3,
    fatPct: 0.25,
    fibreTarget: 35,
    rationale: "Near-isocaloric intake with elevated protein to stimulate muscle synthesis during subtle fat loss.",
    accent: "#C9A15C",
  },
  maintenance: {
    id: "maintenance",
    name: "Maintenance",
    tagline: "Energy balance. Metabolic calm.",
    delta: 0,
    proteinPerKg: 1.6,
    fatPct: 0.28,
    fibreTarget: 35,
    rationale: "Energy balance formula supporting metabolic homeostasis, longevity and balanced macronutrient distribution.",
    accent: "#B8A88A",
  },
  athletic_performance: {
    id: "athletic_performance",
    name: "Athletic",
    tagline: "55% carbohydrate. Glycogen first.",
    delta: 0,
    proteinPerKg: 1.8,
    fatPct: 0.22,
    fibreTarget: 35,
    carbsPct: 0.55,
    rationale: "Carbohydrate-dense fueling strategy at 55% of energy to sustain high glycogen turnover and rapid recovery.",
    accent: "#FFB45E",
  },
};

export const GOAL_ORDER: GoalId[] = [
  "fat_loss",
  "lean_bulk",
  "bulk",
  "recomposition",
  "maintenance",
  "athletic_performance",
];

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary — desk work, little movement",
  light: "Light — 1–3 training sessions / week",
  moderate: "Moderate — 3–5 training sessions / week",
  active: "Active — 6–7 training sessions / week",
  very_active: "Very active — physical job or 2× daily",
};

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: string,
): number {
  const bmr =
    String(sex).toLowerCase() === "female"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age - 161
      : 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  return Math.round(bmr * 10) / 10;
}

export function calculateTDEE(
  bmr: number,
  activityLevel: string = "moderate",
): number {
  const multiplier =
    ACTIVITY_MULTIPLIERS[activityLevel as ActivityLevel] ?? 1.55;
  return Math.round(bmr * multiplier * 10) / 10;
}

export function computeNutritionTargets(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: string = "male",
  activityLevel: string = "moderate",
  primaryGoal: string = "lean_bulk",
): NutritionTargets {
  const bmr = calculateBMR(weightKg, heightCm, age, sex);
  const tdee = calculateTDEE(bmr, activityLevel);
  const goalId = (GOAL_SPECS[primaryGoal as GoalId]
    ? primaryGoal
    : "lean_bulk") as GoalId;
  const spec = GOAL_SPECS[goalId];

  let targetCalories = tdee + spec.delta;
  if (goalId === "fat_loss") targetCalories = Math.max(targetCalories, 1300);

  const targetProteinG = Math.round(weightKg * spec.proteinPerKg * 10) / 10;
  const proteinCalories = targetProteinG * 4;
  const fatCalories = targetCalories * spec.fatPct;

  let targetFatG = Math.round((fatCalories / 9) * 10) / 10;
  let carbCalories = Math.max(
    targetCalories - proteinCalories - fatCalories,
    0,
  );

  if (spec.carbsPct) {
    carbCalories = targetCalories * spec.carbsPct;
    const remainingFatCalories = Math.max(
      targetCalories - proteinCalories - carbCalories,
      0,
    );
    targetFatG = Math.round((remainingFatCalories / 9) * 10) / 10;
  }

  const targetCarbsG = Math.round((carbCalories / 4) * 10) / 10;
  const finalFatCalories = targetFatG * 9;

  return {
    bmr,
    tdee,
    primaryGoal: goalId,
    targetCalories: Math.round(targetCalories),
    targetProteinG,
    targetCarbsG,
    targetFatG,
    targetFibreG: spec.fibreTarget,
    macroDistributionPct: {
      protein: Math.round((proteinCalories / targetCalories) * 1000) / 10,
      carbs: Math.round((carbCalories / targetCalories) * 1000) / 10,
      fat: Math.round((finalFatCalories / targetCalories) * 1000) / 10,
    },
    rationale: spec.rationale,
    disclaimer:
      "Evidence-based estimates derived from the Mifflin-St Jeor equation. Not medical advice.",
  };
}
