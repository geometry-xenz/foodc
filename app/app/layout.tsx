import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { AppShell } from "@/components/app/app-shell";

export const metadata: Metadata = {
  title: "Workspace — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let me: any;
  try {
    me = await api.get<any>("/api/auth/me");
  } catch {
    redirect("/login?next=/app");
  }
  const u = me?.user || me;
  if (!u?.id && !u?.email) redirect("/login?next=/app");

  let targets = null;
  try {
    targets = await api.get("/api/nutrition/targets", { redirectOn401: false });
  } catch {
    // optional
  }

  return (
    <AppShell
      user={{ name: u.name, email: u.email }}
      goal={
        targets
          ? {
              primaryGoal: targets.primaryGoal || "lean_bulk",
              targetCalories: targets.target_calories_kcal || 2000,
              targetProteinG: targets.target_protein_g || 120,
            }
          : null
      }
    >
      {children}
    </AppShell>
  );
}
