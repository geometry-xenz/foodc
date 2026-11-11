import type { Metadata } from "next";
import { AndroidWorkspace } from "@/components/android/android-workspace";

export const metadata: Metadata = {
  title: "Android App & Live AI Scanner — DRISHYAM Workspace",
};

export const dynamic = "force-dynamic";

export default function WorkspaceAndroidPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 border-b border-[rgba(232,181,106,0.12)] pb-5 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">ANDROID COMPANION · CAMERAX + YOLOV8N</span>
          <h1 className="mt-2 font-display text-3xl text-[#F6EFE4] sm:text-4xl">
            Interactive <span className="italic text-gold-gradient">Android Application</span>
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-[#9E9282]">
            Full Jetpack Compose mobile experience running live against your unified pantry, molecular recipe engine, and metabolic targets.
          </p>
        </div>
      </div>

      <AndroidWorkspace />
    </div>
  );
}
