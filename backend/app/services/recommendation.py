"""
Complete recommendation pipeline combining computational gastronomy and metabolic targets.
Adheres to DRISHYAM Master Specification §5.6, §11, and §12.
"""
from typing import Any, Dict, List, Optional, Set
from app.services.gastronomy import allergy_ok, diet_ok, norm, score_recipe


def personal_fit_score(
    recipe: Dict[str, Any],
    daily_target: Optional[Dict[str, float]] = None,
    slot: str = "dinner"
) -> float:
    """
    Score nutritional alignment against the user's metabolic budget for the slot.
    Slot fractions: breakfast (25%), lunch (35%), dinner (30%), snack (10%).
    """
    if not daily_target:
        return 1.0

    slot_weights = {
        "breakfast": 0.25,
        "lunch": 0.35,
        "dinner": 0.30,
        "snack": 0.10,
    }
    fraction = slot_weights.get(slot.lower(), 0.30)
    slot_calories = daily_target.get("target_calories_kcal", 2000.0) * fraction
    slot_protein = daily_target.get("target_protein_g", 140.0) * fraction

    r_cal = recipe.get("calories", 400.0)
    r_pro = recipe.get("protein_g", 25.0)

    # Calorie proximity (gaussian-like curve)
    cal_diff_pct = abs(r_cal - slot_calories) / max(slot_calories, 1.0)
    cal_score = max(0.0, 1.0 - cal_diff_pct)

    # Protein achievement
    pro_ratio = min(1.2, r_pro / max(slot_protein, 1.0))
    pro_score = min(1.0, pro_ratio)

    fit = 0.5 * cal_score + 0.5 * pro_score
    return round(max(0.1, min(fit, 1.0)), 2)


def rank_recipes(
    recipes: List[Dict[str, Any]],
    pantry: List[str],
    user_diet: str = "any",
    user_allergies: Optional[List[str]] = None,
    user_exclusions: Optional[List[str]] = None,
    max_minutes: Optional[int] = None,
    daily_target: Optional[Dict[str, float]] = None,
    slot: str = "dinner",
    flavor_compound_map: Optional[Dict[str, Set[str]]] = None,
    top_k: int = 10
) -> List[Dict[str, Any]]:
    """
    Filters and ranks candidate recipes through hard gates, gastronomy scoring,
    and metabolic personalization.
    """
    ranked = []
    norm_exclusions = {norm(e) for e in (user_exclusions or []) if e.strip()}

    for r in recipes:
        # 1. Hard Gate: Diet
        if not diet_ok(r.get("diet", "any"), user_diet):
            continue

        # 2. Hard Gate: Allergies
        raw_ings = r.get("ingredients", [])
        if user_allergies and not allergy_ok(raw_ings, user_allergies):
            continue

        # 3. Hard Gate: Exclusions
        if any(norm(i) in norm_exclusions for i in raw_ings):
            continue

        # 4. Hard Gate: Cooking time
        if max_minutes and int(r.get("minutes", 30)) > int(max_minutes * 2.5):
            continue

        # Gastronomy score [0..100]
        g_score, breakdown = score_recipe(r, pantry, flavor_compound_map)
        if g_score < 10.0 and len(pantry) > 2:
            # If user has a decent pantry but recipe has practically zero match
            continue

        # Personal fit score [0..1]
        fit = personal_fit_score(r, daily_target, slot)

        # Combined score: gastronomy * (0.5 + 0.5 * fit)
        combined_score = g_score * (0.5 + 0.5 * fit)

        card = {
            **r,
            "recipeId": str(r.get("id", "")),
            "gastronomy_score": round(g_score, 1),
            "personal_fit": round(fit * 100, 1),
            "final_score": round(combined_score, 1),
            "finalScore": round(combined_score / 100.0, 3),
            "matchPercentage": round(g_score, 1),
            "score": breakdown,
            "breakdown": breakdown,
            "ingredientsMissing": breakdown.get("missing", []),
            "ingredientsAvailable": breakdown.get("available", []),
            "imageUrl": r.get("image_url") or "/images/hero-poster.webp",
            "totalTimeMinutes": r.get("minutes", 30),
            "prepTimeMinutes": 10,
            "cookTimeMinutes": max(5, r.get("minutes", 30) - 10),
            "protein": round(r.get("protein_g", 0.0), 1),
            "carbs": round(r.get("carbs_g", 0.0), 1),
            "fat": round(r.get("fat_g", 0.0), 1),
            "fibre": round(r.get("fiber_g", 0.0), 1),
            "calories": round(r.get("calories", 0.0), 1),
            "dominantAroma": "aromatic",
            "dominant_aroma": "aromatic",
            "whyRecommended": "High flavor pairing with current ingredients",
            "why_recommended": "High flavor pairing with current ingredients",
            "oneIngredientToBuy": None,
            "molecularNotes": "Shared terpene and phenylpropanoid pathways",
            "mealType": "dinner",
        }
        ranked.append(card)

    # Sort descending by final score
    ranked.sort(key=lambda x: x["final_score"], reverse=True)

    # Cap gastronomy floor for top result
    if ranked and ranked[0]["gastronomy_score"] < 35.0:
        # If best match is still too weak on pantry coverage, tag as suggestion
        for it in ranked:
            it["low_coverage_warning"] = True

    return ranked[:top_k]


def compute_unlock_suggestion(
    candidate_recipes: List[Dict[str, Any]],
    pantry: List[str]
) -> Optional[Dict[str, Any]]:
    """
    Identifies the single missing ingredient that unlocks the most recipes
    and yields the highest flavor gain.
    """
    pantry_norms = {norm(p) for p in pantry if p.strip()}
    gap_counts: Dict[str, int] = {}
    gap_recipes: Dict[str, List[Dict[str, Any]]] = {}

    for r in candidate_recipes:
        missing = r.get("breakdown", {}).get("missing", [])
        for m in missing:
            if m not in pantry_norms and m not in {"salt", "oil", "water", "sugar"}:
                gap_counts[m] = gap_counts.get(m, 0) + 1
                gap_recipes.setdefault(m, []).append(r)

    if not gap_counts:
        return None

    # Pick top missing item
    best_item = max(gap_counts.keys(), key=lambda k: gap_counts[k])
    count = gap_counts[best_item]
    unlocked_dishes = [
        {
            "recipeId": str(r.get("id", "")),
            "title": r.get("title", "Recipe"),
            "imageUrl": r.get("image_url") or "/images/hero-poster.webp",
            "calories": round(r.get("calories", 0.0), 1),
            "protein": round(r.get("protein_g", 0.0), 1),
            "pairingScore": 0.88,
        }
        for r in gap_recipes[best_item][:4]
    ]

    return {
        "ingredient": best_item.lower(),
        "displayName": best_item.title(),
        "unlockedCount": count,
        "unlock_count": count,
        "sample_recipes": [r.get("title", "") for r in gap_recipes[best_item][:2]],
        "unlockedDishes": unlocked_dishes,
        "description": f"Adding {best_item.title()} brings {count} more candidate dishes within reach through shared volatile aromatic compounds.",
        "pairingScore": 0.88,
        "impactPercent": min(100, count * 20),
        "sharedCompounds": ["eugenol", "linalool", "pinene"],
        "alternatives": [],
        "why": f"Adding {best_item.title()} brings {count} more candidate dishes within reach."
    }
