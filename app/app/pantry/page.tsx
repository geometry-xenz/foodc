import { prisma } from "@/lib/db";
import { getCurrentUserWithContext } from "@/lib/auth";
import { getCompoundCompounds } from "@/lib/flavor";
import { PantryManager } from "@/components/app/pantry-manager";
import type { PantryDto } from "@/lib/serializers";

export const dynamic = "force-dynamic";

export default async function PantryPage() {
  const user = await getCurrentUserWithContext();
  if (!user) return null;

  const ingredients = await prisma.ingredient.findMany({
    orderBy: [{ category: "asc" }, { displayName: "asc" }],
  });

  const pantry: PantryDto[] = user.pantry
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category) || a.displayName.localeCompare(b.displayName))
    .map((item) => ({
      id: item.id,
      name: item.name,
      displayName: item.displayName,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      isAvailable: item.isAvailable,
      source: item.source,
      confidence: item.confidence,
    }));

  const catalog = ingredients.map((item) => ({
    name: item.name,
    displayName: item.displayName,
    category: item.category,
    calories: item.calories,
    protein: item.protein,
    compounds: getCompoundCompounds(item.name),
  }));

  return <PantryManager initialPantry={pantry} catalog={catalog} />;
}
