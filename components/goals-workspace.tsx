"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Check, Flame, Loader2, Sparkles, Target, Zap } from "lucide-react";

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

const GOALS = [
  { id: "fat_loss", label: "Fat Loss", desc: "-20% caloric deficit, high protein (2.0 g/kg)", badge: "Cut" },
  { id: "lean_bulk", label: "Lean Bulk", desc: "+10% caloric surplus, steady hypertrophy (1.8 g/kg)", badge: "Hypertrophy" },
  { id: "bulk", label: "Aggressive Bulk", desc: "+18% caloric surplus, maximum muscle mass gain", badge: "Mass" },
  { id: "dirty_bulk", label: "Dirty Bulk (Preference)", desc: "+25% surplus with unrestricted caloric density. Note: Higher adipose gain and lipid volatility.", badge: "Trade-off Note", warning: true },
  { id: "maintenance", label: "Maintenance", desc: "100% TDEE equilibrium, balanced daily nutrition", badge: "Equilibrium" },
  { id: "recomposition", label: "Recomposition", desc: "-5% deficit on rest days, +5% surplus on workout days", badge: "Body Recomp" },
  { id: "athletic_performance", label: "Athletic Performance", desc: "High carbohydrate fueling (4-6 g/kg), rapid glycogen recovery", badge: "Endurance" },
  { id: "general_health", label: "General Health", desc: "Cardiometabolic longevity, high micronutrient & dietary fibre density", badge: "Longevity" },
];

