import { prisma } from "@/lib/db";
import { getCurrentUserWithContext } from "@/lib/auth";
import { computeNutritionTargets, GOAL_SPECS } from "@/lib/goals";
import type { GoalId } from "@/lib/types";
import { todayISO, dateLabel } from "@/lib/utils";
import { NutritionStudio } from "@/components/app/nutrition-studio";

export const dynamic = "force-dynamic";

export default async function NutritionPage() {
  const user = await getCurrentUserWithContext();
  if (!user) return null;

  const goalId = (user.goal?.primaryGoal ?? "lean_bulk") as GoalId;
  const targets = user.profile
    ? computeNutritionTargets(
        user.profile.weightKg,
        user.profile.heightCm,
        user.profile.age,
        user.profile.sex,
        user.profile.activityLevel,
        GOAL_SPECS[goalId] ? goalId : "lean_bulk",
      )
    : null;

  const date = todayISO();
  const entries = await prisma.mealPlanEntry.findMany({
    where: { userId: user.id, date },
    orderBy: { createdAt: "asc" },
  });

  const consumed = entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return (
    <NutritionStudio
      initialTargets={targets}
      profile={
        user.profile
          ? {
              age: user.profile.age,
              heightCm: user.profile.heightCm,
              weightKg: user.profile.weightKg,
              targetWeightKg: user.profile.targetWeightKg,
              sex: user.profile.sex,
              activityLevel: user.profile.activityLevel,
            }
          : null
      }
      goalId={targets ? targets.primaryGoal : goalId}
      consumed={consumed}
      loggedMeals={entries.length}
      dateLabel={dateLabel(date)}
    />
  );
}
