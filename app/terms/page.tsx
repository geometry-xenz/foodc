import { ContentPage } from "@/components/content-page";

export const metadata = {
  title: "Terms of Service — DRISHYAM",
  description: "Terms and conditions of using the DRISHYAM computational gastronomy platform.",
};

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Terms of Service · Effective November 2026"
      title={
        <>
          Terms of Service &{" "}
          <span className="italic text-gold-gradient">Usage Disclosures.</span>
        </>
      }
      subtitle="Please review the terms governing use of the DRISHYAM web application, mobile scanner, and nutritional guidance services."
    >
      <div className="space-y-6 text-sm text-[#B3A798] leading-relaxed">
        <section className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-semibold text-[#F6EFE4] mb-2">
            1. Nutritional & Medical Disclaimer (§5.7)
          </h2>
          <p>
            DRISHYAM provides mathematical estimations of energy requirements, macronutrient
            distributions, and culinary pairing synergy. <strong>DRISHYAM is not a medical device,
            nor does it provide licensed medical or dietetic advice.</strong> Calculations are
            estimates derived from the Mifflin-St Jeor equation and USDA FoodData Central.
            Individuals with medical conditions, eating disorders, or metabolic disorders should
            consult a licensed healthcare professional before altering their diet.
          </p>
        </section>

        <section className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-semibold text-[#F6EFE4] mb-2">
            2. Severe Allergies & Ingredient Recognition (§4 & §5.1)
          </h2>
          <p>
            While DRISHYAM features deterministic hard allergy filters, computer vision, OCR, and
            machine learning models are inherently probabilistic. <strong>Never rely solely on
            camera scanning or automated recognition if you have life-threatening food allergies
            (such as anaphylaxis to peanuts, shellfish, or tree nuts).</strong> Always manually
            verify physical ingredient packaging and allergen labels.
          </p>
        </section>

        <section className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-semibold text-[#F6EFE4] mb-2">
            3. Camera & Cloud Processing Consent (§21)
          </h2>
          <p>
            By invoking the Deep Inspect feature in the mobile app, you explicitly authorize the
            one-time transmission of a single camera frame to our backend for classification.
            You confirm that you have rights to capture the photographed items and that no unlawful
            or private non-culinary material is uploaded.
          </p>
        </section>

        <section className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-semibold text-[#F6EFE4] mb-2">
            4. Service Availability & Data Integrity
          </h2>
          <p>
            DRISHYAM synchronizes user data idempotently using cryptographic session tokens and
            versioned sync operations. We strive for high availability but provide the software
            on an "as is" and "as available" basis.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
