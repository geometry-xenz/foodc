import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 group", className)}
      aria-label="DRISHYAM home"
    >
      <span className="relative grid h-8 w-8 place-items-center">
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,138,50,0.28),transparent_70%)] blur-[1px] transition-opacity group-hover:opacity-100 opacity-70" />
        <svg viewBox="0 0 40 40" className="relative h-8 w-8" fill="none">
          <circle cx="20" cy="20" r="18.5" stroke="rgba(232,181,106,.35)" />
          <path
            d="M20 6.5c6.8 3.3 10.4 7.8 10.4 13.5S26.8 30.2 20 33.5c-6.8-3.3-10.4-7.8-10.4-13.5S13.2 9.8 20 6.5Z"
            stroke="url(#logoGold)"
            strokeWidth="1.1"
          />
          <circle cx="20" cy="20" r="4.1" fill="url(#logoGold)" />
          <circle cx="20" cy="20" r="7.4" stroke="rgba(255,138,50,.4)" strokeDasharray="1 4" />
          <defs>
            <linearGradient id="logoGold" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F3D3A1" />
              <stop offset="0.55" stopColor="#E8B56A" />
              <stop offset="1" stopColor="#FF8A32" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[0.8rem] font-bold tracking-[0.22em] text-[#F6EFE4] sm:text-[0.86rem] sm:tracking-[0.32em]">
            DRISHYAM
          </span>
          <span className="mt-1 hidden text-[0.46rem] uppercase tracking-[0.3em] text-[#8B7E6D] sm:block">
            Computational Gastronomy
          </span>
        </span>
      )}
    </Link>
  );
}
