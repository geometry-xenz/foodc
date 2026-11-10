import type { Prisma } from "@prisma/client";
import type { RecipeRecord } from "@/lib/types";

export type DbRecipe = Prisma.RecipeGetPayload<{
  include: { ingredients: true };
}>;

export function toRecipeRecord(recipe: DbRecipe): RecipeRecord {
  return {
    recipe_id: recipe.id,
    title: recipe.title,
    cuisine: recipe.cuisine,
    diet: recipe.diet,
    meal_type: recipe.mealType,
    prep_time_minutes: recipe.prepTimeMinutes,
    cook_time_minutes: recipe.cookTimeMinutes,
    total_time_minutes: recipe.totalTimeMinutes,
    servings: recipe.servings,
    image_url: recipe.imageUrl,
    core_ingredients: JSON.parse(recipe.coreIngredients) as string[],
    ingredients: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      displayName: ingredient.displayName,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })),
    instructions: JSON.parse(recipe.instructions) as string[],
    nutrition_per_serving: {
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      fibre: recipe.fibre,
    },
    molecular_profile: {
      dominant_aroma: recipe.dominantAroma,
      coherence_score: recipe.coherenceScore,
      notes: recipe.pairingNotes,
    },
  };
}

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
};

export type GoalDto = {
  primaryGoal: string;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  targetFibreG: number;
};

export type ProfileDto = {
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  sex: string;
  activityLevel: string;
  diet: string;
  allergies: string[];
  excluded: string[];
};

export function safeJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
