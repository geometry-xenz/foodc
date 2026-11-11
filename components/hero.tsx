"use client";

import { useEffect, useRef, useState } from "react";
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
  const [videoSrc, setVideoSrc] = useState("/videos/hero-1080.mp4");

  useEffect(() => {
    // Pick optimal video source based on screen width and devicePixelRatio
    const effectiveWidth = window.innerWidth * (window.devicePixelRatio || 1);
    if (effectiveWidth <= 1280) {
      setVideoSrc("/videos/hero-720.mp4");
    } else if (effectiveWidth <= 1920) {
      setVideoSrc("/videos/hero-1080.mp4");
    } else {
      setVideoSrc("/videos/hero-1440.mp4");
    }
  }, []);

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
        if (video.readyState >= 2 && !video.seeking) {
          current += (target - current) * 0.22;
          if (Math.abs(target - current) > 0.005) {
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
  }, [videoSrc]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] scroll-mt-24 items-end overflow-hidden pb-16 pt-32 sm:items-center sm:pb-24 sm:pt-28"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90 transition-opacity duration-500"
          src={videoSrc}
          poster="/videos/hero-poster.webp"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Crisp text gradient on left only; right side keeps food video bright and punchy */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.92)_0%,rgba(8,8,8,0.72)_38%,rgba(8,8,8,0.1)_72%,rgba(8,8,8,0.35)_100%)] pointer-events-none" />
        <div className="hero-vignette absolute inset-0 pointer-events-none" />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-[1380px] grid-cols-1 items-center px-5 sm:px-8">
        <div className="max-w-[760px]">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="eyebrow">THE INTELLIGENT KITCHEN</span>
            <span className="hidden h-px w-10 bg-[rgba(232,181,106,.3)] sm:block" />
            <span className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8B7E6D]">
              Est. 2026 · FlavorDB driven
            </span>
          </div>

          <h1 className="hero-title text-balance">
            Your <span className="font-display italic text-gold-gradient">ingredients.</span>
            <br />
            Your <span className="font-display italic text-gold-gradient">nutrition.</span>
            <br />
            Your next great meal.
          </h1>

          <p className="mt-7 max-w-[560px] text-[0.95rem] leading-7 text-[#B3A798] sm:text-[1.02rem]">
            DRISHYAM reads the molecular language of your kitchen — profiling
            volatile aromatics, ranking what you can cook right now, and
            translating every plate into precise metabolic targets.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Magnetic strength={0.18}>
              <Link href="/app" className="btn btn-gold">
                Start exploring
                <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.14}>
              <Link href="#scene-1" className="btn btn-ghost">
                Discover how it works
                <ArrowDown size={15} />
              </Link>
            </Magnetic>
          </div>

          <div className="mt-10 grid max-w-[600px] grid-cols-2 gap-x-4 gap-y-5 border-t border-[rgba(232,181,106,.12)] pt-6 sm:grid-cols-4">
            {[
              { value: ingredientCount, label: "Pantry ingredients" },
              { value: recipeCount, label: "Molecular recipes" },
              { value: compoundCount, label: "Aroma links" },
              { value: 8, label: "Metabolic protocols" },
            ]
              .filter((stat) => stat.value > 0)
              .map((stat) => (
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

      <div className="absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}
