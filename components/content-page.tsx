"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingNav } from "@/components/landing-nav";
import { LandingFooter } from "@/components/landing-footer";

interface ContentPageProps {
  eyebrow: string;
  title: string | ReactNode;
  subtitle?: string;
  children: ReactNode;
  showBack?: boolean;
}

export function ContentPage({
  eyebrow,
  title,
  subtitle,
  children,
  showBack = true,
}: ContentPageProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F6EFE4] flex flex-col justify-between selection:bg-[#E8B56A]/20 selection:text-[#F3D3A1]">
      <LandingNav />

      <main className="relative flex-1 pt-32 pb-20 px-5 sm:px-8">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(232,181,106,0.06),transparent_70%)]" />

        <div className="relative mx-auto max-w-[1080px]">
          {showBack && (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#8B7E6D] hover:text-[#E8B56A] transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Back to Overview
            </Link>
          )}

          <div className="mb-12">
            <div className="eyebrow mb-4">{eyebrow}</div>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#B3A798] max-w-[760px]">
                {subtitle}
              </p>
            )}
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-[#D1C7BA] leading-relaxed">
            {children}
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
