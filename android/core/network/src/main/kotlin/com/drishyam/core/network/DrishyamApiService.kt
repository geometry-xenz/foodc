package com.drishyam.core.network

import com.drishyam.core.model.DeepInspectResponse
import com.drishyam.core.model.FlavourGraphResponse
import com.drishyam.core.model.NutritionalTargets
import com.drishyam.core.model.SyncChangesResponse
import com.drishyam.core.model.SyncPushRequest
import com.drishyam.core.model.SyncPushResponse
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Part
import retrofit2.http.Path
import retrofit2.http.Query

// ==============================================================================
// Auth DTOs
// ==============================================================================

@Serializable
data class AuthRequest(
    val email: String,
    val password: String,
    val client: String = "android"
)

@Serializable
data class RegisterRequest(
    val email: String,
    val password: String,
    val name: String? = null,
    val client: String = "android"
)

@Serializable
data class ForgotPasswordRequest(val email: String)

@Serializable
data class ResetPasswordRequest(val token: String, val new_password: String)

@Serializable
data class UserDto(val id: String, val email: String, val name: String? = null)

@Serializable
data class AuthResponse(
    val user: UserDto,
    val client: String = "android",
    val access_token: String? = null,
    val refresh_token: String? = null,
    val expires_in: Int? = null
)

// ==============================================================================
// Pantry & Recipe DTOs
// ==============================================================================

@Serializable
data class PantryItemDto(
    val id: String,
    val name: String,
    val category: String = "Spices",
    val quantity: Double? = 100.0,
    val unit: String? = "g",
    val confidence: Float = 1.0f,
    val confirmed: Boolean = true,
    val source: String = "manual",
    val isAvailable: Boolean = true,
    val version: Int = 1
)

@Serializable
data class RecipeDto(
    val id: String,
    val title: String,
    val cuisine: String = "Indian",
    val diet: String = "Vegetarian",
    val prepTimeMinutes: Int = 15,
    val cookTimeMinutes: Int = 20,
    val servings: Int = 2,
    val imageUrl: String? = null,
    val ingredientsAvailable: List<String> = emptyList(),
    val ingredientsMissing: List<String> = emptyList(),
    val matchPercentage: Float = 0f,
    val compositeScore: Float = 0f,
    val whyRecommended: String = "",
    val calories: Int = 250,
    val proteinGrams: Double = 15.0,
    val carbsGrams: Double = 20.0,
    val fatGrams: Double = 10.0,
    val fibreGrams: Double = 4.0,
    val oneIngredientToUnlock: String? = null,
    val instructions: List<String> = emptyList(),
    val molecularPairingNotes: String? = null,
    val isSaved: Boolean = false
)

// ==============================================================================
// Planner, Shopping & Nutrition DTOs
// ==============================================================================

@Serializable
data class PlannedMealDto(
    val id: String,
    val plan_id: String? = null,
    val date: String,
    val meal_type: String,
    val position: Int = 0,
    val recipe_id: String? = null,
    val custom_name: String? = null,
    val calories: Int = 0,
    val protein_g: Double = 0.0,
    val carbs_g: Double = 0.0,
    val fat_g: Double = 0.0,
    val is_completed: Boolean = false,
    val version: Int = 1
)

@Serializable
data class ShoppingItemDto(
    val id: String,
    val name: String,
    val category: String = "Pantry",
    val quantity: Double = 1.0,
    val unit: String = "pack",
    val purchased: Boolean = false,
    val reason: String? = null,
    val version: Int = 1
)

@Serializable
data class MealLogDto(
    val id: String,
    val date: String,
    val meal_type: String,
    val name: String,
    val servings: Double = 1.0,
    val calories: Int = 0,
    val protein_g: Double = 0.0,
    val carbs_g: Double = 0.0,
    val fat_g: Double = 0.0,
    val fibre_g: Double = 0.0,
    val recipe_id: String? = null,
    val version: Int = 1
)

