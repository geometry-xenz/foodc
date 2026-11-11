package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
enum class MealType(val displayName: String) {
    BREAKFAST("Breakfast"),
    LUNCH("Lunch"),
    DINNER("Dinner"),
    SNACK("Snack"),
    PRE_WORKOUT("Pre-Workout"),
    POST_WORKOUT("Post-Workout")
}

@Serializable
data class PlannedMeal(
    val id: String,
    val planId: String,
    val date: String,
    val mealType: MealType,
    val position: Int = 0,
    val recipeId: String? = null,
    val customName: String? = null,
    val calories: Int = 0,
    val proteinG: Double = 0.0,
    val carbsG: Double = 0.0,
    val fatG: Double = 0.0,
    val isCompleted: Boolean = false,
    val version: Int = 1
)
