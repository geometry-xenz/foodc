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