@Serializable
data class NutritionSummaryDto(
    val date: String,
    val total_calories: Int = 0,
    val total_protein_g: Double = 0.0,
    val total_carbs_g: Double = 0.0,
    val total_fat_g: Double = 0.0,
    val total_fibre_g: Double = 0.0,
    val target_calories: Int = 2000,
    val target_protein_g: Double = 150.0,
    val target_carbs_g: Double = 220.0,
    val target_fat_g: Double = 60.0
)

// ==============================================================================
// Profile, Preferences & Settings DTOs
// ==============================================================================

@Serializable
data class ProfileDto(
    val age: Int? = null,
    val gender: String? = null,
    val height_cm: Float? = null,
    val weight_kg: Float? = null,
    val activity_level: String? = null,
    val experience_level: String? = null,
    val kitchen_equipment: List<String> = emptyList(),
    val version: Int = 1
)

@Serializable
data class PreferencesDto(
    val lifestyle: String = "non_vegetarian",
    val restrictions: List<String> = emptyList(),
    val allergies: List<String> = emptyList(),
    val version: Int = 1
)

@Serializable
data class SettingsDto(
    val sound_enabled: Boolean = true,
    val haptics_enabled: Boolean = true,
    val unit_system: String = "metric",
    val reduced_motion: Boolean = false,
    val version: Int = 1
)

// ==============================================================================
// Drishyam Retrofit API Service
// ==============================================================================

interface DrishyamApiService {

    // Auth
    @POST("api/auth/login")
    suspend fun login(@Body body: AuthRequest): Response<AuthResponse>

    @POST("api/auth/register")
    suspend fun register(@Body body: RegisterRequest): Response<AuthResponse>

    @POST("api/auth/demo?client=android")
    suspend fun loginDemo(): Response<AuthResponse>

    @POST("api/auth/logout")
    suspend fun logout(): Response<Unit>

    @POST("api/auth/logout-all")
    suspend fun logoutAll(): Response<Unit>

    @POST("api/auth/password/forgot")
    suspend fun forgotPassword(@Body body: ForgotPasswordRequest): Response<JsonObject>

    @POST("api/auth/password/reset")
    suspend fun resetPassword(@Body body: ResetPasswordRequest): Response<JsonObject>

    // Profile & Settings
    @GET("api/profile")
    suspend fun getProfile(): Response<ProfileDto>

    @PUT("api/profile")
    suspend fun updateProfile(@Body body: ProfileDto): Response<ProfileDto>

    @GET("api/preferences")
    suspend fun getPreferences(): Response<PreferencesDto>

    @PUT("api/preferences")
    suspend fun updatePreferences(@Body body: PreferencesDto): Response<PreferencesDto>

    @GET("api/nutrition/targets")
    suspend fun getNutritionTargets(): Response<NutritionalTargets>

    @GET("api/settings")
    suspend fun getSettings(): Response<SettingsDto>

    @PUT("api/settings")
    suspend fun updateSettings(@Body body: SettingsDto): Response<SettingsDto>

    // Pantry
    @GET("api/pantry")
    suspend fun getPantry(): Response<List<PantryItemDto>>

    @POST("api/pantry")
    suspend fun addPantryItem(@Body item: PantryItemDto): Response<PantryItemDto>

    @PUT("api/pantry/{id}")
    suspend fun updatePantryItem(@Path("id") id: String, @Body item: PantryItemDto): Response<PantryItemDto>

    @DELETE("api/pantry/{id}")
    suspend fun deletePantryItem(@Path("id") id: String): Response<Unit>

    // Recipes & Flavour
    @GET("api/recipes")
    suspend fun getRecipes(
        @Query("q") query: String? = null,
        @Query("cuisine") cuisine: String? = null,
        @Query("diet") diet: String? = null,
        @Query("max_minutes") maxMinutes: Int? = null,
        @Query("goal") goal: String? = null
    ): Response<List<RecipeDto>>

