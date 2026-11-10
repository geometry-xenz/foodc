import { getCurrentUserWithContext } from "@/lib/auth";
import { computeNutritionTargets } from "@/lib/goals";
import { getUserGoalId, scorePantry } from "@/lib/data-access";
import { RecipesWorkspace } from "@/components/app/recipes-workspace";

export const dynamic = "force-dynamic";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ recipe?: string }>;
}) {
  const user = await getCurrentUserWithContext();
  if (!user) return null;

  const params = await searchParams;
  const pantry = user.pantry
    .filter((item) => item.isAvailable)
    .map((item) => item.name);
  const goalId = getUserGoalId(user.goal);
  const { ranked, unlock } = await scorePantry(pantry, goalId);

  const targets = user.profile
    ? computeNutritionTargets(
        user.profile.weightKg,
        user.profile.heightCm,
        user.profile.age,
        user.profile.sex,
        user.profile.activityLevel,
        goalId,
      )
    : null;

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
