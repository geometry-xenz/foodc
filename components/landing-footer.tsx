import Link from "next/link";
import { ArrowUpRight, FlaskConical, Github, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
const COMPOUND_MARQUEE = [
  "curcumin",
  "cuminaldehyde",
  "eugenol",
  "piperine",
  "allicin",
  "linalool",
  "cinnamaldehyde",
  "beta-caryophyllene",
  "capsaicin",
  "diacetyl",
  "geraniol",
  "vanillin",
];

export function LandingFooter() {
  const marquee = COMPOUND_MARQUEE.join(" · ");
  return (
    <footer className="relative">
      <div className="overflow-hidden border-y border-[rgba(232,181,106,.12)] bg-[rgba(255,255,255,.012)] py-3.5">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-8 pr-8 text-[0.56rem] uppercase tracking-[0.24em] text-[#6F665B]"
            >
              {marquee.split(" · ").map((compound) => (
                <span key={`${copy}-${compound}`} className="flex items-center gap-8">
                  {compound}
                  <span className="text-[#FF8A32]/50">◇</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(/images/scene-aromatics.jpg)" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,8,8,.62),#080808_75%)]" />
        </div>
        <div className="relative mx-auto max-w-[1050px] text-center">
          <div className="eyebrow mb-6 justify-center before:hidden">The Intelligent Kitchen</div>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
            Make more of what&apos;s already{" "}
            <br />
            <span className="italic text-gold-gradient">in your kitchen.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[0.92rem] leading-7 text-[#A79C8D]">
            Step into the workspace where molecular gastronomy meets your
            metabolism. Your pantry, your goals, one precise kitchen.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/app" className="btn btn-gold">
              Launch DRISHYAM <ArrowUpRight size={15} />
            </Link>
            <Link href="/login" className="btn btn-ghost">
              <Sparkles size={14} /> Enter demo kitchen
            </Link>
          </div>
          <div className="mt-6 text-[0.56rem] uppercase tracking-[0.18em] text-[#5F574D]">
            demo@drishyam.ai · drishyam2026
          </div>
        </div>
      </section>

      <div className="border-t border-[rgba(232,181,106,.12)] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.7fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[280px] text-[0.72rem] leading-6 text-[#756D62]">
              Computational gastronomy and personalised nutrition. Molecular
              aroma science translated into what you cook, and what it does for
              you.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[0.5rem] uppercase tracking-[0.16em] text-[#5F574D]">
              <FlaskConical size={11} className="text-[#E8B56A]" />
              FlavorDB · RecipeDB · Mifflin-St Jeor
            </div>
          </div>
          <FooterColumn
            title="Experience"
            links={[
              { label: "Discover", href: "/features" },
              { label: "How it works", href: "/how-it-works" },
              { label: "Flavour Science", href: "/flavour-science" },
              { label: "Nutrition", href: "/nutrition" },
              { label: "About", href: "/about" },
            ]}
          />
          <FooterColumn
            title="Workspace"
            links={[
              { label: "Dashboard", href: "/app" },
              { label: "Pantry", href: "/app/pantry" },
              { label: "Recipes", href: "/app/recipes" },
              { label: "Nutrition", href: "/app/nutrition" },
              { label: "Planner", href: "/app/planner" },
            ]}
          />
          <FooterColumn
            title="Company & Legal"
            links={[
              { label: "Privacy & Disclosures", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Contact Laboratory", href: "/contact" },
            ]}
          />
          <FooterColumn
            title="Account"
            links={[
              { label: "Sign in", href: "/login" },
              { label: "Create account", href: "/register" },
              { label: "Forgot password", href: "/forgot-password" },
            ]}
          />
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-col items-start justify-between gap-3 border-t border-[rgba(232,181,106,.1)] pt-5 text-[0.5rem] uppercase tracking-[0.16em] text-[#4F483F] sm:flex-row sm:items-center">
          <span>© 2026 DRISHYAM. Computational gastronomy, precisely.</span>
          <span className="flex items-center gap-4">
            <span>Built for the curious kitchen</span>
            <Github size={12} />
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <div className="mb-3 text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#8B7E6D]">
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[0.72rem] text-[#756D62] transition-colors hover:text-[#E8B56A]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
