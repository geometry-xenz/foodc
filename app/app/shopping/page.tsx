import { api } from "@/lib/api";
import { ShoppingWorkspace } from "@/components/shopping-workspace";

export const metadata = {
  title: "Shopping List · Smart Deficits — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function ShoppingPage() {
  let items: any[] = [];
  let suggestions: any[] = [];

  try {
    const [itRes, sugRes] = await Promise.all([
      api.get<any[]>("/api/shopping"),
      api.get<any[]>("/api/shopping/suggestions"),
    ]);
    if (Array.isArray(itRes)) items = itRes;
    if (Array.isArray(sugRes)) suggestions = sugRes;
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#E8B56A]">
          Pantry Replenishment · Plan-Aware Deficits
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#F6EFE4]">
          Shopping List
        </h1>
        <p className="max-w-2xl text-xs text-[#A79C8D] leading-relaxed">
          Smart ingredient deficits calculated directly from your active meal protocol
          minus items already in stock in your live pantry inventory.
        </p>
      </div>

      <ShoppingWorkspace
        initialItems={items}
        initialSuggestions={suggestions}
      />
    </div>
  );
}
