import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, ScanEye } from "lucide-react";
import { getSessionUser, api } from "@/lib/api";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; next?: string }>;
}) {
  const session = await getSessionUser();
  if (session) redirect("/app");

  const params = await searchParams;
  const mode = params.mode === "register" ? "register" : "login";
  const next = params.next?.startsWith("/") ? params.next : "/app";

  let compoundCount = 2287;
  try {
    const showcase = await api.get<{ molecules?: number }>("/api/public/showcase");
    if (showcase?.molecules) compoundCount = showcase.molecules;
  } catch {
    // fallback to curated static number
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 lg:left-[46%]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: "url(/videos/hero-poster.webp)" }}
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#080808_0%,rgba(8,8,8,.82)_30%,rgba(8,8,8,.25)_70%,rgba(8,8,8,.6)_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-[1380px] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex items-center px-5 py-12 sm:px-10 lg:px-14">
          <LoginForm initialMode={mode} next={next} />
        </div>

        <div className="relative hidden flex-col justify-between px-14 py-12 lg:flex">
          <div className="flex justify-end">
            <Link
              href="/"
              className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.18em] text-[#A79C8D] transition-colors hover:text-[#E8B56A]"
            >
              See the experience <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="max-w-[480px]">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(232,181,106,.25)] bg-[rgba(8,8,8,.55)] backdrop-blur-md">
                <ScanEye size={16} className="text-[#FF8A32]" />
              </span>
              <span className="text-[0.55rem] uppercase tracking-[0.24em] text-[#C9B79F]">
                Kitchen state · live
              </span>
            </div>
            <blockquote className="font-display text-[clamp(2.2rem,3.8vw,3.7rem)] leading-[1.02] text-[#F6EFE4]">
              “Your kitchen already knows what to cook.
              <span className="italic text-gold-gradient"> We translate it.</span>”
            </blockquote>
            <div className="mt-8 grid grid-cols-3 gap-5 border-t border-[rgba(232,181,106,.16)] pt-6">
              {[
                { value: "4", label: "Engine layers" },
                { value: String(compoundCount), label: "Compound links" },
                { value: "8", label: "Goal protocols" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl text-[#F3D3A1]">{stat.value}</div>
                  <div className="mt-1 text-[0.48rem] uppercase tracking-[0.16em] text-[#8B7E6D]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[0.5rem] uppercase tracking-[0.16em] text-[#5F574D]">
            <FlaskConical size={11} className="text-[#E8B56A]" />
            Computational gastronomy · personalised nutrition
          </div>
        </div>
      </div>
    </main>
  );
}
