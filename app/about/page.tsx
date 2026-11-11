import { ContentPage } from "@/components/content-page";
import { Sparkles, Award, Compass, Cpu } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About DRISHYAM — Computational Gastronomy & Molecular Precision",
  description: "DRISHYAM bridges molecular aroma chemistry and metabolic biology into an intelligent kitchen workspace.",
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="Computational Gastronomy · Est. 2026"
      title={
        <>
          The Architecture of an{" "}
          <span className="italic text-gold-gradient">Intelligent Kitchen.</span>
        </>
      }
      subtitle="DRISHYAM was founded on a simple observation: cooking is a chemical system, yet every digital kitchen tool treats it as a static recipe card."
    >
      <div className="grid gap-12 sm:grid-cols-2 items-center">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6EFE4]">
            From Volatile Compounds to Metabolic Energy
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#B3A798]">
            Traditional recipes tell you what to stir, but not why spices harmonize. When cumin,
            clove, and coriander meet in hot fat, their shared volatiles — like cuminaldehyde,
            eugenol, and beta-caryophyllene — form molecular bridges that define great gastronomy.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#B3A798]">
            Simultaneously, food is human fuel. By combining FlavorDB’s volatile chemical ontology
            with USDA FoodData Central nutritional baselines and Mifflin-St Jeor metabolic equations,
            DRISHYAM calculates what you can cook from your live pantry while hitting your biological
            goals.
          </p>
        </div>
        <div className="relative rounded-2xl border border-[rgba(232,181,106,.2)] overflow-hidden bg-black/40 p-2">
          <Image
            src="/images/keyframes/03-flavour-science.webp"
            alt="Flavour science and molecular pairing"
            width={836}
            height={470}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8B56A]/10 text-[#E8B56A] mb-4">
            <Cpu size={20} />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">Engine-Driven</h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8B7E6D]">
            Single FastAPI & PostgreSQL engine serving deterministic 3D Fibonacci aroma graphs,
            gastronomic ranking scores, and metabolic targets across web and native Android.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A32]/10 text-[#FF8A32] mb-4">
            <Compass size={20} />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">Total Provenance</h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8B7E6D]">
            Zero fabricated numbers. Every micronutrient, volatile molecule, and recipe score is
            badged with its authoritative source: USDA FDC, FlavorDB, RecipeDB, or device camera OCR.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8B56A]/10 text-[#E8B56A] mb-4">
            <Award size={20} />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">Private by Design</h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8B7E6D]">
            Edge-first mobile camera pipeline with zero tracking. Deep Inspect requires explicit
            single-frame consent, processed entirely in volatile RAM and never retained.
          </p>
        </div>
      </div>
    </ContentPage>
  );
}
