import { api } from "@/lib/api";
import { GoalsWorkspace } from "@/components/goals-workspace";

export const metadata = {
  title: "Fitness & Metabolic Goals — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function GoalsPage() {
  let goals = { primary_goal: "lean_bulk", version: 1 };
  let profile = { age: 28, gender: "male", height_cm: 178, weight_kg: 75, activity_level: "moderate", version: 1 };
  let targets = { bmr_kcal: 1750, tdee_kcal: 2500, target_calories_kcal: 2400, target_protein_g: 150, version: 1 };

  try {
    const [gRes, pRes, tRes] = await Promise.all([
      api.get<any>("/api/goals"),
      api.get<any>("/api/profile"),
      api.get<any>("/api/nutrition/targets"),
    ]);
    if (gRes) goals = gRes;
    if (pRes) profile = pRes;
    if (tRes) targets = tRes;
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#E8B56A]">
          Metabolic Biology · 8 Objective Protocols
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#F6EFE4]">
          Goals & Target Configuration
        </h1>
        <p className="max-w-2xl text-xs text-[#A79C8D] leading-relaxed">
          Configure your metabolic protocol, biometrics, and calorie/protein targets.
          Every recipe recommendation is dynamically scored against your remaining daily balance.
        </p>
      </div>

      <GoalsWorkspace
        initialGoals={goals}
        initialProfile={profile}
        initialTargets={targets}
      />
    </div>
  );
}
