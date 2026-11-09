from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class RecommendRequest(BaseModel):
    ingredients: List[str] = Field(..., description="Pantry ingredients detected or entered")
    minutes: Optional[int] = Field(60, description="Maximum cooking time in minutes")
    diet: Optional[str] = Field("any", description="Dietary filter: any, vegetarian, vegan, non-vegetarian")
    utensils: Optional[List[str]] = Field(default_factory=list, description="Available kitchen utensils")
    nutritional_goals: Optional[List[str]] = Field(default_factory=list, description="Goals like high_protein, low_calorie, high_fibre")

class ScoreBreakdown(BaseModel):
    core_coverage: float = Field(..., description="Score for dish-defining core ingredients (0-1)")
    counter_utilisation: float = Field(..., description="Score for utilizing counter ingredients (0-1)")
    flavour_coherence: float = Field(..., description="Molecular flavor compatibility (0-1)")
    gap_fit: float = Field(..., description="Ease of missing items (0-1)")
    composite_score: float = Field(..., description="Weighted composite gastronomy score (0-1)")
    explanation: str

class RecipeCandidate(BaseModel):
    recipe_id: str
    title: str
    cuisine: str
    diet: str
    prep_time_minutes: int
    cook_time_minutes: int
    total_time_minutes: int
    servings: int
    image_url: str
    ingredients_available: List[str]
    ingredients_missing: List[str]
    match_percentage: float
    gastronomy_score: ScoreBreakdown
    calories_per_serving: Optional[float] = None
    protein_grams: Optional[float] = None
    carbs_grams: Optional[float] = None
    fat_grams: Optional[float] = None
    fibre_grams: Optional[float] = None
    one_ingredient_to_buy: Optional[str] = None
    molecular_pairing_notes: Optional[str] = None

class RecommendResponse(BaseModel):
    total_candidates: int
    detected_count: int
    recipes: List[RecipeCandidate]
    unlock_suggestion: Optional[Dict[str, Any]] = None
    offline_mode: bool = False
    source: str = "foodoscope_gastronomy_engine"

class SubstituteResponse(BaseModel):
    query_ingredient: str
    substitutions: List[Dict[str, Any]]
    shared_compounds: List[str] = []
    source: str = "flavordb_molecular_profile"

class NutritionRequest(BaseModel):
    recipe_title: Optional[str] = None
    servings: int = 2
    ingredients: List[Dict[str, Any]] = Field(..., description="List of items: [{'name': 'paneer', 'quantity': 200, 'unit': 'g'}]")

class NutritionResponse(BaseModel):
    calories_total: float
    calories_per_serving: float
    protein_total: float
    protein_per_serving: float
    carbs_total: float
    carbs_per_serving: float
    fat_total: float
    fat_per_serving: float
    fibre_total: float
    fibre_per_serving: float
    sugar_total: float
    sodium_total_mg: float
    saturated_fat_g: float
    micronutrients: Dict[str, str]
    ingredient_breakdown: List[Dict[str, Any]]
    data_source: str = "computational_nutrition_profile"
    is_estimate: bool = True

class DeepInspectResponse(BaseModel):
    detected_ingredients: List[Dict[str, Any]]
    confidence: float
    method: str
    analysis_notes: str
