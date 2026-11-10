package com.drishyam.core.database

import androidx.room.Dao
import androidx.room.Database
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.RoomDatabase
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

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
    val lastUpdated: Long
)

@Dao
interface PantryDao {
    @Query("SELECT * FROM pantry_items ORDER BY lastUpdated DESC")
    fun getAllPantryItems(): Flow<List<PantryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(item: PantryEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<PantryEntity>)

    @Query("DELETE FROM pantry_items WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("DELETE FROM pantry_items")
    suspend fun clearAll()
}

@Database(entities = [PantryEntity::class], version = 1, exportSchema = false)
abstract class DrishyamDatabase : RoomDatabase() {
    abstract fun pantryDao(): PantryDao
}
