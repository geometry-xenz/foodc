"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Flame, Heart, Info, Loader2, Sparkles, Target, Zap, Droplets, ShieldCheck } from "lucide-react";
import { computeBmi, calculateFullNutritionPlan, BiometricProfile } from "@/lib/biometrics";

interface GoalWorkspaceProps {
  initialGoals: {
    primary_goal: string;
    secondary_goals?: string[];
    target_weight_kg?: number;
    version: number;
  };
  initialProfile: {
    age?: number;
    gender?: string;
    height_cm?: number;
    weight_kg?: number;
    activity_level?: string;
    version: number;
  };
  initialTargets: {
    bmr_kcal?: number;
    tdee_kcal?: number;
    target_calories_kcal?: number;
    target_protein_g?: number;
    target_carbs_g?: number;
    target_fat_g?: number;
    target_fiber_g?: number;
    version: number;
  };
}

const GOAL_OPTIONS: Array<{
  id: BiometricProfile["primaryGoal"];
  label: string;
  tagline: string;
  description: string;
  badge: string;
  accent: string;
}> = [
  {
    id: "fat_loss",
    label: "Fat Loss & Conditioning",
    tagline: "Controlled deficit, lean mass preservation",
    description: "-450 kcal deficit with elevated protein (2.2g/kg) to maximize fat oxidation while protecting metabolic rate.",
    badge: "Fat Loss",
    accent: "#E07A38",
  },
  {
    id: "lean_bulk",
    label: "Lean Muscle Hypertrophy",
    tagline: "Measured surplus, clean muscle gain",
    description: "+250 kcal controlled surplus to fuel progressive muscle protein synthesis with minimal adipose tissue accumulation.",
    badge: "Hypertrophy",
    accent: "#DFB271",
  },
  {
    id: "bulk",
    label: "Strength & Power Bulk",
    tagline: "High capacity strength adaptation",
    description: "+450 kcal surplus providing full glycogen replenishment and recovery for heavy progressive overload training.",
    badge: "Strength",
    accent: "#E59E6B",
  },
  {
    id: "recomposition",
    label: "Body Recomposition",
    tagline: "Simultaneous fat loss & muscle toning",
    description: "Near-isocaloric balance with high dietary protein (2.3g/kg) designed for simultaneous lean development and adipose reduction.",
    badge: "Recomp",
    accent: "#8FA989",
  },
  {
    id: "athletic_performance",
    label: "Athletic Endurance & Stamina",
    tagline: "Glycogen-first functional fueling",
    description: "Carbohydrate-optimized fueling strategy for prolonged aerobic endurance, high agility, and rapid recovery between bouts.",
    badge: "Athletic",
    accent: "#A8C4A2",
  },
  {
    id: "maintenance",
    label: "Metabolic Equilibrium & Longevity",
    tagline: "Vitality, cardiometabolic balance",
    description: "Equalized daily energy intake aligned with whole-food nutrient density and hormonal balance.",
    badge: "Equilibrium",
    accent: "#8F8578",
  },
];

