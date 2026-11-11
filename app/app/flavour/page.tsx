import { FlavourGraph } from "@/components/three/flavour-graph";
import { api } from "@/lib/api";

export const metadata = {
  title: "Aroma Network · 3D Flavour Graph — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function FlavourWorkspacePage() {
  let pantryIngredients = "";
  try {
    const pantryItems = await api.get<any[]>("/api/pantry");
    if (Array.isArray(pantryItems) && pantryItems.length > 0) {
      pantryIngredients = pantryItems.slice(0, 12).map((i) => i.name).join(",");
    }
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#E8B56A]">
          Volatile Compound Cartography · FlavorDB
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#F6EFE4]">
          Molecular Aroma Network
        </h1>
        <p className="max-w-2xl text-xs text-[#A79C8D] leading-relaxed">
          Explore volatile organic compounds bridging your pantry. Ingredients sit on the
          Fibonacci sphere; shared volatile molecules sit at the centroids between the spices they connect.
        </p>
      </div>

      <FlavourGraph initialIngredients={pantryIngredients} />
    </div>
  );
}
