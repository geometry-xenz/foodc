package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
data class UserProfile(
    val id: String,
    val email: String,
    val name: String? = null,
    val age: Int? = null,
    val gender: String? = null,
    val heightCm: Float? = null,
    val weightKg: Float? = null,
    val activityLevel: String? = null,
    val experienceLevel: String? = null,
    val kitchenEquipment: List<String> = emptyList(),
    val version: Int = 1
)

@Serializable
data class UserPreferences(
    val lifestyle: String = "non_vegetarian",
    val restrictions: List<String> = emptyList(),
    val allergies: List<String> = emptyList(),
    val version: Int = 1
)

@Serializable
data class UserSettings(
    val soundEnabled: Boolean = true,
    val hapticsEnabled: Boolean = true,
    val unitSystem: String = "metric",
    val reducedMotion: Boolean = false,
    val version: Int = 1
)
