import flavorData from "@/lib/data/flavordb.json";
import nutritionData from "@/lib/data/nutrition.json";
import recipeData from "@/lib/data/recipes.json";
import { categoryForEntity } from "@/lib/ingredient-categories";
import type { RecipeRecord } from "@/lib/types";

type Entity = {
  alias: string;
  category: string;
  scientific_name: string;
  volatile_compounds: string[];
  flavor_profile: string[];
  synergistic_pairs: string[];
};

export const entities = flavorData.entities as Record<string, Entity>;
export const substitutions = flavorData.substitutions as Record<
  string,
  Array<{
    name: string;
    similarity: number;
    shared_compounds: string[];
    ratio: string;
    notes: string;
  }>
>;

type NutritionProfile = {
  name: string;
  per_100g: Record<string, number>;
  typical_serving_g: number;
};

export const nutritionProfiles = nutritionData.ingredients as Record<
  string,
  NutritionProfile
>;

export const recipes = (recipeData.recipes as RecipeRecord[]).map((recipe) => ({
  ...recipe,
  meal_type:
    recipe.meal_type ??
    (recipe.total_time_minutes <= 15
      ? "snack"
      : recipe.nutrition_per_serving.calories < 200
        ? "breakfast"
        : "lunch"),
}));

const NORMALIZATION_MAP: Array<[string, string]> = [
  ["turmeric powder", "turmeric"],
  ["haldi", "turmeric"],
  ["jeera", "cumin"],
  ["cumin seeds", "cumin"],
  ["black pepper powder", "black pepper"],
  ["kali mirch", "black pepper"],
  ["pepper", "black pepper"],
  ["chilli powder", "red chilli"],
  ["red chilli powder", "red chilli"],
  ["chili", "red chilli"],
  ["coriander powder", "coriander"],
  ["dhaniya", "coriander"],
  ["clove", "cloves"],
  ["laung", "cloves"],
  ["elaichi", "cardamom"],
  ["green cardamom", "cardamom"],
  ["cinnamon stick", "cinnamon"],
  ["dalchini", "cinnamon"],
  ["garlic cloves", "garlic"],
  ["lasun", "garlic"],
  ["adrak", "ginger"],
  ["pyaz", "onion"],
  ["tamatar", "tomato"],
  ["rai", "mustard seeds"],
  ["sarson", "mustard seeds"],
  ["cottage cheese", "paneer"],
  ["dal", "lentils"],
  ["basmati rice", "rice"],
  ["chana", "chickpeas"],
];

function cleanIngredientLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/&/g, " ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singularizeToken(token: string): string {
  if (token.length > 4 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (/(?:oes|ches|shes|xes)$/.test(token)) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) {
    return token.slice(0, -1);
  }
  return token;
}

/**
 * Catalogue aliases let free-typed pantry entries resolve to the same canonical
 * key the seed uses ("whole milk" → "milk", "boiled potato" → "potatoes").
 */
const CATALOG_ALIASES = new Map<string, string>();

function registerCatalogAlias(alias: string, key: string) {
  const clean = cleanIngredientLabel(alias);
  if (!clean) return;
  if (!CATALOG_ALIASES.has(clean)) CATALOG_ALIASES.set(clean, key);
  const singular = clean
    .split(" ")
    .map(singularizeToken)
    .join(" ");
  if (singular !== clean && !CATALOG_ALIASES.has(singular)) {
    CATALOG_ALIASES.set(singular, key);
  }
}

for (const key of Object.keys(nutritionProfiles)) {
  registerCatalogAlias(key, key);
  registerCatalogAlias(nutritionProfiles[key].name, key);
}
for (const key of Object.keys(entities)) {
  registerCatalogAlias(key, key);
}

const CATALOG_ALIAS_ENTRIES = [...CATALOG_ALIASES.entries()].sort(
  (a, b) => b[0].length - a[0].length,
);

/** Short everyday names whose catalogue entry uses a longer label. */
const CANONICAL_OVERRIDES: Record<string, string> = {
  tea: "tea leaves",
};

/** Descriptors that do not change which catalogue ingredient is meant. */
const INGREDIENT_MODIFIERS = new Set([
  "whole",
  "fresh",
  "frozen",
  "ground",
  "dried",
  "dry",
  "raw",
  "boiled",
  "steamed",
  "cooked",
  "chopped",
  "sliced",
  "diced",
  "minced",
  "large",
  "small",
  "medium",
  "organic",
  "ripe",
  "skinless",
  "boneless",
  "plain",
  "unsweetened",
  "sweetened",
  "low",
  "full",
  "fat",
  "free",
  "powder",
  "powdered",
  "black",
  "brown",
  "red",
  "yellow",
  "green",
  "white",
]);

function stripModifiers(value: string): string {
  const words = value.split(" ").filter((word) => !INGREDIENT_MODIFIERS.has(word));
  return words.length > 0 ? words.join(" ") : value;
}

