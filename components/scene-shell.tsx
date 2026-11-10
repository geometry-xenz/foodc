"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SceneShell({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  reverse = false,
  stacked = false,
  className,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
  reverse?: boolean;
  stacked?: boolean;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    let cleanup: (() => void) | undefined;
    let disposed = false;

    async function init() {
      const node = sectionRef.current;
      if (!node) return;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (disposed) return;

      const reveals = node.querySelectorAll<HTMLElement>("[data-reveal]");
      const parallax = node.querySelectorAll<HTMLElement>("[data-scrub]");

      const tween = gsap.fromTo(
        reveals,
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const scrubTween = gsap.fromTo(
        parallax,
        { y: 38 },
        {
          y: -38,
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        scrubTween.scrollTrigger?.kill();
        scrubTween.kill();
      };
    }
    init();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("relative scroll-mt-24 px-5 py-20 sm:px-8 md:min-h-[150vh] md:py-0", className)}
    >
      <div className="md:sticky md:top-0 md:flex md:min-h-screen md:items-center">
        <div className="mx-auto w-full max-w-[1280px]">
          {stacked ? (
            <div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_0.05fr] lg:items-end">
                <div className="relative" data-scrub>
                  <div className="mb-5 flex items-center gap-4" data-reveal>
                    <span className="scene-index">{index}</span>
                    <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(232,181,106,.32),transparent)]" />
                  </div>
                  <div className="eyebrow mb-5" data-reveal>
                    {eyebrow}
                  </div>
                  <h2
                    className="max-w-[780px] font-display text-[clamp(2.4rem,5.4vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-balance"
                    data-reveal
                  >
                    {title}
                  </h2>
                  <p className="mt-5 max-w-[580px] text-[0.92rem] leading-7 text-[#A79C8D]" data-reveal>
                    {description}
                  </p>
                </div>
              </div>
              <div className="mt-9" data-scrub>
                {children}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16",
                reverse && "lg:grid-cols-[1.08fr_0.92fr]",
              )}
            >
              <div className={cn("relative", reverse && "lg:order-2")} data-scrub>
                <div className="mb-5 flex items-center gap-4" data-reveal>
                  <span className="scene-index">{index}</span>
                  <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(232,181,106,.32),transparent)]" />
                </div>
                <div className="eyebrow mb-5" data-reveal>
                  {eyebrow}
                </div>
                <h2
                  className="max-w-[560px] font-display text-[clamp(2.4rem,5.1vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-balance"
                  data-reveal
                >
                  {title}
                </h2>
                <p
                  className="mt-6 max-w-[500px] text-[0.92rem] leading-7 text-[#A79C8D]"
                  data-reveal
                >
                  {description}
                </p>
              </div>
              <div className={cn("relative", reverse && "lg:order-1")} data-scrub>
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
