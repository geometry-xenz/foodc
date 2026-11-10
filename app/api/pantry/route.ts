import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { displayName, getIngredientCategory, normalizeIngredient } from "@/lib/flavor";

const createSchema = z.object({
  name: z.string().min(1),
  category: z.string().default("Spices"),
  quantity: z.coerce.number().positive().default(100),
  unit: z.string().default("g"),
  source: z.string().default("manual"),
  confidence: z.coerce.number().min(0).max(1).default(0.97),
});

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.pantryItem.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ pantry: items });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ingredient details are invalid." },
        { status: 400 },
      );
    }
    const name = normalizeIngredient(parsed.data.name);
    if (!name) {
      return NextResponse.json(
        { error: "Ingredient name is required." },
        { status: 400 },
      );
    }

    const catalogItem = await prisma.ingredient.findUnique({ where: { name } });
    const category =
      catalogItem?.category ??
      getIngredientCategory(parsed.data.name) ??
      parsed.data.category;

    const item = await prisma.pantryItem.upsert({
      where: { userId_name: { userId: user.id, name } },
      update: {
        isAvailable: true,
        quantity: { increment: parsed.data.quantity },
        category,
        unit: parsed.data.unit,
      },
      create: {
        userId: user.id,
        name,
        displayName: displayName(name),
        category,
        quantity: parsed.data.quantity,
        unit: parsed.data.unit,
        source: parsed.data.source,
        confidence: parsed.data.confidence,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to add this ingredient." },
      { status: 500 },
    );
  }
}
