package com.drishyam.core.database

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [
        PantryEntity::class,
        OutboxOpEntity::class,
        PlannedMealEntity::class,
        ShoppingItemEntity::class,
        MealLogEntity::class
    ],
    version = 2,
    exportSchema = false
)
abstract class DrishyamDatabase : RoomDatabase() {
    abstract fun pantryDao(): PantryDao
    abstract fun outboxDao(): OutboxDao
    abstract fun plannerDao(): PlannerDao
    abstract fun shoppingDao(): ShoppingDao
    abstract fun mealLogDao(): MealLogDao
}
