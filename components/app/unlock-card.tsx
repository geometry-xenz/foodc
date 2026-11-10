"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Loader2, Plus, Sparkles } from "lucide-react";
import type { UnlockRecommendation } from "@/lib/types";

export function UnlockCard({
  unlock,
  compact = false,
}: {
  unlock: UnlockRecommendation | null;
  compact?: boolean;
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  if (!unlock) {
    return (
      <div className="app-card p-5">
        <div className="flex items-center gap-2 text-[0.52rem] uppercase tracking-[0.18em] text-[#8B7E6D]">
          <Sparkles size={12} className="text-[#E8B56A]" /> One ingredient away
        </div>
        <h3 className="mt-2 font-display text-2xl text-[#F6EFE4]">Your pantry is fully connected.</h3>
        <p className="mt-1.5 text-[0.72rem] leading-5 text-[#8F8373]">
          No recipe is blocked by a single missing ingredient with a positive
          molecular pairing. Add a new staple to reveal the next unlock.
        </p>
        <Link href="/app/pantry" className="btn btn-ghost btn-sm mt-4">
          Expand pantry <ArrowUpRight size={13} />
        </Link>
      </div>
    );
  }

  async function addIngredient() {
    setAdding(true);
    setError("");
    try {
      const response = await fetch("/api/pantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: unlock!.ingredient,
          category: "Spices",
          quantity: 50,
          unit: "g",
          source: "unlock",
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Unable to add ingredient.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network unavailable.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-[rgba(255,138,50,.32)] bg-[linear-gradient(150deg,rgba(255,138,50,.13),rgba(30,21,13,.55)_45%,rgba(12,11,10,.92))] ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,138,50,.2),transparent_70%)] blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-[#FFB986]">
            <Sparkles size={12} /> The single unlock
          </div>
          <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
            <h2 className="break-words font-display text-[2.2rem] leading-none text-[#F6EFE4] sm:text-[2.7rem]">
              {unlock.displayName}
            </h2>
            <span className="mb-1 text-[0.56rem] uppercase tracking-[0.14em] text-[#E8B56A]">
              +{unlock.unlockedCount} {unlock.unlockedCount === 1 ? "dish" : "dishes"}
            </span>
          </div>
          <p className="mt-2 max-w-[560px] text-[0.72rem] leading-5 text-[#B3A798]">
            {unlock.description}
          </p>
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
          <div className="font-display text-[1.8rem] leading-none text-[#F3D3A1]">
            {Math.round(unlock.pairingScore * 100)}%
          </div>
          <div className="text-[0.42rem] uppercase tracking-[0.16em] text-[#8B7E6D]">
            pairwise affinity
          </div>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {unlock.unlockedDishes.slice(0, compact ? 2 : 4).map((dish) => (
          <div
            key={dish.recipeId}
            className="flex items-center gap-2.5 rounded-xl border border-[rgba(232,181,106,.13)] bg-[rgba(8,8,8,.35)] p-2"
          >
            <div
              className="h-10 w-10 shrink-0 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${dish.imageUrl})` }}
            />
            <div className="min-w-0">
              <div className="truncate text-[0.66rem] text-[#E9DFD0]">{dish.title}</div>
              <div className="text-[0.48rem] uppercase tracking-[0.1em] text-[#756D62]">
                {dish.calories} kcal · {dish.protein}g protein
              </div>
            </div>
          </div>
        ))}
      </div>

      {unlock.sharedCompounds.length > 0 && (
        <div className="relative mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-[0.46rem] uppercase tracking-[0.14em] text-[#756D62]">
            Shared volatiles
          </span>
          {unlock.sharedCompounds.map((compound) => (
            <span
              key={compound}
              className="rounded-full border border-[rgba(255,138,50,.2)] bg-[rgba(255,138,50,.05)] px-1.5 py-0.5 text-[0.46rem] text-[#E7C49D]"
            >
              {compound}
            </span>
          ))}
        </div>
      )}

      <div className="relative mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addIngredient}
          disabled={adding}
          className="btn btn-gold btn-sm"
        >
          {adding ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          Add to pantry
        </button>
        <Link
          href="/app/recipes"
          className="text-[0.56rem] uppercase tracking-[0.14em] text-[#C9B79F] transition-colors hover:text-[#E8B56A]"
        >
          View unlocked dishes →
        </Link>
        {error && <span className="text-[0.55rem] text-[#E9A091]">{error}</span>}
      </div>

      {unlock.alternatives.length > 0 && (
        <div className="relative mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[rgba(232,181,106,.1)] pt-3 text-[0.48rem] text-[#756D62]">
          <span className="uppercase tracking-[0.14em] text-[#5F574D]">Alternatives</span>
          {unlock.alternatives.map((alt) => (
            <span key={alt.ingredient}>
              {alt.displayName} · {alt.unlockedCount}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
