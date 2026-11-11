package com.drishyam.core.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface PantryDao {
    @Query("SELECT * FROM pantry_items WHERE isDeleted = 0 ORDER BY lastUpdated DESC")
    fun getAllPantryItems(): Flow<List<PantryEntity>>

    @Query("SELECT * FROM pantry_items WHERE id = :id AND isDeleted = 0")
    suspend fun getById(id: String): PantryEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(item: PantryEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<PantryEntity>)

    @Query("UPDATE pantry_items SET isDeleted = 1, lastUpdated = :timestamp WHERE id = :id")
    suspend fun markDeleted(id: String, timestamp: Long = System.currentTimeMillis())

    @Query("DELETE FROM pantry_items WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("DELETE FROM pantry_items")
    suspend fun clearAll()
}

@Dao
interface OutboxDao {
    @Query("SELECT * FROM outbox_ops ORDER BY createdAt ASC")
    suspend fun getAllPendingOps(): List<OutboxOpEntity>

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun enqueueOp(op: OutboxOpEntity)

    @Query("DELETE FROM outbox_ops WHERE opId = :opId")
    suspend fun deleteOp(opId: String)

    @Query("DELETE FROM outbox_ops")
    suspend fun clearAll()
}

@Dao
interface PlannerDao {
    @Query("SELECT * FROM planned_meals WHERE isDeleted = 0 ORDER BY date ASC, position ASC")
    fun getAllPlannedMeals(): Flow<List<PlannedMealEntity>>

    @Query("SELECT * FROM planned_meals WHERE date = :date AND isDeleted = 0 ORDER BY position ASC")
    fun getMealsForDate(date: String): Flow<List<PlannedMealEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(meal: PlannedMealEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(meals: List<PlannedMealEntity>)

    @Query("UPDATE planned_meals SET isDeleted = 1 WHERE id = :id")
    suspend fun markDeleted(id: String)

    @Query("DELETE FROM planned_meals WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("DELETE FROM planned_meals")
    suspend fun clearAll()
}

@Dao
interface ShoppingDao {
    @Query("SELECT * FROM shopping_items WHERE isDeleted = 0 ORDER BY purchased ASC, lastUpdated DESC")
    fun getAllShoppingItems(): Flow<List<ShoppingItemEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(item: ShoppingItemEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<ShoppingItemEntity>)

    @Query("UPDATE shopping_items SET purchased = :purchased, lastUpdated = :timestamp WHERE id = :id")
    suspend fun togglePurchased(id: String, purchased: Boolean, timestamp: Long = System.currentTimeMillis())

    @Query("UPDATE shopping_items SET isDeleted = 1, lastUpdated = :timestamp WHERE id = :id")
    suspend fun markDeleted(id: String, timestamp: Long = System.currentTimeMillis())

    @Query("DELETE FROM shopping_items WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("DELETE FROM shopping_items")
    suspend fun clearAll()
}

@Dao
interface MealLogDao {
    @Query("SELECT * FROM meal_logs WHERE isDeleted = 0 ORDER BY date DESC, lastUpdated DESC")
    fun getAllMealLogs(): Flow<List<MealLogEntity>>

    @Query("SELECT * FROM meal_logs WHERE date = :date AND isDeleted = 0")
    fun getMealLogsForDate(date: String): Flow<List<MealLogEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(log: MealLogEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(logs: List<MealLogEntity>)

    @Query("UPDATE meal_logs SET isDeleted = 1, lastUpdated = :timestamp WHERE id = :id")
    suspend fun markDeleted(id: String, timestamp: Long = System.currentTimeMillis())

    @Query("DELETE FROM meal_logs WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("DELETE FROM meal_logs")
    suspend fun clearAll()
}
