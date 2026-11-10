import type { NutritionTargets } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export function ConsumptionRings({
  consumed,
  targets,
}: {
  consumed: { calories: number; protein: number; carbs: number; fat: number };
  targets: NutritionTargets;
}) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const calorieProgress = Math.min(consumed.calories / targets.targetCalories, 1);
  const macros = [
    {
      label: "Protein",
      value: consumed.protein,
      target: targets.targetProteinG,
      color: "#FF8A32",
    },
    {
      label: "Carbs",
      value: consumed.carbs,
      target: targets.targetCarbsG,
      color: "#E8B56A",
    },
    {
      label: "Fat",
      value: consumed.fat,
      target: targets.targetFatG,
      color: "#9C7A4E",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
      <div className="relative grid shrink-0 place-items-center">
        <svg viewBox="0 0 120 120" className="h-[128px] w-[128px] -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,.06)"
            strokeWidth="9"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#calorieGradient)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${calorieProgress * circumference} ${circumference}`}
          />
          <defs>
            <linearGradient id="calorieGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FF8A32" />
              <stop offset="1" stopColor="#E8B56A" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <div className="font-display text-[1.7rem] leading-none text-[#F6EFE4]">
            {formatNumber(consumed.calories)}
          </div>
          <div className="mt-1 text-[0.44rem] uppercase tracking-[0.16em] text-[#6F665B]">
            of {formatNumber(targets.targetCalories)}
          </div>
        </div>
      </div>

      <div className="w-full flex-1 space-y-3">
        {macros.map((macro) => {
          const progress = Math.min((macro.value / Math.max(macro.target, 1)) * 100, 100);
          return (
            <div key={macro.label}>
              <div className="mb-1 flex items-center justify-between text-[0.6rem]">
                <span className="text-[#A79C8D]">{macro.label}</span>
                <span className="tabular-nums text-[#D9C7AE]">
                  {formatNumber(macro.value)} / {formatNumber(macro.target)} g
                </span>
              </div>
              <div className="progress-track h-1.5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${macro.color}80, ${macro.color})`,
                  }}
                />
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-between border-t border-[rgba(232,181,106,.1)] pt-2.5 text-[0.48rem] uppercase tracking-[0.12em] text-[#6F665B]">
          <span>Fibre target {targets.targetFibreG}g</span>
          <span className="text-[#8FA989]">{formatNumber(consumed.calories)} logged</span>
        </div>
      </div>
    </div>
  );
}
