"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  Check,
  ChefHat,
  Clock,
  Filter,
  Flame,
  Loader2,
  Plus,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { cn, displayName, formatNumber } from "@/lib/utils";
import type {
  RecipeRecord,
  ScoredRecipe,
  ScoreBreakdown,
  UnlockRecommendation,
} from "@/lib/types";
import type { NutritionTargets } from "@/lib/types";
import { UnlockCard } from "@/components/app/unlock-card";

type RecipeDetail = {
  recipe: RecipeRecord;
  score: ScoreBreakdown;
  scored: ScoredRecipe;
  ingredients: Array<{
    name: string;
    displayName: string;
    quantity: number;
    unit: string;
    available: boolean;
    compounds: string[];
    flavor: string[];
    scientificName: string;
    macros: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fibre: number;
    } | null;
  }>;
  missing: Array<{ name: string; displayName: string }>;
};

const SCORE_FACTORS = [
  { key: "coreCoverage", label: "Core coverage", weight: "30%" },
  { key: "pantryUtilisation", label: "Pantry utilisation", weight: "20%" },
  { key: "flavourCoherence", label: "Flavour coherence", weight: "20%" },
  { key: "gapFit", label: "Gap fit", weight: "30%" },
] as const;

const SORTS = [
  { id: "score", label: "Best match" },
  { id: "protein", label: "Highest protein" },
  { id: "quickest", label: "Quickest" },
  { id: "calories", label: "Lowest calories" },
] as const;

const DIETS = [
  { id: "all", label: "All diets" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "non-vegetarian", label: "Non-vegetarian" },
] as const;

function hardMissing(recipe: ScoredRecipe) {
  return (recipe.ingredientsMissing || []).filter(
    (name) => !["salt", "oil", "water", "sugar"].includes(name.toLowerCase()),
  );
}

