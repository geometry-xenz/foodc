package com.drishyam.domain.repository

import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.NutritionalTargets
import com.drishyam.core.model.Recipe
import kotlinx.coroutines.flow.Flow

interface PantryRepository {
    fun getPantry(): Flow<List<Ingredient>>
    suspend fun addIngredient(ingredient: Ingredient): Result<Unit>
    suspend fun removeIngredient(id: String): Result<Unit>
    suspend fun syncPantry(): Result<Unit>
}

interface RecipeRepository {
    suspend fun getRecommendedRecipes(diet: String? = null, goal: FitnessGoal? = null): Result<List<Recipe>>
    suspend fun getRecipeDetails(id: String): Result<Recipe>
}

interface AuthRepository {
    suspend fun login(email: String, password: String): Result<Unit>
    suspend fun loginDemo(): Result<Unit>
    suspend fun logout(): Result<Unit>
    fun isUserLoggedIn(): Boolean
}

interface NutritionRepository {
    suspend fun getTargets(): Result<NutritionalTargets>
    suspend fun updateGoal(goal: FitnessGoal): Result<NutritionalTargets>
}
