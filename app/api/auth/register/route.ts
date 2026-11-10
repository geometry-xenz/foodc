import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";
import { createUserWithStarter } from "@/lib/user-service";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  name: z.string().min(1).max(80).default("Culinary Creator"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Please check your account details.",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const user = await createUserWithStarter({
      email: parsed.data.email,
      password: parsed.data.password,
      name: parsed.data.name,
    });
    await setSessionCookie(user.id, user.email);
    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create the account right now." },
      { status: 500 },
    );
  }
}
