import { getNutritionProfile, normalizeIngredient } from "@/lib/flavor";
import type { NutritionAnalysis } from "@/lib/types";

type AnalyzeIngredient = { name: string; quantity?: number; unit?: string };

function gramsFor(
  name: string,
  quantity: number,
  unit: string,
): number {
  if (unit === "ml" || unit === "milliliter") return quantity;
  if (unit === "tbsp" || unit === "tablespoon") return quantity * 14;
  if (unit === "tsp" || unit === "teaspoon") return quantity * 4.5;
  if (unit === "pinch" || unit === "pinches") return quantity * 0.5;
  if (
    unit === "pieces" ||
    unit === "pods" ||
    unit === "cloves" ||
    unit === "large"
  ) {
    const norm = normalizeIngredient(name);
    if (norm.includes("egg")) return quantity * 50;
    if (norm.includes("garlic")) return quantity * 4;
    if (norm.includes("cardamom") || norm.includes("clove")) return quantity * 0.5;
    return quantity * 20;
  }
  return quantity;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Ported 1:1 from NutritionService.calculate_nutrition. */
export function analyzeNutrition(
  ingredients: AnalyzeIngredient[],
  servings = 2,
): NutritionAnalysis {
  let totalCal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFibre = 0;
  let totalSugar = 0;
  let totalSodium = 0;
  let totalSatFat = 0;
  let totalIron = 0;
  let totalCalcium = 0;
  let totalVitC = 0;

  const breakdowns: NutritionAnalysis["ingredientBreakdown"] = [];

  for (const item of ingredients) {
    const rawName = item.name ?? "";
    const qty = Number(item.quantity ?? 50);
    const unit = String(item.unit ?? "g").toLowerCase();
    const grams = gramsFor(rawName, qty, unit);
    const profile = getNutritionProfile(rawName);

    if (profile) {
      const p100 = profile.per_100g;
      const factor = grams / 100;
      const cCal = (p100.calories ?? 0) * factor;
      const cProt = (p100.protein ?? 0) * factor;
      const cCarb = (p100.carbs ?? 0) * factor;
      const cFat = (p100.fat ?? 0) * factor;

      totalCal += cCal;
      totalProtein += cProt;
      totalCarbs += cCarb;
      totalFat += cFat;
      totalFibre += (p100.fibre ?? 0) * factor;
      totalSugar += (p100.sugar ?? 0) * factor;
      totalSodium += (p100.sodium_mg ?? 0) * factor;
      totalSatFat += (p100.saturated_fat ?? 0) * factor;
      totalIron += (p100.iron_mg ?? 0) * factor;
      totalCalcium += (p100.calcium_mg ?? 0) * factor;
      totalVitC += (p100.vitamin_c_mg ?? 0) * factor;

      breakdowns.push({
        ingredient: profile.name,
        amount: `${qty} ${unit} (${r1(grams)}g)`,
        calories: r1(cCal),
        proteinG: r1(cProt),
        carbsG: r1(cCarb),
        fatG: r1(cFat),
        primaryContribution:
          cProt > 5 || cFat > 5
            ? "Protein & Fat"
            : cCarb > 5
              ? "Carbs & Micronutrients"
              : "Aromatics & Spices",
      });
    } else {
      breakdowns.push({
        ingredient: rawName
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        amount: `${qty} ${unit}`,
        calories: 10,
        proteinG: 0.2,
        carbsG: 1.5,
        fatG: 0.2,
        primaryContribution: "Aromatics & Flavoring (Estimated)",
      });
    }
  }

  const safeServings = Math.max(1, servings);

  return {
    caloriesTotal: r1(totalCal),
    caloriesPerServing: r1(totalCal / safeServings),
    proteinTotal: r1(totalProtein),
    proteinPerServing: r1(totalProtein / safeServings),
    carbsTotal: r1(totalCarbs),
    carbsPerServing: r1(totalCarbs / safeServings),
    fatTotal: r1(totalFat),
    fatPerServing: r1(totalFat / safeServings),
    fibreTotal: r1(totalFibre),
    fibrePerServing: r1(totalFibre / safeServings),
    sugarTotal: r1(totalSugar),
    sodiumTotalMg: r1(totalSodium),
    saturatedFatG: r1(totalSatFat),
    micronutrients: {
      Iron: `${r1(totalIron / safeServings)} mg`,
      Calcium: `${r1(totalCalcium / safeServings)} mg`,
      "Vitamin C": `${r1(totalVitC / safeServings)} mg`,
    },
    ingredientBreakdown: breakdowns,
    dataSource: "computational_nutrition_profile (Food Composition Database)",
    isEstimate: true,
  };
}
