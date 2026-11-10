import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";
import { createUserWithStarter } from "@/lib/user-service";

export async function POST() {
  try {
    let user = await prisma.user.findUnique({
      where: { email: "demo@drishyam.ai" },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      user = await createUserWithStarter({
        email: "demo@drishyam.ai",
        password: "drishyam2026",
        name: "Chef Suman",
        demo: true,
      });
    }

    await setSessionCookie(user.id, user.email);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { error: "Demo kitchen is unavailable. Run the database seed." },
      { status: 500 },
    );
  }
}
