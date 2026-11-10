package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
enum class FitnessGoal(
    val title: String,
    val description: String,
    val proteinPerKg: Double,
    val calorieDelta: Int
) {
    FAT_LOSS("Fat Loss & Cutting", "Controlled 500 kcal deficit with elevated protein to preserve lean muscle mass.", 2.2, -500),
    LEAN_BULK("Clean Lean Bulk", "Targeted 250 kcal surplus providing amino acids for muscle synthesis with minimal fat gain.", 2.0, 250),
    TRADITIONAL_BULK("Traditional Hypertrophy", "Ample 500 kcal surplus to maximize muscle volume and power output.", 1.8, 500),
    DIRTY_BULK_PREFERENCE("Calorie-Dense Bulk", "Maximal calorie intake for hardgainers.", 1.6, 750),
    BODY_RECOMPOSITION("Body Recomposition", "Near-isocaloric intake with high protein to oxidize fat while building muscle.", 2.3, 0),
    MAINTENANCE("Maintenance & Energy", "Equicaloric nutritional balance for weight stability and sustained energy.", 1.6, 0),
    ATHLETIC_PERFORMANCE("Athletic Performance", "Carbohydrate-focused fueling (55% daily energy) for endurance and explosive speed.", 1.8, 200),
    GENERAL_HEALTH("General Health & Longevity", "Focus on micronutrient density, polyphenol-rich spices, and gut fiber.", 1.4, 0)
}

@Serializable
data class NutritionalTargets(
    val dailyCalories: Int,
    val proteinGrams: Double,
    val carbsGrams: Double,
    val fatGrams: Double,
    val fibreGrams: Double,
    val goal: FitnessGoal = FitnessGoal.LEAN_BULK,
    val bmr: Double = 1750.0,
    val tdee: Double = 2450.0
)
