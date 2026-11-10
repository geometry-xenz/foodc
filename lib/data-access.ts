import { prisma } from "@/lib/db";
import { toRecipeRecord, type DbRecipe } from "@/lib/serializers";
import { computeUnlockRecommendation, rankRecipes } from "@/lib/gastronomy";
import { computeNutritionTargets } from "@/lib/goals";
import type { GoalId, RecipeRecord } from "@/lib/types";
import { todayISO } from "@/lib/utils";

export async function getRecipes() {
  const rows = await prisma.recipe.findMany({
    include: { ingredients: true },
    orderBy: { title: "asc" },
  });
  return rows.map((row) => toRecipeRecord(row as DbRecipe));
}

export async function getRecipeById(id: string) {
  const row = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true },
  });
  return row ? toRecipeRecord(row as DbRecipe) : null;
}

export function getUserGoalId(goal: { primaryGoal: string } | null | undefined): GoalId {
  return (goal?.primaryGoal ?? "lean_bulk") as GoalId;
}

export async function scorePantry(pantry: string[], goalId: GoalId) {
  const recipeRecords: RecipeRecord[] = await getRecipes();
  const ranked = rankRecipes(pantry, recipeRecords, goalId);
  const unlock = computeUnlockRecommendation(pantry, ranked);
  return { ranked, unlock, recipeRecords };
}

export async function getDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, goal: true, pantry: true },
  });
  if (!user) return null;

  const pantry = user.pantry.filter((item) => item.isAvailable).map((item) => item.name);
  const goalId = getUserGoalId(user.goal);
  const { ranked, unlock } = await scorePantry(pantry, goalId);
  const today = todayISO();
  const planEntries = await prisma.mealPlanEntry.findMany({
    where: { userId, date: today },
    orderBy: { createdAt: "asc" },
  });

  const targets = user.profile
    ? computeNutritionTargets(
        user.profile.weightKg,
        user.profile.heightCm,
        user.profile.age,
        user.profile.sex,
        user.profile.activityLevel,
        goalId,
      )
    : null;

  return { user, pantry, ranked, unlock, planEntries, targets, today };
}
