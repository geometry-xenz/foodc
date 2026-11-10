import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { scorePantry } from "@/lib/data-access";
import { computeNutritionTargets } from "@/lib/goals";
import type { GoalId } from "@/lib/types";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const context = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true, goal: true, pantry: true },
  });
  if (!context) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const pantry = context.pantry.filter((item) => item.isAvailable).map((item) => item.name);
  const goalId = (context.goal?.primaryGoal ?? "lean_bulk") as GoalId;
  const { ranked, unlock } = await scorePantry(pantry, goalId);

  const targets = context.profile
    ? computeNutritionTargets(
        context.profile.weightKg,
        context.profile.heightCm,
        context.profile.age,
        context.profile.sex,
        context.profile.activityLevel,
        goalId,
      )
    : null;

  return NextResponse.json({
    recipes: ranked,
    unlock,
    pantry,
    goal: goalId,
    targets,
    totals: {
      recipes: ranked.length,
      cookableNow: ranked.filter(
        (recipe) =>
          recipe.ingredientsMissing.filter(
            (name) => !["salt", "oil", "water", "sugar"].includes(name),
          ).length === 0,
      ).length,
      oneAway: ranked.filter(
        (recipe) =>
          recipe.ingredientsMissing.filter(
            (name) => !["salt", "oil", "water", "sugar"].includes(name),
          ).length === 1,
      ).length,
    },
  });
}
