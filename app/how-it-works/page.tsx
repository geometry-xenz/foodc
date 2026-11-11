import { ContentPage } from "@/components/content-page";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ScanLine, FlaskConical, Target, Utensils } from "lucide-react";

export const metadata = {
  title: "How DRISHYAM Works — Kitchen Vision to Plate Execution",
  description: "Learn how DRISHYAM transforms physical pantry ingredients into personalized gastronomic recommendations.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      icon: ScanLine,
      title: "Live Kitchen Vision & Label OCR",
      tagline: "Multimodal Gemini Vision · Label OCR · Fresh Produce Detection",
      description:
        "Point your camera at pantry shelves, spice containers, or market hauls. DRISHYAM’s real-time vision pipeline runs Devanagari and Latin OCR alias matching (haldi → turmeric, jeera → cumin) alongside produce detection. Detections accumulate with confidence scoring before you confirm them into your pantry.",
      image: "/images/keyframes/02-ai-scanning.webp",
    },
    {
      num: "02",
      icon: FlaskConical,
      title: "Volatile Aroma Coherence",
      tagline: "FlavorDB Molecular Graph · Shared Volatiles",
      description:
        "Every confirmed item is mapped to its volatile aroma fingerprint. Our computational gastronomy engine calculates pairwise molecular overlap. A recipe's flavour coherence score rewards shared volatiles and penalizes sensory discordance.",
      image: "/images/keyframes/03-flavour-science.webp",
    },
    {
      num: "03",
      icon: Target,
      title: "Biological Energy & Target Fit",
      tagline: "Mifflin-St Jeor · 8 Goal Protocols",
      description:
        "The engine computes your BMR and TDEE based on height, weight, age, and activity. Whether you select fat loss (-20% deficit, high protein) or lean bulk (+10% surplus), remaining targets for the meal slot dynamically shape recipe ranking.",
      image: "/images/keyframes/04-recipe-nutrition.webp",
    },
    {
      num: "04",
      icon: Utensils,
      title: "Precision Execution & Cooking Mode",
      tagline: "Step-by-step guidance · Ambient Timer · Screen Wake Lock",
      description:
        "Enter fullscreen cooking mode on mobile or desktop. Swipe through clear instructional steps, keep your screen illuminated without touching oily screens, and automatically log consumed nutrition to your daily metabolic summary.",
      image: "/images/keyframes/01-ingredient-identification.webp",
    },
  ];

  return (
    <ContentPage
      eyebrow="The Workflow · From Lens to Table"
      title={
        <>
          How DRISHYAM Turns Your Pantry into{" "}
          <span className="italic text-gold-gradient">Gastronomic Art.</span>
        </>
      }
      subtitle="A seamless pipeline merging edge computer vision, molecular aroma databases, and metabolic target calculation."
    >
      <div className="space-y-20 mt-8">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isEven = idx % 2 === 1;
          return (
            <div
              key={s.num}
              className={`grid gap-10 lg:grid-cols-2 items-center ${isEven ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={isEven ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-3xl font-semibold text-[#E8B56A]">
                    {s.num}
                  </span>
                  <span className="h-px w-8 bg-white/20" />
                  <span className="text-[0.62rem] uppercase tracking-widest text-[#8B7E6D]">
                    {s.tagline}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6EFE4]">
                  {s.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#B3A798]">
                  {s.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-[#E8B56A]">
                  <CheckCircle2 size={15} />
                  <span>Verified by engine contracts</span>
                </div>
              </div>

              <div
                className={`relative rounded-2xl border border-[rgba(232,181,106,.18)] overflow-hidden bg-black/40 p-2 ${
                  isEven ? "lg:col-start-1" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  width={836}
                  height={470}
                  className="rounded-xl object-cover w-full h-auto"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-20 rounded-2xl border border-[rgba(232,181,106,.25)] bg-[linear-gradient(135deg,rgba(232,181,106,0.06),transparent)] p-8 sm:p-12 text-center">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6EFE4]">
          Ready to experience the intelligent kitchen?
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#A79C8D]">
          Explore the workspace directly with our seeded demo kitchen or connect your own pantry.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/app" className="btn btn-gold">
            Launch DRISHYAM <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </ContentPage>
  );
}
