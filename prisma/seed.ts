import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import nutritionData from "../lib/data/nutrition.json";
import flavorData from "../lib/data/flavordb.json";
import recipeData from "../lib/data/recipes.json";
import { computeNutritionTargets } from "../lib/goals";
import { INGREDIENT_CATEGORY_MAP } from "../lib/ingredient-categories";

const prisma = new PrismaClient();

type NutritionProfile = {
  name: string;
  per_100g: Record<string, number>;
  typical_serving_g: number;
};

type Entity = {
  category: string;
  volatile_compounds: string[];
};

type RawRecipe = {
  recipe_id: string;
  title: string;
  cuisine: string;
  diet: string;
  prep_time_minutes: number;
  cook_time_minutes: number;
  total_time_minutes: number;
  servings: number;
  image_url: string;
  core_ingredients: string[];
  ingredients: Array<{ name: string; quantity: number; unit: string }>;
  instructions: string[];
  nutrition_per_serving: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fibre: number;
  };
  molecular_profile: {
    dominant_aroma: string;
    coherence_score: number;
    notes: string;
  };
};

const nutrition = nutritionData.ingredients as Record<string, NutritionProfile>;
const entities = flavorData.entities as Record<string, Entity>;
const rawRecipes = recipeData.recipes as RawRecipe[];

const CATEGORY_MAP = INGREDIENT_CATEGORY_MAP;

const COMPOUND_FAMILIES: Array<[RegExp, string, string]> = [
  [/curcumin/i, "Polyphenol", "Golden curcuminoid responsible for turmeric's colour and anti-inflammatory signal."],
  [/eugenol/i, "Phenylpropanoid", "Clove's warm, medicinal phenol and the anchor of its aroma."],
  [/piperine/i, "Alkaloid", "Black pepper's pungency molecule; also enhances curcumin bioavailability."],
  [/allicin|disulfide|trisulfide|thiosulfinate/i, "Organosulfur", "Allium sulphur compound driving garlic's pungent savoury depth."],
  [/cuminaldehyde/i, "Aldehyde", "Cumin's signature earthy, nutty aldehyde."],
  [/cinnamaldehyde/i, "Aldehyde", "Cinnamon bark's sweet, warm aldehyde."],
  [/capsaicin/i, "Alkaloid", "Chilli's heat receptor agonist."],
  [/linalool|geraniol|citral|limonene|pinene|terpinene|myrcene|cymene|terpineol|terpinyl|zingiberene|bisabolene|caryophyllene|turmerone|curcumenol|cineole|eucalyptol|camphor|safranal/i, "Terpene", "Volatile terpene contributing citrus, floral or resinous lift."],
  [/pyrazine|pyrroline/i, "Pyrazine", "Roasted, popcorn-like nitrogen heterocycle formed by thermal reactions."],
  [/diacetyl|lactone|butyric|lactic/i, "Dairy Ester", "Cultured dairy note: creamy, buttery, gently acidic."],
  [/vanillin/i, "Phenol", "Sweet vanilla phenol that rounds warm spice blends."],
  [/glutamic|citric|malic/i, "Acid / Umami", "Taste-active compound shaping acidity or savoury depth."],
  [/hexanal|methional|furan/i, "Carbonyl", "Green, grassy or cooked-sugar carbonyl note."],
  [/isothiocyanate|sinigrin/i, "Glucosinolate", "Mustard's sharp, nasal pungency."],
  [/capsaicin|gingerol|shogaol/i, "Phenol", "Pungent bioactive phenol with warming heat."],
];

function familyFor(compound: string): { family: string; description: string } {
  for (const [regex, family, description] of COMPOUND_FAMILIES) {
    if (regex.test(compound)) return { family, description };
  }
  return {
    family: "Volatile",
    description: `Aroma-active molecule detected in the volatile headspace of ${compound}.`,
  };
}

const MEAL_TYPES: Record<string, string> = {
  rec_001: "lunch",
  rec_002: "dinner",
  rec_003: "lunch",
  rec_004: "dinner",
  rec_005: "dinner",
  rec_006: "dinner",
  rec_007: "breakfast",
  rec_008: "dinner",
  rec_009: "breakfast",
  rec_010: "snack",
  rec_011: "breakfast",
  rec_012: "lunch",
};

