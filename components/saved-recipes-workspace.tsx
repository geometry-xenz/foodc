"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, Clock, Flame, Loader2, Trash2, UtensilsCrossed, ArrowRight } from "lucide-react";

interface SavedRecipeItem {
  id: string;
  recipe_id: string;
  saved_at: string;
  recipe: {
    id: string;
    title: string;
    cuisine: string;
    diet: string;
    minutes: number;
    calories: number;
    protein_g: number;
  };
}

export function SavedRecipesWorkspace({ initialSaved }: { initialSaved: SavedRecipeItem[] }) {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedRecipeItem[]>(initialSaved);
  const [removingId, setRemovingId] = useState<string | null>(null);

  async function handleUnsave(recipeId: string) {
    setRemovingId(recipeId);
    try {
      const res = await fetch(`/api/recipes/${recipeId}/save`, { method: "DELETE" });
      if (res.ok) {
        setSaved((prev) => prev.filter((s) => s.recipe.id !== recipeId && s.recipe_id !== recipeId));
        router.refresh();
      }
    } catch {
      // error
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-[#8B7E6D]">
        <span>{saved.length} recipes saved to your cookbook</span>
        <Link href="/app/recipes" className="text-[#E8B56A] hover:underline flex items-center gap-1">
          Explore more recipes <ArrowRight size={13} />
        </Link>
      </div>

      {saved.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-12 text-center">
          <Bookmark size={32} className="mx-auto text-[#756D62] mb-3" />
          <h3 className="font-display text-lg text-[#F6EFE4]">No Saved Recipes Yet</h3>
          <p className="mt-1 text-xs text-[#8B7E6D]">
            Bookmark recipes from the discovery workspace to build your personal culinary library.
          </p>
          <Link href="/app/recipes" className="btn btn-gold btn-sm mt-4 inline-flex">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((item) => {
            const r = item.recipe;
            return (
              <div
                key={item.id || r.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-[rgba(232,181,106,.3)] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#756D62] mb-2">
                    <span className="rounded px-2 py-0.5 text-[0.6rem] uppercase tracking-wider font-semibold bg-[#E8B56A]/10 text-[#E8B56A]">
                      {r.cuisine || "Indian"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUnsave(r.id)}
                      disabled={removingId === r.id}
                      className="text-[#756D62] hover:text-red-400 transition-colors"
                      title="Remove from saved"
                    >
                      {removingId === r.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Bookmark size={15} className="fill-[#E8B56A] text-[#E8B56A]" />
                      )}
                    </button>
                  </div>

                  <Link href={`/app/recipes/${r.id}`}>
                    <h3 className="font-display text-lg font-semibold text-[#F6EFE4] group-hover:text-[#E8B56A] transition-colors">
                      {r.title}
                    </h3>
                  </Link>

                  <div className="mt-3 flex items-center gap-4 text-xs text-[#8B7E6D]">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {r.minutes || 30}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={13} className="text-[#FF8A32]" /> {Math.round(r.calories || 400)} kcal
                    </span>
                    <span>{Math.round(r.protein_g || 25)}g pro</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <Link
                    href={`/app/recipes/${r.id}`}
                    className="text-xs text-[#E8B56A] hover:underline flex items-center gap-1"
                  >
                    View & Cook <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
