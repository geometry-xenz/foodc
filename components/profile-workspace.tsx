"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, ShieldCheck, Sparkles, User } from "lucide-react";

interface ProfileWorkspaceProps {
  initialProfile: {
    age?: number;
    gender?: string;
    height_cm?: number;
    weight_kg?: number;
    activity_level?: string;
    experience_level?: string;
    version: number;
  };
  initialPreferences: {
    lifestyle?: string;
    restrictions?: string[];
    allergies?: string[];
    cuisine_preferences?: string[];
    version: number;
  };
}

const LIFESTYLES = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "eggetarian", label: "Eggetarian" },
  { id: "pescatarian", label: "Pescatarian" },
  { id: "non_vegetarian", label: "Non-Vegetarian" },
  { id: "none", label: "No Preference" },
];

const RESTRICTIONS = [
  { id: "dairy_free", label: "Dairy-Free" },
  { id: "lactose_free", label: "Lactose-Free" },
  { id: "gluten_free", label: "Gluten-Free" },
  { id: "jain", label: "Jain (No Root Produce)" },
];

const ALLERGENS = [
  { id: "peanut", label: "Peanuts" },
  { id: "tree_nut", label: "Tree Nuts" },
  { id: "dairy", label: "Dairy" },
  { id: "egg", label: "Eggs" },
  { id: "soy", label: "Soy" },
  { id: "gluten", label: "Gluten" },
  { id: "shellfish", label: "Shellfish" },
  { id: "fish", label: "Fish" },
];

export function ProfileWorkspace({
  initialProfile,
  initialPreferences,
}: ProfileWorkspaceProps) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [lifestyle, setLifestyle] = useState(initialPreferences.lifestyle || "none");
  const [restrictions, setRestrictions] = useState<string[]>(initialPreferences.restrictions || []);
  const [allergies, setAllergies] = useState<string[]>(initialPreferences.allergies || []);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function toggleRestriction(id: string) {
    setRestrictions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  function toggleAllergen(id: string) {
    setAllergies((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      // 1. Update Profile
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(profile.age),
          gender: profile.gender,
          height_cm: Number(profile.height_cm),
          weight_kg: Number(profile.weight_kg),
          activity_level: profile.activity_level,
          experience_level: profile.experience_level,
          version: profile.version,
        }),
      });

      // 2. Update Preferences & Allergies
      await fetch("/api/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lifestyle,
          restrictions,
          allergies,
          version: initialPreferences.version,
        }),
      });

      setMessage({ type: "success", text: "Profile and dietary filters saved successfully!" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Failed to save profile changes." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Biometrics Section */}
      <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#F6EFE4]">
          <User size={16} className="text-[#E8B56A]" />
          Personal Biometrics
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="gender">Biological Gender</label>
            <select
              id="gender"
              value={profile.gender || "male"}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="field"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              value={profile.age || 28}
              onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
              className="field"
            />
          </div>
          <div>
            <label className="label" htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              step="0.5"
              value={profile.weight_kg || 75}
              onChange={(e) => setProfile({ ...profile, weight_kg: Number(e.target.value) })}
              className="field"
            />
          </div>
          <div>
            <label className="label" htmlFor="height">Height (cm)</label>
            <input
              id="height"
              type="number"
              value={profile.height_cm || 178}
              onChange={(e) => setProfile({ ...profile, height_cm: Number(e.target.value) })}
              className="field"
            />
          </div>
        </div>
      </div>

      {/* Dietary Lifestyle Selection */}
      <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
        <div className="text-sm font-semibold text-[#F6EFE4]">Dietary Lifestyle</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {LIFESTYLES.map((ls) => (
            <button
              key={ls.id}
              type="button"
              onClick={() => setLifestyle(ls.id)}
              className={`rounded-xl border p-3 text-left transition-all ${
                lifestyle === ls.id
                  ? "border-[#E8B56A] bg-[#E8B56A]/10 text-[#F6EFE4]"
                  : "border-white/5 bg-white/[0.02] text-[#8B7E6D] hover:border-white/15"
              }`}
            >
              <div className="text-xs font-semibold">{ls.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Hard Allergen Exclusion Gates (§5.1) */}
      <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#F6EFE4]">
          <ShieldCheck size={16} className="text-[#FF8A32]" />
          Hard Allergen Exclusion Gates
        </div>
        <p className="text-xs text-[#8B7E6D]">
          Allergens are hard filters. Any recipe or substitute containing these will be strictly excluded.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ALLERGENS.map((al) => {
            const isChecked = allergies.includes(al.id);
            return (
              <button
                key={al.id}
                type="button"
                onClick={() => toggleAllergen(al.id)}
                className={`rounded-xl border p-3 text-left transition-all flex items-center justify-between ${
                  isChecked
                    ? "border-red-500/40 bg-red-500/10 text-red-200"
                    : "border-white/5 bg-white/[0.02] text-[#8B7E6D] hover:border-white/15"
                }`}
              >
                <span className="text-xs font-medium">{al.label}</span>
                {isChecked && <Check size={13} className="text-red-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Restrictions */}
      <div className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-6 space-y-4">
        <div className="text-sm font-semibold text-[#F6EFE4]">Dietary Restrictions</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {RESTRICTIONS.map((res) => {
            const isChecked = restrictions.includes(res.id);
            return (
              <button
                key={res.id}
                type="button"
                onClick={() => toggleRestriction(res.id)}
                className={`rounded-xl border p-3 text-left transition-all flex items-center justify-between ${
                  isChecked
                    ? "border-[#E8B56A] bg-[#E8B56A]/10 text-[#F6EFE4]"
                    : "border-white/5 bg-white/[0.02] text-[#8B7E6D] hover:border-white/15"
                }`}
              >
                <span className="text-xs font-medium">{res.label}</span>
                {isChecked && <Check size={13} className="text-[#E8B56A]" />}
              </button>
            );
          })}
        </div>
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

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="btn btn-gold w-full"
      >
        {saving ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
        Save Profile & Dietary Rules
      </button>
    </div>
  );
}
