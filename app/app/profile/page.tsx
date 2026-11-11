import { api } from "@/lib/api";
import { ProfileWorkspace } from "@/components/profile-workspace";

export const metadata = {
  title: "Profile & Dietary Preferences — DRISHYAM",
};

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  let profile = { age: 28, gender: "male", height_cm: 178, weight_kg: 75, activity_level: "moderate", experience_level: "intermediate", version: 1 };
  let preferences = { lifestyle: "none", restrictions: [], allergies: [], cuisine_preferences: [], version: 1 };

  try {
    const [pRes, prefRes] = await Promise.all([
      api.get<any>("/api/profile"),
      api.get<any>("/api/preferences"),
    ]);
    if (pRes) profile = pRes;
    if (prefRes) preferences = prefRes;
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#E8B56A]">
          Identity & Biology · Personalization Engine
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#F6EFE4]">
          Profile & Preferences
        </h1>
        <p className="max-w-2xl text-xs text-[#A79C8D] leading-relaxed">
          Manage your biometrics, lifestyle adherence, and hard allergy filters.
          All changes take effect immediately across recommendation scoring.
        </p>
      </div>

      <ProfileWorkspace
        initialProfile={profile}
        initialPreferences={preferences}
      />
    </div>
  );
}