export function GoalsWorkspace({ initialGoals, initialProfile, initialTargets }: GoalWorkspaceProps) {
  const router = useRouter();
  const [primaryGoal, setPrimaryGoal] = useState(initialGoals.primary_goal || "lean_bulk");
  const [gender, setGender] = useState(initialProfile.gender || "male");
  const [weightKg, setWeightKg] = useState(initialProfile.weight_kg || 75.0);
  const [heightCm, setHeightCm] = useState(initialProfile.height_cm || 178.0);
  const [age, setAge] = useState(initialProfile.age || 28);
  const [activity, setActivity] = useState(initialProfile.activity_level || "moderate");

  const [targets, setTargets] = useState(initialTargets);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Overrides
  const [overrideCalories, setOverrideCalories] = useState<number | "">(initialTargets.target_calories_kcal || 2000);
  const [overrideProtein, setOverrideProtein] = useState<number | "">(initialTargets.target_protein_g || 140);

  async function handleRecalculate() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/goals/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender,
          weight_kg: Number(weightKg),
          height_cm: Number(heightCm),
          age: Number(age),
          activity_level: activity,
          goal: primaryGoal,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTargets(data);
        setOverrideCalories(data.target_calories_kcal);
        setOverrideProtein(data.target_protein_g);
        setMessage({ type: "success", text: "Metabolic targets calculated via Mifflin-St Jeor engine." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to recalculate targets." });
    } finally {
      setSaving(false);
    }
  }

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
          version: initialGoals.version,
        }),
      });

      // 2. Update profile biometrics
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender,
          weight_kg: Number(weightKg),
          height_cm: Number(heightCm),
          age: Number(age),
          activity_level: activity,
          version: initialProfile.version,
        }),
      });

      // 3. Update target overrides
      await fetch("/api/nutrition/targets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_calories_kcal: Number(overrideCalories),
          target_protein_g: Number(overrideProtein),
          version: initialTargets.version,
        }),
      });

      setMessage({ type: "success", text: "Goals, biometrics, and target overrides saved successfully!" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Failed to save goals." });
    } finally {
      setSaving(false);
    }
  }

  // Safety bounds check (§5.7)
  const floorCalories = gender === "male" ? 1500 : 1200;
  const isBelowFloor = Number(overrideCalories) < floorCalories;
  const isHighSurplus = targets.tdee_kcal && Number(overrideCalories) > targets.tdee_kcal * 1.25;

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      {/* 8 Goal Protocol Selection Cards */}
      <div className="w-full">
        <div className="mb-3 text-[0.62rem] uppercase tracking-wider text-[#E8B56A] font-semibold">
          Select Your Active Protocol
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GOALS.map((g) => {
            const isSelected = primaryGoal === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setPrimaryGoal(g.id)}
                className={`flex flex-col text-left rounded-xl p-3.5 transition-all border ${
                  isSelected
                    ? "border-[#E8B56A] bg-[rgba(232,181,106,.12)] shadow-lg"
                    : "border-white/5 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wider font-semibold ${
                      g.warning
                        ? "bg-amber-500/20 text-amber-300"
                        : isSelected
                        ? "bg-[#E8B56A] text-[#080808]"
                        : "bg-white/10 text-[#A79C8D]"
                    }`}
                  >
                    {g.badge}
                  </span>
                  {isSelected && <Check size={14} className="text-[#E8B56A]" />}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-[#F6EFE4]">{g.label}</h3>
                <p className="mt-1 text-xs text-[#B3A798] leading-relaxed flex-1">{g.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Biometrics & Target Overrides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Biometrics */}
        <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-4 sm:p-6 space-y-4 w-full">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#F6EFE4]">
            <Target size={16} className="text-[#E8B56A]" />
            Your Physical Biometrics
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label" htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="field"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="age">Age (years)</label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="field"
              />
            </div>
            <div>
              <label className="label" htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="field"
              />
            </div>
            <div>
              <label className="label" htmlFor="height">Height (cm)</label>
              <input
                id="height"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="field"
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="activity">Activity Multiplier</label>
            <select
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="field"
            >
              <option value="sedentary">Sedentary (desk job, 1.2x)</option>
              <option value="light">Light Activity (1-3 days/wk, 1.375x)</option>
              <option value="moderate">Moderate Activity (3-5 days/wk, 1.55x)</option>
              <option value="very_active">Very Active (6-7 days/wk, 1.725x)</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleRecalculate}
            disabled={saving}
            className="btn btn-ghost w-full text-xs"
          >
            <Zap size={14} className="text-[#E8B56A]" /> Recalculate BMR & TDEE
          </button>
        </div>

        {/* Calculated Targets & Overrides */}
        <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-4 sm:p-6 space-y-4 w-full">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#F6EFE4]">
            <Target size={16} className="text-[#E8B56A]" />
            Your Physical Biometrics
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="field"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="age">Age (years)</label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="field"
              />
            </div>
            <div>
              <label className="label" htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="field"
              />
            </div>
            <div>
              <label className="label" htmlFor="height">Height (cm)</label>
              <input
                id="height"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="field"
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="activity">Activity Multiplier</label>
            <select
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="field"
            >
              <option value="sedentary">Sedentary (desk job, 1.2x)</option>
              <option value="light">Light Activity (1-3 days/wk, 1.375x)</option>
              <option value="moderate">Moderate Activity (3-5 days/wk, 1.55x)</option>
              <option value="very_active">Very Active (6-7 days/wk, 1.725x)</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleRecalculate}
            disabled={saving}
            className="btn btn-ghost w-full text-xs"
          >
            <Zap size={14} className="text-[#E8B56A]" /> Recalculate BMR & TDEE
          </button>
        </div>

        {/* Calculated Targets & Overrides */}
        <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#F6EFE4]">
            <Flame size={16} className="text-[#FF8A32]" />
            Metabolic Target Overrides (§5.7)
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-[#756D62] uppercase text-[0.55rem]">Calculated BMR</span>
              <div className="font-display text-lg text-[#F6EFE4]">
                {targets.bmr_kcal ? Math.round(targets.bmr_kcal) : "—"} kcal
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-[#756D62] uppercase text-[0.55rem]">Estimated TDEE</span>
              <div className="font-display text-lg text-[#F6EFE4]">
                {targets.tdee_kcal ? Math.round(targets.tdee_kcal) : "—"} kcal
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="label !mb-0" htmlFor="ov-cal">Target Daily Calories (kcal)</label>
                <span className="text-[0.6rem] text-[#756D62]">Floor: {floorCalories} kcal</span>
              </div>
              <input
                id="ov-cal"
                type="number"
                value={overrideCalories}
                onChange={(e) => setOverrideCalories(Number(e.target.value))}
                className="field"
              />
            </div>

            <div>
              <label className="label" htmlFor="ov-pro">Target Daily Protein (g)</label>
              <input
                id="ov-pro"
                type="number"
                value={overrideProtein}
                onChange={(e) => setOverrideProtein(Number(e.target.value))}
                className="field"
              />
            </div>
          </div>

          {/* Safety Bounds Warning */}
          {(isBelowFloor || isHighSurplus) && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-start gap-2">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <div>
                <strong>Safety Bounds Advisory (§5.7):</strong>{" "}
                {isBelowFloor && `Target calories are below physiological minimum (${floorCalories} kcal). `}
                {isHighSurplus && "Target surplus exceeds +25% of baseline TDEE."}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn btn-gold w-full mt-4"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
            Commit Goal & Target Configuration
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-xl border p-4 text-xs ${
            message.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
