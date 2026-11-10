package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
enum class IngredientCategory(val displayName: String) {
    SPICES("Powdered Spices"),
    WHOLE_SPICES("Whole Aromatics"),
    FRESH_PRODUCE("Fresh Produce & Alliums"),
    DAIRY("Dairy & Paneer"),
    GRAINS("Grains & Flours"),
    OILS("Oils & Ghee"),
    LEGUMES("Lentils & Pulses"),
    PANTRY_STAPLES("Seasonings & Staples")
}

@Serializable
enum class IngredientSource {
    MANUAL,
    ANDROID_EDGE_CAMERA,
    IMPORTED,
    SYNCED_WEB
}

@Serializable
data class Ingredient(
    val id: String,
    val canonicalName: String,
    val displayName: String,
    val category: IngredientCategory,
    val quantity: Double? = null,
    val unit: String? = null,
    val isAvailable: Boolean = true,
    val source: IngredientSource = IngredientSource.MANUAL,
    val confidence: Float? = null,
    val confirmed: Boolean = true,
    val volatileCompounds: List<String> = emptyList(),
    val expiryDaysRemaining: Int? = null,
    val lastUpdated: Long = System.currentTimeMillis()
)
