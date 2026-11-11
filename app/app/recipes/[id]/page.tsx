import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { RecipeDetailAndCook } from "@/components/recipe-detail-and-cook";

export const dynamic = "force-dynamic";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let recipeData: any = null;
  let isSaved = false;

  try {
    const res = await api.get<any>(`/api/recipes/${id}`);
    recipeData = res?.recipe || res;

    // Check if saved
    const savedList = await api.get<any[]>("/api/saved").catch(() => []);
    if (Array.isArray(savedList)) {
      isSaved = savedList.some((s) => s.recipe_id === id || s.recipe?.id === id);
    }
  } catch {
    notFound();
  }

  if (!recipeData) {
    notFound();
  }

  return (
    <RecipeDetailAndCook
      recipe={{
        id: recipeData.id,
        title: recipeData.title,
        cuisine: recipeData.cuisine,
        diet: recipeData.diet,
        minutes: recipeData.minutes || recipeData.total_time_minutes || 30,
        servings: recipeData.servings || 2,
        calories: recipeData.calories || recipeData.nutrition_per_serving?.calories || 400,
        protein_g: recipeData.protein_g || recipeData.nutrition_per_serving?.protein_g || 20,
        carbs_g: recipeData.carbs_g || recipeData.nutrition_per_serving?.carbs_g || 45,
        fat_g: recipeData.fat_g || recipeData.nutrition_per_serving?.fat_g || 15,
        ingredients: recipeData.ingredients || [],
        instructions: recipeData.instructions || [],
        instruction_steps: recipeData.instruction_steps || [],
      }}
      isSavedInitial={isSaved}
    />
  );
}
