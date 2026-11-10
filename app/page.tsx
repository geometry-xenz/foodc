import { LandingExperience } from "@/components/landing-experience";
import { entities, nutritionProfiles, recipes } from "@/lib/flavor";

export default function HomePage() {
  const compoundCount = Object.values(entities).reduce(
    (total, entity) => total + entity.volatile_compounds.length,
    0,
  );

  return (
    <LandingExperience
      ingredientCount={Object.keys(nutritionProfiles).length}
      recipeCount={recipes.length}
      compoundCount={compoundCount}
    />
  );
}