    @GET("api/recipes/{id}")
    suspend fun getRecipeDetails(@Path("id") id: String): Response<RecipeDto>

    @POST("api/recipes/{id}/save")
    suspend fun saveRecipe(@Path("id") id: String): Response<JsonObject>

    @DELETE("api/recipes/{id}/save")
    suspend fun unsaveRecipe(@Path("id") id: String): Response<JsonObject>

    @GET("api/saved")
    suspend fun getSavedRecipes(): Response<List<RecipeDto>>

    @GET("api/flavour/{ingredient}")
    suspend fun getIngredientFlavour(@Path("ingredient") ingredient: String): Response<JsonObject>

    @GET("api/flavour/graph")
    suspend fun getFlavourGraph(@Query("ingredients") ingredients: String? = null): Response<FlavourGraphResponse>

    // Meal Planner
    @GET("api/meal-plans")
    suspend fun getMealPlans(): Response<List<JsonObject>>

    @POST("api/meal-plans")
    suspend fun createMealPlan(@Body body: JsonObject): Response<JsonObject>

    @POST("api/meal-plans/{id}/meals")
    suspend fun addPlannedMeal(@Path("id") planId: String, @Body meal: PlannedMealDto): Response<PlannedMealDto>

    @PUT("api/planned-meals/{id}")
    suspend fun updatePlannedMeal(@Path("id") id: String, @Body meal: PlannedMealDto): Response<PlannedMealDto>

    @DELETE("api/planned-meals/{id}")
    suspend fun deletePlannedMeal(@Path("id") id: String): Response<Unit>

    // Shopping
    @GET("api/shopping")
    suspend fun getShoppingList(): Response<List<ShoppingItemDto>>

    @POST("api/shopping/items")
    suspend fun addShoppingItem(@Body item: ShoppingItemDto): Response<ShoppingItemDto>

    @PUT("api/shopping/items/{id}")
    suspend fun updateShoppingItem(@Path("id") id: String, @Body item: ShoppingItemDto): Response<ShoppingItemDto>

    @DELETE("api/shopping/items/{id}")
    suspend fun deleteShoppingItem(@Path("id") id: String): Response<Unit>

    @POST("api/shopping/from-plan/{plan_id}")
    suspend fun buildShoppingFromPlan(@Path("plan_id") planId: String): Response<JsonObject>

    // Nutrition & Meal Logs
    @GET("api/nutrition/summary")
    suspend fun getNutritionSummary(
        @Query("range") range: String = "day",
        @Query("date") date: String? = null
    ): Response<NutritionSummaryDto>

    @GET("api/nutrition/history")
    suspend fun getNutritionHistory(): Response<List<MealLogDto>>

    @POST("api/nutrition/meal-log")
    suspend fun logMeal(@Body meal: MealLogDto): Response<MealLogDto>

    @PUT("api/nutrition/meal-log/{id}")
    suspend fun updateMealLog(@Path("id") id: String, @Body meal: MealLogDto): Response<MealLogDto>

    @DELETE("api/nutrition/meal-log/{id}")
    suspend fun deleteMealLog(@Path("id") id: String): Response<Unit>

    // Scanner: Deep Inspect
    @Multipart
    @POST("api/scan/deep-inspect")
    suspend fun deepInspect(
        @Part image: MultipartBody.Part,
        @Part("consent") consent: RequestBody
    ): Response<DeepInspectResponse>

    // Offline Sync (§5.5)
    @GET("api/sync/bootstrap")
    suspend fun syncBootstrap(): Response<SyncChangesResponse>

    @GET("api/sync/changes")
    suspend fun syncChanges(
        @Query("since") since: String? = null,
        @Query("limit") limit: Int = 500
    ): Response<SyncChangesResponse>

    @POST("api/sync/push")
    suspend fun syncPush(@Body request: SyncPushRequest): Response<SyncPushResponse>

    @GET("api/sync/status")
    suspend fun syncStatus(): Response<JsonObject>
}
