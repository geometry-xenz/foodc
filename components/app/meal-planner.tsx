"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Apple,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Flame,
  Loader2,
  Moon,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Sun,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import type { NutritionTargets, ScoredRecipe } from "@/lib/types";
import { addDays, cn, dateLabel, formatNumber, todayISO } from "@/lib/utils";
import { ConsumptionRings } from "@/components/app/consumption-rings";

type PlannerEntry = {
  id: string;
  date: string;
  mealType: string;
  recipeId: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const MEALS = [
  {
    id: "breakfast",
    label: "Breakfast",
    window: "06:00 — 10:00",
    icon: Coffee,
    accent: "#E8B56A",
  },
  {
    id: "lunch",
    label: "Lunch",
    window: "12:00 — 15:00",
    icon: Sun,
    accent: "#FF8A32",
  },
  {
    id: "dinner",
    label: "Dinner",
    window: "19:00 — 22:00",
    icon: Moon,
    accent: "#C9A15C",
  },
  {
    id: "snack",
    label: "Snack",
    window: "any window",
    icon: Apple,
    accent: "#8FA989",
  },
] as const;

const MEAL_IDS = MEALS.map((meal) => meal.id);

export function MealPlanner({
  initialDate,
  initialEntries,
  recipes,
  targets,
  goalName,
}: {
  initialDate: string;
  initialEntries: PlannerEntry[];
  recipes: ScoredRecipe[];
  targets: NutritionTargets | null;
  goalName: string;
}) {
  const router = useRouter();
  const [date, setDate] = useState(initialDate);
  const [entries, setEntries] = useState(initialEntries);
  const [loading, setLoading] = useState(false);
  const [addSlot, setAddSlot] = useState<(typeof MEALS)[number]["id"] | null>(null);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const [buildingShopping, setBuildingShopping] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current && date === initialDate) {
      mounted.current = true;
      return;
    }
    mounted.current = true;
    const controller = new AbortController();
    setLoading(true);
    fetch(`/api/planner?date=${date}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load the day.");
        return (await response.json()) as { entries: PlannerEntry[] };
      })
      .then((data) => setEntries(data.entries))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setMessage({ type: "error", text: "Unable to load this day." });
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [date, initialDate]);

  const recipeMap = useMemo(
    () => new Map(recipes.map((recipe) => [recipe.recipeId, recipe])),
    [recipes],
  );

  const totals = useMemo(
    () =>
      entries.reduce(
        (acc, entry) => ({
          calories: acc.calories + entry.calories,
          protein: acc.protein + entry.protein,
          carbs: acc.carbs + entry.carbs,
          fat: acc.fat + entry.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      ),
    [entries],
  );

  const remaining = targets ? targets.targetCalories - totals.calories : 0;
  const week = useMemo(() => {
    const today = todayISO();
    return Array.from({ length: 7 }, (_, index) => addDays(today, index - 3));
  }, []);

  const addMeal = MEALS.find((meal) => meal.id === addSlot);

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return recipes
      .filter((recipe) => {
        if (!query) return true;
        return (
          recipe.title.toLowerCase().includes(query) ||
          recipe.cuisine.toLowerCase().includes(query) ||
          recipe.mealType.toLowerCase().includes(query) ||
          recipe.dominantAroma.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (a.mealType === addSlot && b.mealType !== addSlot) return -1;
        if (b.mealType === addSlot && a.mealType !== addSlot) return 1;
        return b.finalScore - a.finalScore;
      });
  }, [recipes, search, addSlot]);

  async function assign(recipe: ScoredRecipe) {
    if (!addSlot) return;
    setAdding(recipe.recipeId);
    setMessage(null);
    try {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          mealType: addSlot,
          recipeId: recipe.recipeId,
          servings: 1,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage({ type: "error", text: data.error ?? "Unable to assign this meal." });
        return;
      }
      setEntries((current) => [...current, data.entry as PlannerEntry]);
      setMessage({ type: "ok", text: `${recipe.title} added to ${addSlot}.` });
      setAddSlot(null);
      setSearch("");
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Network unavailable." });
    } finally {
      setAdding(null);
    }
  }

  async function remove(entry: PlannerEntry) {
    setRemoving(entry.id);
    setMessage(null);
    try {
      const response = await fetch(`/api/planner/${entry.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        setMessage({ type: "error", text: data.error ?? "Unable to remove this meal." });
        return;
      }
      setEntries((current) => current.filter((item) => item.id !== entry.id));
      setMessage({ type: "ok", text: "Meal removed from the protocol." });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Network unavailable." });
    } finally {
      setRemoving(null);
    }
  }

  async function buildShoppingList() {
    setBuildingShopping(true);
    setMessage(null);
    try {
      const res = await fetch("/api/shopping/suggestions");
      if (res.ok) {
        const suggestions = await res.json();
        let added = 0;
        for (const item of suggestions) {
          await fetch("/api/shopping/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: item.name,
              quantity: item.quantity,
              unit: item.unit,
              reason: item.reason,
            }),
          });
          added++;
        }
        setMessage({
          type: "ok",
          text: `Added ${added} missing ingredients from meal plan to your shopping list.`,
        });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to generate shopping list." });
    } finally {
      setBuildingShopping(false);
    }
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow mb-2.5">Day protocol</div>
          <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            Compose your{" "}
            <span className="italic text-gold-gradient">day.</span>
          </h1>
          <p className="mt-2.5 max-w-[640px] text-[0.78rem] leading-6 text-[#8F8373]">
            Assign ranked dishes to breakfast, lunch, dinner and snacks. Calories
            and macros accumulate against your live {goalName.toLowerCase()} target.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={buildShoppingList}
            disabled={buildingShopping}
            className="btn btn-gold btn-sm"
          >
            {buildingShopping ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <ShoppingCart size={12} />
            )}
            Build Shopping List
          </button>
          <span className="chip chip-gold">
            <CalendarDays size={10} /> {dateLabel(date)}
          </span>
          <span className="chip">
            <UtensilsCrossed size={10} /> {entries.length} meals assigned
          </span>
        </div>
      </header>

      <section className="app-card p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDate((current) => addDays(current, -1))}
              className="icon-btn"
              aria-label="Previous day"
            >
              <ChevronLeft size={15} />
            </button>
            <div className="relative">
              <CalendarDays
                size={13}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6F665B]"
              />
              <input
                type="date"
                className="field !h-9 !w-[168px] !pl-8 text-[0.68rem]"
                value={date}
                onChange={(event) => event.target.value && setDate(event.target.value)}
                aria-label="Select day"
              />
            </div>
            <button
              type="button"
              onClick={() => setDate((current) => addDays(current, 1))}
              className="icon-btn"
              aria-label="Next day"
            >
              <ChevronRight size={15} />
            </button>
            <button
              type="button"
              onClick={() => setDate(todayISO())}
              className={cn("chip transition-colors", date === todayISO() && "chip-gold")}
            >
              Today
            </button>
            {loading && <Loader2 size={13} className="animate-spin text-[#E8B56A]" />}
          </div>

          <div className="flex flex-1 gap-1 overflow-x-auto pb-0.5 lg:justify-end">
            {week.map((day) => {
              const [, month, dayNumber] = day.split("-").map(Number);
              const active = day === date;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDate(day)}
                  className={cn(
                    "flex min-w-[52px] flex-col items-center rounded-xl border px-2 py-1.5 transition-all",
                    active
                      ? "border-[rgba(255,138,50,.4)] bg-[rgba(255,138,50,.09)]"
                      : "border-[rgba(232,181,106,.1)] bg-white/[0.012] hover:border-[rgba(232,181,106,.26)]",
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.4rem] uppercase tracking-[0.1em]",
                      active ? "text-[#FFB986]" : "text-[#6F665B]",
                    )}
                  >
                    {dateLabel(day).split(",")[0]}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 font-display text-[1.05rem] leading-none",
                      active ? "text-[#F3D3A1]" : "text-[#A79C8D]",
                    )}
                  >
                    {dayNumber}
                  </span>
                  <span className="mt-0.5 text-[0.36rem] uppercase tracking-[0.06em] text-[#5F574D]">
                    {monthName(month)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {message && (
        <div
          className={cn(
            "flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-[0.66rem]",
            message.type === "ok"
              ? "border-[rgba(143,169,137,.25)] bg-[rgba(143,169,137,.06)] text-[#B8CCB3]"
              : "border-[rgba(226,112,90,.28)] bg-[rgba(226,112,90,.06)] text-[#E9A091]",
          )}
        >
          {message.type === "ok" ? <Check size={13} className="mt-0.5" /> : <X size={13} className="mt-0.5" />}
          <span className="flex-1">{message.text}</span>
          <button type="button" onClick={() => setMessage(null)} aria-label="Dismiss">
            <X size={12} className="text-[#756D62]" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.28fr_0.72fr]">
        <div className="grid min-w-0 gap-3.5 sm:grid-cols-2">
          {MEALS.map((meal) => {
            const Icon = meal.icon;
            const mealEntries = entries.filter((entry) => entry.mealType === meal.id);
            const mealCalories = mealEntries.reduce(
              (total, entry) => total + entry.calories,
              0,
            );
            return (
              <section
                key={meal.id}
                className="app-card flex min-h-[190px] flex-col p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="grid h-8 w-8 place-items-center rounded-full border"
                      style={{
                        borderColor: `${meal.accent}44`,
                        background: `${meal.accent}12`,
                        color: meal.accent,
                      }}
                    >
                      <Icon size={14} />
                    </span>
                    <div>
                      <h2 className="font-display text-[1.2rem] leading-none text-[#F6EFE4]">
                        {meal.label}
                      </h2>
                      <div className="mt-0.5 text-[0.44rem] uppercase tracking-[0.1em] text-[#6F665B]">
                        {meal.window}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[0.6rem] tabular-nums text-[#D9C7AE]">
                      {formatNumber(mealCalories)}
                    </div>
                    <div className="text-[0.4rem] uppercase tracking-[0.1em] text-[#5F574D]">
                      kcal
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex-1 space-y-2">
                  {mealEntries.length === 0 ? (
                    <div className="grid h-full min-h-[86px] place-items-center rounded-xl border border-dashed border-[rgba(232,181,106,.14)] bg-white/[0.008] px-3 text-center">
                      <div>
                        <p className="text-[0.56rem] text-[#756D62]">
                          No dish assigned yet.
                        </p>
                        <button
                          type="button"
                          onClick={() => setAddSlot(meal.id)}
                          className="mt-1.5 inline-flex items-center gap-1 text-[0.5rem] uppercase tracking-[0.12em] text-[#C9A47D] transition-colors hover:text-[#FFB986]"
                        >
                          <Plus size={10} /> Assign dish
                        </button>
                      </div>
                    </div>
                  ) : (
                    mealEntries.map((entry) => {
                      const recipe = recipeMap.get(entry.recipeId);
                      return (
                        <div
                          key={entry.id}
                          className="group flex items-center gap-2.5 rounded-xl border border-[rgba(232,181,106,.12)] bg-[rgba(255,255,255,.014)] p-2"
                        >
                          <div
                            className="h-10 w-10 shrink-0 rounded-lg bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${recipe?.imageUrl ?? ""})`,
                              backgroundColor: "rgba(232,181,106,.06)",
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[0.64rem] text-[#E9DFD0]">
                              {recipe?.title ?? entry.recipeId}
                            </div>
                            <div className="mt-0.5 truncate text-[0.46rem] text-[#756D62]">
                              {formatNumber(entry.calories)} kcal ·{" "}
                              {formatNumber(entry.protein)}g P ·{" "}
                              {formatNumber(entry.carbs)}g C ·{" "}
                              {formatNumber(entry.fat)}g F
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(entry)}
                            disabled={removing !== null}
                            className="shrink-0 text-[#5F574D] transition-colors hover:text-[#E2705A]"
                            aria-label={`Remove ${recipe?.title ?? "meal"}`}
                          >
                            {removing === entry.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {mealEntries.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setAddSlot(meal.id)}
                    className="mt-2 flex items-center justify-center gap-1 rounded-lg border border-dashed border-[rgba(232,181,106,.14)] py-1.5 text-[0.46rem] uppercase tracking-[0.12em] text-[#756D62] transition-colors hover:border-[rgba(232,181,106,.32)] hover:text-[#E8B56A]"
                  >
                    <Plus size={10} /> Add another {meal.label.toLowerCase()}
                  </button>
                )}
              </section>
            );
          })}
        </div>

        <aside className="min-w-0 space-y-4 xl:sticky xl:top-[96px] xl:self-start">
          <section className="app-card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
                Day balance
              </h2>
              <span className="chip chip-gold !py-0.5 text-[0.44rem]">{goalName}</span>
            </div>
            {targets ? (
              <>
                <ConsumptionRings consumed={totals} targets={targets} />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-[rgba(232,181,106,.11)] bg-white/[0.014] px-3 py-2">
                    <div className="text-[0.42rem] uppercase tracking-[0.12em] text-[#6F665B]">
                      Remaining
                    </div>
                    <div
                      className={cn(
                        "mt-1 font-display text-[1.5rem] leading-none tabular-nums",
                        remaining < 0 ? "text-[#E9A091]" : "text-[#F3D3A1]",
                      )}
                    >
                      {formatNumber(Math.abs(remaining))}
                    </div>
                    <div className="mt-0.5 text-[0.4rem] uppercase tracking-[0.1em] text-[#5F574D]">
                      {remaining < 0 ? "kcal over" : "kcal left"}
                    </div>
                  </div>
                  <div className="rounded-lg border border-[rgba(232,181,106,.11)] bg-white/[0.014] px-3 py-2">
                    <div className="text-[0.42rem] uppercase tracking-[0.12em] text-[#6F665B]">
                      Meals
                    </div>
                    <div className="mt-1 font-display text-[1.5rem] leading-none text-[#EDE4D6] tabular-nums">
                      {entries.length}
                      <span className="text-sm text-[#756D62]"> / 4</span>
                    </div>
                    <div className="mt-0.5 text-[0.4rem] uppercase tracking-[0.1em] text-[#5F574D]">
                      slots filled
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-[rgba(232,181,106,.16)] px-4 py-6 text-center">
                <Flame size={18} className="mx-auto text-[#756D62]" />
                <p className="mt-2 text-[0.68rem] leading-5 text-[#8F8373]">
                  Set your biometrics to compare this day against a target.
                </p>
                <Link href="/app/nutrition" className="btn btn-ghost btn-sm mt-3">
                  Build targets
                </Link>
              </div>
            )}
          </section>

          <section className="app-card p-4 sm:p-5">
            <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
              Assignment rhythm
            </h2>
            <div className="mt-3 space-y-2">
              {MEALS.map((meal) => {
                const count = entries.filter((entry) => entry.mealType === meal.id).length;
                return (
                  <div key={meal.id} className="flex items-center gap-2.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: meal.accent }}
                    />
                    <span className="flex-1 text-[0.56rem] text-[#A79C8D]">{meal.label}</span>
                    <span className="text-[0.48rem] tabular-nums text-[#6F665B]">
                      {count} {count === 1 ? "dish" : "dishes"}
                    </span>
                    <div className="w-14 progress-track h-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min((count / 2) * 100, 100)}%`,
                          background: meal.accent,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 border-t border-[rgba(232,181,106,.1)] pt-3 text-[0.52rem] leading-4 text-[#5F574D]">
              Totals update from the recipe engine — not from manually entered
              calories. Each serving multiplies the dish&apos;s analysed macros.
            </p>
          </section>

          <section className="relative overflow-hidden rounded-[18px] border border-[rgba(255,138,50,.24)] bg-[linear-gradient(150deg,rgba(255,138,50,.09),rgba(12,11,10,.9))] p-4">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[#FF8A32]" />
              <h2 className="text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-[#FFB986]">
                Suggest a full day
              </h2>
            </div>
            <p className="mt-1.5 text-[0.58rem] leading-4 text-[#B3A798]">
              Fill the empty slots with the highest-scoring pantry matches.
            </p>
            <button
              type="button"
              onClick={() => setAddSlot(emptySlot(entries))}
              disabled={entries.length >= 4}
              className="btn btn-gold btn-sm mt-3 w-full"
            >
              <Plus size={12} />
              {entries.length >= 4 ? "Day complete" : "Fill next slot"}
            </button>
          </section>
        </aside>
      </div>

      <Dialog.Root
        open={addSlot !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAddSlot(null);
            setSearch("");
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[90] flex max-h-[88vh] w-[94vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[22px] border border-[rgba(232,181,106,.22)] bg-[#0c0b0a] shadow-[0_40px_120px_rgba(0,0,0,.7)] focus:outline-none">
            <div className="flex items-start justify-between gap-3 border-b border-[rgba(232,181,106,.12)] px-5 py-4">
              <div>
                <Dialog.Title className="font-display text-[1.7rem] leading-none text-[#F6EFE4]">
                  Assign {addMeal?.label.toLowerCase()}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-[0.52rem] uppercase tracking-[0.12em] text-[#756D62]">
                  {dateLabel(date)} · ranked by pantry fit and goal
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button type="button" className="icon-btn" aria-label="Close">
                  <X size={16} />
                </button>
              </Dialog.Close>
            </div>

            <div className="px-5 pt-4">
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6F665B]"
                />
                <input
                  className="field !pl-9 text-[0.72rem]"
                  placeholder="Search dish, cuisine or meal type…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="mt-3 flex-1 space-y-2 overflow-y-auto px-5 pb-5">
              {filteredRecipes.length === 0 ? (
                <div className="py-12 text-center">
                  <UtensilsCrossed size={22} className="mx-auto text-[#756D62]" />
                  <p className="mt-2 text-[0.68rem] text-[#8F8373]">
                    No dish matches that search.
                  </p>
                </div>
              ) : (
                filteredRecipes.map((recipe) => {
                  const missing = recipe.ingredientsMissing.filter(
                    (name) => !["salt", "oil", "water", "sugar"].includes(name),
                  );
                  const suggested = recipe.mealType === addSlot;
                  return (
                    <div
                      key={recipe.recipeId}
                      className="flex items-center gap-3 rounded-xl border border-[rgba(232,181,106,.11)] bg-[rgba(255,255,255,.012)] p-2.5 transition-colors hover:border-[rgba(232,181,106,.3)]"
                    >
                      <div
                        className="h-12 w-12 shrink-0 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[0.72rem] text-[#E9DFD0]">
                            {recipe.title}
                          </span>
                          {suggested && (
                            <span className="chip chip-gold !py-0.5 text-[0.4rem]">
                              {recipe.mealType}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.46rem] text-[#756D62]">
                          <span className="flex items-center gap-1">
                            <Clock size={9} /> {recipe.totalTimeMinutes} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame size={9} /> {formatNumber(recipe.calories)} kcal
                          </span>
                          <span>{recipe.protein}g P</span>
                          {missing.length > 0 && (
                            <span className="text-[#C9A47D]">
                              {missing.length} missing
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-display text-[1.2rem] leading-none text-[#F3D3A1]">
                          {Math.round(recipe.finalScore * 100)}
                        </div>
                        <button
                          type="button"
                          onClick={() => assign(recipe)}
                          disabled={adding !== null}
                          className="mt-1 inline-flex items-center gap-1 rounded-full border border-[rgba(232,181,106,.24)] bg-[rgba(232,181,106,.06)] px-2 py-0.5 text-[0.44rem] uppercase tracking-[0.08em] text-[#E8B56A] transition-colors hover:bg-[rgba(255,138,50,.14)]"
                        >
                          {adding === recipe.recipeId ? (
                            <Loader2 size={9} className="animate-spin" />
                          ) : (
                            <Plus size={9} />
                          )}
                          Add
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function emptySlot(entries: PlannerEntry[]) {
  return MEAL_IDS.find((meal) => !entries.some((entry) => entry.mealType === meal)) ?? "snack";
}

function monthName(month: number) {
  return new Intl.DateTimeFormat("en-IN", { month: "short" }).format(
    new Date(2026, month - 1, 1),
  );
}
