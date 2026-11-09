import logging
from typing import List, Dict, Any, Tuple, Optional
from collections import Counter

from backend.app.services.flavordb import flavordb_client
from backend.app.models.schemas import ScoreBreakdown, RecipeCandidate

logger = logging.getLogger(__name__)

class ComputationalGastronomyEngine:
    """
    Ranks recipes using Foodoscope's molecular aroma pairing and kitchen pantry utilization:
    score = 0.30 * core_coverage + 0.20 * counter_utilisation + 0.20 * flavour_coherence + 0.30 * gap_fit
    """
    
    def normalize(self, name: str) -> str:
        return flavordb_client.normalize_ingredient(name)

    async def score_recipe(
        self,
        pantry_items: List[str],
        recipe: Dict[str, Any]
    ) -> Tuple[RecipeCandidate, Dict[str, float]]:
        norm_pantry = set(self.normalize(x) for x in pantry_items)
        
        # Extract recipe ingredients
        recipe_ing_names = []
        for item in recipe.get("ingredients", []):
            if isinstance(item, dict):
                recipe_ing_names.append(self.normalize(item.get("name", "")))
            else:
                recipe_ing_names.append(self.normalize(str(item)))

        recipe_set = set(recipe_ing_names)
        available = list(recipe_set.intersection(norm_pantry))
        missing = list(recipe_set - norm_pantry)

        # 1. Core Coverage (30%): Essential dish-defining ingredients present
        core_raw = recipe.get("core_ingredients", [])
        norm_core = [self.normalize(c) for c in core_raw] if core_raw else recipe_ing_names[:3]
        if norm_core:
            matched_core = [c for c in norm_core if c in norm_pantry]
            core_coverage = len(matched_core) / len(norm_core)
        else:
            core_coverage = 0.5

        # 2. Counter Utilisation (20%): Percentage of counter items used
        if norm_pantry:
            counter_utilisation = len(available) / len(norm_pantry)
        else:
            counter_utilisation = 0.0
        counter_utilisation = min(counter_utilisation, 1.0)

        # 3. Flavour Coherence (20%): Molecular pairing from FlavorDB
        flavour_coherence = await flavordb_client.compute_molecular_coherence(
            list(norm_pantry),
            recipe_ing_names
        )

        # 4. Gap Fit (30%): How few and accessible are missing items
        total_items = max(len(recipe_set), 1)
        # Pantry basics (salt, oil, water) don't penalize as heavily
        basic_staples = {"salt", "oil", "water", "sugar"}
        hard_missing = [m for m in missing if m not in basic_staples]
        
        gap_fit = 1.0 - (len(hard_missing) / total_items)
        gap_fit = max(0.0, min(gap_fit, 1.0))

        # Composite score
        composite = (
            0.30 * core_coverage +
            0.20 * counter_utilisation +
            0.20 * flavour_coherence +
            0.30 * gap_fit
        )
        composite = round(min(max(composite, 0.0), 1.0), 3)

        explanation = (
            f"Core Match: {int(core_coverage * 100)}% | "
            f"Pantry Used: {int(counter_utilisation * 100)}% | "
            f"Aroma Coherence: {int(flavour_coherence * 100)}% | "
            f"Recipe Feasibility: {int(gap_fit * 100)}%"
        )

        breakdown = ScoreBreakdown(
            core_coverage=round(core_coverage, 2),
            counter_utilisation=round(counter_utilisation, 2),
            flavour_coherence=round(flavour_coherence, 2),
            gap_fit=round(gap_fit, 2),
            composite_score=composite,
            explanation=explanation
        )

        match_pct = round((len(available) / max(len(recipe_set), 1)) * 100, 1)

        # One ingredient to buy
        one_to_buy = hard_missing[0] if hard_missing else None

        nut = recipe.get("nutrition_per_serving", {})

        candidate = RecipeCandidate(
            recipe_id=recipe.get("recipe_id", "rec_unknown"),
            title=recipe.get("title", "Delicious Dish"),
            cuisine=recipe.get("cuisine", "Gastronomic"),
            diet=recipe.get("diet", "any"),
            prep_time_minutes=recipe.get("prep_time_minutes", 10),
            cook_time_minutes=recipe.get("cook_time_minutes", 20),
            total_time_minutes=recipe.get("total_time_minutes", 30),
            servings=recipe.get("servings", 2),
            image_url=recipe.get("image_url", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"),
            ingredients_available=available,
            ingredients_missing=missing,
            match_percentage=match_pct,
            gastronomy_score=breakdown,
            calories_per_serving=nut.get("calories"),
            protein_grams=nut.get("protein"),
            carbs_grams=nut.get("carbs"),
            fat_grams=nut.get("fat"),
            fibre_grams=nut.get("fibre"),
            one_ingredient_to_buy=one_to_buy,
            molecular_pairing_notes=recipe.get("molecular_profile", {}).get("notes")
        )

        return candidate, {"composite": composite}

    async def compute_unlock_suggestion(
        self,
        pantry_items: List[str],
        ranked_recipes: List[RecipeCandidate]
    ) -> Optional[Dict[str, Any]]:
        """
        Computes which *single missing ingredient* provides the highest increase in
        flavor coherence and recipe unlock rate.
        """
        all_missing = []
        for r in ranked_recipes:
            for m in r.ingredients_missing:
                if m not in ("salt", "oil", "water"):
                    all_missing.append(m)

        if not all_missing:
            return None

        counts = Counter(all_missing)
        top_ingredient, frequency = counts.most_common(1)[0]

        # Calculate impact
        return {
            "ingredient": top_ingredient,
            "recipes_unlocked_count": frequency,
            "impact_description": f"Adding '{top_ingredient.title()}' unlocks {frequency} additional dish{'es' if frequency > 1 else ''} with strong molecular pairing synergies.",
            "estimated_unlock_gain_percent": round((frequency / max(len(ranked_recipes), 1)) * 100, 1)
        }

gastronomy_engine = ComputationalGastronomyEngine()
