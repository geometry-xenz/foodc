import { api } from "@/lib/api";
import { GOAL_SPECS, type GoalId } from "@/lib/types";
import { todayISO } from "@/lib/utils";
import { MealPlanner } from "@/components/app/meal-planner";

export const metadata = {
  title: "Meal Planner · Weekly Protocol — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function MealPlannerPage() {
  const date = todayISO();

  const [recData, plannerData, targetsData] = await Promise.all([
    api
      .post<{ recipes: any[] }>(
        "/api/recommend",
        { top_k: 25 },
        { redirectOn401: false },
      )
      .catch(() => ({ recipes: [] })),
    api
      .get<{ entries: any[]; totals: any; targets: any }>(
        `/api/planner?date=${date}`,
        { redirectOn401: false },
      )
      .catch(() => ({
        entries: [],
        totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        targets: null,
      })),
    api.get<any>("/api/nutrition/targets", { redirectOn401: false }).catch(() => null),
  ]);

  const recipes = recData?.recipes || [];
  const entries = plannerData?.entries || [];
  const targets = plannerData?.targets || targetsData?.targets || targetsData || null;
  const rawGoal = targetsData?.goal?.primaryGoal || targets?.primaryGoal || "lean_bulk";
  const goalId = (GOAL_SPECS[rawGoal as GoalId] ? rawGoal : "lean_bulk") as GoalId;

  return (
    <MealPlanner
      initialDate={date}
      initialEntries={entries.map((entry: any) => ({
        id: String(entry.id),
        date: entry.date,
        mealType: entry.mealType,
        recipeId: String(entry.recipeId),
        servings: Number(entry.servings) || 1,
        calories: Number(entry.calories) || 0,
        protein: Number(entry.protein) || 0,
        carbs: Number(entry.carbs) || 0,
        fat: Number(entry.fat) || 0,
      }))}
      recipes={recipes}
      targets={targets}
      goalName={GOAL_SPECS[goalId]?.name ?? "Lean Bulk"}
    />
  );
}
