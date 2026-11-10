"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = "hidden";

    if (reduced) {
      setProgress(100);
      const t = window.setTimeout(() => finish(), 300);
      return () => window.clearTimeout(t);
    }

    let current = 0;
    const interval = window.setInterval(() => {
      current = Math.min(current + Math.random() * 13 + 4, 92);
      setProgress(current);
    }, 110);

    const onLoad = () => {
      window.clearInterval(interval);
      setProgress(100);
      window.setTimeout(finish, 520);
    };

    if (document.readyState === "complete") {
      window.setTimeout(onLoad, 500);
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    const fallback = window.setTimeout(onLoad, 4200);

    function finish() {
      setDone(true);
      document.documentElement.style.overflow = "";
    }

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fallback);
      window.removeEventListener("load", onLoad);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#080808] transition-all duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,138,50,0.08),transparent_55%)]" />
      <div className="relative flex flex-col items-center">
        <div className="mb-9 animate-pulse-glow">
          <Logo />
        </div>
        <div className="mb-4 h-px w-[190px] overflow-hidden bg-white/10 sm:w-[260px]">
          <div
            className="h-full bg-[linear-gradient(90deg,#D96A1F,#FF8A32,#E8B56A)] transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex w-[190px] items-center justify-between text-[0.58rem] uppercase tracking-[0.26em] text-[#756D62] sm:w-[260px]">
          <span>Profiling aromatics</span>
          <span className="tabular-nums text-[#E8B56A]">
            {String(Math.round(progress)).padStart(3, "0")}%
          </span>
        </div>
      </div>
      <div className="absolute bottom-10 text-[0.56rem] uppercase tracking-[0.32em] text-[#514A42]">
        FlavorDB · RecipeDB · Mifflin-St Jeor
      </div>
    </div>
  );
}
