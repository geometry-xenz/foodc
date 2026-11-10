"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";

export function LoginForm({
  initialMode = "login",
  next = "/app",
}: {
  initialMode?: "login" | "register";
  next?: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@drishyam.ai");
  const [password, setPassword] = useState("drishyam2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<"form" | "demo" | null>(null);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading("form");
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: name || "Culinary Creator" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to authenticate.");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Network unavailable. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  async function demoLogin() {
    setError("");
    setLoading("demo");
    try {
      const response = await fetch("/api/auth/demo", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Demo access unavailable.");
        return;
      }
      router.push("/app");
      router.refresh();
    } catch {
      setError("Network unavailable. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      <div className="mb-8 flex justify-center lg:justify-start">
        <Logo />
      </div>
      <div className="mb-7">
        <div className="eyebrow mb-4">Private kitchen</div>
        <h1 className="font-display text-[2.6rem] leading-[0.98] tracking-[-0.02em] text-[#F6EFE4]">
          {mode === "login" ? (
            <>
              Welcome <span className="italic text-gold-gradient">back.</span>
            </>
          ) : (
            <>
              Create your <span className="italic text-gold-gradient">kitchen.</span>
            </>
          )}
        </h1>
        <p className="mt-3 text-[0.8rem] leading-6 text-[#8F8373]">
          {mode === "login"
            ? "Your pantry, molecular profile and metabolic targets are waiting."
            : "Start with a seeded pantry of Indian staples and a live nutrition engine."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-[rgba(232,181,106,.14)] bg-white/[0.018] p-1">
        {(["login", "register"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setMode(tab);
              setError("");
              if (tab === "register" && email === "demo@drishyam.ai") {
                setEmail("");
                setPassword("");
              }
            }}
            className={`rounded-full py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-all ${
              mode === tab
                ? "bg-[linear-gradient(120deg,#F5D8A8,#E8B56A_45%,#FF8A32)] text-[#17100A]"
                : "text-[#8F8373] hover:text-[#F6EFE4]"
            }`}
          >
            {tab === "login" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="label" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              className="field"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Chef Suman"
              autoComplete="name"
            />
          </div>
        )}
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="field"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@kitchen.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              className="field pr-11"
              type={showPassword ? "text" : "password"}
              required
              minLength={mode === "register" ? 8 : 1}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756D62] transition-colors hover:text-[#E8B56A]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {mode === "register" && (
            <p className="mt-1.5 text-[0.58rem] text-[#6F665B]">
              Minimum 8 characters. Stored as a bcrypt hash.
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-[rgba(226,112,90,.3)] bg-[rgba(226,112,90,.07)] px-3 py-2.5 text-[0.7rem] text-[#E9A091]">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading !== null} className="btn btn-gold w-full">
          {loading === "form" ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <ArrowRight size={15} />
          )}
          {mode === "login" ? "Enter the kitchen" : "Create kitchen"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-[rgba(232,181,106,.12)]" />
        <span className="text-[0.5rem] uppercase tracking-[0.2em] text-[#5F574D]">
          or
        </span>
        <span className="h-px flex-1 bg-[rgba(232,181,106,.12)]" />
      </div>

      <button
        type="button"
        onClick={demoLogin}
        disabled={loading !== null}
        className="btn btn-ghost w-full"
      >
        {loading === "demo" ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Sparkles size={15} className="text-[#E8B56A]" />
        )}
        Instant demo kitchen
      </button>

      <div className="mt-6 text-center text-[0.58rem] leading-5 text-[#5F574D]">
        Demo credentials · demo@drishyam.ai / drishyam2026
        <br />
        Your session is signed as an HTTP-only JWT cookie.
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="text-[0.55rem] uppercase tracking-[0.18em] text-[#756D62] transition-colors hover:text-[#E8B56A]"
        >
          ← Return to the experience
        </Link>
      </div>
    </div>
  );
}
