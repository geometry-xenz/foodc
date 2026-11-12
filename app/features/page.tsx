import { ContentPage } from "@/components/content-page";
import Link from "next/link";
import {
  Scan,
  Sparkles,
  UtensilsCrossed,
  Layers,
  CalendarCheck2,
  ShoppingCart,
  ShieldCheck,
  Smartphone,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Features & Architecture — DRISHYAM",
  description: "Explore the full computational gastronomy and personalized nutrition feature suite.",
};

export default function FeaturesPage() {
  const featureList = [
    {
      icon: Scan,
      title: "Real-Time Vision Scanner",
      desc: "Gemini Vision and OCR pipeline with multi-language recognition, produce detection, confidence scoring, and Deep Inspect fallback.",
    },
    {
      icon: Sparkles,
      title: "3D Molecular Flavour Graph",
      desc: "Deterministic Fibonacci sphere layout of ingredients and centroid-positioned volatile aroma molecules from FlavorDB.",
    },
    {
      icon: UtensilsCrossed,
      title: "Gastronomic Recipe Ranking",
      desc: "Mise rank formula combining core coverage, pantry utilization, flavour coherence, and metabolic target fit.",
    },
    {
      icon: Layers,
      title: "Pantry State Management",
      desc: "Track ingredient expiration dates, stock confidence levels, detection provenance, and single-click recipe unlock suggestions.",
    },
    {
      icon: CalendarCheck2,
      title: "Weekly Meal Planner",
      desc: "Drag-and-drop meal scheduling across breakfast, lunch, dinner, and snacks with automated daily target validation.",
    },
    {
      icon: ShoppingCart,
      title: "Smart Shopping List",
      desc: "One-click 'Build shopping list from meal plan' calculating exact ingredient deficits against current pantry inventory.",
    },
    {
      icon: ShieldCheck,
      title: "Hard Allergy & Diet Gates",
      desc: "Deterministic allergen exclusions (peanut, tree nut, dairy, gluten, soy, shellfish) and lifestyle adherence (vegan, jain, etc.).",
    },
    {
      icon: Smartphone,
      title: "Real-Time Cloud Sync Engine",
      desc: "Opaque cursor pagination with idempotent sync_ops and server-authoritative conflict resolution across all sessions.",
    },
  ];

  return (
    <ContentPage
      eyebrow="Capabilities · The Intelligent Kitchen Ecosystem"
      title={
        <>
          Every Tool You Need to{" "}
          <span className="italic text-gold-gradient">Master Culinary Chemistry.</span>
        </>
      }
      subtitle="From computer vision at the pantry shelf to metabolic meal execution on your dinner plate."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {featureList.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-[rgba(232,181,106,.3)] transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8B56A]/10 text-[#E8B56A] mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8B7E6D]">{f.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-2xl border border-[rgba(232,181,106,.2)] bg-[rgba(16,14,12,.7)] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-semibold text-[#F6EFE4]">
            Ready to explore DRISHYAM?
          </h3>
          <p className="mt-1 text-xs text-[#A79C8D]">
            Start with the live interactive web workspace to explore molecular pairing and metabolic nutrition.
          </p>
        </div>
        <Link href="/app" className="btn btn-gold shrink-0">
          Launch App <ArrowRight size={15} />
        </Link>
      </div>
    </ContentPage>
  );
}
