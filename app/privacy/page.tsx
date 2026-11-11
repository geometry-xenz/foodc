import { ContentPage } from "@/components/content-page";
import { ShieldCheck, EyeOff, Lock, Trash2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Camera Disclosures — DRISHYAM",
  description: "Our privacy policy and strict edge camera and Deep Inspect data protection disclosures.",
};

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Privacy Policy · Last Updated November 2026"
      title={
        <>
          Your Kitchen, Your Biology.{" "}
          <span className="italic text-gold-gradient">Strictly Private.</span>
        </>
      }
      subtitle="We believe an intelligent kitchen must be an uncompromisingly private kitchen. Read our edge processing guarantees and Deep Inspect disclosures below."
    >
      <div className="space-y-8">
        <section className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8B56A]/10 text-[#E8B56A]">
              <EyeOff size={18} />
            </span>
            <h2 className="font-display text-xl font-semibold text-[#F6EFE4]">
              1. Edge-First Camera Scanning (§21 Disclosure)
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#B3A798]">
            The DRISHYAM camera scanner and Vision pipeline process image frames with privacy-first
            principles. No continuous video feeds or live viewfinder frames are ever continuously streamed or stored without user action.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF8A32]/10 text-[#FF8A32]">
              <Lock size={18} />
            </span>
            <h2 className="font-display text-xl font-semibold text-[#F6EFE4]">
              2. Deep Inspect Disclosures (§5.4 & §21)
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#B3A798]">
            When you explicitly choose to use the <em>Deep Inspect</em> feature:
          </p>
          <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#D1C7BA]">
            <li className="flex items-start gap-2">
              <span className="text-[#FF8A32] mt-0.5">▪</span>
              <span>
                <strong>Explicit Single-Action Consent:</strong> Deep Inspect only captures a single still frame when you tap "Inspect" on the Deep Inspect bottom sheet with <code>consent=true</code>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF8A32] mt-0.5">▪</span>
              <span>
                <strong>Ephemeral In-Memory Processing:</strong> The image (maximum 8 MB) is transmitted over TLS to our FastAPI backend, analyzed strictly in ephemeral memory, and immediately discarded.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF8A32] mt-0.5">▪</span>
              <span>
                <strong>Zero Image Storage:</strong> Images submitted for Deep Inspect are <strong>never written to disk, object storage, databases, or training corpora</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF8A32] mt-0.5">▪</span>
              <span>
                <strong>Rate Limiting:</strong> Requests are capped at 10 requests per minute per user to prevent denial of service and accidental battery drain.
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8B56A]/10 text-[#E8B56A]">
              <ShieldCheck size={18} />
            </span>
            <h2 className="font-display text-xl font-semibold text-[#F6EFE4]">
              3. Biometric & Nutritional Data Ownership
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#B3A798]">
            Your biometrics (age, gender, height, weight, activity levels) are utilized solely to
            calculate your Mifflin-St Jeor BMR and target macros. We do not sell or broker personal
            health data to third-party advertisers or insurance networks.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8B56A]/10 text-[#E8B56A]">
              <Trash2 size={18} />
            </span>
            <h2 className="font-display text-xl font-semibold text-[#F6EFE4]">
              4. Complete Account & Data Erasure (§5.3)
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#B3A798]">
            You have the absolute right to delete your account at any time via <code>DELETE /api/auth/account</code> or
            through the Settings screen. Account deletion triggers a complete cascade deleting your
            profile, goals, pantry inventory, meal logs, shopping lists, and session tokens.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
