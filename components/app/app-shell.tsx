"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Bookmark,
  CalendarDays,
  ChevronRight,
  Clock,
  Home,
  LogOut,
  Menu,
  Package,
  Settings2,
  ShoppingCart,
  Sparkles,
  Target,
  User,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/app", label: "Dashboard", icon: Home, hint: "Kitchen overview" },
  { href: "/app/pantry", label: "Pantry", icon: Package, hint: "Detected stock" },
  { href: "/app/recipes", label: "Recipes", icon: UtensilsCrossed, hint: "Ranked matches" },
  { href: "/app/meal-planner", label: "Meal Planner", icon: CalendarDays, hint: "Day protocol" },
  { href: "/app/nutrition", label: "Nutrition", icon: Activity, hint: "Metabolic targets" },
  { href: "/app/flavour", label: "Aroma Network", icon: Sparkles, hint: "3D molecular graph" },
  { href: "/app/meal-history", label: "Meal History", icon: Clock, hint: "Historical intake" },
  { href: "/app/shopping", label: "Shopping List", icon: ShoppingCart, hint: "Pantry deficits" },
  { href: "/app/goals", label: "Goals & Biometrics", icon: Target, hint: "8 protocols" },
  { href: "/app/saved", label: "Saved Recipes", icon: Bookmark, hint: "Cookbook" },
  { href: "/app/profile", label: "Profile", icon: User, hint: "Personalization" },
  { href: "/app/settings", label: "Settings", icon: Settings2, hint: "Device & security" },
] as const;

