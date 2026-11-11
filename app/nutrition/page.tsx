import { ContentPage } from "@/components/content-page";
import { Activity, ShieldCheck, HeartPulse, Scale } from "lucide-react";

export const metadata = {
  title: "Nutritional Gastronomy — DRISHYAM",
  description: "Evidence-based metabolic calculation using Mifflin-St Jeor and USDA FoodData Central baselines.",
};

export default function PublicNutritionPage() {
  const protocols = [
    { id: "fat_loss", name: "Fat Loss", rule: "-20% caloric deficit, high protein (2.0 g/kg)", floor: "1,200 kcal floor enforced" },
    { id: "lean_bulk", name: "Lean Bulk", rule: "+10% caloric surplus, moderate protein (1.8 g/kg)", floor: "Targeted lean hypertrophy" },
    { id: "maintenance", name: "Maintenance", rule: "100% TDEE balance, balanced macros (1.6 g/kg)", floor: "Metabolic equilibrium" },
    { id: "recomposition", name: "Recomposition", rule: "-5% slight deficit on rest, +5% on training", floor: "Simultaneous fat loss & muscle retention" },
    { id: "athletic_performance", name: "Athletic Performance", rule: "High carbohydrate (4-6 g/kg), rapid glycogen repletion", floor: "Endurance & recovery" },
    { id: "dirty_bulk", name: "Dirty Bulk (Preference)", rule: "+25% surplus with trade-off advisory note", floor: "Always carries digestive & lipid warnings" },
    { id: "bulk", name: "Aggressive Bulk", rule: "+18% surplus, high caloric density", floor: "Strength and mass optimization" },
    { id: "general_health", name: "General Health", rule: "Mediterranean macro ratio, high fiber (≥35g/day)", floor: "Cardiometabolic longevity" },
  ];

  return (
    <ContentPage
      eyebrow="Nutritional Science · USDA FoodData Central · Mifflin-St Jeor"
      title={
        <>
          Metabolic Biology, Not{" "}
          <span className="italic text-gold-gradient">Generic Diet Templates.</span>
        </>
      }
      subtitle="Every recommendation is dynamically balanced against your basal metabolic rate, total daily energy expenditure, and customized target bounds."
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8B56A]/10 text-[#E8B56A] mb-4">
            <Activity size={20} />
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F6EFE4]">
            Mifflin-St Jeor Energy Equations
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#B3A798]">
            We reject arbitrary 2,000-calorie baselines. DRISHYAM calculates your exact BMR:
          </p>
          <div className="mt-4 rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-[#E8B56A]">
            Men: 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5<br />
            Women: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
          </div>
          <p className="mt-3 text-xs text-[#8B7E6D]">
            Then multiplied by documented activity coefficients (sedentary: 1.2, moderate: 1.55, vigorous: 1.725).
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A32]/10 text-[#FF8A32] mb-4">
            <ShieldCheck size={20} />
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F6EFE4]">
            Enforced Safety Bounds (§5.7)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#B3A798]">
            Dietary safety is mathematically enforced at the engine level:
          </p>
          <ul className="mt-4 space-y-2 text-xs text-[#B3A798]">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A32]" />
              <strong>Absolute floor:</strong> Never below max(BMR, 1,200 kcal female / 1,500 kcal male).
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A32]" />
              <strong>Deficit cap:</strong> Deficits are strictly capped at 25% of TDEE.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A32]" />
              <strong>Surplus cap:</strong> Surpluses limited to +20% (+25% for dirty bulk preference).
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A32]" />
              <strong>Provenance badges:</strong> All data labelled usda_fdc, calculated, or estimated.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="font-display text-2xl font-semibold text-[#F6EFE4] mb-6">
          The 8 Metabolic Protocols
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {protocols.map((p) => (
            <div key={p.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <span className="text-[0.62rem] uppercase tracking-wider text-[#E8B56A] font-semibold">
                Protocol
              </span>
              <h4 className="mt-1 font-display text-lg font-semibold text-[#F6EFE4]">{p.name}</h4>
              <p className="mt-2 text-xs text-[#B3A798] leading-relaxed">{p.rule}</p>
              <div className="mt-3 pt-3 border-t border-white/5 text-[0.62rem] text-[#756D62]">
                {p.floor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentPage>
  );
}