async function main() {
  console.log("Seeding DRISHYAM gastronomy database…");

  const ingredientIdByName = new Map<string, string>();
  for (const [name, profile] of Object.entries(nutrition)) {
    const p = profile.per_100g;
    const ingredient = await prisma.ingredient.upsert({
      where: { name },
      update: {
        displayName: profile.name,
        category:
          CATEGORY_MAP[entities[name]?.category] ??
          (entities[name] ? "Other" : "Spices"),
        calories: p.calories ?? 0,
        protein: p.protein ?? 0,
        carbs: p.carbs ?? 0,
        fat: p.fat ?? 0,
        fibre: p.fibre ?? 0,
        sugar: p.sugar ?? 0,
        sodiumMg: p.sodium_mg ?? 0,
        saturatedFat: p.saturated_fat ?? 0,
        ironMg: p.iron_mg ?? 0,
        calciumMg: p.calcium_mg ?? 0,
        vitaminCMg: p.vitamin_c_mg ?? 0,
      },
      create: {
        name,
        displayName: profile.name,
        category:
          CATEGORY_MAP[entities[name]?.category] ??
          (entities[name] ? "Other" : "Spices"),
        calories: p.calories ?? 0,
        protein: p.protein ?? 0,
        carbs: p.carbs ?? 0,
        fat: p.fat ?? 0,
        fibre: p.fibre ?? 0,
        sugar: p.sugar ?? 0,
        sodiumMg: p.sodium_mg ?? 0,
        saturatedFat: p.saturated_fat ?? 0,
        ironMg: p.iron_mg ?? 0,
        calciumMg: p.calcium_mg ?? 0,
        vitaminCMg: p.vitamin_c_mg ?? 0,
      },
    });
    ingredientIdByName.set(name, ingredient.id);
  }

  let compoundCount = 0;
  for (const [ingredientName, entity] of Object.entries(entities)) {
    const ingredientId = ingredientIdByName.get(ingredientName);
    if (!ingredientId) continue;
    for (const compoundName of entity.volatile_compounds) {
      const meta = familyFor(compoundName);
      const compound = await prisma.flavorCompound.upsert({
        where: { name: compoundName },
        update: meta,
        create: { name: compoundName, ...meta },
      });
      await prisma.ingredientCompound.upsert({
        where: {
          ingredientId_compoundId: {
            ingredientId,
            compoundId: compound.id,
          },
        },
        update: {},
        create: { ingredientId, compoundId: compound.id },
      });
      compoundCount += 1;
    }
  }

  for (const recipe of rawRecipes) {
    const core = new Set(recipe.core_ingredients);
    const recipeIngredients = [];
    for (const item of recipe.ingredients) {
      const ingredientId = ingredientIdByName.get(item.name);
      if (!ingredientId) continue;
      recipeIngredients.push({
        ingredientId,
        name: item.name,
        displayName: nutrition[item.name]?.name ?? item.name,
        quantity: item.quantity,
        unit: item.unit,
        isCore: core.has(item.name),
      });
    }

    await prisma.recipe.upsert({
      where: { id: recipe.recipe_id },
      update: {
        title: recipe.title,
        cuisine: recipe.cuisine,
        diet: recipe.diet,
        mealType: MEAL_TYPES[recipe.recipe_id] ?? "lunch",
        prepTimeMinutes: recipe.prep_time_minutes,
        cookTimeMinutes: recipe.cook_time_minutes,
        totalTimeMinutes: recipe.total_time_minutes,
        servings: recipe.servings,
        imageUrl: recipe.image_url,
        instructions: JSON.stringify(recipe.instructions),
        coreIngredients: JSON.stringify(recipe.core_ingredients),
        dominantAroma: recipe.molecular_profile.dominant_aroma,
        coherenceScore: recipe.molecular_profile.coherence_score,
        pairingNotes: recipe.molecular_profile.notes,
        calories: recipe.nutrition_per_serving.calories,
        protein: recipe.nutrition_per_serving.protein,
        carbs: recipe.nutrition_per_serving.carbs,
        fat: recipe.nutrition_per_serving.fat,
        fibre: recipe.nutrition_per_serving.fibre,
        ingredients: {
          deleteMany: {},
          create: recipeIngredients,
        },
      },
      create: {
        id: recipe.recipe_id,
        title: recipe.title,
        cuisine: recipe.cuisine,
        diet: recipe.diet,
        mealType: MEAL_TYPES[recipe.recipe_id] ?? "lunch",
        prepTimeMinutes: recipe.prep_time_minutes,
        cookTimeMinutes: recipe.cook_time_minutes,
        totalTimeMinutes: recipe.total_time_minutes,
        servings: recipe.servings,
        imageUrl: recipe.image_url,
        instructions: JSON.stringify(recipe.instructions),
        coreIngredients: JSON.stringify(recipe.core_ingredients),
        dominantAroma: recipe.molecular_profile.dominant_aroma,
        coherenceScore: recipe.molecular_profile.coherence_score,
        pairingNotes: recipe.molecular_profile.notes,
        calories: recipe.nutrition_per_serving.calories,
        protein: recipe.nutrition_per_serving.protein,
        carbs: recipe.nutrition_per_serving.carbs,
        fat: recipe.nutrition_per_serving.fat,
        fibre: recipe.nutrition_per_serving.fibre,
        ingredients: { create: recipeIngredients },
      },
    });
  }

  const passwordHash = await bcrypt.hash("drishyam2026", 10);
  const demo = await prisma.user.upsert({
    where: { email: "demo@drishyam.ai" },
    update: { name: "Chef Suman", passwordHash },
    create: {
      email: "demo@drishyam.ai",
      name: "Chef Suman",
      passwordHash,
    },
  });

  await prisma.profile.upsert({
    where: { userId: demo.id },
    update: {
      age: 26,
      heightCm: 178,
      weightKg: 74,
      targetWeightKg: 76,
      sex: "male",
      activityLevel: "active",
      diet: "vegetarian",
    },
    create: {
      userId: demo.id,
      age: 26,
      heightCm: 178,
      weightKg: 74,
      targetWeightKg: 76,
      sex: "male",
      activityLevel: "active",
      diet: "vegetarian",
    },
  });

  const targets = computeNutritionTargets(74, 178, 26, "male", "active", "lean_bulk");
  await prisma.goal.upsert({
    where: { userId: demo.id },
    update: {
      primaryGoal: "lean_bulk",
      targetCalories: targets.targetCalories,
      targetProteinG: targets.targetProteinG,
      targetCarbsG: targets.targetCarbsG,
      targetFatG: targets.targetFatG,
      targetFibreG: targets.targetFibreG,
    },
    create: {
      userId: demo.id,
      primaryGoal: "lean_bulk",
      targetCalories: targets.targetCalories,
      targetProteinG: targets.targetProteinG,
      targetCarbsG: targets.targetCarbsG,
      targetFatG: targets.targetFatG,
      targetFibreG: targets.targetFibreG,
    },
  });

  const starterPantry = [
    ["turmeric", "Spices", 50, "g", 0.99],
    ["cumin", "Spices", 80, "g", 0.98],
    ["black pepper", "Spices", 40, "g", 0.97],
    ["coriander", "Spices", 45, "g", 0.96],
    ["cloves", "Spices", 20, "g", 0.94],
    ["cardamom", "Spices", 25, "g", 0.95],
    ["cinnamon", "Spices", 30, "g", 0.93],
    ["onion", "Vegetables", 500, "g", 0.99],
    ["tomato", "Vegetables", 400, "g", 0.99],
    ["garlic", "Vegetables", 80, "g", 0.98],
    ["ginger", "Vegetables", 100, "g", 0.97],
    ["paneer", "Dairy", 250, "g", 0.96],
    ["lentils", "Legumes", 500, "g", 0.98],
    ["rice", "Grains", 1000, "g", 0.99],
  ] as const;

  for (const [name, category, quantity, unit, confidence] of starterPantry) {
    await prisma.pantryItem.upsert({
      where: { userId_name: { userId: demo.id, name } },
      update: {
        quantity,
        category,
        unit,
        isAvailable: true,
        confidence,
      },
      create: {
        userId: demo.id,
        name,
        displayName: nutrition[name]?.name ?? name,
        category,
        quantity,
        unit,
        confidence,
        source: "vision",
      },
    });
  }

  const today = new Date();
  const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  await prisma.mealPlanEntry.deleteMany({ where: { userId: demo.id, date: iso } });

  const planSeed = [
    { recipeId: "rec_011", mealType: "breakfast", servings: 2 },
    { recipeId: "rec_001", mealType: "lunch", servings: 1.5 },
    { recipeId: "rec_002", mealType: "dinner", servings: 1 },
  ];

  for (const entry of planSeed) {
    const recipe = rawRecipes.find((r) => r.recipe_id === entry.recipeId);
    if (!recipe) continue;
    await prisma.mealPlanEntry.create({
      data: {
        userId: demo.id,
        date: iso,
        mealType: entry.mealType,
        recipeId: recipe.recipe_id,
        servings: entry.servings,
        calories: Math.round(recipe.nutrition_per_serving.calories * entry.servings * 10) / 10,
        protein: Math.round(recipe.nutrition_per_serving.protein * entry.servings * 10) / 10,
        carbs: Math.round(recipe.nutrition_per_serving.carbs * entry.servings * 10) / 10,
        fat: Math.round(recipe.nutrition_per_serving.fat * entry.servings * 10) / 10,
      },
    });
  }

  console.log(
    `Seeded ${Object.keys(nutrition).length} ingredients, ${rawRecipes.length} recipes, ${compoundCount} compound links, demo chef and pantry.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
