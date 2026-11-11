"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, Loader2, Lock } from "lucide-react";
import { Logo } from "@/components/logo";

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || "Failed to submit request.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || "Failed to reset password.");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setError("Network unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-[440px] rounded-2xl border border-[rgba(232,181,106,.2)] bg-[rgba(16,14,12,.8)] p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>

      {token ? (
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#E8B56A] text-xs font-semibold uppercase tracking-wider">
            <KeyRound size={15} />
            Set New Password
          </div>
          <h1 className="font-display text-2xl font-semibold text-[#F6EFE4]">
            Reset Account Password
          </h1>
          <p className="mt-2 text-xs text-[#A79C8D]">
            Enter your new password below. Reset tokens expire in 30 minutes.
          </p>

          {success ? (
            <div className="mt-6 rounded-xl border border-[rgba(102,187,106,.3)] bg-[rgba(102,187,106,.1)] p-4 text-center">
              <CheckCircle2 size={24} className="mx-auto text-[#66BB6A] mb-2" />
              <div className="text-sm font-semibold text-[#F6EFE4]">Password Updated!</div>
              <div className="text-xs text-[#A79C8D] mt-1">Redirecting to sign in...</div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
              <div>
                <label className="label" htmlFor="new-pwd">New Password</label>
                <input
                  id="new-pwd"
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="field"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="label" htmlFor="confirm-pwd">Confirm Password</label>
                <input
                  id="confirm-pwd"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="field"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn btn-gold w-full">
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
                Update Password
              </button>
            </form>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#E8B56A] text-xs font-semibold uppercase tracking-wider">
            <KeyRound size={15} />
            Account Recovery
          </div>
          <h1 className="font-display text-2xl font-semibold text-[#F6EFE4]">
            Forgot Password?
          </h1>
          <p className="mt-2 text-xs text-[#A79C8D]">
            Enter your email address and we will generate a single-use secure reset link.
          </p>

          {success ? (
            <div className="mt-6 rounded-xl border border-[rgba(232,181,106,.3)] bg-[rgba(232,181,106,.08)] p-4 text-center">
              <CheckCircle2 size={24} className="mx-auto text-[#E8B56A] mb-2" />
              <div className="text-sm font-semibold text-[#F6EFE4]">Reset Request Dispatched</div>
              <div className="text-xs text-[#B3A798] mt-1">
                If an account exists for {email}, a reset link has been dispatched (and logged to development output per D10).
              </div>
              <Link href="/login" className="btn btn-ghost btn-sm mt-4 inline-flex">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRequestReset} className="mt-6 space-y-4">
              <div>
                <label className="label" htmlFor="email">Account Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                  placeholder="demo@drishyam.ai"
                />
              </div>
              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn btn-gold w-full">
                {loading ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
                Send Reset Link
              </button>
            </form>
          )}
        </div>
      )}

      <div className="mt-8 text-center border-t border-white/5 pt-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B7E6D] hover:text-[#E8B56A] transition-colors"
        >
          <ArrowLeft size={13} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#080808] px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,181,106,0.06),transparent_70%)]" />
      <Suspense fallback={<div className="text-xs text-[#8B7E6D]">Loading...</div>}>
        <ForgotPasswordContent />
      </Suspense>
    </main>
  );
}
