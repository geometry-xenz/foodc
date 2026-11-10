import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "drishyam_session";
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "drishyam_super_secret_gastronomy_key_2026",
);
const SEVEN_DAYS = 60 * 60 * 24 * 7;

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(userId: string, email: string) {
  return new SignJWT({ sub: userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SEVEN_DAYS}s`)
    .sign(SECRET);
}

export async function setSessionCookie(userId: string, email: string) {
  const token = await createSessionToken(userId, email);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SEVEN_DAYS,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (!payload.sub) return null;
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true },
    });
    return user;
  } catch {
    return null;
  }
}

export async function getCurrentUserWithContext() {
  const session = await getSessionUser();
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.id },
    include: { profile: true, goal: true, pantry: true },
  });
}

export const SESSION_COOKIE = COOKIE_NAME;
