import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { computeNutritionTargets } from "@/lib/goals";
import { GOAL_SPECS } from "@/lib/goals";
import type { GoalId } from "@/lib/types";

const schema = z.object({
  goal: z.string().refine((value) => value in GOAL_SPECS, "Unknown goal."),
  sex: z.enum(["male", "female"]),
  age: z.coerce.number().min(14).max(100),
  weightKg: z.coerce.number().min(35).max(300),
  heightCm: z.coerce.number().min(120).max(250),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
});

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const context = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true, goal: true },
  });
  if (!context?.profile) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  const targets = computeNutritionTargets(
    context.profile.weightKg,
    context.profile.heightCm,
    context.profile.age,
    context.profile.sex,
    context.profile.activityLevel,
    context.goal?.primaryGoal ?? "lean_bulk",
  );

  return NextResponse.json({
    targets,
    profile: context.profile,
    goal: context.goal,
  });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid biometrics." },
        { status: 400 },
      );
    }

    const { goal, sex, age, weightKg, heightCm, activityLevel } = parsed.data;
    const targets = computeNutritionTargets(
      weightKg,
      heightCm,
      age,
      sex,
      activityLevel,
      goal,
    );

    await prisma.$transaction([
      prisma.profile.upsert({
        where: { userId: user.id },
        update: { age, weightKg, heightCm, sex, activityLevel },
        create: { userId: user.id, age, weightKg, heightCm, sex, activityLevel },
      }),
      prisma.goal.upsert({
        where: { userId: user.id },
        update: {
          primaryGoal: goal as GoalId,
          targetCalories: targets.targetCalories,
          targetProteinG: targets.targetProteinG,
          targetCarbsG: targets.targetCarbsG,
          targetFatG: targets.targetFatG,
          targetFibreG: targets.targetFibreG,
        },
        create: {
          userId: user.id,
          primaryGoal: goal as GoalId,
          targetCalories: targets.targetCalories,
          targetProteinG: targets.targetProteinG,
          targetCarbsG: targets.targetCarbsG,
          targetFatG: targets.targetFatG,
          targetFibreG: targets.targetFibreG,
        },
      }),
    ]);

    return NextResponse.json({ targets });
  } catch {
    return NextResponse.json(
      { error: "Unable to recalculate targets." },
      { status: 500 },
    );
  }
}
