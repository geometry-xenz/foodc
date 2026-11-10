/** FlavorDB botanical categories mapped to the pantry UI taxonomy. */
export const INGREDIENT_CATEGORY_MAP: Record<string, string> = {
  Spice: "Spices",
  "Aromatic / Vegetable": "Vegetables",
  "Aromatic / Root": "Vegetables",
  "Vegetable / Fruit": "Vegetables",
  "Vegetable / Chilli": "Vegetables",
  "Vegetable / Tuber": "Vegetables",
  "Produce / Citrus": "Fruits",
  "Herb / Spice": "Herbs",
  Legumes: "Legumes",
  Grains: "Grains",
  Dairy: "Dairy",
  "Beverage Base": "Other",
  "Spice Blend": "Spices",
  Fat: "Oils",
  Mineral: "Other",
  Sweetener: "Other",
};

export function categoryForEntity(category?: string): string | null {
  if (!category) return null;
  return INGREDIENT_CATEGORY_MAP[category] ?? "Other";
}