export function AppShell({
  children,
  user,
  goal,
}: {
  children: React.ReactNode;
  user: { name: string; email: string };
  goal: {
    primaryGoal: string;
    targetCalories: number;
    targetProteinG: number;
  } | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const active = NAV.find((item) =>
    item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href),
  );

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const goalLabel =
    goal?.primaryGoal
      ?.replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()) ?? "Lean Bulk";

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(255,138,50,.055),transparent_65%)]" />

      {/* Persistent desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] flex-col border-r border-[rgba(232,181,106,.12)] bg-[rgba(11,10,9,.82)] px-4 pb-5 pt-6 backdrop-blur-2xl lg:flex">
        <Logo className="px-2" />
        <div className="mt-8 text-[0.48rem] uppercase tracking-[0.22em] text-[#5F574D] px-3">
          Workspace
        </div>
        <nav className="mt-3 flex flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("nav-pill-item", isActive && "active")}
              >
                <Icon size={15} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={12} className="text-[#E8B56A]" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-2xl border border-[rgba(232,181,106,.13)] bg-[linear-gradient(150deg,rgba(255,138,50,.08),rgba(255,255,255,.01))] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[0.46rem] uppercase tracking-[0.18em] text-[#8B7E6D]">
              Active protocol
            </span>
            <Sparkles size={11} className="text-[#FF8A32]" />
          </div>
          <div className="mt-1.5 font-display text-xl text-[#F3D3A1]">{goalLabel}</div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-[1.6rem] leading-none text-[#F6EFE4]">
              {goal ? Math.round(goal.targetCalories).toLocaleString("en-IN") : "—"}
            </span>
            <span className="text-[0.48rem] uppercase tracking-[0.14em] text-[#6F665B]">
              kcal / day
            </span>
          </div>
          <div className="mt-1 text-[0.5rem] text-[#756D62]">
            {goal ? `${Math.round(goal.targetProteinG)} g protein target` : "Set your biometrics"}
          </div>
          <Link
            href="/app/nutrition"
            className="mt-3 flex items-center justify-between border-t border-[rgba(232,181,106,.12)] pt-2.5 text-[0.52rem] uppercase tracking-[0.14em] text-[#C9B79F] transition-colors hover:text-[#E8B56A]"
          >
            Tune targets <Settings2 size={11} />
          </Link>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-3 rounded-2xl border border-[rgba(232,181,106,.1)] bg-white/[0.015] p-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(140deg,#FF8A32,#8A4A20)] font-display text-lg text-[#1A110A]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[0.72rem] text-[#F6EFE4]">{user.name}</div>
              <div className="truncate text-[0.52rem] text-[#6F665B]">{user.email}</div>
            </div>
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="icon-btn !h-7 !w-7"
              aria-label="Sign out"
            >
              <LogOut size={12} />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[0.44rem] uppercase tracking-[0.16em] text-[#4F483F]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8FA989]" />
            All engines online
          </div>
        </div>
      </aside>

      {/* Top floating pill */}
      <header className="fixed inset-x-0 top-0 z-30 px-3 pt-3 sm:px-5 lg:left-[252px]">
        <div className="glass-pill flex h-[56px] items-center justify-between rounded-full px-3 sm:px-4">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="icon-btn lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={17} />
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden text-[0.5rem] uppercase tracking-[0.2em] text-[#5F574D] sm:inline">
                DRISHYAM /
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#D9C7AE]">
                {active?.label ?? "Workspace"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1.5 rounded-full border border-[rgba(143,169,137,.22)] bg-[rgba(143,169,137,.06)] px-2.5 py-1 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8FA989]" />
              <span className="text-[0.46rem] uppercase tracking-[0.14em] text-[#AFC3AA]">
                Engine live
              </span>
            </div>
            <div className="hidden h-4 w-px bg-white/10 sm:block" />
            <Link
              href="/"
              className="hidden text-[0.55rem] uppercase tracking-[0.14em] text-[#756D62] transition-colors hover:text-[#E8B56A] sm:inline"
            >
              Experience
            </Link>
            <Link
              href="/app/pantry"
              className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(232,181,106,.2)] bg-white/[0.02] sm:hidden"
            >
              <Package size={13} className="text-[#E8B56A]" />
            </Link>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(140deg,#FF8A32,#8A4A20)] font-display text-base text-[#1A110A]">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Tablet drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
            aria-label="Close navigation"
          />
          <div className="absolute inset-y-0 left-0 w-[300px] max-w-[86vw] border-r border-[rgba(232,181,106,.16)] bg-[#0c0b0a] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="icon-btn"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>
            <div className="mt-7 text-[0.48rem] uppercase tracking-[0.22em] text-[#5F574D]">
              Workspace
            </div>
            <nav className="mt-3 flex flex-col gap-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/app"
                    ? pathname === "/app"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("nav-pill-item", isActive && "active")}
                  >
                    <Icon size={15} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className="text-[0.5rem] text-[#5F574D]">{item.hint}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 rounded-2xl border border-[rgba(232,181,106,.13)] bg-[rgba(255,255,255,.02)] p-4">
              <div className="text-[0.46rem] uppercase tracking-[0.18em] text-[#8B7E6D]">
                Active protocol
              </div>
              <div className="mt-1 font-display text-xl text-[#F3D3A1]">{goalLabel}</div>
              <div className="mt-1 text-[0.58rem] text-[#756D62]">
                {goal ? `${Math.round(goal.targetCalories)} kcal · ${Math.round(goal.targetProteinG)} g protein` : "Set biometrics"}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[rgba(232,181,106,.12)] pt-4">
              <div>
                <div className="text-[0.7rem] text-[#F6EFE4]">{user.name}</div>
                <div className="text-[0.52rem] text-[#6F665B]">{user.email}</div>
              </div>
              <button type="button" onClick={logout} className="icon-btn">
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="relative mx-auto w-full max-w-[1500px] px-4 pb-28 pt-[78px] sm:px-6 lg:pl-[276px] lg:pr-6 lg:pb-10 lg:pt-[86px]">
        {children}
      </main>

      {/* Mobile dock */}
      <nav className="bottom-dock fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around md:hidden">
        {NAV.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("dock-item", isActive && "active")}
            >
              <Icon size={18} strokeWidth={isActive ? 2.1 : 1.7} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