function findCatalogAlias(value: string): string | null {
  const exact = CATALOG_ALIASES.get(value);
  if (exact) return exact;

  const stripped = stripModifiers(value);
  if (stripped !== value) {
    const match = CATALOG_ALIASES.get(stripped);
    if (match) return match;
  }

  const padded = ` ${value} `;
  for (const [alias, key] of CATALOG_ALIAS_ENTRIES) {
    if (alias.length < 3) continue;
    if (alias.includes(" ")) {
      if (padded.includes(` ${alias} `)) return key;
    } else if (value.split(" ").includes(alias)) {
      return key;
    }
  }
  return null;
}

/** Ported 1:1 from the FastAPI FlavorDBClient.normalize_ingredient, extended
 *  with catalogue display-name and descriptor resolution. */
export function normalizeIngredient(name: string): string {
  const raw = name.trim().toLowerCase();
  for (const [needle, value] of NORMALIZATION_MAP) {
    if (raw.includes(needle)) return value;
  }
  const clean = cleanIngredientLabel(raw);
  if (!clean) return raw;
  return CANONICAL_OVERRIDES[clean] ?? findCatalogAlias(clean) ?? clean;
}

export function getEntityProfile(name: string): Entity | null {
  const norm = normalizeIngredient(name);
  if (entities[norm]) return entities[norm];
  for (const [entityName, value] of Object.entries(entities)) {
    if (entityName.includes(norm) || norm.includes(entityName)) return value;
  }
  return null;
}

export function displayName(name: string): string {
  const norm = normalizeIngredient(name);
  const profile = nutritionProfiles[norm];
  if (profile) return profile.name.replace(/\s*\([^)]*\)/g, "");
  return norm
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getNutritionProfile(name: string): NutritionProfile | null {
  const norm = normalizeIngredient(name);
  if (nutritionProfiles[norm]) return nutritionProfiles[norm];
  for (const [key, value] of Object.entries(nutritionProfiles)) {
    if (key.includes(norm) || norm.includes(key)) return value;
  }
  return null;
}

export function getSharedCompounds(a: string, b: string): string[] {
  const ea = getEntityProfile(a);
  const eb = getEntityProfile(b);
  if (!ea || !eb) return [];
  return ea.volatile_compounds.filter((compound) =>
    eb.volatile_compounds.includes(compound),
  );
}

/**
 * Ported 1:1 from FlavorDBClient.compute_molecular_coherence.
 * Pairwise Jaccard overlap of volatile compound sets with culinary synergy boost.
 */
export function computeMolecularCoherence(
  ingredientsA: string[],
  ingredientsB: string[],
): number {
  const normA = ingredientsA.map(normalizeIngredient);
  const normB = ingredientsB.map(normalizeIngredient);

  const profilesA = new Map<string, Set<string>>();
  for (const item of normA) {
    const entity = getEntityProfile(item);
    if (entity) profilesA.set(item, new Set(entity.volatile_compounds));
  }

  const profilesB = new Map<string, Set<string>>();
  for (const item of normB) {
    const entity = getEntityProfile(item);
    if (entity) profilesB.set(item, new Set(entity.volatile_compounds));
  }

  if (profilesA.size === 0 || profilesB.size === 0) return 0.5;

  let totalPairs = 0;
  let sharedScore = 0;

  for (const [itemA, compoundsA] of profilesA) {
    for (const [itemB, compoundsB] of profilesB) {
      if (itemA === itemB) {
        sharedScore += 1;
        totalPairs += 1;
        continue;
      }
      const intersection = [...compoundsA].filter((c) => compoundsB.has(c));
      const union = new Set([...compoundsA, ...compoundsB]);
      if (union.size > 0) {
        let jaccard = intersection.length / union.size;
        const synergy = entities[itemA]?.synergistic_pairs ?? [];
        if (synergy.includes(itemB)) jaccard = Math.max(jaccard, 0.45);
        sharedScore += Math.min(jaccard * 2, 1);
        totalPairs += 1;
      }
    }
  }

  if (totalPairs === 0) return 0.5;
  const coherence = sharedScore / totalPairs;
  return Math.round(Math.min(Math.max(coherence, 0.2), 1) * 1000) / 1000;
}

export function getCompoundCompounds(name: string): string[] {
  return getEntityProfile(name)?.volatile_compounds ?? [];
}

export function getFlavorProfile(name: string): string[] {
  return getEntityProfile(name)?.flavor_profile ?? [];
}

export function getScientificName(name: string): string {
  return getEntityProfile(name)?.scientific_name ?? "Botanical profile pending";
}

/** Best-effort pantry category for names that are not in the seeded catalogue. */
export function getIngredientCategory(name: string): string | null {
  return categoryForEntity(getEntityProfile(name)?.category);
}

export function allCompoundNames(): string[] {
  const names = new Set<string>();
  for (const entity of Object.values(entities)) {
    entity.volatile_compounds.forEach((compound) => names.add(compound));
  }
  return [...names].sort();
}
