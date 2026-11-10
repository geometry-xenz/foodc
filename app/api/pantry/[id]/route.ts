import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

const schema = z.object({
  quantity: z.coerce.number().min(0).optional(),
  unit: z.string().optional(),
  category: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid update." }, { status: 400 });
    }

    const existing = await prisma.pantryItem.findFirst({
      where: { id, userId: user.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    const item = await prisma.pantryItem.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "Unable to update item." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;

  const existing = await prisma.pantryItem.findFirst({
    where: { id, userId: user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  await prisma.pantryItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
