import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserWithContext } from "@/lib/auth";
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
  const user = await getCurrentUserWithContext();
  if (!user) redirect("/login?next=/app");

  return (
    <AppShell
      user={{ name: user.name, email: user.email }}
      goal={
        user.goal
          ? {
              primaryGoal: user.goal.primaryGoal,
              targetCalories: user.goal.targetCalories,
              targetProteinG: user.goal.targetProteinG,
            }
          : null
      }
    >
      {children}
    </AppShell>
  );
}
