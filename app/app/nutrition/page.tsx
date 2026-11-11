import { api } from "@/lib/api";
import { GOAL_SPECS, type GoalId } from "@/lib/types";
import { todayISO, dateLabel } from "@/lib/utils";
import { NutritionStudio } from "@/components/app/nutrition-studio";

export const dynamic = "force-dynamic";

export default async function NutritionPage() {
  const date = todayISO();

  const [targetsData, plannerData] = await Promise.all([
    api.get<any>("/api/nutrition/targets", { redirectOn401: false }).catch(() => null),
    api
      .get<{ entries: any[]; totals: any }>(`/api/planner?date=${date}`, {
        redirectOn401: false,
      })
      .catch(() => ({ entries: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } })),
  ]);

  const rawGoal = targetsData?.goal?.primaryGoal || targetsData?.primaryGoal || "lean_bulk";
  const goalId = (GOAL_SPECS[rawGoal as GoalId] ? rawGoal : "lean_bulk") as GoalId;
  const targets = targetsData?.targets || targetsData || null;
  const entries = plannerData?.entries || [];
  const consumed = plannerData?.totals || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  return (
    <NutritionStudio
      initialTargets={targets}
      profile={targetsData?.profile || null}
      goalId={goalId}
      consumed={consumed}
      loggedMeals={entries.length}
      dateLabel={dateLabel(date)}
    />
  );
}
