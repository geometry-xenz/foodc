import test from "node:test";
import assert from "node:assert/strict";
import { norm, dietOk, allergyOk, scoreRecipe, rankRecipes, computeUnlockSuggestion } from "./gastronomy";
import { fibonacciSphere, computeFlavourGraph3D } from "./flavour-graph";
import { calculateBmr, calculateTdee, calculateMacroTargets } from "./goals";

test("norm normalizes plurals, whitespace, and culinary adjectives", () => {
  assert.equal(norm("Fresh Chopped Tomatoes!"), "tomato");
  assert.equal(norm("Dried Cumin Seeds"), "cumin seed");
  assert.equal(norm("Berries"), "berry");
});

test("dietOk enforces strict vegan, vegetarian, and pescatarian filters", () => {
  assert.equal(dietOk("vegan", "vegan"), true);
  assert.equal(dietOk("vegetarian", "vegan"), false);
  assert.equal(dietOk("non-vegetarian", "vegetarian"), false);
  assert.equal(dietOk("vegan", "vegetarian"), true);
  assert.equal(dietOk("pescatarian", "pescatarian"), true);
});

test("allergyOk blocks recipes containing user allergens", () => {
  assert.equal(allergyOk(["peanut oil", "cumin", "turmeric"], ["peanuts"]), false);
  assert.equal(allergyOk(["tomato", "onion", "garlic"], ["peanuts", "shellfish"]), true);
});

test("scoreRecipe computes Mise 0.30 core + 0.20 util + 0.20 flavour + 0.30 gap fit", () => {
  const recipe = {
    id: "rec_test",
    title: "Jeera Aloo",
    ingredients: ["potato", "cumin", "turmeric", "coriander"],
  };
  const pantry = ["potato", "cumin", "turmeric", "coriander"];
  const compoundMap = {
    cumin: ["cuminaldehyde", "pinene"],
    coriander: ["linalool", "pinene"],
    turmeric: ["curcumin", "zingiberene"],
    potato: ["methional"],
  };

  const [score, breakdown] = scoreRecipe(recipe, pantry, compoundMap);
  assert.ok(score > 80, `Expected high score for 100% matched pantry, got ${score}`);
  assert.equal(breakdown.coreCoverage, 1);
  assert.equal(breakdown.missing.length, 0);
});

test("fibonacciSphere and computeFlavourGraph3D place ingredients on sphere and compounds at centroids", () => {
  const pts = fibonacciSphere(4);
  assert.equal(pts.length, 4);
  const graph = computeFlavourGraph3D(["cumin", "coriander"], {
    cumin: ["pinene", "cuminaldehyde"],
    coriander: ["pinene", "linalool"],
  });
  assert.equal(graph.ingredient_count, 2);
  assert.equal(graph.compound_count, 3);
  const sharedPinene = graph.nodes.find((n: any) => n.id === "cmp:pinene");
  assert.ok(sharedPinene);
  assert.equal(sharedPinene.shared_by, 2);
});

test("calculateMacroTargets computes Mifflin-St Jeor BMR/TDEE and enforces safety floor", () => {
  const bmr = calculateBmr("male", 75, 178, 28);
  assert.equal(bmr, 1727.5);
  const tdee = calculateTdee(bmr, "moderate");
  assert.equal(tdee, 2677.6);

  const fatLoss = calculateMacroTargets("male", 75, 178, 28, "moderate", "fat_loss");
  assert.ok(fatLoss.target_calories_kcal >= 1728);
  assert.equal(fatLoss.target_protein_g, 165);

  const dirtyBulk = calculateMacroTargets("male", 75, 178, 28, "moderate", "dirty_bulk");
  assert.ok(dirtyBulk.warnings.length > 0);
});

test("computeUnlockSuggestion identifies single missing ingredient unlocking most dishes", () => {
  const candidates = [
    { id: "1", title: "Dish 1", breakdown: { missing: ["paneer"] }, calories: 400, protein: 20 },
    { id: "2", title: "Dish 2", breakdown: { missing: ["paneer", "spinach"] }, calories: 350, protein: 18 },
  ];
  const unlock = computeUnlockSuggestion(candidates, ["tomato", "onion"]);
  assert.ok(unlock);
  assert.equal(unlock.ingredient, "paneer");
  assert.equal(unlock.unlockedCount, 2);
});