export function GoalsWorkspace({ initialGoals, initialProfile, initialTargets }: GoalWorkspaceProps) {
  const router = useRouter();
  const [primaryGoal, setPrimaryGoal] = useState<BiometricProfile["primaryGoal"]>(
    (initialGoals.primary_goal as any) || "lean_bulk"
  );
  const [gender, setGender] = useState<"male" | "female" | "other">(
    (initialProfile.gender as any) || "male"
  );
  const [weightKg, setWeightKg] = useState<number>(initialProfile.weight_kg || 72.0);
  const [heightCm, setHeightCm] = useState<number>(initialProfile.height_cm || 176.0);
  const [age, setAge] = useState<number>(initialProfile.age || 27);
  const [activity, setActivity] = useState<BiometricProfile["activityLevel"]>(
    (initialProfile.activity_level as any) || "moderate"
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Compute live real-time biometrics using natural formula
  const currentPlan = calculateFullNutritionPlan({
    weightKg: Number(weightKg) || 70,
    heightCm: Number(heightCm) || 170,
    age: Number(age) || 25,
    gender,
    activityLevel: activity,
    primaryGoal,
  });

  const bmiAnalysis = computeBmi(Number(weightKg) || 70, Number(heightCm) || 170);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      // 1. Update goals
      await fetch("/api/goals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primary_goal: primaryGoal,
          target_weight_kg: Number(weightKg),
        }),
      });

      // 2. Update profile
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender,
          weight_kg: Number(weightKg),
          height_cm: Number(heightCm),
          age: Number(age),
          activity_level: activity,
        }),
      });

      // 3. Update targets
      await fetch("/api/nutrition/targets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bmr_kcal: currentPlan.bmr,
          tdee_kcal: currentPlan.tdee,
          target_calories_kcal: currentPlan.targetCalories,
          target_protein_g: currentPlan.macros.proteinG,
          target_carbs_g: currentPlan.macros.carbsG,
          target_fat_g: currentPlan.macros.fatG,
          target_fiber_g: currentPlan.macros.fibreG,
        }),
      });

      setMessage({ type: "success", text: "Nutritional targets & biometrics synchronized seamlessly!" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Unable to save changes right now. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <div className="eyebrow mb-2">Evidence-Based Physiology</div>
        <h1 className="font-display text-3xl font-semibold text-[#F7F2EB] sm:text-4xl">
          Biometrics, Energy &amp; <span className="text-gold-gradient">Nutritional Architecture</span>
        </h1>
        <p className="mt-2 text-sm text-[#A39788] max-w-2xl leading-relaxed">
          Accurate metabolic modeling calculated from your height, bodyweight, age, and lifestyle activity. We balance your primary goal against macronutrient distribution and essential micronutrient targets.
        </p>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-xl p-3.5 text-sm ${
            message.type === "success"
              ? "border border-[#8FA989]/40 bg-[#8FA989]/10 text-[#C1D6BD]"
              : "border border-[#E07A38]/40 bg-[#E07A38]/10 text-[#F5B48B]"
          }`}
        >
          {message.type === "success" ? <Check size={16} /> : <Info size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Grid: Inputs + Realtime Biometrics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Physical Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <section className="app-card p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DFB271]">
              <Target size={15} />
              1. Physical Biometrics &amp; Lifestyle
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Biological Sex</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["male", "female"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`h-10 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                        gender === g
                          ? "bg-[#DFB271] text-[#14120F]"
                          : "border border-white/10 bg-white/[0.02] text-[#A39788] hover:border-white/20"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label" htmlFor="age-input">Age (Years)</label>
                <input
                  id="age-input"
                  type="number"
                  min={14}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="field"
                />
              </div>

              <div>
                <label className="label" htmlFor="weight-input">Current Bodyweight (kg)</label>
                <input
                  id="weight-input"
                  type="number"
                  step="0.5"
                  min={30}
                  max={250}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="field"
                />
              </div>

              <div>
                <label className="label" htmlFor="height-input">Stature Height (cm)</label>
                <input
                  id="height-input"
                  type="number"
                  min={100}
                  max={250}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="field"
                />
              </div>
            </div>

            <div>
              <label className="label">Activity &amp; Training Frequency</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "sedentary", title: "Sedentary", desc: "Desk work, light walk" },
                  { id: "moderate", title: "Moderate", desc: "3-4 workout sessions/wk" },
                  { id: "very_active", title: "High Athletic", desc: "6+ intense sessions/wk" },
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setActivity(act.id as any)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      activity === act.id
                        ? "border-[#E07A38] bg-[#E07A38]/10 text-[#F7F2EB]"
                        : "border-white/10 bg-white/[0.02] text-[#A39788] hover:border-white/20"
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#F7F2EB]">{act.title}</div>
                    <div className="text-[11px] text-[#7A7063] mt-0.5">{act.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Goal Selector */}
          <section className="app-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DFB271]">
              <Sparkles size={15} />
              2. Primary Nutritional Objective
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = primaryGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setPrimaryGoal(g.id)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all relative ${
                      isSelected
                        ? "border-[#E07A38] bg-[#E07A38]/10 shadow-[0_4px_20px_rgba(224,122,56,0.15)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F7F2EB]">{g.label}</span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${g.accent}20`,
                          color: g.accent,
                          border: `1px solid ${g.accent}40`,
                        }}
                      >
                        {g.badge}
                      </span>
                    </div>
                    <div className="text-xs text-[#DFB271] mt-1 font-medium">{g.tagline}</div>
                    <p className="text-[11px] text-[#8F8578] mt-1.5 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Live Physiological Feedback & BMI Card */}
        <div className="space-y-6">
          {/* BMI Card */}
          <div className="app-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#A39788]">Body Mass Index</span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: `${bmiAnalysis.color}20`,
                  color: bmiAnalysis.color,
                  border: `1px solid ${bmiAnalysis.color}40`,
                }}
              >
                {bmiAnalysis.category}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-[#F7F2EB]">{bmiAnalysis.bmi}</span>
              <span className="text-xs text-[#7A7063]">kg / m²</span>
            </div>

            {/* Visual scale */}
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                <div className="w-[18.5%] bg-[#DFB271]" title="Underweight (<18.5)" />
                <div className="w-[25%] bg-[#8FA989]" title="Normal (18.5 - 24.9)" />
                <div className="w-[20%] bg-[#E59E6B]" title="Overweight (25 - 29.9)" />
                <div className="w-[36.5%] bg-[#E07A38]" title="Obesity (>30)" />
              </div>
              <div className="flex justify-between text-[10px] text-[#7A7063]">
                <span>18.5</span>
                <span>25.0</span>
                <span>30.0</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-[#A39788]">
              Healthy Weight Window for {heightCm} cm:
              <div className="font-semibold text-[#F7F2EB] mt-0.5">
                {bmiAnalysis.healthyWeightRangeKg.min} kg – {bmiAnalysis.healthyWeightRangeKg.max} kg
              </div>
            </div>
          </div>

          {/* Daily Energy & Macro Target Card */}
          <div className="app-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#A39788]">Daily Calorie Budget</span>
              <Flame size={15} className="text-[#E07A38]" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-[#E07A38]">
                {currentPlan.targetCalories.toLocaleString()}
              </span>
              <span className="text-xs text-[#7A7063]">kcal / day</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-y border-white/10 py-3">
              <div>
                <span className="text-[11px] text-[#7A7063]">BMR (At Rest)</span>
                <div className="font-semibold text-[#F7F2EB]">{currentPlan.bmr} kcal</div>
              </div>
              <div>
                <span className="text-[11px] text-[#7A7063]">TDEE (Maintenance)</span>
                <div className="font-semibold text-[#F7F2EB]">{currentPlan.tdee} kcal</div>
              </div>
            </div>

            {/* Macro Distribution */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DFB271]">
                Macronutrient Target Split
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#E07A38] font-medium">Protein (4 kcal/g)</span>
                  <span className="font-semibold text-[#F7F2EB]">
                    {currentPlan.macros.proteinG} g ({currentPlan.macros.percentages.protein}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#E07A38] rounded-full"
                    style={{ width: `${currentPlan.macros.percentages.protein}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#DFB271] font-medium">Carbohydrates (4 kcal/g)</span>
                  <span className="font-semibold text-[#F7F2EB]">
                    {currentPlan.macros.carbsG} g ({currentPlan.macros.percentages.carbs}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#DFB271] rounded-full"
                    style={{ width: `${currentPlan.macros.percentages.carbs}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8FA989] font-medium">Dietary Fat (9 kcal/g)</span>
                  <span className="font-semibold text-[#F7F2EB]">
                    {currentPlan.macros.fatG} g ({currentPlan.macros.percentages.fat}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#8FA989] rounded-full"
                    style={{ width: `${currentPlan.macros.percentages.fat}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2 text-[#A39788]">
                <span>Dietary Fibre Goal:</span>
                <span className="font-semibold text-[#F7F2EB]">{currentPlan.macros.fibreG} g / day</span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#A39788]">
                <span className="flex items-center gap-1">
                  <Droplets size={13} className="text-[#8FA989]" /> Hydration Target:
                </span>
                <span className="font-semibold text-[#F7F2EB]">{currentPlan.waterIntakeLiters} L / day</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn btn-gold w-full text-sm font-semibold"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            Synchronize Nutritional Architecture
          </button>
        </div>
      </div>

      {/* Micronutrients Section: Real Nutrition Science */}
      <section className="app-card p-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8FA989]">
            <Heart size={15} />
            3. Essential Micronutrient Reference Values (DRVs)
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F7F2EB] mt-1">
            Vitamins, Minerals &amp; Cellular Electrolytes
          </h2>
          <p className="text-xs text-[#A39788] mt-1">
            Recommended dietary allowances calibrated for optimal hormonal balance, immune readiness, and cellular recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {currentPlan.micros.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F7F2EB]">{m.name}</span>
                  <span className="rounded-full px-2 py-0.5 text-[9px] bg-white/5 font-mono text-[#DFB271]">
                    {m.category}
                  </span>
                </div>
                <div className="font-display text-2xl font-bold text-[#DFB271] mt-2">
                  {m.target} <span className="text-xs font-sans font-normal text-[#8F8578]">{m.unit}</span>
                </div>
                <p className="text-[11px] text-[#A39788] mt-1 leading-normal">{m.benefits}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5">
                <span className="text-[10px] uppercase font-semibold text-[#7A7063] tracking-wider">Top Sources</span>
                <div className="text-[11px] text-[#C1D6BD] mt-0.5">
                  {m.keySources.slice(0, 3).join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
