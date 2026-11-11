package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
data class MealLog(
    val id: String,
    val date: String,
    val mealType: MealType,
    val name: String,
    val servings: Double = 1.0,
    val calories: Int = 0,
    val proteinG: Double = 0.0,
    val carbsG: Double = 0.0,
    val fatG: Double = 0.0,
    val fibreG: Double = 0.0,
    val recipeId: String? = null,
    val version: Int = 1
)

@Serializable
data class DailyNutritionSummary(
    val date: String,
    val totalCalories: Int = 0,
    val totalProteinG: Double = 0.0,
    val totalCarbsG: Double = 0.0,
    val totalFatG: Double = 0.0,
    val totalFibreG: Double = 0.0,
    val targetCalories: Int = 2000,
    val targetProteinG: Double = 150.0,
    val targetCarbsG: Double = 220.0,
    val targetFatG: Double = 60.0
)
