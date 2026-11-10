"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/magnetic";

export function Hero({
  ingredientCount,
  recipeCount,
  compoundCount,
}: {
  ingredientCount: number;
  recipeCount: number;
  compoundCount: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let target = 0;
    let current = 0;
    let disposed = false;
    let scrollTrigger: { kill: () => void } | null = null;

    const setStaticFrame = () => {
      if (video.readyState >= 2) {
        video.currentTime = Math.min(1.4, (video.duration || 10) * 0.14);
      }
    };

    if (reduced) {
      if (video.readyState >= 1) setStaticFrame();
      else video.addEventListener("loadedmetadata", setStaticFrame, { once: true });
      return () => video.removeEventListener("loadedmetadata", setStaticFrame);
    }

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (disposed) return;

      const duration = () => (Number.isFinite(video!.duration) ? video!.duration : 10);

      scrollTrigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          target = self.progress * Math.max(duration() - 0.08, 0);
        },
      });

      const tick = () => {
        if (!video) return;
        if (video.readyState >= 2) {
          current += (target - current) * 0.18;
          if (Math.abs(target - current) > 0.004) {
            try {
              video.currentTime = current;
            } catch {
              /* seeking can briefly reject on fast scrub */
            }
          }
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] scroll-mt-24 items-end overflow-hidden pb-16 pt-32 sm:items-center sm:pb-24 sm:pt-28"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-55 sm:opacity-60"
          src="/videos/drishyam-cinematic.mp4"
          poster="/images/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.96)_0%,rgba(8,8,8,0.75)_34%,rgba(8,8,8,0.2)_66%,rgba(8,8,8,0.55)_100%)]" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-[1380px] grid-cols-1 items-center px-5 sm:px-8">
        <div className="max-w-[760px]">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="eyebrow">Computational Gastronomy</span>
            <span className="hidden h-px w-10 bg-[rgba(232,181,106,.3)] sm:block" />
            <span className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8B7E6D]">
              Est. 2026 · FlavorDB driven
            </span>
          </div>

          <h1 className="hero-title text-balance">
            See your{" "}
            <span className="font-display italic text-gold-gradient">ingredients.</span>
            <br />
            Discover your{" "}
            <span className="font-display italic text-gold-gradient">possibilities.</span>
          </h1>

          <p className="mt-7 max-w-[560px] text-[0.95rem] leading-7 text-[#B3A798] sm:text-[1.02rem]">
            DRISHYAM reads the molecular language of your kitchen — profiling
            volatile aromatics, ranking what you can cook right now, and
            translating every plate into precise metabolic targets.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Magnetic strength={0.18}>
              <Link href="/app" className="btn btn-gold">
                Launch your kitchen
                <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.14}>
              <Link href="#scene-1" className="btn btn-ghost">
                Trace the science
                <ArrowDown size={15} />
              </Link>
            </Magnetic>
          </div>

          <div className="mt-10 grid max-w-[600px] grid-cols-2 gap-x-4 gap-y-5 border-t border-[rgba(232,181,106,.12)] pt-6 sm:grid-cols-4">
            {[
              { value: ingredientCount, label: "Pantry ingredients" },
              { value: recipeCount, label: "Molecular recipes" },
              { value: compoundCount, label: "Aroma links" },
              { value: 6, label: "Metabolic protocols" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[1.85rem] leading-none text-[#F3D3A1]">
                  {stat.value}
                  <span className="text-[#FF8A32]">+</span>
                </div>
                <div className="mt-1.5 text-[0.55rem] uppercase tracking-[0.16em] text-[#756D62]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[0.5rem] uppercase tracking-[0.3em] text-[#6E6458]">
          Enter the sequence
        </span>
        <span className="h-9 w-px overflow-hidden bg-white/10">
          <span className="block h-3 w-px animate-[scan_2.6s_ease-in-out_infinite] bg-[#E8B56A]" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}
