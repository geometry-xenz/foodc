import { api } from "@/lib/api";
import { RecipesWorkspace } from "@/components/app/recipes-workspace";

export const dynamic = "force-dynamic";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ recipe?: string }>;
}) {
  const params = await searchParams;

  const [pantryRes, recRes, targetsRes] = await Promise.all([
    api.get<any[]>("/api/pantry").catch(() => []),
    api
      .post<{ recipes: any[]; unlock: any }>(
        "/api/recommend",
        { top_k: 30 },
        { redirectOn401: false },
      )
      .catch(() => ({ recipes: [], unlock: null })),
    api.get<any>("/api/nutrition/targets", { redirectOn401: false }).catch(() => null),
  ]);

  const pantry = (pantryRes || []).map((item: any) => item.name);
  const ranked = recRes?.recipes || [];
  const unlock = recRes?.unlock || null;
  const targets = targetsRes?.targets || targetsRes || null;

  return (
    <RecipesWorkspace
      recipes={ranked}
      unlock={unlock}
      pantry={pantry}
      targets={targets}
      initialRecipeId={params.recipe}
    />
  );
}
