"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Check,
  Flame,
  Gauge,
  Loader2,
  Ruler,
  Scale,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import {
  ACTIVITY_LABELS,
  GOAL_ORDER,
  GOAL_SPECS,
  computeNutritionTargets,
} from "@/lib/goals";
import type { ActivityLevel, GoalId, NutritionTargets } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";
import { ConsumptionRings } from "@/components/app/consumption-rings";

type ProfileInput = {
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  sex: string;
  activityLevel: string;
};

const DEFAULT_PROFILE: ProfileInput = {
  age: 26,
  heightCm: 175,
  weightKg: 70,
  targetWeightKg: 70,
  sex: "male",
  activityLevel: "moderate",
};

const MACROS = [
  { key: "protein", label: "Protein", color: "#FF8A32", kcalPerGram: 4 },
  { key: "carbs", label: "Carbohydrate", color: "#E8B56A", kcalPerGram: 4 },
  { key: "fat", label: "Fat", color: "#9C7A4E", kcalPerGram: 9 },
] as const;

export function NutritionStudio({
  initialTargets,
  profile,
  goalId,
  consumed,
  loggedMeals,
  dateLabel,
}: {
  initialTargets: NutritionTargets | null;
  profile: ProfileInput | null;
  goalId: GoalId;
  consumed: { calories: number; protein: number; carbs: number; fat: number };
  loggedMeals: number;
  dateLabel: string;
}) {
  const router = useRouter();
  const source = profile ?? DEFAULT_PROFILE;
  const [goal, setGoal] = useState<GoalId>(goalId);
  const [sex, setSex] = useState(source.sex === "female" ? "female" : "male");
  const [age, setAge] = useState(String(source.age));
  const [heightCm, setHeightCm] = useState(String(source.heightCm));
  const [weightKg, setWeightKg] = useState(String(source.weightKg));
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    (source.activityLevel as ActivityLevel) in ACTIVITY_LABELS
      ? (source.activityLevel as ActivityLevel)
      : "moderate",
  );
  const [savedTargets, setSavedTargets] = useState<NutritionTargets | null>(initialTargets);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  const numbers = useMemo(() => {
    return {
      age: clampNumber(Number(age), 14, 100, DEFAULT_PROFILE.age),
      heightCm: clampNumber(Number(heightCm), 120, 250, DEFAULT_PROFILE.heightCm),
      weightKg: clampNumber(Number(weightKg), 35, 300, DEFAULT_PROFILE.weightKg),
    };
  }, [age, heightCm, weightKg]);

  const preview = useMemo(
    () =>
      computeNutritionTargets(
        numbers.weightKg,
        numbers.heightCm,
        numbers.age,
        sex,
        activityLevel,
        goal,
      ),
    [numbers, sex, activityLevel, goal],
  );

  const dirty =
    !savedTargets ||
    Math.round(savedTargets.targetCalories) !== preview.targetCalories ||
    savedTargets.targetProteinG !== preview.targetProteinG ||
    savedTargets.targetCarbsG !== preview.targetCarbsG ||
    savedTargets.targetFatG !== preview.targetFatG;

  const spec = GOAL_SPECS[goal];
  const delta = preview.targetCalories - preview.tdee;
  const multiplier = preview.bmr > 0 ? preview.tdee / preview.bmr : 0;

  const macroEnergy = {
    protein: preview.targetProteinG * 4,
    carbs: preview.targetCarbsG * 4,
    fat: preview.targetFatG * 9,
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/nutrition/targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          sex,
          age: numbers.age,
          weightKg: numbers.weightKg,
          heightCm: numbers.heightCm,
          activityLevel,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage({ type: "error", text: data.error ?? "Unable to save targets." });
        return;
      }
      setSavedTargets(data.targets as NutritionTargets);
      setMessage({ type: "ok", text: "Protocol saved. Dashboard and planner are now aligned." });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Network unavailable." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow mb-2.5">Metabolic engine</div>
          <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            Your biology,{" "}
            <span className="italic text-gold-gradient">translated.</span>
          </h1>
          <p className="mt-2.5 max-w-[660px] text-[0.78rem] leading-6 text-[#8F8373]">
            Mifflin-St Jeor resting energy, activity-adjusted TDEE, then a goal
            protocol that redistributes protein, carbohydrate and fat. Every
            figure is recomputed live — nothing is hardcoded.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-gold">
            <Gauge size={10} /> {spec.name} protocol
          </span>
          <span className={cn("chip", dirty ? "chip-orange" : "chip-sage")}>
            {dirty ? <Sparkles size={10} /> : <Check size={10} />}
            {dirty ? "Unsaved estimate" : "Saved"}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="min-w-0 space-y-5">
          <section className="app-card relative overflow-hidden p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,138,50,.14),transparent_70%)] blur-2xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <MacroDonut targets={preview} />
              <div className="min-w-0 flex-1">
                <div className="text-[0.48rem] uppercase tracking-[0.2em] text-[#756D62]">
                  Daily energy target
                </div>
                <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
                  <span className="font-display text-[clamp(3rem,7vw,4.6rem)] leading-[0.85] text-gold-gradient tabular-nums">
                    {formatNumber(preview.targetCalories)}
                  </span>
                  <span className="mb-1 text-[0.58rem] uppercase tracking-[0.18em] text-[#8B7E6D]">
                    kcal / day
                  </span>
                </div>
                <p className="mt-2 max-w-[420px] text-[0.7rem] leading-5 text-[#A79C8D]">
                  {spec.rationale}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <MiniStat label="BMR" value={formatNumber(preview.bmr)} unit="kcal" />
                  <MiniStat label="TDEE" value={formatNumber(preview.tdee)} unit="kcal" />
                  <MiniStat
                    label="Goal delta"
                    value={`${delta > 0 ? "+" : ""}${formatNumber(delta)}`}
                    unit="kcal"
                    accent={delta > 0 ? "#FF8A32" : delta < 0 ? "#8FA989" : undefined}
                  />
                  <MiniStat label="Fibre" value={formatNumber(preview.targetFibreG)} unit="g" />
                </div>
              </div>
            </div>
          </section>

          <section className="app-card p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#FF8A32]" />
                <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
                  Biometric inputs
                </h2>
              </div>
              <span className="text-[0.48rem] uppercase tracking-[0.14em] text-[#5F574D]">
                {ACTIVITY_LABELS[activityLevel]}
              </span>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="label" htmlFor="sex">
                    Biological sex
                  </label>
                  <div className="grid grid-cols-2 gap-1 rounded-full border border-[rgba(232,181,106,.14)] bg-white/[0.018] p-1">
                    {(["male", "female"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSex(option)}
                        className={cn(
                          "rounded-full px-2 py-2 text-[0.56rem] uppercase tracking-[0.1em] transition-colors",
                          sex === option
                            ? "bg-[rgba(255,138,50,.16)] text-[#FFD2A8]"
                            : "text-[#756D62] hover:text-[#D9C7AE]",
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="age">
                    Age
                  </label>
                  <div className="relative">
                    <UserRound
                      size={12}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6F665B]"
                    />
                    <input
                      id="age"
                      className="field !pl-8"
                      type="number"
                      min="14"
                      max="100"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="activity">
                    Activity
                  </label>
                  <select
                    id="activity"
                    className="field"
                    value={activityLevel}
                    onChange={(event) =>
                      setActivityLevel(event.target.value as ActivityLevel)
                    }
                  >
                    {Object.entries(ACTIVITY_LABELS).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label.split(" — ")[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="weight">
                    Weight · kg
                  </label>
                  <div className="relative">
                    <Scale
                      size={12}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6F665B]"
                    />
                    <input
                      id="weight"
                      className="field !pl-8"
                      type="number"
                      min="35"
                      max="300"
                      step="0.1"
                      value={weightKg}
                      onChange={(event) => setWeightKg(event.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="height">
                    Height · cm
                  </label>
                  <div className="relative">
                    <Ruler
                      size={12}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6F665B]"
                    />
                    <input
                      id="height"
                      className="field !pl-8"
                      type="number"
                      min="120"
                      max="250"
                      step="0.1"
                      value={heightCm}
                      onChange={(event) => setHeightCm(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <span className="label">Goal protocol</span>
                <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {GOAL_ORDER.map((id) => {
                    const option = GOAL_SPECS[id];
                    const selected = goal === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setGoal(id)}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-left transition-all",
                          selected
                            ? "border-[rgba(255,138,50,.38)] bg-[rgba(255,138,50,.075)]"
                            : "border-[rgba(232,181,106,.11)] bg-white/[0.012] hover:border-[rgba(232,181,106,.28)]",
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              "text-[0.66rem] font-medium",
                              selected ? "text-[#FFD2A8]" : "text-[#D9C7AE]",
                            )}
                          >
                            {option.name}
                          </span>
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: option.accent }}
                          />
                        </div>
                        <div className="mt-0.5 text-[0.46rem] uppercase tracking-[0.06em] text-[#6F665B]">
                          {option.delta === 0
                            ? "isocaloric"
                            : `${option.delta > 0 ? "+" : ""}${option.delta} kcal`}{" "}
                          · {option.proteinPerKg} g/kg
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-[rgba(232,181,106,.1)] pt-4">
                <button type="submit" disabled={saving} className="btn btn-gold btn-sm">
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Flame size={13} />}
                  Save protocol
                </button>
                <span className="text-[0.52rem] text-[#756D62]">
                  {dirty
                    ? "Preview updates instantly. Save to sync planner and dashboard."
                    : "Targets are synced across every workspace view."}
                </span>
              </div>

              {message && (
                <div
                  className={cn(
                    "flex items-start gap-2 rounded-lg border px-3 py-2 text-[0.62rem]",
                    message.type === "ok"
                      ? "border-[rgba(143,169,137,.25)] bg-[rgba(143,169,137,.06)] text-[#B8CCB3]"
                      : "border-[rgba(226,112,90,.28)] bg-[rgba(226,112,90,.06)] text-[#E9A091]",
                  )}
                >
                  {message.type === "ok" ? (
                    <Check size={12} className="mt-0.5" />
                  ) : (
                    <X size={12} className="mt-0.5" />
                  )}
                  {message.text}
                </div>
              )}
            </form>
          </section>
        </div>

        <aside className="min-w-0 space-y-5">
          <section className="app-card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
                Today vs target
              </h2>
              <span className="text-[0.48rem] uppercase tracking-[0.12em] text-[#5F574D]">
                {dateLabel} · {loggedMeals} meals
              </span>
            </div>
            <ConsumptionRings consumed={consumed} targets={preview} />
            {loggedMeals === 0 && (
              <p className="mt-3 rounded-lg border border-dashed border-[rgba(232,181,106,.16)] px-3 py-2 text-[0.56rem] leading-4 text-[#756D62]">
                Nothing logged yet. Assign meals in the planner to watch these rings fill.
              </p>
            )}
          </section>

          <section className="app-card p-4 sm:p-5">
            <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
              Energy architecture
            </h2>
            <div className="mt-3 space-y-2.5">
              <LadderRow
                label="Resting metabolism"
                sub="Mifflin-St Jeor"
                value={formatNumber(preview.bmr)}
                unit="kcal"
              />
              <LadderRow
                label="Activity multiplier"
                sub={ACTIVITY_LABELS[activityLevel].split(" — ")[0]}
                value={`× ${multiplier.toFixed(3)}`}
                accent="#C9A15C"
              />
              <LadderRow
                label="Maintenance (TDEE)"
                sub="BMR × activity"
                value={formatNumber(preview.tdee)}
                unit="kcal"
              />
              <LadderRow
                label={`${spec.name} adjustment`}
                sub={delta >= 0 ? "surplus / balance" : "controlled deficit"}
                value={`${delta > 0 ? "+" : ""}${formatNumber(delta)}`}
                unit="kcal"
                accent={spec.accent}
              />
              <div className="flex items-center justify-between rounded-lg border border-[rgba(232,181,106,.2)] bg-[rgba(232,181,106,.045)] px-3 py-2.5">
                <span className="text-[0.52rem] uppercase tracking-[0.14em] text-[#C9B79F]">
                  Final target
                </span>
                <span className="font-display text-xl leading-none text-[#F3D3A1] tabular-nums">
                  {formatNumber(preview.targetCalories)}{" "}
                  <span className="text-[0.48rem] uppercase tracking-[0.1em] text-[#8B7E6D]">
                    kcal
                  </span>
                </span>
              </div>
            </div>
          </section>

          <section className="app-card p-4 sm:p-5">
            <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
              Macro ledger
            </h2>
            <div className="mt-3 space-y-2">
              {MACROS.map((macro) => {
                const grams =
                  macro.key === "protein"
                    ? preview.targetProteinG
                    : macro.key === "carbs"
                      ? preview.targetCarbsG
                      : preview.targetFatG;
                const percent = preview.macroDistributionPct[macro.key];
                const energy = macroEnergy[macro.key];
                return (
                  <div
                    key={macro.key}
                    className="rounded-xl border border-[rgba(232,181,106,.1)] bg-white/[0.014] px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[0.62rem] text-[#D9C7AE]">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: macro.color }}
                        />
                        {macro.label}
                      </span>
                      <span className="text-[0.56rem] tabular-nums text-[#8B7E6D]">
                        {percent}% energy
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-end justify-between">
                      <span className="font-display text-[1.5rem] leading-none text-[#F3D3A1] tabular-nums">
                        {formatNumber(grams)}
                        <span className="ml-1 text-[0.48rem] uppercase tracking-[0.1em] text-[#756D62]">
                          g
                        </span>
                      </span>
                      <span className="text-[0.48rem] text-[#6F665B]">
                        {formatNumber(energy)} kcal · {macro.kcalPerGram} kcal/g
                      </span>
                    </div>
                    <div className="mt-1.5 progress-track h-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(percent, 100)}%`,
                          background: `linear-gradient(90deg, ${macro.color}66, ${macro.color})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <p className="px-1 text-[0.5rem] leading-4 text-[#5F574D]">
            {preview.disclaimer} Protocol maths: composite of BMR × activity, goal
            delta, and protein-per-kilogram allocation. Protein is anchored first;
            fat or carbohydrate absorbs the remaining energy depending on the
            selected goal.
          </p>
        </aside>
      </div>
    </div>
  );
}

function MacroDonut({ targets }: { targets: NutritionTargets }) {
  const pct = targets.macroDistributionPct;
  const protein = Math.max(0, pct.protein);
  const carbs = Math.max(0, pct.carbs);
  const fat = Math.max(0, pct.fat);
  const proteinEnd = protein;
  const carbsEnd = protein + carbs;
  const gradient = `conic-gradient(#FF8A32 0% ${proteinEnd}%, #E8B56A ${proteinEnd}% ${carbsEnd}%, #9C7A4E ${carbsEnd}% 100%)`;

  return (
    <div className="relative mx-auto grid h-[190px] w-[190px] shrink-0 place-items-center sm:mx-0">
      <div className="absolute inset-0 rounded-full opacity-40 blur-2xl" style={{ background: gradient }} />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: gradient,
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 22px), #000 calc(100% - 21px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 22px), #000 calc(100% - 21px))",
        }}
      />
      <div className="absolute inset-[26px] rounded-full border border-[rgba(232,181,106,.14)] bg-[radial-gradient(circle_at_50%_20%,rgba(255,138,50,.08),rgba(8,8,8,.94)_70%)]" />
      <div className="relative text-center">
        <div className="text-[0.42rem] uppercase tracking-[0.18em] text-[#756D62]">
          Macro split
        </div>
        <div className="mt-1 font-display text-[2.1rem] leading-none text-[#F3D3A1]">
          {Math.round(protein + carbs + fat)}
          <span className="text-lg">%</span>
        </div>
        <div className="mt-1 flex items-center justify-center gap-1.5 text-[0.4rem] uppercase tracking-[0.08em]">
          <span className="text-[#FF8A32]">P {protein}</span>
          <span className="text-[#E8B56A]">C {carbs}</span>
          <span className="text-[#9C7A4E]">F {fat}</span>
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-[rgba(232,181,106,.1)] bg-white/[0.014] px-2.5 py-2">
      <div className="text-[0.42rem] uppercase tracking-[0.12em] text-[#6F665B]">{label}</div>
      <div
        className="mt-1 font-display text-[1.2rem] leading-none tabular-nums"
        style={{ color: accent ?? "#EDE4D6" }}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[0.4rem] uppercase tracking-[0.1em] text-[#5F574D]">{unit}</div>
    </div>
  );
}

function LadderRow({
  label,
  sub,
  value,
  unit,
  accent,
}: {
  label: string;
  sub: string;
  value: string;
  unit?: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-[rgba(232,181,106,.08)] bg-white/[0.012] px-3 py-2">
      <div className="min-w-0">
        <div className="truncate text-[0.6rem] text-[#C9B79F]">{label}</div>
        <div className="truncate text-[0.44rem] uppercase tracking-[0.08em] text-[#5F574D]">
          {sub}
        </div>
      </div>
      <div className="flex shrink-0 items-baseline gap-1">
        <span
          className="font-display text-[1.15rem] leading-none tabular-nums"
          style={{ color: accent ?? "#EDE4D6" }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-[0.4rem] uppercase tracking-[0.1em] text-[#5F574D]">{unit}</span>
        )}
      </div>
    </div>
  );
}

function clampNumber(value: number, min: number, max: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(Math.max(value, min), max);
}
