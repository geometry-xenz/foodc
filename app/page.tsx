import { LandingExperience } from "@/components/landing-experience";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // No invented fallback figures: if the API is down, the hero simply hides its counts.
  const counts = await api
    .get<{ counts?: { ingredients: number; recipes: number; compounds: number } }>("/api/public/showcase")
    .then((res) => res?.counts)
    .catch(() => undefined);

  return (
    <LandingExperience
      ingredientCount={counts?.ingredients ?? 0}
      recipeCount={counts?.recipes ?? 0}
      compoundCount={counts?.compounds ?? 0}
    />
  );
}
