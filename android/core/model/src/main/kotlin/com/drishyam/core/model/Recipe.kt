package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
data class GastronomyScore(
    val coreCoverage: Float,
    val pantryUtilisation: Float,
    val flavourCoherence: Float,
    val gapFit: Float,
    val compositeScore: Float
) {
    val displayPercentage: Int get() = (compositeScore * 100).toInt()
}

@Serializable
data class NutritionFacts(
    val calories: Int,
    val proteinGrams: Double,
    val carbsGrams: Double,
    val fatGrams: Double,
    val fibreGrams: Double,
    val sodiumMg: Double? = null
)

@Serializable
data class Recipe(
    val id: String,
    val title: String,
    val cuisine: String,
    val diet: String,
    val prepTimeMinutes: Int,
    val cookTimeMinutes: Int,
    val servings: Int = 2,
    val imageUrl: String? = null,
    val ingredientsAvailable: List<String>,
    val ingredientsMissing: List<String>,
    val matchPercentage: Float,
    val gastronomyScore: GastronomyScore,
    val whyRecommended: String,
    val nutrition: NutritionFacts,
    val oneIngredientToUnlock: String? = null,
    val instructions: List<String> = emptyList(),
    val molecularPairingNotes: String? = null,
    val isSaved: Boolean = false
)
