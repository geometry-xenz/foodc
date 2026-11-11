import { LandingExperience } from "@/components/landing-experience";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const counts = await api
    .get<{ counts?: { ingredients: number; recipes: number; compounds: number } }>("/api/public/showcase")
    .then((res) => res?.counts)
    .catch(() => undefined);

  return (
    <LandingExperience
      ingredientCount={counts?.ingredients ?? 26}
      recipeCount={counts?.recipes ?? 12}
      compoundCount={counts?.compounds ?? 2287}
    />
  );
}


