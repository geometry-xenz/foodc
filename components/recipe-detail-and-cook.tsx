"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CookingPot,
  Flame,
  Loader2,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Sparkles,
  Utensils,
  Volume2,
} from "lucide-react";

interface RecipeDetailProps {
  recipe: {
    id: string;
    title: string;
    cuisine: string;
    diet: string;
    minutes: number;
    servings: number;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g?: number;
    ingredients: Array<{
      name: string;
      quantity: number;
      unit: string;
      provenance?: string;
    }>;
    instructions: string[];
    instruction_steps?: Array<{ step: number; text: string }>;
  };
  isSavedInitial?: boolean;
}

export function RecipeDetailAndCook({ recipe, isSavedInitial = false }: RecipeDetailProps) {
  const router = useRouter();
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const [savingBookmark, setSavingBookmark] = useState(false);
  const [loggingMeal, setLoggingMeal] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  // Timer states in cooking mode
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const steps = recipe.instruction_steps?.map((s) => s.text) || recipe.instructions || [
    "Prepare ingredients and heat pan.",
    "Follow recipe execution steps.",
    "Serve hot.",
  ];

  // Screen Wake Lock API (§5.8)
  useEffect(() => {
    let wakeLockSentinel: any = null;

    async function requestWakeLock() {
      if (cookingMode && "wakeLock" in navigator) {
        try {
          wakeLockSentinel = await (navigator as any).wakeLock.request("screen");
          setWakeLockActive(true);
        } catch {
          // wake lock denied or unsupported
        }
      }
    }

    if (cookingMode) {
      requestWakeLock();
    } else {
      if (wakeLockSentinel) {
        wakeLockSentinel.release();
        wakeLockSentinel = null;
      }
      setWakeLockActive(false);
    }

    return () => {
      if (wakeLockSentinel) {
        wakeLockSentinel.release();
      }
    };
  }, [cookingMode]);

  // Arrow key navigation in cooking mode (§5.8)
  useEffect(() => {
    if (!cookingMode) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        setCookingMode(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cookingMode, steps.length]);

  // Timer tick
  useEffect(() => {
    let interval: any;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  async function handleToggleBookmark() {
    setSavingBookmark(true);
    try {
      if (isSaved) {
        await fetch(`/api/recipes/${recipe.id}/save`, { method: "DELETE" });
        setIsSaved(false);
      } else {
        await fetch(`/api/recipes/${recipe.id}/save`, { method: "POST" });
        setIsSaved(true);
      }
    } catch {
      // error
    } finally {
      setSavingBookmark(false);
    }
  }

  async function handleFinishAndLog() {
    setLoggingMeal(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      await fetch("/api/nutrition/meal-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: today,
          meal_type: "dinner",
          items: [
            {
              name: recipe.title,
              recipe_id: recipe.id,
              servings: 1,
              calories: recipe.calories,
              protein_g: recipe.protein_g,
              carbs_g: recipe.carbs_g,
              fat_g: recipe.fat_g,
            },
          ],
          notes: "Prepared via DRISHYAM Cooking Mode",
        }),
      });
      router.push("/app/meal-history");
    } catch {
      // error
    } finally {
      setLoggingMeal(false);
    }
  }

  // Fullscreen Cooking Mode
  if (cookingMode) {
    const progress = Math.round(((currentStep + 1) / steps.length) * 100);
    const formatTime = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080808] text-[#F6EFE4] p-6 sm:p-10 select-none">
        {/* Top cooking bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCookingMode(false)}
              className="icon-btn !h-9 !w-9"
            >
              <Minimize2 size={16} />
            </button>
            <div>
              <span className="text-[0.62rem] uppercase tracking-wider text-[#E8B56A]">
                Cooking Mode · {wakeLockActive ? "Screen Awake" : "Ambient"}
              </span>
              <h2 className="font-display text-xl font-semibold">{recipe.title}</h2>
            </div>
          </div>

          {/* Kitchen Timer */}
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
            <Clock size={15} className="text-[#E8B56A]" />
            <span className="font-mono text-base font-semibold">
              {formatTime(timerSeconds)}
            </span>
            {timerRunning ? (
              <button
                type="button"
                onClick={() => setTimerRunning(false)}
                className="text-xs text-amber-300 hover:underline"
              >
                Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (timerSeconds === 0) setTimerSeconds(300); // default 5 min
                  setTimerRunning(true);
                }}
                className="text-xs text-[#E8B56A] hover:underline"
              >
                {timerSeconds > 0 ? "Resume" : "+5m Timer"}
              </button>
            )}
            {timerSeconds > 0 && (
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className="text-xs text-[#756D62] hover:text-white"
              >
                <RotateCcw size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Center: Current Instruction Step with Large Display Typography */}
        <div className="mx-auto max-w-3xl my-auto py-8 text-center space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#E8B56A] font-semibold">
            Step {currentStep + 1} of {steps.length}
          </div>
          <p className="font-display text-3xl sm:text-5xl font-medium leading-[1.2] text-balance text-[#F6EFE4]">
            {steps[currentStep]}
          </p>
        </div>

        {/* Bottom controls & progression */}
        <div className="space-y-4 max-w-3xl mx-auto w-full">
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E8B56A] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
              className="btn btn-ghost"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                className="btn btn-gold px-8"
              >
                Next Step <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishAndLog}
                disabled={loggingMeal}
                className="btn btn-gold px-8"
              >
                {loggingMeal ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={16} />
                )}
                Finish & Log Meal
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Normal Detail View
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/app/recipes"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B7E6D] hover:text-[#E8B56A] transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Back to Recipe Discovery
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded px-2 py-0.5 text-[0.62rem] uppercase tracking-wider font-semibold bg-[#E8B56A]/15 text-[#E8B56A]">
                {recipe.cuisine || "Indian"}
              </span>
              <span className="rounded px-2 py-0.5 text-[0.62rem] uppercase tracking-wider font-semibold bg-white/10 text-[#A79C8D]">
                {recipe.diet || "Vegetarian"}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F6EFE4]">
              {recipe.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleBookmark}
              disabled={savingBookmark}
              className="btn btn-ghost"
            >
              <Bookmark
                size={16}
                className={isSaved ? "fill-[#E8B56A] text-[#E8B56A]" : ""}
              />
              {isSaved ? "Saved" : "Save Recipe"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCookingMode(true);
                setCurrentStep(0);
              }}
              className="btn btn-gold"
            >
              <CookingPot size={16} />
              Enter Cooking Mode
            </button>
          </div>
        </div>
      </div>

      {/* Macros / Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
          <div className="text-[0.6rem] uppercase tracking-wider text-[#756D62]">Cook Time</div>
          <div className="font-display text-xl text-[#F6EFE4] mt-1">{recipe.minutes || 30}m</div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
          <div className="text-[0.6rem] uppercase tracking-wider text-[#756D62]">Calories</div>
          <div className="font-display text-xl text-[#FF8A32] mt-1">
            {Math.round(recipe.calories)} kcal
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
          <div className="text-[0.6rem] uppercase tracking-wider text-[#756D62]">Protein</div>
          <div className="font-display text-xl text-[#8FA989] mt-1">
            {Math.round(recipe.protein_g)}g
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
          <div className="text-[0.6rem] uppercase tracking-wider text-[#756D62]">Carbohydrates</div>
          <div className="font-display text-xl text-[#F3D3A1] mt-1">
            {Math.round(recipe.carbs_g)}g
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
          <div className="text-[0.6rem] uppercase tracking-wider text-[#756D62]">Fat</div>
          <div className="font-display text-xl text-[#C9A15C] mt-1">
            {Math.round(recipe.fat_g)}g
          </div>
        </div>
      </div>

      {/* Grid: Ingredients & Steps */}
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Ingredients Checklist */}
        <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">Ingredients</h3>
            <span className="text-xs text-[#756D62]">{recipe.servings} Servings</span>
          </div>
          <ul className="space-y-2.5">
            {recipe.ingredients.map((ing, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-xs py-1.5 border-b border-white/[0.03]"
              >
                <span className="text-[#F6EFE4] font-medium">{ing.name}</span>
                <span className="font-mono text-[#8B7E6D]">
                  {ing.quantity} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preparation Steps */}
        <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">
              Preparation Steps
            </h3>
            <span className="text-xs text-[#756D62]">{steps.length} Steps</span>
          </div>
          <ol className="space-y-4">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4 text-xs leading-relaxed">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8B56A]/10 text-[0.65rem] font-bold text-[#E8B56A]">
                  {idx + 1}
                </span>
                <p className="text-[#D1C7BA] pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
