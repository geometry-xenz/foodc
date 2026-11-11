"use client";

import Link from "next/link";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { Preloader } from "@/components/preloader";
import { LandingNav } from "@/components/landing-nav";
import { Hero } from "@/components/hero";
import { SceneShell } from "@/components/scene-shell";
import { BotanicalScene } from "@/components/scenes/botanical-scene";
import {
  GoalsScene,
  NutritionDashboardScene,
  PantryTelemetryScene,
} from "@/components/scenes/telemetry-nutrition-scenes";
import { FlavourGraph } from "@/components/three/flavour-graph";
import { LandingFooter } from "@/components/landing-footer";

export function LandingExperience({
  ingredientCount,
  recipeCount,
  compoundCount,
}: {
  ingredientCount: number;
  recipeCount: number;
  compoundCount: number;
}) {
  return (
    <>
      <Preloader />
      <LandingNav />
      <main>
        <Hero
          ingredientCount={ingredientCount}
          recipeCount={recipeCount}
          compoundCount={compoundCount}
        />

        <div className="relative overflow-hidden border-y border-[rgba(232,181,106,.1)] bg-[linear-gradient(90deg,rgba(255,138,50,.035),transparent_30%,transparent_70%,rgba(232,181,106,.03))]">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-5 py-5 text-[0.55rem] uppercase tracking-[0.2em] text-[#6F665B] sm:flex-row sm:items-center sm:px-8">
            <span className="text-[#C9B79F]">A kitchen is a chemical system.</span>
            <span>Volatile profiling</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>Pantry state</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>Goal translation</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span className="text-[#FF9B52]">One continuous model</span>
          </div>
        </div>

        <SceneShell
          id="scene-1"
          index="01"
          eyebrow="Botanical & chemical profiling"
          title={
            <>
              Every ingredient has a{" "}
              <span className="italic text-gold-gradient">molecular story.</span>
            </>
          }
          description="Before a recipe is ranked, every ingredient is read at the level of its essential oils. Curcumin, cuminaldehyde and eugenol are not garnish — they are the grammar of flavour."
        >
          <BotanicalScene />
        </SceneShell>

        <SceneShell
          id="scene-2"
          index="02"
          eyebrow="Real-time pantry detection"
          title={
            <>
              Everything you have.{" "}
              <span className="italic text-gold-gradient">One intelligent pantry.</span>
            </>
          }
          description="Vision detections accumulate into a live pantry state. Each confirmed signal is deduplicated, mapped to the ingredient ontology, and linked to its volatile compound profile."
          reverse
        >
          <PantryTelemetryScene
            ingredientCount={ingredientCount}
            compoundCount={compoundCount}
          />
        </SceneShell>

        <SceneShell
          id="scene-3"
          index="03"
          eyebrow="Interactive molecular aroma network"
          title={
            <>
              Pairing is not a guess.{" "}
              <span className="italic text-gold-gradient">It is a shared molecule.</span>
            </>
          }
          description="Force-directed springs connect ingredients to their volatile compounds. Hover any node to expose the chemistry behind the pairing — and see which single molecules bridge your entire pantry."
          stacked
        >
          <FlavourGraph />
        </SceneShell>

        <SceneShell
          id="scene-4"
          index="04"
          eyebrow="Dynamic nutritional gastronomy"
          title={
            <>
              Know what goes onto{" "}
              <span className="italic text-gold-gradient">your plate.</span>
            </>
          }
          description="Every recommendation carries its metabolic consequences. Macronutrients, fibre and total energy are translated against a live target built from your own biology — not a generic diet template."
        >
          <NutritionDashboardScene />
        </SceneShell>

        <SceneShell
          id="scene-5"
          index="05"
          eyebrow="Multi-objective fitness goals"
          title={
            <>
              Change the goal.{" "}
              <span className="italic text-gold-gradient">Change the math.</span>
            </>
          }
          description="Eight evidence-based protocols, one metabolic engine. Every protocol recalculates calories and protein from your bodyweight, then redistributes carbohydrate and fat to match the physiological objective."
          stacked
        >
          <GoalsScene />
        </SceneShell>

        <section className="relative overflow-hidden border-t border-[rgba(232,181,106,.12)] py-24 sm:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(255,138,50,.09),transparent_70%)]" />
          <div className="relative mx-auto max-w-[960px] px-5 text-center sm:px-8">
            <span className="eyebrow">THE INTELLIGENT KITCHEN</span>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] text-[#F6EFE4] sm:text-6xl">
              Make more of what&apos;s already in{" "}
              <span className="italic text-gold-gradient">your kitchen.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-sm leading-7 text-[#A99C8C] sm:text-base">
              Scan your shelves with the Android companion or step straight into the computational gastronomy workspace on the web.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/app" className="btn btn-gold">
                Start exploring
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/android"
                className="btn btn-ghost border-[#FF8A32]/40 bg-[#FF8A32]/10 text-[#F6EFE4] hover:border-[#FF8A32]"
              >
                <Smartphone size={15} className="text-[#FF8A32]" />
                Run Android App
              </Link>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
