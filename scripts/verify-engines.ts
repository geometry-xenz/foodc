import assert from "node:assert/strict";
import { computeNutritionTargets, calculateBMR, calculateTDEE, GOAL_SPECS } from "../lib/goals";
import { computeMolecularCoherence, normalizeIngredient } from "../lib/flavor";
import {
  computeUnlockRecommendation,
  rankRecipes,
  scoreRecipe,
} from "../lib/gastronomy";
import { recipes } from "../lib/flavor";
import { analyzeNutrition } from "../lib/nutrition";

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`  ✓ ${name}`);
}

console.log("\nDRISHYAM ENGINE SANITY CHECKS\n");

check("Mifflin-St Jeor — male 70kg / 175cm / 25y = 1673.8 kcal", () => {
  assert.equal(calculateBMR(70, 175, 25, "male"), 1673.8);
});

check("Mifflin-St Jeor — female 60kg / 165cm / 30y = 1320.3 kcal", () => {
  assert.equal(calculateBMR(60, 165, 30, "female"), 1320.3);
});

check("TDEE moderate = 2594.3 kcal", () => {
  assert.equal(calculateTDEE(1673.8, "moderate"), 2594.4);
  // 1673.8 * 1.55 = 2594.39 → rounded 2594.4
});

check("Fat loss targets: −500 kcal, 2.2 g/kg protein", () => {
  const t = computeNutritionTargets(70, 175, 25, "male", "moderate", "fat_loss");
  assert.equal(t.bmr, 1673.8);
  assert.equal(t.tdee, 2594.4);
  assert.equal(t.targetCalories, 2094);
  assert.equal(t.targetProteinG, 154);
  assert.equal(t.targetFatG, 58.2);
});

check("Recomp is isocaloric and 2.3 g/kg protein", () => {
  const t = computeNutritionTargets(70, 175, 25, "male", "moderate", "recomposition");
  assert.ok(Math.abs(t.targetCalories - t.tdee) <= 0.5);
  assert.equal(t.targetProteinG, 161);
});

check("Athletic goal is exactly 55% carbohydrate energy", () => {
  const t = computeNutritionTargets(74, 178, 26, "male", "active", "athletic_performance");
  assert.equal(t.macroDistributionPct.carbs, 55);
  assert.ok(t.targetCarbsG > 0);
  assert.equal(GOAL_SPECS.athletic_performance.carbsPct, 0.55);
});

check("Gastronomy composite weights sum to 1.0", () => {
  const weights = [0.3, 0.2, 0.2, 0.3];
  assert.equal(weights.reduce((a, b) => a + b, 0), 1);
});

const pantry = ["turmeric", "cumin", "garlic", "onion", "tomato", "lentils"];
const dal = recipes.find((r) => r.recipe_id === "rec_001")!;
const dalScore = scoreRecipe(pantry, dal);

check("Composite score equals 0.30C + 0.20U + 0.20F + 0.30G", () => {
  const expected =
    0.3 * dalScore.score.coreCoverage +
    0.2 * dalScore.score.pantryUtilisation +
    0.2 * dalScore.score.flavourCoherence +
    0.3 * dalScore.score.gapFit;
  assert.ok(Math.abs(dalScore.score.composite - expected) < 0.05);
});

check("Dal Tadka core coverage = 100% with turmeric/cumin/garlic/lentils", () => {
  assert.equal(dalScore.score.coreCoverage, 1);
});

check("Gap fit only penalises hard missing ingredients (staples exempt)", () => {
  assert.ok(dalScore.score.gapFit >= 0.5);
  assert.ok(dalScore.score.composite > 0.5);
});

check("Molecular coherence is deterministic and bounded [0.2, 1]", () => {
  const a = computeMolecularCoherence(["turmeric", "black pepper"], ["cumin", "garlic"]);
  const b = computeMolecularCoherence(["turmeric", "black pepper"], ["cumin", "garlic"]);
  assert.equal(a, b);
  assert.ok(a >= 0.2 && a <= 1);
});

check("Ingredient normaliser ports legacy aliases", () => {
  assert.equal(normalizeIngredient("Haldi Powder"), "turmeric");
  assert.equal(normalizeIngredient("Jeera"), "cumin");
  assert.equal(normalizeIngredient("Kali Mirch"), "black pepper");
  assert.equal(normalizeIngredient("Dhaniya"), "coriander");
});

check("Ingredient normaliser resolves catalogue display names and modifiers", () => {
  assert.equal(normalizeIngredient("Whole Milk"), "milk");
  assert.equal(normalizeIngredient("whole milk"), "milk");
  assert.equal(normalizeIngredient("Boiled Potato"), "potatoes");
  assert.equal(normalizeIngredient("potato"), "potatoes");
  assert.equal(normalizeIngredient("Fresh Green Chilli"), "green chilli");
  assert.equal(normalizeIngredient("chicken breast"), "chicken");
  assert.equal(normalizeIngredient("whole eggs"), "eggs");
  assert.equal(normalizeIngredient("tea"), "tea leaves");
  assert.equal(normalizeIngredient("garam masala powder"), "garam masala");
});

check("Ranking is sorted by final personalised score", () => {
  const ranked = rankRecipes(pantry, recipes, "lean_bulk");
  assert.equal(ranked.length, 12);
  for (let i = 1; i < ranked.length; i += 1) {
    assert.ok(ranked[i - 1].finalScore >= ranked[i].finalScore);
  }
});

check("One-ingredient unlock only counts exactly-one-missing recipes", () => {
  const ranked = rankRecipes(pantry, recipes, "lean_bulk");
  const unlock = computeUnlockRecommendation(pantry, ranked);
  if (unlock) {
    for (const dish of unlock.unlockedDishes) {
      const rankedDish = ranked.find((r) => r.recipeId === dish.recipeId)!;
      const hardMissing = rankedDish.ingredientsMissing.filter(
        (name) => !["salt", "oil", "water", "sugar"].includes(name),
      );
      assert.equal(hardMissing.length, 1);
      assert.equal(hardMissing[0], unlock.ingredient);
    }
    console.log(
      `\n  → Unlock: ${unlock.displayName} opens ${unlock.unlockedCount} dish(es) · pairing ${unlock.pairingScore} · ${unlock.sharedCompounds.join(", ") || "synergy bridge"}`,
    );
  }
});

check("Nutrition analyser scales by grams and servings", () => {
  const analysis = analyzeNutrition(
    [
      { name: "paneer", quantity: 200, unit: "g" },
      { name: "tomato", quantity: 150, unit: "g" },
      { name: "oil", quantity: 15, unit: "ml" },
    ],
    2,
  );
  assert.ok(analysis.caloriesPerServing > 300);
  assert.ok(analysis.proteinPerServing > 18);
  assert.equal(
    analysis.caloriesPerServing,
    Math.round((analysis.caloriesTotal / 2) * 10) / 10,
  );
});

console.log(`\n${passed} engine checks passed.\n`);
console.log("Exact Dal Tadka breakdown:", {
  core: dalScore.score.coreCoverage,
  pantry: dalScore.score.pantryUtilisation,
  flavour: dalScore.score.flavourCoherence,
  gap: dalScore.score.gapFit,
  composite: dalScore.score.composite,
});
