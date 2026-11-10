import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { computeNutritionTargets } from "@/lib/goals";
import { displayName } from "@/lib/flavor";

const STARTER_PANTRY: Array<[string, string, number, string]> = [
  ["turmeric", "Spices", 50, "g"],
  ["cumin", "Spices", 80, "g"],
  ["black pepper", "Spices", 40, "g"],
  ["onion", "Vegetables", 500, "g"],
  ["tomato", "Vegetables", 400, "g"],
  ["garlic", "Vegetables", 80, "g"],
  ["ginger", "Vegetables", 100, "g"],
  ["lentils", "Legumes", 500, "g"],
  ["rice", "Grains", 1000, "g"],
];

export async function createUserWithStarter(input: {
  email: string;
  password: string;
  name: string;
  demo?: boolean;
}) {
  const passwordHash = await hashPassword(input.password);
  const body = input.demo
    ? {
        age: 26,
        heightCm: 178,
        weightKg: 74,
        targetWeightKg: 76,
        sex: "male",
        activityLevel: "active",
        diet: "vegetarian",
      }
    : {
        age: 26,
        heightCm: 175,
        weightKg: 70,
        targetWeightKg: 70,
        sex: "male",
        activityLevel: "moderate",
        diet: "any",
      };
  const targets = computeNutritionTargets(
    body.weightKg,
    body.heightCm,
    body.age,
    body.sex,
    body.activityLevel,
    "lean_bulk",
  );

  return prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      name: input.name,
      passwordHash,
      profile: {
        create: body,
      },
      goal: {
        create: {
          primaryGoal: "lean_bulk",
          targetCalories: targets.targetCalories,
          targetProteinG: targets.targetProteinG,
          targetCarbsG: targets.targetCarbsG,
          targetFatG: targets.targetFatG,
          targetFibreG: targets.targetFibreG,
        },
      },
      pantry: {
        create: STARTER_PANTRY.map(([name, category, quantity, unit]) => ({
          name,
          displayName: displayName(name),
          category,
          quantity,
          unit,
          confidence: 0.96,
          source: "manual",
        })),
      },
    },
    select: { id: true, email: true, name: true },
  });
}
