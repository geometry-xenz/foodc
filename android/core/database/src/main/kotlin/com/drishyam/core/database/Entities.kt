package com.drishyam.core.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "pantry_items")
data class PantryEntity(
    @PrimaryKey val id: String,
    val canonicalName: String,
    val displayName: String,
    val category: String,
    val quantity: Double?,
    val unit: String?,
    val isAvailable: Boolean,
    val source: String,
    val confidence: Float?,
    val confirmed: Boolean,
    val version: Int = 1,
    val isDeleted: Boolean = false,
    val lastUpdated: Long = System.currentTimeMillis()
)

@Entity(tableName = "outbox_ops")
data class OutboxOpEntity(
    @PrimaryKey val opId: String,
    val entity: String,
    val targetId: String,
    val op: String, // "upsert" or "delete"
    val baseVersion: Int?,
    val payloadJson: String?,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "planned_meals")
data class PlannedMealEntity(
    @PrimaryKey val id: String,
    val planId: String,
    val date: String,
    val mealType: String,
    val position: Int = 0,
    val recipeId: String? = null,
    val customName: String? = null,
    val calories: Int = 0,
    val proteinG: Double = 0.0,
    val carbsG: Double = 0.0,
    val fatG: Double = 0.0,
    val isCompleted: Boolean = false,
    val version: Int = 1,
    val isDeleted: Boolean = false
)

@Entity(tableName = "shopping_items")
data class ShoppingItemEntity(
    @PrimaryKey val id: String,
    val name: String,
    val category: String = "Pantry",
    val quantity: Double = 1.0,
    val unit: String = "pack",
    val purchased: Boolean = false,
    val reason: String? = null,
    val version: Int = 1,
    val isDeleted: Boolean = false,
    val lastUpdated: Long = System.currentTimeMillis()
)

@Entity(tableName = "meal_logs")
data class MealLogEntity(
    @PrimaryKey val id: String,
    val date: String,
    val mealType: String,
    val name: String,
    val calories: Int = 0,
    val proteinG: Double = 0.0,
    val carbsG: Double = 0.0,
    val fatG: Double = 0.0,
    val fibreG: Double = 0.0,
    val recipeId: String? = null,
    val version: Int = 1,
    val isDeleted: Boolean = false,
    val lastUpdated: Long = System.currentTimeMillis()
)
