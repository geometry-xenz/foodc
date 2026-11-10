import { prisma } from "@/lib/db";
import { getCurrentUserWithContext } from "@/lib/auth";
import { getUserGoalId, scorePantry } from "@/lib/data-access";
import { computeNutritionTargets, GOAL_SPECS } from "@/lib/goals";
import { todayISO } from "@/lib/utils";
import { MealPlanner } from "@/components/app/meal-planner";

export const dynamic = "force-dynamic";

export default async function PlannerPage() {
  const user = await getCurrentUserWithContext();
  if (!user) return null;

  const date = todayISO();
  const goalId = getUserGoalId(user.goal);
  const pantry = user.pantry
    .filter((item) => item.isAvailable)
    .map((item) => item.name);

  const [{ ranked }, entries] = await Promise.all([
    scorePantry(pantry, goalId),
    prisma.mealPlanEntry.findMany({
      where: { userId: user.id, date },
      orderBy: { createdAt: "asc" },
    }),
  ]);

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

  return (
    <MealPlanner
      initialDate={date}
      initialEntries={entries.map((entry) => ({
        id: entry.id,
        date: entry.date,
        mealType: entry.mealType,
        recipeId: entry.recipeId,
        servings: entry.servings,
        calories: entry.calories,
        protein: entry.protein,
        carbs: entry.carbs,
        fat: entry.fat,
      }))}
      recipes={ranked}
      targets={targets}
      goalName={GOAL_SPECS[goalId]?.name ?? "Lean Bulk"}
    />
  );
}
