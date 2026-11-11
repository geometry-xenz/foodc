import { ContentPage } from "@/components/content-page";
import { FlavourGraph } from "@/components/three/flavour-graph";
import { Atom, Compass, Network, Sparkles } from "lucide-react";

export const metadata = {
  title: "Flavour Science & 3D Aroma Graph — DRISHYAM",
  description: "Explore the volatile chemistry connecting spices and produce on the 3D Fibonacci aroma sphere.",
};

export default function FlavourSciencePage() {
  return (
    <ContentPage
      eyebrow="Molecular Volatiles · FlavorDB · Computational Gastronomy"
      title={
        <>
          The Chemistry of Taste on a{" "}
          <span className="italic text-gold-gradient">3D Molecular Sphere.</span>
        </>
      }
      subtitle="Ingredients do not pair by tradition alone. They pair through shared volatile organic molecules. Explore the server-computed 3D Fibonacci network below."
    >
      {/* Interactive 3D Graph Component */}
      <div className="my-8">
        <FlavourGraph />
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8B56A]/10 text-[#E8B56A] mb-4">
            <Compass size={20} />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">
            Fibonacci Sphere Coordinates
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8B7E6D]">
            Ingredients are deterministically arrayed across a Fibonacci golden-spiral sphere.
            Identical inputs yield exact floating-point coordinates across web and Android.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A32]/10 text-[#FF8A32] mb-4">
            <Atom size={20} />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">
            Centroid Compound Placement
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8B7E6D]">
            Each volatile molecule sits at the centroid of the ingredients that contain it.
            A shared compound like <code className="text-[#E8B56A]">eugenol</code> naturally bridges
            clove, cinnamon, and bay leaf.
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8B56A]/10 text-[#E8B56A] mb-4">
            <Network size={20} />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#F6EFE4]">
            Gastronomy Coherence Scoring
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8B7E6D]">
            Mise’s gastronomic ranking formula computes:
            <br />
            <span className="font-mono text-[#D1C7BA] text-[0.7rem]">
              0.30 core + 0.20 util + 0.20 flavour + 0.30 gap fit
            </span>
            <br />
            Maximizing molecular synergy across your real pantry.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-[#0e0c0a] p-8">
        <h3 className="font-display text-xl font-semibold text-[#F6EFE4]">
          Key Shared Volatiles in Indian Cuisine
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 p-4">
            <div className="font-semibold text-[#E8B56A] text-sm">Cuminaldehyde & Pinene</div>
            <div className="text-xs text-[#B3A798] mt-1">
              Shared by Cumin and Black Pepper. Imparts pungent, warm, citrus-woody undertones fundamental to tadka.
            </div>
          </div>
          <div className="rounded-xl border border-white/5 p-4">
            <div className="font-semibold text-[#E8B56A] text-sm">Zingiberene & Curcumin</div>
            <div className="text-xs text-[#B3A798] mt-1">
              Shared by Turmeric and Fresh Ginger. Synergizes in oil mediums to create vibrant, peppery earthiness.
            </div>
          </div>
          <div className="rounded-xl border border-white/5 p-4">
            <div className="font-semibold text-[#E8B56A] text-sm">Eugenol & Cinnamaldehyde</div>
            <div className="text-xs text-[#B3A798] mt-1">
              Connects Clove, Cinnamon, and Cardamom. The aromatic spine of Garam Masala and Biryani aromatics.
            </div>
          </div>
          <div className="rounded-xl border border-white/5 p-4">
            <div className="font-semibold text-[#E8B56A] text-sm">Linalool & Beta-Caryophyllene</div>
            <div className="text-xs text-[#B3A798] mt-1">
              Found in Coriander Seeds and Basil. Delivers citrus-floral high notes that balance rich curries.
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
