"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Bell, Check, Loader2, LogOut, Moon, ShieldAlert, Sparkles, Trash2, Volume2, Vibrate } from "lucide-react";

interface SettingsWorkspaceProps {
  initialSettings: {
    sound_enabled?: boolean;
    haptics_enabled?: boolean;
    measurement_units?: string;
    version: number;
  };
}

export function SettingsWorkspace({ initialSettings }: SettingsWorkspaceProps) {
  const router = useRouter();
  const [sound, setSound] = useState(initialSettings.sound_enabled ?? true);
  const [haptics, setHaptics] = useState(initialSettings.haptics_enabled ?? true);
  const [units, setUnits] = useState(initialSettings.measurement_units || "metric");
  const [saving, setSaving] = useState(false);
  const [loggingOutAll, setLoggingOutAll] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSaveSettings() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sound_enabled: sound,
          haptics_enabled: haptics,
          measurement_units: units,
          version: initialSettings.version,
        }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved." });
        router.refresh();
      }
    } catch {
      setMessage({ type: "error", text: "Failed to update settings." });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoutAll() {
    setLoggingOutAll(true);
    try {
      await fetch("/api/auth/logout-all", { method: "POST" });
      router.push("/login");
    } catch {
      // error
    } finally {
      setLoggingOutAll(false);
    }
  }

  async function handleDeleteAccount() {
    if (!confirm("Are you sure you want to permanently delete your DRISHYAM account? This will cascade delete all your recipes, pantry data, and meal history.")) {
      return;
    }
    setDeletingAccount(true);
    try {
      const res = await fetch("/api/auth/account", { method: "DELETE" });
      if (res.ok) {
        router.push("/login");
      }
    } catch {
      // error
    } finally {
      setDeletingAccount(false);
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Device & Experience Preferences */}
      <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-5">
        <div className="text-sm font-semibold text-[#F6EFE4]">
          Preferences & Haptics (§5.8)
        </div>

        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-[#E8B56A]" />
            <div>
              <div className="text-xs font-medium text-[#F6EFE4]">Sound Effects</div>
              <div className="text-[0.62rem] text-[#756D62]">Audio chime on timer finish and dish completion</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => setSound(e.target.checked)}
            className="h-4 w-4 accent-[#E8B56A] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Vibrate size={18} className="text-[#FF8A32]" />
            <div>
              <div className="text-xs font-medium text-[#F6EFE4]">Haptic Feedback</div>
              <div className="text-[0.62rem] text-[#756D62]">Tactile vibration on mobile swipes and confirmations</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={haptics}
            onChange={(e) => setHaptics(e.target.checked)}
            className="h-4 w-4 accent-[#E8B56A] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-xs font-medium text-[#F6EFE4]">Measurement Units</div>
            <div className="text-[0.62rem] text-[#756D62]">Preferred metric (g/ml) or imperial units</div>
          </div>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="field w-32 !py-1 text-xs"
          >
            <option value="metric">Metric (g, ml, kg)</option>
            <option value="imperial">Imperial (oz, lbs)</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={saving}
          className="btn btn-gold btn-sm w-full mt-2"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
          Save Preferences
        </button>
      </div>

      {/* Security & Sessions */}
      <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
        <div className="text-sm font-semibold text-[#F6EFE4]">Active Sessions (§5.3)</div>
        <p className="text-xs text-[#8B7E6D]">
          Revoke all active web cookies and rotating mobile refresh tokens across all devices.
        </p>
        <button
          type="button"
          onClick={handleLogoutAll}
          disabled={loggingOutAll}
          className="btn btn-ghost btn-sm text-amber-300 border-amber-500/20 hover:bg-amber-500/10"
        >
          {loggingOutAll ? <Loader2 size={13} className="animate-spin" /> : <LogOut size={13} />}
          Log Out of All Devices
        </button>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-red-300">
          <ShieldAlert size={16} />
          Danger Zone: Permanent Account Deletion
        </div>
        <p className="text-xs text-[#8B7E6D] leading-relaxed">
          Irreversibly delete your account, session credentials, biometric profiles, pantry inventory,
          and historical meal logs. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
          className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
        >
          {deletingAccount ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
          Permanently Delete Account
        </button>
      </div>

      {message && (
        <div
          className={`rounded-xl border p-4 text-xs ${
            message.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
