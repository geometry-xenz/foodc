import type { Metadata } from "next";
import Link from "next/link";
import { Globe, LayoutDashboard, Smartphone, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
import { AndroidWorkspace } from "@/components/android/android-workspace";

export const metadata: Metadata = {
  title: "Android App (Interactive Scanner & Compose UI) — DRISHYAM",
  description:
    "Run the native DRISHYAM Android application with live CameraX scanner simulation, YOLOv8n bounding boxes, temporal confirmation tray, 3D Flavour Sphere, and real-time sync with the Web Pantry.",
};

export const dynamic = "force-dynamic";

export default function StandaloneAndroidPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F6EFE4]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,138,50,0.07),transparent_65%)]" />

      <header className="sticky top-0 z-50 border-b border-[rgba(232,181,106,0.14)] bg-[#080808]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden h-4 w-px bg-[rgba(232,181,106,0.2)] sm:block" />
            <div className="hidden items-center gap-2 rounded-full border border-[#FF8A32]/30 bg-[#FF8A32]/10 px-3 py-1 sm:flex">
              <Smartphone size={13} className="text-[#FF8A32]" />
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#F3D3A1]">
                Android App · API 35 · Jetpack Compose + CameraX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/android"
              className="flex items-center gap-1.5 rounded-full bg-[linear-gradient(120deg,#F5D8A8,#E8B56A_45%,#FF8A32)] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#17100A]"
            >
              <Smartphone size={13} />
              Android App
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full border border-[rgba(232,181,106,0.22)] bg-white/[0.02] px-3.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#D9C7AE] transition-colors hover:border-[#E8B56A] hover:text-[#F6EFE4]"
            >
              <Globe size={13} className="text-[#E8B56A]" />
              Website Story
            </Link>
            <Link
              href="/app"
              className="flex items-center gap-1.5 rounded-full border border-[rgba(232,181,106,0.22)] bg-white/[0.02] px-3.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#D9C7AE] transition-colors hover:border-[#E8B56A] hover:text-[#F6EFE4]"
            >
              <LayoutDashboard size={13} className="text-[#FF8A32]" />
              Web Workspace
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1440px] px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-4 flex flex-col justify-between gap-3 rounded-2xl border border-[rgba(232,181,106,0.14)] bg-[linear-gradient(145deg,rgba(20,17,15,0.9),rgba(11,10,9,0.9))] px-4 py-3 sm:flex-row sm:items-center sm:px-5">
          <div>
            <div className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.22em] text-[#FF8A32]">
              <Sparkles size={11} />
              Live Cross-Platform Sync Active
            </div>
            <h1 className="mt-0.5 font-display text-xl text-[#F6EFE4] sm:text-2xl">
              DRISHYAM <span className="italic text-gold-gradient">Android Companion</span> &amp; Live AI Scanner
            </h1>
            <p className="mt-0.5 text-xs text-[#9E9282]">
              Scan ingredients with the multi-stage YOLOv8n + ML Kit OCR pipeline (&ge;75% confidence for 1.0s), confirm them into your pantry, or explore the 3D Flavour Sphere and Cooking Mode.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link href="/app/pantry" className="btn btn-ghost btn-sm">
              Open Web Pantry →
            </Link>
          </div>
        </div>

        <AndroidWorkspace />
      </main>
    </div>
  );
}
