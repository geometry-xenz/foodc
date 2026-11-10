import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { getRecipeById, getUserGoalId } from "@/lib/data-access";
import { scoreRecipe, toScoredRecipe } from "@/lib/gastronomy";
import {
  displayName,
  getCompoundCompounds,
  getFlavorProfile,
  getNutritionProfile,
  getScientificName,
} from "@/lib/flavor";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;

  const [recipe, userContext] = await Promise.all([
    getRecipeById(id),
    prisma.user.findUnique({
      where: { id: user.id },
      include: { goal: true, pantry: true },
    }),
  ]);

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
  }

  const pantry = (userContext?.pantry ?? [])
    .filter((item) => item.isAvailable)
    .map((item) => item.name);
  const goalId = getUserGoalId(userContext?.goal);
  const result = scoreRecipe(pantry, recipe);
  const scored = toScoredRecipe(result, goalId);

  return NextResponse.json({
    recipe,
    score: scored.score,
    scored,
    ingredients: recipe.ingredients.map((ingredient) => {
      const nutrition = getNutritionProfile(ingredient.name);
      return {
        name: ingredient.name,
        displayName: ingredient.displayName ?? displayName(ingredient.name),
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        available: result.available.includes(ingredient.name),
        compounds: getCompoundCompounds(ingredient.name),
        flavor: getFlavorProfile(ingredient.name),
        scientificName: getScientificName(ingredient.name),
        macros: nutrition
          ? {
              calories: nutrition.per_100g.calories,
              protein: nutrition.per_100g.protein,
              carbs: nutrition.per_100g.carbs,
              fat: nutrition.per_100g.fat,
              fibre: nutrition.per_100g.fibre,
            }
          : null,
      };
    }),
    missing: result.missing.map((name) => ({
      name,
      displayName: displayName(name),
    })),
  });
}
