"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2, Sparkles, LogIn } from "lucide-react";
import { Logo } from "@/components/logo";
import { useFirebaseAuth } from "@/components/firebase-provider";

export function LoginForm({
  initialMode = "login",
  next = "/app",
}: {
  initialMode?: "login" | "register";
  next?: string;
}) {
  const router = useRouter();
  const { signIn: firebaseGoogleSignIn } = useFirebaseAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@drishyam.ai");
  const [password, setPassword] = useState("drishyam2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<"form" | "demo" | "google" | null>(null);
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
        body: JSON.stringify({ email, password, name: name || "Home Chef" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to sign in.");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Network unavailable. Please check your connection.");
    } finally {
      setLoading(null);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setLoading("google");
    try {
      const user = await firebaseGoogleSignIn();
      // Exchange with backend session for synchronized access
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email || "chef@drishyam.ai",
          name: user.displayName || "Google Culinary Creator",
          firebase_uid: user.uid,
        }),
      });
      router.push(next);
      router.refresh();
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message || "Google Authentication encountered an issue.");
      }
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
      router.push(next);
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
        <div className="eyebrow mb-3">Kitchen Account</div>
        <h1 className="font-display text-[2.5rem] leading-[1.02] tracking-[-0.02em] text-[#F7F2EB]">
          {mode === "login" ? (
            <>
              Welcome <span className="text-gold-gradient">back.</span>
            </>
          ) : (
            <>
              Create your <span className="text-gold-gradient">kitchen.</span>
            </>
          )}
        </h1>
        <p className="mt-2 text-sm text-[#8F8578] leading-relaxed">
          {mode === "login"
            ? "Your pantry ingredients, volatile aroma profile and metabolic targets are waiting."
            : "Set up your personal pantry with balanced macro and micronutrient targets."}
        </p>
      </div>

      {/* Google Sign-In with Firebase Auth */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] p-3 text-xs font-semibold text-[#F7F2EB] hover:bg-white/[0.08] hover:border-white/25 transition-all shadow-sm"
      >
        {loading === "google" ? (
          <Loader2 size={16} className="animate-spin text-[#DFB271]" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>Sign in with Google</span>
      </button>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] uppercase tracking-wider text-[#736A5F]">
          or email
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1">
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
            className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
              mode === tab
                ? "bg-[#DFB271] text-[#14120F]"
                : "text-[#8F8578] hover:text-[#F7F2EB]"
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
              Your Name
            </label>
            <input
              id="name"
              className="field"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Chef Priya"
              autoComplete="name"
            />
          </div>
        )}

        <div>
          <label className="label" htmlFor="email">
            Email Address
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736A5F] hover:text-[#DFB271] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-[#E07A38]/30 bg-[#E07A38]/10 p-3 text-xs text-[#F5B48B]">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading !== null} className="btn btn-gold w-full text-xs">
          {loading === "form" ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <ArrowRight size={15} />
          )}
          {mode === "login" ? "Enter Kitchen" : "Create Kitchen"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] uppercase tracking-wider text-[#736A5F]">
          or demo
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={demoLogin}
        disabled={loading !== null}
        className="btn btn-ghost w-full text-xs"
      >
        {loading === "demo" ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Sparkles size={14} className="text-[#DFB271]" />
        )}
        Instant Demo Kitchen
      </button>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-[#8F8578] hover:text-[#DFB271] transition-colors"
        >
          ← Return to overview
        </Link>
      </div>
    </div>
  );
}
