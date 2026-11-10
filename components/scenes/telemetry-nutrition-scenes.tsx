"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, CircleDot, Radar, ScanLine } from "lucide-react";
import { GOAL_ORDER, GOAL_SPECS, computeNutritionTargets } from "@/lib/goals";
import { formatNumber } from "@/lib/utils";

const DETECTIONS = [
  { name: "Turmeric", category: "Spices", compound: "curcumin", confidence: 99.1, color: "#E9A23B" },
  { name: "Cumin", category: "Spices", compound: "cuminaldehyde", confidence: 98.4, color: "#C58B53" },
  { name: "Black pepper", category: "Spices", compound: "piperine", confidence: 97.8, color: "#A88B6B" },
  { name: "Cloves", category: "Spices", compound: "eugenol", confidence: 96.2, color: "#D9784A" },
  { name: "Garlic", category: "Vegetables", compound: "allicin", confidence: 98.9, color: "#C7B88E" },
  { name: "Tomato", category: "Vegetables", compound: "glutamic acid", confidence: 99.2, color: "#D46644" },
];

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);
  return value;
}

export function PantryTelemetryScene({
  ingredientCount,
  compoundCount,
}: {
  ingredientCount: number;
  compoundCount: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const count = useCountUp(14, inView, 1400);
  const linkCount = useCountUp(compoundCount, inView, 1700);
  const confidence = useCountUp(97.4, inView, 1600);

  return (
    <div ref={ref} className="relative" data-reveal>
      <div className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_70%_30%,rgba(255,138,50,.1),transparent_60%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[24px] border border-[rgba(232,181,106,.18)] bg-[linear-gradient(155deg,rgba(28,24,19,.86),rgba(9,8,7,.94))]">
        <div className="flex items-center justify-between border-b border-[rgba(232,181,106,.12)] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#FF8A32]/60" />
              <span className="relative h-2 w-2 rounded-full bg-[#FF8A32]" />
            </span>
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#D9C7AE]">
              Pantry accumulator
            </span>
          </div>
          <span className="chip chip-gold !py-1 text-[0.52rem]">
            <Radar size={10} /> Live scan
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-[0.82fr_1.18fr]">
          <div className="relative flex min-h-[180px] flex-col justify-between rounded-2xl border border-[rgba(232,181,106,.12)] bg-[radial-gradient(circle_at_50%_35%,rgba(255,138,50,.09),transparent_65%)] p-4">
            <div className="mx-auto mt-1 grid h-[92px] w-[92px] place-items-center rounded-full border border-[rgba(232,181,106,.22)]">
              <div className="absolute h-[92px] w-[92px] animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-[rgba(255,138,50,.3)]" />
              <div className="text-center">
                <div className="font-display text-[2.6rem] leading-none text-[#F3D3A1] tabular-nums">
                  {Math.round(count)}
                </div>
                <div className="mt-1 text-[0.46rem] uppercase tracking-[0.19em] text-[#8B7E6D]">
                  signals
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg border border-[rgba(232,181,106,.1)] bg-white/[0.02] px-2 py-2">
                <div className="font-display text-lg text-[#E8B56A] tabular-nums">
                  {Math.round(linkCount)}
                </div>
                <div className="text-[0.44rem] uppercase tracking-[0.13em] text-[#6F665B]">
                  aroma links
                </div>
              </div>
              <div className="rounded-lg border border-[rgba(232,181,106,.1)] bg-white/[0.02] px-2 py-2">
                <div className="font-display text-lg text-[#E8B56A] tabular-nums">
                  {ingredientCount}
                </div>
                <div className="text-[0.44rem] uppercase tracking-[0.13em] text-[#6F665B]">
                  ontology
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[0.5rem] uppercase tracking-[0.2em] text-[#756D62]">
                Detected this session
              </span>
              <span className="text-[0.5rem] tabular-nums text-[#8B7E6D]">
                confidence {confidence.toFixed(1)}%
              </span>
            </div>
            <div className="space-y-2.5">
              {DETECTIONS.map((row, index) => (
                <div key={row.name} className="group">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: row.color }}
                      />
                      <span className="text-[0.66rem] text-[#D9C7AE]">{row.name}</span>
                      <span className="hidden text-[0.48rem] uppercase tracking-[0.12em] text-[#5F574D] sm:inline">
                        {row.compound}
                      </span>
                    </div>
                    <span className="text-[0.56rem] tabular-nums text-[#A79C8D]">
                      {row.confidence}%
                    </span>
                  </div>
                  <div className="progress-track h-[3px]">
                    <div
                      className="h-full rounded-full transition-[width] duration-[1200ms] ease-out"
                      style={{
                        width: inView ? `${row.confidence}%` : "0%",
                        background: `linear-gradient(90deg, ${row.color}77, ${row.color})`,
                        transitionDelay: `${index * 90}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-[rgba(232,181,106,.1)] pt-3 text-[0.54rem] uppercase tracking-[0.12em] text-[#6F665B]">
              <ScanLine size={11} className="text-[#FF8A32]" />
              8 further signals held in the accumulator
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(232,181,106,.1)] px-5 py-3 text-[0.5rem] uppercase tracking-[0.16em] text-[#5F574D]">
          <span className="flex items-center gap-1.5">
            <CircleDot size={9} /> Molecular deduplication active
          </span>
          <span>Confidence floor 0.86</span>
          <span>Manual override ready</span>
        </div>
      </div>
    </div>
  );
}

function Donut({
  segments,
  active,
}: {
  segments: Array<{ value: number; color: string; label: string }>;
  active: boolean;
}) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg viewBox="0 0 140 140" className="h-[172px] w-[172px] -rotate-90">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,.055)" strokeWidth="11" />
      {segments.map((segment) => {
        const length = (segment.value / 100) * circumference;
        const dash = active ? length : 0;
        const currentOffset = -offset;
        offset += length;
        return (
          <circle
            key={segment.label}
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            strokeDashoffset={currentOffset}
            style={{ transition: "stroke-dasharray 1.4s cubic-bezier(.2,.8,.2,1)" }}
          />
        );
      })}
    </svg>
  );
}

export function NutritionDashboardScene() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const targets = computeNutritionTargets(74, 178, 26, "male", "active", "lean_bulk");
  const calorieCount = useCountUp(targets.targetCalories, inView, 1600);
  const macros = [
    { label: "Protein", grams: targets.targetProteinG, value: targets.macroDistributionPct.protein, color: "#FF8A32" },
    { label: "Carbs", grams: targets.targetCarbsG, value: targets.macroDistributionPct.carbs, color: "#E8B56A" },
    { label: "Fat", grams: targets.targetFatG, value: targets.macroDistributionPct.fat, color: "#9C7A4E" },
  ];

  return (
    <div ref={ref} className="relative" data-reveal>
      <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_40%_30%,rgba(232,181,106,.09),transparent_65%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[24px] border border-[rgba(232,181,106,.18)] bg-[linear-gradient(155deg,rgba(28,24,19,.82),rgba(9,8,7,.95))]">
        <div className="flex items-center justify-between border-b border-[rgba(232,181,106,.12)] px-5 py-4">
          <div className="flex items-center gap-2">
            <Activity size={13} className="text-[#FF8A32]" />
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#D9C7AE]">
              Metabolic translation
            </span>
          </div>
          <span className="text-[0.5rem] uppercase tracking-[0.16em] text-[#6F665B]">
            demo profile · 74 kg · active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-[1.02fr_0.98fr] sm:items-center">
          <div className="flex flex-col items-center">
            <div className="relative grid place-items-center">
              <Donut
                active={inView}
                segments={macros.map((macro) => ({ value: macro.value, color: macro.color, label: macro.label }))}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[0.45rem] uppercase tracking-[0.22em] text-[#756D62]">
                  Lean bulk target
                </span>
                <span className="mt-1 font-display text-[2.35rem] leading-none text-[#F3D3A1] tabular-nums">
                  {formatNumber(calorieCount)}
                </span>
                <span className="mt-1 text-[0.48rem] uppercase tracking-[0.18em] text-[#8B7E6D]">
                  kcal / day
                </span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3 text-[0.48rem] uppercase tracking-[0.13em] text-[#6F665B]">
              <span>BMR {formatNumber(targets.bmr)}</span>
              <span className="h-2.5 w-px bg-white/10" />
              <span className="text-[#A79C8D]">TDEE {formatNumber(targets.tdee)}</span>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="text-[0.48rem] uppercase tracking-[0.18em] text-[#756D62]">
                  Macro split
                </div>
                <div className="font-display text-[1.5rem] leading-tight text-[#F6EFE4]">
                  {Math.round(targets.macroDistributionPct.protein)} /{" "}
                  {Math.round(targets.macroDistributionPct.carbs)} /{" "}
                  {Math.round(targets.macroDistributionPct.fat)}
                  <span className="ml-1.5 text-[0.5rem] uppercase tracking-[0.12em] text-[#6F665B]">
                    p / c / f
                  </span>
                </div>
              </div>
              <div className="chip chip-sage !py-1 text-[0.5rem]">
                fibre {targets.targetFibreG}g
              </div>
            </div>
            <div className="space-y-4">
              {macros.map((macro) => (
                <div key={macro.label}>
                  <div className="mb-1.5 flex items-center justify-between text-[0.62rem]">
                    <span className="flex items-center gap-2 text-[#B3A798]">
                      <span className="macro-dot" style={{ background: macro.color }} />
                      {macro.label}
                    </span>
                    <span className="tabular-nums text-[#D9C7AE]">
                      {formatNumber(macro.grams, 0)} g
                      <span className="ml-1.5 text-[#6F665B]">{Math.round(macro.value)}%</span>
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill transition-[width] duration-[1400ms] ease-out"
                      style={{
                        width: inView ? `${macro.value}%` : "0%",
                        background: `linear-gradient(90deg, ${macro.color}70, ${macro.color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-[rgba(232,181,106,.11)] bg-white/[0.018] p-3 text-[0.62rem] leading-5 text-[#8F8373]">
              Mifflin–St Jeor BMR × 1.725 activity, plus a measured 250 kcal
              lean surplus. Protein fixed at 2.0 g/kg.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GoalsScene() {
  const targets = computeNutritionTargets(74, 178, 26, "male", "active", "lean_bulk");
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {GOAL_ORDER.map((goalId, index) => {
        const spec = GOAL_SPECS[goalId];
        const result = computeNutritionTargets(74, 178, 26, "male", "active", goalId);
        const selected = goalId === "lean_bulk";
        return (
          <article
            key={goalId}
            data-reveal
            className={`arch-card relative overflow-hidden rounded-2xl border p-4 ${
              selected
                ? "border-[rgba(255,138,50,.42)] bg-[linear-gradient(155deg,rgba(255,138,50,.12),rgba(13,12,10,.9))]"
                : "border-[rgba(232,181,106,.13)] bg-[linear-gradient(155deg,rgba(28,24,19,.68),rgba(10,9,8,.9))]"
            }`}
          >
            {selected && (
              <span className="absolute right-3 top-3 rounded-full bg-[#FF8A32] px-2 py-0.5 text-[0.42rem] font-bold uppercase tracking-[0.14em] text-[#1A110A]">
                Demo
              </span>
            )}
            <div className="text-[0.46rem] uppercase tracking-[0.2em] text-[#6F665B]">
              Protocol 0{index + 1}
            </div>
            <h3 className="mt-1.5 font-display text-[1.55rem] leading-none text-[#F6EFE4]">
              {spec.name}
            </h3>
            <p className="mt-1.5 min-h-[32px] text-[0.6rem] leading-4 text-[#8F8373]">
              {spec.tagline}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 border-y border-[rgba(232,181,106,.1)] py-3">
              <div>
                <div className="font-display text-[1.35rem] leading-none text-[#F3D3A1] tabular-nums">
                  {formatNumber(result.targetCalories)}
                </div>
                <div className="mt-1 text-[0.42rem] uppercase tracking-[0.15em] text-[#6F665B]">
                  kcal
                </div>
              </div>
              <div>
                <div className="font-display text-[1.35rem] leading-none text-[#F3D3A1] tabular-nums">
                  {formatNumber(result.targetProteinG)}g
                </div>
                <div className="mt-1 text-[0.42rem] uppercase tracking-[0.15em] text-[#6F665B]">
                  protein
                </div>
              </div>
            </div>
            <div className="mt-2.5 text-[0.5rem] uppercase tracking-[0.1em] text-[#6F665B]">
              {spec.delta === 0 ? "Isocaloric" : `${spec.delta > 0 ? "+" : ""}${spec.delta} kcal`}
              <span className="mx-1.5 text-[#3E3831]">·</span>
              {spec.proteinPerKg} g/kg protein
              {spec.carbsPct ? (
                <>
                  <span className="mx-1.5 text-[#3E3831]">·</span>
                  55% carbs
                </>
              ) : null}
            </div>
          </article>
        );
      })}
      <div
        data-reveal
        className="flex flex-col justify-between rounded-2xl border border-dashed border-[rgba(232,181,106,.18)] bg-[rgba(255,255,255,.012)] p-4"
      >
        <div>
          <div className="text-[0.46rem] uppercase tracking-[0.2em] text-[#6F665B]">
            Total daily energy
          </div>
          <div className="mt-2 font-display text-[2.6rem] leading-none text-gold-gradient tabular-nums">
            {formatNumber(targets.tdee)}
          </div>
          <div className="mt-1 text-[0.52rem] uppercase tracking-[0.16em] text-[#756D62]">
            kcal maintenance baseline
          </div>
        </div>
        <p className="mt-5 text-[0.62rem] leading-5 text-[#8F8373]">
          Every goal recalculates from your own weight, height, age, sex and
          activity multiplier — no static templates.
        </p>
      </div>
    </div>
  );
}
