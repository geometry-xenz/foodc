"""
Computational gastronomy ranking engine based on molecular flavour science.
Adheres to §5.6 and D1 (ported from Mise/Foodoscope ranking.py).
"""
import re
from typing import Any, Dict, List, Optional, Set, Tuple

STAPLES: Set[str] = {
    "water", "salt", "black salt", "rock salt", "cooking oil", "vegetable oil",
    "oil", "olive oil", "mustard oil", "sunflower oil", "ghee", "butter"
}


def norm(name: str) -> str:
    """Normalize ingredient name for matching."""
    s = name.lower().strip()
    s = re.sub(r"\b(fresh|dried|ground|powdered|powder|chopped|diced|sliced|crushed|whole)\b", "", s)
    s = re.sub(r"[^\w\s]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    # Simple English plural reduction
    if s.endswith("ies") and len(s) > 4:
        s = s[:-3] + "y"
    elif s.endswith("es") and len(s) > 3 and s[-3] in "sxczo":
        s = s[:-2]
    elif s.endswith("s") and len(s) > 3 and not s.endswith("ss"):
        s = s[:-1]
    return s


def is_staple(name: str) -> bool:
    return norm(name) in STAPLES


def diet_ok(recipe_diet_tag: str, user_diet: str) -> bool:
    """Hard filter for diet. 'vegetarian' MUST NOT match inside 'non-vegetarian'."""
    if not user_diet or user_diet.lower() in ("any", "none"):
        return True
    
    rd = recipe_diet_tag.lower().strip()
    ud = user_diet.lower().strip()

    if ud == "vegan":
        return rd == "vegan"
    if ud == "vegetarian":
        return rd in ("vegetarian", "vegan") and "non" not in rd
    if ud == "non-vegetarian":
        return True
    if ud == "pescatarian":
        return rd in ("vegetarian", "vegan", "pescatarian")
    return True


def allergy_ok(recipe_ingredients: List[str], user_allergies: List[str]) -> bool:
    """Hard gate: return False if any recipe ingredient matches user allergen."""
    if not user_allergies:
        return True
    
    norm_allergens = [norm(a) for a in user_allergies if a.strip()]
    for ing in recipe_ingredients:
        n_ing = norm(ing)
        for a in norm_allergens:
            if a in n_ing or n_ing in a:
                return False
    return True


def score_recipe(
    recipe: Dict[str, Any],
    pantry: List[str],
    flavor_compound_map: Optional[Dict[str, Set[str]]] = None
) -> Tuple[float, Dict[str, Any]]:
    """
    Score a recipe using computational gastronomy:
      0.30 * core_coverage + 0.20 * utilisation + 0.20 * flavour_coherence + 0.30 * gap_fit
    """
    pantry_norms = {norm(p) for p in pantry if p and not is_staple(p)}
    if not pantry_norms:
        return 0.0, {}

    raw_ings = recipe.get("ingredients", [])
    recipe_ings = [norm(i) for i in raw_ings if not is_staple(i)]
    if not recipe_ings:
        return 0.0, {}

    # Core coverage: first 4 ingredients define the dish
    core_ings = recipe_ings[:4]
    matched_core = [c for c in core_ings if c in pantry_norms]
    core_coverage = len(matched_core) / max(len(core_ings), 1)

    # General matching
    matched = [i for i in recipe_ings if i in pantry_norms]
    missing = [i for i in recipe_ings if i not in pantry_norms]

    # Utilisation: what fraction of the user's counter does this dish consume?
    used_from_pantry = [p for p in pantry_norms if p in recipe_ings]
    utilisation = len(used_from_pantry) / max(len(pantry_norms), 1)

    # Gap fit: penalty for missing ingredients, especially core ones
    gap_penalty = (len([m for m in missing if m in core_ings]) * 0.4 +
                   len([m for m in missing if m not in core_ings]) * 0.15)
    gap_fit = max(0.0, 1.0 - (gap_penalty / max(len(recipe_ings), 1)))

    # Flavour Coherence: aroma compound sharing between pantry and recipe
    flavour_coherence = 0.5  # baseline
    if flavor_compound_map and len(used_from_pantry) >= 2:
        pairs_shared = 0
        total_pairs = 0
        p_list = list(used_from_pantry)
        for i in range(len(p_list)):
            for j in range(i + 1, len(p_list)):
                total_pairs += 1
                c1 = flavor_compound_map.get(p_list[i], set())
                c2 = flavor_compound_map.get(p_list[j], set())
                if c1 and c2 and (c1 & c2):
                    pairs_shared += 1
        if total_pairs > 0:
            flavour_coherence = pairs_shared / total_pairs

    final_score = (
        0.30 * core_coverage +
        0.20 * utilisation +
        0.20 * flavour_coherence +
        0.30 * gap_fit
    ) * 100.0

    breakdown = {
        "score": round(final_score, 1),
        "core_coverage": round(core_coverage, 2),
        "utilisation": round(utilisation, 2),
        "flavour_coherence": round(flavour_coherence, 2),
        "gap_fit": round(gap_fit, 2),
        "matched": matched,
        "missing": missing,
        "core_missing": [m for m in missing if m in core_ings],
    }
    return final_score, breakdown
