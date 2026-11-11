package com.drishyam.domain.repository

import com.drishyam.core.model.DailyNutritionSummary
import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.FlavourGraphResponse
import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.MealLog
import com.drishyam.core.model.NutritionalTargets
import com.drishyam.core.model.PlannedMeal
import com.drishyam.core.model.Recipe
import com.drishyam.core.model.ShoppingItem
import com.drishyam.core.model.UserProfile
import com.drishyam.core.model.UserPreferences
import com.drishyam.core.model.UserSettings
import kotlinx.coroutines.flow.Flow

interface PantryRepository {
    fun getPantry(): Flow<List<Ingredient>>
    suspend fun addIngredient(ingredient: Ingredient): Result<Unit>
    suspend fun updateIngredient(ingredient: Ingredient): Result<Unit>
    suspend fun removeIngredient(id: String): Result<Unit>
    suspend fun syncPantry(): Result<Unit>
}

interface RecipeRepository {
    suspend fun getRecommendedRecipes(
        query: String? = null,
        cuisine: String? = null,
        diet: String? = null,
        maxMinutes: Int? = null,
        goal: FitnessGoal? = null
    ): Result<List<Recipe>>
    suspend fun getRecipeDetails(id: String): Result<Recipe>
    suspend fun toggleSaveRecipe(id: String, save: Boolean): Result<Unit>
    suspend fun getSavedRecipes(): Result<List<Recipe>>
}

interface AuthRepository {
    suspend fun login(email: String, password: String): Result<Unit>
    suspend fun register(email: String, password: String, name: String? = null): Result<Unit>
    suspend fun loginDemo(): Result<Unit>
    suspend fun logout(): Result<Unit>
    suspend fun logoutAll(): Result<Unit>
    suspend fun forgotPassword(email: String): Result<Unit>
    suspend fun resetPassword(token: String, newPassword: String): Result<Unit>
    fun isUserLoggedIn(): Boolean
}

interface NutritionRepository {
    suspend fun getTargets(): Result<NutritionalTargets>
    suspend fun updateGoal(goal: FitnessGoal): Result<NutritionalTargets>
    fun getMealLogs(): Flow<List<MealLog>>
    suspend fun logMeal(meal: MealLog): Result<Unit>
    suspend fun deleteMealLog(id: String): Result<Unit>
    suspend fun getSummary(date: String): Result<DailyNutritionSummary>
}

interface PlannerRepository {
    fun getPlannedMeals(): Flow<List<PlannedMeal>>
    suspend fun addPlannedMeal(meal: PlannedMeal): Result<Unit>
    suspend fun updatePlannedMeal(meal: PlannedMeal): Result<Unit>
    suspend fun removePlannedMeal(id: String): Result<Unit>
    suspend fun buildShoppingList(planId: String): Result<Unit>
}

interface ShoppingRepository {
    fun getShoppingList(): Flow<List<ShoppingItem>>
    suspend fun addShoppingItem(item: ShoppingItem): Result<Unit>
    suspend fun togglePurchased(id: String, purchased: Boolean): Result<Unit>
    suspend fun removeShoppingItem(id: String): Result<Unit>
}

interface FlavourRepository {
    suspend fun getFlavourGraph(ingredients: List<String> = emptyList()): Result<FlavourGraphResponse>
}

interface AccountRepository {
    suspend fun getProfile(): Result<UserProfile>
    suspend fun updateProfile(profile: UserProfile): Result<UserProfile>
    suspend fun getPreferences(): Result<UserPreferences>
    suspend fun updatePreferences(preferences: UserPreferences): Result<UserPreferences>
    suspend fun getSettings(): Result<UserSettings>
    suspend fun updateSettings(settings: UserSettings): Result<UserSettings>
}

interface SyncRepository {
    suspend fun pushPendingOps(): Result<Int>
    suspend fun pullRemoteChanges(): Result<Int>
    suspend fun performFullSync(): Result<Unit>
}
