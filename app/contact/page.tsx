import { ContentPage } from "@/components/content-page";
import { Mail, ArrowUpRight, MessageSquare, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact DRISHYAM — Culinary Laboratory",
  description: "Get in touch with the DRISHYAM computational gastronomy research team.",
};

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="Contact & Inquiries · Culinary Laboratory"
      title={
        <>
          Get in Touch with the{" "}
          <span className="italic text-gold-gradient">Research Team.</span>
        </>
      }
      subtitle="Have questions about our volatile aroma models, nutritional engines, or partnership opportunities? Reach out directly to our engineering team."
    >
      <div className="max-w-2xl mt-8">
        <div className="rounded-2xl border border-[rgba(232,181,106,.2)] bg-[rgba(16,14,12,.7)] p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8B56A]/10 text-[#E8B56A] mb-6">
            <Mail size={24} />
          </div>

          <h2 className="font-display text-2xl font-semibold text-[#F6EFE4]">
            Direct Email Inquiries
          </h2>
          <p className="mt-2 text-sm text-[#B3A798] leading-relaxed">
            Our team responds directly to culinary scientists, developers, and users.
            Click below to open your preferred email client:
          </p>

          <div className="mt-8">
            <a
              href="mailto:contact@drishyam.ai?subject=DRISHYAM%20Inquiry"
              className="btn btn-gold inline-flex items-center gap-2"
            >
              <Mail size={16} />
              <span>contact@drishyam.ai</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="mt-10 border-t border-white/5 pt-6 grid grid-cols-2 gap-4 text-xs text-[#8B7E6D]">
            <div>
              <span className="font-semibold text-[#F6EFE4] block mb-1">Laboratory Hours</span>
              <span>Monday – Friday, 09:00 – 18:00 IST</span>
            </div>
            <div>
              <span className="font-semibold text-[#F6EFE4] block mb-1">Response Time</span>
              <span>Typically within 24 business hours</span>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