export function RecipesWorkspace({
  recipes,
  unlock,
  pantry,
  targets,
  initialRecipeId,
}: {
  recipes: ScoredRecipe[];
  unlock: UnlockRecommendation | null;
  pantry: string[];
  targets: NutritionTargets | null;
  initialRecipeId?: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("score");
  const [diet, setDiet] = useState<(typeof DIETS)[number]["id"]>("all");
  const [cookableOnly, setCookableOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(initialRecipeId ?? null);
  const [detail, setDetail] = useState<RecipeDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedId) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    setDetailLoading(true);
    fetch(`/api/recipes/${selectedId}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load recipe.");
        return (await response.json()) as RecipeDetail;
      })
      .then((data) => {
        if (!cancelled) setDetail(data);
      })
      .catch(() => {
        if (!cancelled) setDetail(null);
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  function closeDetail() {
    setSelectedId(null);
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState(null, "", "/app/recipes");
    }
  }

  async function addMissing(name: string) {
    setAdding(name);
    try {
      const response = await fetch("/api/pantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category: "Spices", quantity: 50, unit: "g" }),
      });
      if (response.ok && selectedId) {
        const refreshed = await fetch(`/api/recipes/${selectedId}`);
        if (refreshed.ok) setDetail((await refreshed.json()) as RecipeDetail);
        router.refresh();
      }
    } finally {
      setAdding(null);
    }
  }

  const visible = useMemo(() => {
    let list = recipes.filter((recipe) => {
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        recipe.title.toLowerCase().includes(query) ||
        recipe.cuisine.toLowerCase().includes(query) ||
        (recipe.dominantAroma || "").toLowerCase().includes(query);
      const matchesDiet =
        diet === "all" ||
        (diet === "vegetarian"
          ? recipe.diet === "vegetarian" || recipe.diet === "vegan"
          : recipe.diet === diet);
      const matchesCookable = !cookableOnly || hardMissing(recipe).length === 0;
      return matchesSearch && matchesDiet && matchesCookable;
    });

    list = list.sort((a, b) => {
      if (sort === "protein") return b.protein - a.protein;
      if (sort === "quickest") return a.totalTimeMinutes - b.totalTimeMinutes;
      if (sort === "calories") return a.calories - b.calories;
      return b.finalScore - a.finalScore;
    });
    return list;
  }, [recipes, search, diet, cookableOnly, sort]);

  const cookableCount = recipes.filter((recipe) => hardMissing(recipe).length === 0).length;
  const oneAwayCount = recipes.filter((recipe) => hardMissing(recipe).length === 1).length;

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow mb-2.5">Ranked possibilities</div>
          <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            Your <span className="italic text-gold-gradient">recipes.</span>
          </h1>
          <p className="mt-2.5 max-w-[650px] text-[0.78rem] leading-6 text-[#8F8373]">
            {cookableCount} fully cookable · {oneAwayCount} one ingredient away ·{" "}
            {recipes.length} molecularly scored. Scores use 30/20/20/30
            weighting, never a static list.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-sage">
            <Check size={10} /> {cookableCount} ready
          </span>
          <span className="chip chip-orange">
            <Sparkles size={10} /> {oneAwayCount} one away
          </span>
          {targets && (
            <span className="chip">
              <Flame size={10} /> {formatNumber(targets.targetCalories)} kcal target
            </span>
          )}
        </div>
      </header>

      <UnlockCard unlock={unlock} compact />

      <section className="app-card p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-[330px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F665B]" />
            <input
              className="field !h-10 !pl-9 text-[0.74rem]"
              placeholder="Search dish, cuisine or aroma…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-[rgba(232,181,106,.14)] bg-white/[0.018] p-1">
              {SORTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSort(item.id)}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1.5 text-[0.52rem] uppercase tracking-[0.08em] transition-colors",
                    sort === item.id
                      ? "bg-[rgba(255,138,50,.14)] text-[#FFD2A8]"
                      : "text-[#756D62] hover:text-[#D9C7AE]",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Filter size={12} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6F665B]" />
              <select
                className="field !h-9 !w-[145px] !pl-7 text-[0.62rem]"
                value={diet}
                onChange={(event) => setDiet(event.target.value as typeof diet)}
              >
                {DIETS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setCookableOnly((value) => !value)}
              className={cn("chip transition-all", cookableOnly && "chip-sage")}
            >
              <ChefHat size={11} /> Cookable only
            </button>
          </div>
        </div>
      </section>

      {visible.length === 0 ? (
        <div className="app-card px-6 py-16 text-center">
          <ChefHat size={26} className="mx-auto text-[#756D62]" />
          <h2 className="mt-3 font-display text-2xl text-[#F6EFE4]">No dish meets this filter.</h2>
          <p className="mx-auto mt-1.5 max-w-[420px] text-[0.72rem] leading-5 text-[#8F8373]">
            Widen your diet or time filters, or add another aromatic to the
            pantry to open new molecular paths.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setDiet("all");
              setCookableOnly(false);
              setSort("score");
            }}
            className="btn btn-ghost btn-sm mt-4"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 2xl:grid-cols-3">
          {visible.map((recipe) => (
            <RecipeCard key={recipe.recipeId} recipe={recipe} onOpen={() => setSelectedId(recipe.recipeId)} />
          ))}
        </div>
      )}

      <Dialog.Root open={selectedId !== null} onOpenChange={(open) => !open && closeDetail()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm data-[state=open]:animate-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[90] max-h-[92vh] w-[94vw] max-w-[880px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[22px] border border-[rgba(232,181,106,.22)] bg-[#0c0b0a] shadow-[0_40px_120px_rgba(0,0,0,.7)] focus:outline-none">
            <Dialog.Title className="sr-only">Recipe detail</Dialog.Title>
            <Dialog.Description className="sr-only">
              Detailed molecular score, ingredients and nutrition for the selected recipe.
            </Dialog.Description>
            {detailLoading || !detail ? (
              <div className="p-8">
                <div className="skeleton h-48 w-full" />
                <div className="mt-5 skeleton h-7 w-2/3" />
                <div className="mt-3 skeleton h-4 w-1/2" />
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="skeleton h-24" />
                  <div className="skeleton h-24" />
                </div>
              </div>
            ) : (
              <RecipeDetailContent
                detail={detail}
                adding={adding}
                onAddMissing={addMissing}
              />
            )}
            <Dialog.Close asChild>
              <button
                type="button"
                className="icon-btn absolute right-3 top-3 z-20 !border-[rgba(255,255,255,.18)] !bg-black/45 backdrop-blur-md"
                aria-label="Close recipe"
              >
                <X size={16} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function RecipeCard({
  recipe,
  onOpen,
}: {
  recipe: ScoredRecipe;
  onOpen: () => void;
}) {
  const missing = hardMissing(recipe);
  return (
    <article className="group relative overflow-hidden rounded-[16px] border border-[rgba(232,181,106,.13)] bg-[linear-gradient(165deg,rgba(28,24,19,.65),rgba(11,10,9,.9))] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(232,181,106,.3)]">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div
          className="relative h-[150px] bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/30 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className="rounded-full border border-white/15 bg-black/45 px-2 py-0.5 text-[0.44rem] uppercase tracking-[0.1em] text-[#E9DFD0] backdrop-blur-md">
              {recipe.diet}
            </span>
            <span className="rounded-full border border-white/15 bg-black/45 px-2 py-0.5 text-[0.44rem] uppercase tracking-[0.1em] text-[#E9DFD0] backdrop-blur-md">
              {recipe.mealType}
            </span>
          </div>
          <div className="absolute bottom-2.5 right-3 flex items-end gap-1">
            <span className="font-display text-[2.2rem] leading-none text-[#F3D3A1]">
              {Math.round(recipe.finalScore * 100)}
            </span>
            <span className="mb-1 text-[0.44rem] uppercase tracking-[0.12em] text-[#C9B79F]">
              score
            </span>
          </div>
        </div>

        <div className="p-3.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="font-display text-[1.3rem] leading-tight text-[#F6EFE4]">
                {recipe.title}
              </h2>
              <div className="mt-0.5 text-[0.48rem] uppercase tracking-[0.11em] text-[#756D62]">
                {recipe.cuisine} · {recipe.matchPercentage}% ingredient match
              </div>
            </div>
            <ArrowUpRight
              size={14}
              className="mt-1 shrink-0 text-[#5F574D] transition-colors group-hover:text-[#E8B56A]"
            />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.52rem] text-[#756D62]">
            <span className="flex items-center gap-1">
              <Clock size={10} /> {recipe.totalTimeMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={10} /> {recipe.calories} kcal
            </span>
            <span>{recipe.protein}g protein</span>
            <span className="flex items-center gap-1">
              <Users size={10} /> {recipe.servings}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            {SCORE_FACTORS.map((factor) => {
              const value = recipe.score[factor.key];
              return (
                <div key={factor.key}>
                  <div className="mb-1 flex justify-between text-[0.44rem] uppercase tracking-[0.06em]">
                    <span className="text-[#6F665B]">{factor.label}</span>
                    <span className="tabular-nums text-[#A79C8D]">{Math.round(value * 100)}</span>
                  </div>
                  <div className="progress-track h-[3px]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(value * 100)}%`,
                        background:
                          factor.key === "flavourCoherence"
                            ? "linear-gradient(90deg,#8B6A3A,#FFB25E)"
                            : "linear-gradient(90deg,#A25C25,#E8B56A)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex min-h-[24px] flex-wrap gap-1">
            {missing.length === 0 ? (
              <span className="chip chip-sage !py-0.5 text-[0.46rem]">
                <Check size={9} /> Fully stocked
              </span>
            ) : (
              <>
                {missing.slice(0, 2).map((name) => (
                  <span key={name} className="chip !py-0.5 text-[0.46rem] text-[#C9A47D]">
                    + {displayName(name)}
                  </span>
                ))}
                {missing.length > 2 && (
                  <span className="chip !py-0.5 text-[0.46rem]">+{missing.length - 2} more</span>
                )}
              </>
            )}
          </div>
        </div>
      </button>
    </article>
  );
}

function RecipeDetailContent({
  detail,
  adding,
  onAddMissing,
}: {
  detail: RecipeDetail;
  adding: string | null;
  onAddMissing: (name: string) => void;
}) {
  const { recipe, scored, score, ingredients, missing } = detail;
  const allCompounds = [...new Set(ingredients.flatMap((item) => item.compounds))].slice(0, 16);
  return (
    <div>
      <div
        className="relative h-[230px] bg-cover bg-center sm:h-[290px]"
        style={{ backgroundImage: `url(${recipe.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/35 to-transparent" />
        <div className="absolute bottom-4 left-5 right-14">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <span className="chip chip-gold !py-0.5 text-[0.46rem]">{recipe.cuisine}</span>
            <span className="chip !py-0.5 text-[0.46rem]">{recipe.diet}</span>
            <span className="chip !py-0.5 text-[0.46rem]">{recipe.meal_type}</span>
            {missing.length === 0 && (
              <span className="chip chip-sage !py-0.5 text-[0.46rem]">
                <Check size={9} /> Ready to cook
              </span>
            )}
          </div>
          <h2 className="font-display text-[2rem] leading-[0.98] text-[#F6EFE4] sm:text-[2.6rem]">
            {recipe.title}
          </h2>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.56rem] text-[#B3A798]">
            <span>{recipe.prep_time_minutes} min prep</span>
            <span className="text-[#4F483F]">/</span>
            <span>{recipe.cook_time_minutes} min cook</span>
            <span className="text-[#4F483F]">/</span>
            <span>{recipe.servings} servings</span>
            <span className="text-[#4F483F]">/</span>
            <span>{recipe.total_time_minutes} min total</span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.46rem] uppercase tracking-[0.18em] text-[#756D62]">
                  Composite gastronomy
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="font-display text-[3rem] leading-none text-gold-gradient">
                    {Math.round(scored.finalScore * 100)}
                  </span>
                  <span className="mb-1 text-[0.52rem] uppercase tracking-[0.14em] text-[#8B7E6D]">
                    / 100
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-xl text-[#F3D3A1]">{scored.matchPercentage}%</div>
                <div className="text-[0.42rem] uppercase tracking-[0.12em] text-[#6F665B]">
                  ingredient match
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {SCORE_FACTORS.map((factor) => {
                const value = score[factor.key];
                return (
                  <div key={factor.key}>
                    <div className="mb-1 flex justify-between text-[0.56rem]">
                      <span className="text-[#A79C8D]">
                        {factor.label} <span className="text-[#5F574D]">{factor.weight}</span>
                      </span>
                      <span className="tabular-nums text-[#D9C7AE]">{Math.round(value * 100)}%</span>
                    </div>
                    <div className="progress-track h-1.5">
                      <div
                        className="progress-fill"
                        style={{ width: `${Math.round(value * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {[
                { label: "kcal", value: recipe.nutrition_per_serving?.calories ?? (recipe as any).calories },
                { label: "protein", value: `${recipe.nutrition_per_serving?.protein ?? (recipe as any).protein}g` },
                { label: "carbs", value: `${recipe.nutrition_per_serving?.carbs ?? (recipe as any).carbs}g` },
                { label: "fat", value: `${recipe.nutrition_per_serving?.fat ?? (recipe as any).fat}g` },
                { label: "fibre", value: `${recipe.nutrition_per_serving?.fibre ?? (recipe as any).fiber ?? 0}g` },
              ].map((macro) => (
                <div
                  key={macro.label}
                  className="rounded-lg border border-[rgba(232,181,106,.11)] bg-white/[0.015] px-1.5 py-2 text-center"
                >
                  <div className="font-display text-[1.05rem] leading-none text-[#E9DFD0]">
                    {macro.value}
                  </div>
                  <div className="mt-1 text-[0.38rem] uppercase tracking-[0.08em] text-[#6F665B]">
                    {macro.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[rgba(232,181,106,.12)] bg-[rgba(255,255,255,.015)] p-3">
              <div className="text-[0.44rem] uppercase tracking-[0.16em] text-[#756D62]">
                Dominant aroma
              </div>
              <div className="mt-1 text-[0.65rem] leading-5 text-[#D9C7AE]">
                {recipe.molecular_profile.dominant_aroma}
              </div>
              <p className="mt-2 text-[0.6rem] leading-5 text-[#8F8373]">
                {recipe.molecular_profile.notes}
              </p>
            </div>
          </div>

          <div>
            <div className="text-[0.46rem] uppercase tracking-[0.18em] text-[#756D62]">
              Ingredient ledger · {ingredients.length} components
            </div>
            <div className="mt-2 max-h-[240px] space-y-1.5 overflow-y-auto pr-1">
              {ingredients.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-2.5 rounded-lg border border-[rgba(232,181,106,.08)] bg-white/[0.012] px-2.5 py-2"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      item.available ? "bg-[#8FA989]" : "bg-[#FF8A32]"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[0.64rem] text-[#D9C7AE]">
                        {item.displayName}
                      </span>
                      <span className="shrink-0 text-[0.48rem] text-[#756D62]">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    {item.compounds.length > 0 && (
                      <div className="mt-0.5 truncate text-[0.44rem] text-[#5F574D]">
                        {item.compounds.slice(0, 3).join(" · ")}
                      </div>
                    )}
                  </div>
                  {!item.available && (
                    <button
                      type="button"
                      onClick={() => onAddMissing(item.name)}
                      disabled={adding !== null}
                      className="text-[#FF9B52] transition-colors hover:text-[#FFD2A8]"
                      aria-label={`Add ${item.displayName} to pantry`}
                    >
                      {adding === item.name ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : (
                        <Plus size={11} />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {missing.length > 0 && (
              <div className="mt-3 rounded-lg border border-[rgba(255,138,50,.2)] bg-[rgba(255,138,50,.045)] p-2.5">
                <div className="text-[0.44rem] uppercase tracking-[0.14em] text-[#C9A47D]">
                  Missing to unlock
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {missing.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => onAddMissing(item.name)}
                      disabled={adding !== null}
                      className="chip chip-orange hover:bg-[rgba(255,138,50,.14)]"
                    >
                      {adding === item.name ? <Loader2 size={9} className="animate-spin" /> : <Plus size={9} />}
                      {item.displayName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {allCompounds.length > 0 && (
              <div className="mt-3">
                <div className="text-[0.44rem] uppercase tracking-[0.16em] text-[#756D62]">
                  Volatile matrix
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {allCompounds.map((compound) => (
                    <span
                      key={compound}
                      className="rounded-full border border-[rgba(232,181,106,.14)] bg-[rgba(232,181,106,.03)] px-1.5 py-0.5 text-[0.44rem] text-[#B3A798]"
                    >
                      {compound}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 border-t border-[rgba(232,181,106,.12)] pt-4">
          <div className="text-[0.46rem] uppercase tracking-[0.18em] text-[#756D62]">
            Method · {recipe.instructions.length} steps
          </div>
          <ol className="mt-2 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-3 text-[0.66rem] leading-5 text-[#A79C8D]">
                <span className="font-display text-[0.9rem] leading-5 text-[#C9A15C]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {typeof step === "string" ? step : ((step as any)?.text ?? String(step))}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 rounded-lg border border-[rgba(232,181,106,.1)] bg-white/[0.012] px-3 py-2 text-[0.5rem] uppercase tracking-[0.1em] text-[#6F665B]">
          {scored.whyRecommended}
        </div>
      </div>
    </div>
  );
}
