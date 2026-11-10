import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { analyzeNutrition } from "@/lib/nutrition";

const schema = z.object({
  servings: z.coerce.number().min(1).max(50).default(2),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.coerce.number().min(0).default(50),
        unit: z.string().default("g"),
      }),
    )
    .min(1),
});

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Add at least one valid ingredient." },
        { status: 400 },
      );
    }
    const analysis = analyzeNutrition(
      parsed.data.ingredients,
      parsed.data.servings,
    );
    return NextResponse.json({ analysis });
  } catch {
    return NextResponse.json(
      { error: "Unable to analyse these ingredients." },
      { status: 500 },
    );
  }
}
