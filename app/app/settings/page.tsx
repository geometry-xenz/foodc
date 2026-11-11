import { api } from "@/lib/api";
import { SettingsWorkspace } from "@/components/settings-workspace";

export const metadata = {
  title: "Settings & Device Preferences — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let settings = { sound_enabled: true, haptics_enabled: true, measurement_units: "metric", version: 1 };
  try {
    const res = await api.get<any>("/api/settings");
    if (res) settings = res;
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#E8B56A]">
          System Controls · Device Preferences
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#F6EFE4]">
          Settings & Account
        </h1>
        <p className="max-w-2xl text-xs text-[#A79C8D] leading-relaxed">
          Configure sound and haptics, revoke active sessions across devices, or manage account deletion.
        </p>
      </div>

      <SettingsWorkspace initialSettings={settings} />
    </div>
  );
}
