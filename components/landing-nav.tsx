"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";

const LINKS = [
  { href: "#scene-1", label: "Ingredients" },
  { href: "#scene-2", label: "Pantry" },
  { href: "#scene-3", label: "Aroma" },
  { href: "#scene-4", label: "Nutrition" },
  { href: "#scene-5", label: "Goals" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={`w-full max-w-[1280px] rounded-full transition-all duration-500 ${
          scrolled ? "glass-pill" : "border border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-[58px] items-center justify-between px-3.5 sm:h-[64px] sm:px-5">
          <Logo className="shrink-0" />

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 sm:flex">
            <Link
              href="/login"
              className="px-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#A79C8D] transition-colors hover:text-[#F6EFE4]"
            >
              Sign in
            </Link>
            <Link href="/app" className="btn btn-gold btn-sm">
              <Sparkles size={13} />
              Launch app
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <Link href="/app" className="btn btn-gold btn-sm">
              Launch
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="icon-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[74px] z-50 bg-[#080808]/96 px-6 pt-8 backdrop-blur-2xl sm:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-[rgba(232,181,106,.1)] py-4 font-display text-2xl text-[#F6EFE4]"
              >
                {link.label}
                <span className="text-[0.6rem] tracking-[0.2em] text-[#756D62]">
                  0{index + 1}
                </span>
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-between border border-[rgba(232,181,106,.22)] px-4 py-4 text-sm uppercase tracking-[0.16em] text-[#E8B56A]"
            >
              Sign in
            </Link>
            <Link
              href="/app"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-between bg-[linear-gradient(120deg,#F5D8A8,#E8B56A_45%,#FF8A32)] px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#17100A]"
            >
              Launch application
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
