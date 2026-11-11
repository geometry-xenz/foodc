import { api } from "@/lib/api";
import { PantryManager } from "@/components/app/pantry-manager";
import type { PantryDto } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PantryPage() {
  const [pantryRes, catalogRes] = await Promise.all([
    api.get<any[]>("/api/pantry").catch(() => []),
    api.get<any[]>("/api/pantry/catalog").catch(() => []),
  ]);

  const pantry: PantryDto[] = (pantryRes || [])
    .slice()
    .sort((a: any, b: any) =>
      (a.category || "").localeCompare(b.category || "") ||
      (a.name || "").localeCompare(b.name || ""),
    )
    .map((item: any) => ({
      id: String(item.id),
      name: item.name,
      displayName: item.displayName || item.name.charAt(0).toUpperCase() + item.name.slice(1),
      category: item.category || "Pantry",
      quantity: Number(item.quantity) || 100,
      unit: item.unit || "g",
      isAvailable: item.isAvailable ?? true,
      source: item.source || "manual",
      confidence: Number(item.confidence) || 1.0,
    }));

  const catalog = (catalogRes || []).map((item: any) => ({
    name: item.name,
    displayName: item.displayName || item.name.charAt(0).toUpperCase() + item.name.slice(1),
    category: item.category || "Pantry",
    calories: item.calories || 0,
    protein: item.protein || 0,
    compounds: item.compounds || [],
  }));

  return <PantryManager initialPantry={pantry} catalog={catalog} />;
}
