import { api } from "@/lib/api";
import { MealHistoryWorkspace } from "@/components/meal-history-workspace";

export const metadata = {
  title: "Meal History · Consumption Log — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function MealHistoryPage() {
  let logs: any[] = [];
  try {
    const res = await api.get<any[]>("/api/nutrition/history");
    if (Array.isArray(res)) logs = res;
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#E8B56A]">
          Metabolic Intake · Historical Records
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#F6EFE4]">
          Meal History & Portions
        </h1>
        <p className="max-w-2xl text-xs text-[#A79C8D] leading-relaxed">
          Review past plates, adjust portion multipliers, and track daily caloric accumulation.
          All snapshots are server-verified against USDA FoodData Central baselines.
        </p>
      </div>

      <MealHistoryWorkspace initialLogs={logs} />
    </div>
  );
}
