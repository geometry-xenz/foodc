import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { computeNutritionTargets } from "@/lib/goals";
import { todayISO } from "@/lib/utils";
import type { GoalId } from "@/lib/types";

const schema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  recipeId: z.string().min(1),
  servings: z.coerce.number().min(0.25).max(12).default(1),
});

async function getTargets(userId: string) {
  const context = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, goal: true },
  });
  if (!context?.profile) return null;
  return computeNutritionTargets(
    context.profile.weightKg,
    context.profile.heightCm,
    context.profile.age,
    context.profile.sex,
    context.profile.activityLevel,
    (context.goal?.primaryGoal ?? "lean_bulk") as GoalId,
  );
}

export async function GET(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? todayISO();

  const [entries, targets] = await Promise.all([
    prisma.mealPlanEntry.findMany({
      where: { userId: user.id, date },
      orderBy: { createdAt: "asc" },
    }),
    getTargets(user.id),
  ]);

  const totals = entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return NextResponse.json({ date, entries, totals, targets });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid meal plan entry." }, { status: 400 });
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: parsed.data.recipeId },
    });
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
    }

    const servings = parsed.data.servings;
    const entry = await prisma.mealPlanEntry.create({
      data: {
        userId: user.id,
        date: parsed.data.date,
        mealType: parsed.data.mealType,
        recipeId: recipe.id,
        servings,
        calories: Math.round(recipe.calories * servings * 10) / 10,
        protein: Math.round(recipe.protein * servings * 10) / 10,
        carbs: Math.round(recipe.carbs * servings * 10) / 10,
        fat: Math.round(recipe.fat * servings * 10) / 10,
      },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to add this meal." },
      { status: 500 },
    );
  }
}
