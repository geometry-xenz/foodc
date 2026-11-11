import { api } from "@/lib/api";
import { SavedRecipesWorkspace } from "@/components/saved-recipes-workspace";

export const metadata = {
  title: "Saved Cookbook · Recipes — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function SavedRecipesPage() {
  let saved: any[] = [];
  try {
    const res = await api.get<any[]>("/api/saved");
    if (Array.isArray(res)) saved = res;
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#E8B56A]">
          Cookbook · Bookmarked Dishes
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#F6EFE4]">
          Saved Recipes
        </h1>
        <p className="max-w-2xl text-xs text-[#A79C8D] leading-relaxed">
          Your personal library of bookmarked culinary preparations.
          Access instructions and enter Cooking Mode anytime.
        </p>
      </div>

      <SavedRecipesWorkspace initialSaved={saved} />
    </div>
  );
}
