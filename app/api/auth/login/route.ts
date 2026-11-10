import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { setSessionCookie, verifyPassword } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "A valid email and password are required." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    });
    if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    await setSessionCookie(user.id, user.email);
    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in right now." },
      { status: 500 },
    );
  }
}
