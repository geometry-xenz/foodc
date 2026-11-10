import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChefHat,
  CircleGauge,
  Flame,
  Package,
  ScanEye,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { getDashboardData } from "@/lib/data-access";
import { getSessionUser } from "@/lib/auth";
import { displayName, getCompoundCompounds } from "@/lib/flavor";
import { formatNumber, greeting } from "@/lib/utils";
import { UnlockCard } from "@/components/app/unlock-card";
import { ConsumptionRings } from "@/components/app/consumption-rings";

export const dynamic = "force-dynamic";

const MEAL_ORDER = ["breakfast", "lunch", "dinner", "snack"];

export default async function DashboardPage() {
  const session = await getSessionUser();
  if (!session) return null;
  const data = await getDashboardData(session.id);
  if (!data) return null;

  const { user, pantry, ranked, unlock, planEntries, targets, today } = data;
  const cookableNow = ranked.filter(
    (recipe) =>
      recipe.ingredientsMissing.filter(
        (name) => !["salt", "oil", "water", "sugar"].includes(name),
      ).length === 0,
  );
  const oneAway = ranked.filter(
    (recipe) =>
      recipe.ingredientsMissing.filter(
        (name) => !["salt", "oil", "water", "sugar"].includes(name),
      ).length === 1,
  );
  const avgScore =
    ranked.length > 0
      ? ranked.reduce((total, recipe) => total + recipe.finalScore, 0) / ranked.length
      : 0;
  const planTotals = planEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  const compoundCounts = new Map<string, Set<string>>();
  pantry.forEach((item) => {
    getCompoundCompounds(item).forEach((compound) => {
      const existing = compoundCounts.get(compound) ?? new Set<string>();
      existing.add(item);
      compoundCounts.set(compound, existing);
    });
  });
  const sharedCompounds = [...compoundCounts.entries()]
    .filter(([, items]) => items.size > 1)
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 5);

  const date = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const topRecipes = ranked.slice(0, 3);
  const lowStock = user.pantry.filter(
    (item) => item.quantity <= 50 && item.isAvailable,
  );

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow mb-2.5">{greeting()}, {user.name.split(" ")[0]}</div>
          <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            Your kitchen,{" "}
            <span className="italic text-gold-gradient">understood.</span>
          </h1>
          <p className="mt-2.5 max-w-[620px] text-[0.78rem] leading-6 text-[#8F8373]">
            {date} · {pantry.length} live pantry signals · {cookableNow.length}{" "}
            {cookableNow.length === 1 ? "dish" : "dishes"} ready
            to cook · {oneAway.length} one ingredient away.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/app/pantry" className="btn btn-ghost btn-sm">
            <ScanEye size={13} /> Scan pantry
          </Link>
          <Link href="/app/planner" className="btn btn-gold btn-sm">
            <CalendarDays size={13} /> Plan today
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          icon={<Package size={14} />}
          label="Pantry signals"
          value={String(pantry.length)}
          detail={`${sharedCompounds.length} shared aroma families`}
          accent="#E8B56A"
        />
        <MetricCard
          icon={<ChefHat size={14} />}
          label="Cookable now"
          value={String(cookableNow.length)}
          detail="zero hard gaps"
          accent="#8FA989"
        />
        <MetricCard
          icon={<Sparkles size={14} />}
          label="One away"
          value={String(oneAway.length)}
          detail={unlock ? `unlock with ${unlock.displayName}` : "no positive unlock"}
          accent="#FF8A32"
        />
        <MetricCard
          icon={<CircleGauge size={14} />}
          label="Mean match"
          value={`${Math.round(avgScore * 100)}%`}
          detail="composite gastronomy score"
          accent="#C9A15C"
        />
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.32fr_0.68fr]">
        <div className="min-w-0 space-y-5">
          <UnlockCard unlock={unlock} />

          <section className="app-card p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[0.48rem] uppercase tracking-[0.18em] text-[#756D62]">
                  Ranked for your pantry
                </div>
                <h2 className="mt-1 font-display text-[1.55rem] leading-none text-[#F6EFE4]">
                  Cook these next
                </h2>
              </div>
              <Link
                href="/app/recipes"
                className="flex items-center gap-1.5 text-[0.54rem] uppercase tracking-[0.14em] text-[#C9B79F] transition-colors hover:text-[#E8B56A]"
              >
                All recipes <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {topRecipes.map((recipe, index) => (
                <Link
                  key={recipe.recipeId}
                  href={`/app/recipes?recipe=${recipe.recipeId}`}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[rgba(232,181,106,.11)] bg-[rgba(255,255,255,.012)] p-2.5 transition-all hover:border-[rgba(232,181,106,.28)] hover:bg-[rgba(255,138,50,.035)]"
                >
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-cover bg-center sm:h-16 sm:w-20" style={{ backgroundImage: `url(${recipe.imageUrl})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 to-transparent" />
                    <span className="absolute bottom-1 left-1.5 text-[0.44rem] uppercase tracking-[0.1em] text-[#E8B56A]">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-[0.78rem] font-medium text-[#EDE4D6] group-hover:text-[#F6EFE4]">
                        {recipe.title}
                      </h3>
                      <span className="shrink-0 rounded-full border border-[rgba(232,181,106,.25)] bg-[rgba(232,181,106,.06)] px-2 py-0.5 text-[0.52rem] tabular-nums text-[#E8B56A]">
                        {Math.round(recipe.finalScore * 100)}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-[0.54rem] text-[#756D62]">
                      {recipe.cuisine} · {recipe.calories} kcal · {recipe.protein}g protein ·{" "}
                      {recipe.totalTimeMinutes} min
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {recipe.ingredientsMissing.length === 0 ? (
                        <span className="chip chip-sage !py-0.5 text-[0.46rem]">Fully stocked</span>
                      ) : (
                        recipe.ingredientsMissing.slice(0, 3).map((missing) => (
                          <span key={missing} className="chip !py-0.5 text-[0.46rem] text-[#A79C8D]">
                            {displayName(missing)}
                          </span>
                        ))
                      )}
                      <span className="ml-auto hidden items-center gap-1 text-[0.48rem] text-[#5F574D] sm:flex">
                        View dish <ArrowUpRight size={10} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="app-card p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[0.48rem] uppercase tracking-[0.18em] text-[#756D62]">
                  Today · {planEntries.length} meals assigned
                </div>
                <h2 className="mt-1 font-display text-[1.55rem] leading-none text-[#F6EFE4]">
                  Day protocol
                </h2>
              </div>
              <Link
                href="/app/planner"
                className="flex items-center gap-1.5 text-[0.54rem] uppercase tracking-[0.14em] text-[#C9B79F] transition-colors hover:text-[#E8B56A]"
              >
                Open planner <ArrowRight size={12} />
              </Link>
            </div>

            {planEntries.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[rgba(232,181,106,.16)] px-4 py-6 text-center">
                <UtensilsCrossed size={18} className="mx-auto text-[#756D62]" />
                <p className="mt-2 text-[0.7rem] text-[#8F8373]">
                  No meals assigned. Build a day from your ranked recipes.
                </p>
                <Link href="/app/planner" className="btn btn-ghost btn-sm mt-3">
                  Plan your day
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {MEAL_ORDER.map((mealType) => {
                  const entries = planEntries.filter((entry) => entry.mealType === mealType);
                  if (entries.length === 0) return null;
                  return (
                    <div key={mealType} className="flex items-start gap-3 border-b border-[rgba(232,181,106,.08)] pb-2 last:border-0 last:pb-0">
                      <span className="mt-1 w-16 shrink-0 text-[0.48rem] uppercase tracking-[0.13em] text-[#756D62]">
                        {mealType}
                      </span>
                      <div className="flex-1 space-y-1">
                        {entries.map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between gap-2">
                            <span className="truncate text-[0.68rem] text-[#D9C7AE]">
                              {recipeTitle(ranked, entry.recipeId)}
                            </span>
                            <span className="shrink-0 text-[0.5rem] tabular-nums text-[#756D62]">
                              {Math.round(entry.calories)} kcal · {Math.round(entry.protein)}g
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <div className="mt-3 flex items-center justify-between rounded-lg border border-[rgba(232,181,106,.11)] bg-[rgba(255,255,255,.015)] px-3 py-2 text-[0.54rem]">
                  <span className="uppercase tracking-[0.12em] text-[#756D62]">Planned total</span>
                  <span className="tabular-nums text-[#E8B56A]">
                    {formatNumber(planTotals.calories)} kcal · {formatNumber(planTotals.protein)}g protein
                  </span>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="min-w-0 space-y-5">
          <section className="app-card p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={13} className="text-[#FF8A32]" />
                <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
                  Nutrition translation
                </h2>
              </div>
              <Link
                href="/app/nutrition"
                className="text-[0.5rem] uppercase tracking-[0.12em] text-[#756D62] transition-colors hover:text-[#E8B56A]"
              >
                Tune
              </Link>
            </div>
            {targets ? (
              <ConsumptionRings consumed={planTotals} targets={targets} />
            ) : (
              <p className="text-[0.7rem] text-[#8F8373]">Set your biometrics to unlock targets.</p>
            )}
            <div className="mt-4 rounded-lg border border-[rgba(232,181,106,.1)] bg-white/[0.015] px-3 py-2 text-[0.55rem] leading-4 text-[#756D62]">
              {targets
                ? `BMR ${formatNumber(targets.bmr)} → TDEE ${formatNumber(targets.tdee)} kcal. ${targets.rationale}`
                : "Mifflin-St Jeor targets appear after your profile is complete."}
            </div>
          </section>

          <section className="app-card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
                Pantry snapshot
              </h2>
              <Link href="/app/pantry" className="text-[0.5rem] uppercase tracking-[0.12em] text-[#756D62] hover:text-[#E8B56A]">
                Manage
              </Link>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {user.pantry.slice(0, 10).map((item) => (
                <span key={item.id} className="chip">
                  {displayName(item.name)}
                  <span className="text-[0.46rem] text-[#5F574D]">
                    {Math.round(item.quantity)}{item.unit}
                  </span>
                </span>
              ))}
              {user.pantry.length > 10 && (
                <span className="chip chip-gold">+{user.pantry.length - 10} more</span>
              )}
            </div>
            {lowStock.length > 0 && (
              <div className="mt-3 rounded-lg border border-[rgba(255,138,50,.16)] bg-[rgba(255,138,50,.04)] px-3 py-2 text-[0.54rem] text-[#C9A47D]">
                Low stock: {lowStock.slice(0, 3).map((item) => displayName(item.name)).join(", ")}
              </div>
            )}
          </section>

          <section className="app-card p-4 sm:p-5">
            <div className="mb-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
              Aroma mesh
            </div>
            <p className="text-[0.56rem] leading-4 text-[#756D62]">
              Volatiles shared by two or more pantry ingredients.
            </p>
            <div className="mt-3 space-y-2.5">
              {sharedCompounds.map(([compound, items]) => (
                <div key={compound}>
                  <div className="mb-1 flex items-center justify-between text-[0.55rem]">
                    <span className="text-[#C9B79F]">{compound}</span>
                    <span className="text-[0.46rem] text-[#6F665B]">{items.size} sources</span>
                  </div>
                  <div className="progress-track h-1">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min((items.size / 5) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              {sharedCompounds.length === 0 && (
                <p className="text-[0.62rem] text-[#756D62]">Add more aromatics to reveal overlap.</p>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  accent: string;
}) {
  return (
    <div className="app-card app-card-hover relative overflow-hidden p-4">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl"
        style={{ background: `${accent}18` }}
      />
      <div className="flex items-center justify-between">
        <span className="text-[0.46rem] uppercase tracking-[0.16em] text-[#756D62]">{label}</span>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="mt-2.5 font-display text-[2.1rem] leading-none text-[#F3D3A1] tabular-nums">
        {value}
      </div>
      <div className="mt-1.5 truncate text-[0.5rem] uppercase tracking-[0.1em] text-[#5F574D]">
        {detail}
      </div>
    </div>
  );
}

function recipeTitle(ranked: Array<{ recipeId: string; title: string }>, recipeId: string) {
  return ranked.find((recipe) => recipe.recipeId === recipeId)?.title ?? recipeId;
}
