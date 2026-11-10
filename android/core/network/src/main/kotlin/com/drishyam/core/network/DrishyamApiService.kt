package com.drishyam.core.network

import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.NutritionalTargets
import kotlinx.serialization.Serializable
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

@Serializable
data class AuthRequest(val email: String, val password: String)

@Serializable
data class AuthResponse(val token: String, val userId: String, val email: String, val name: String? = null)

@Serializable
data class PantryItemDto(
    val id: String,
    val name: String,
    val category: String,
    val quantity: Double? = null,
    val unit: String? = null,
    val isAvailable: Boolean = true
)

@Serializable
data class RecipeDto(
    val id: String,
    val title: String,
    val cuisine: String,
    val diet: String,
    val prepTimeMinutes: Int,
    val cookTimeMinutes: Int,
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
    val instructions: List<String> = emptyList()
)

interface DrishyamApiService {

    @POST("api/auth/login")
    suspend fun login(@Body body: AuthRequest): Response<AuthResponse>

    @POST("api/auth/demo")
    suspend fun loginDemo(): Response<AuthResponse>

    @GET("api/pantry")
    suspend fun getPantry(): Response<List<PantryItemDto>>

    @POST("api/pantry")
    suspend fun addPantryItem(@Body item: PantryItemDto): Response<PantryItemDto>

    @PATCH("api/pantry/{id}")
    suspend fun updatePantryItem(@Path("id") id: String, @Body item: PantryItemDto): Response<PantryItemDto>

    @DELETE("api/pantry/{id}")
    suspend fun deletePantryItem(@Path("id") id: String): Response<Unit>

    @GET("api/recipes")
    suspend fun getRecipes(
        @Query("diet") diet: String? = null,
        @Query("goal") goal: String? = null
    ): Response<List<RecipeDto>>

    @GET("api/nutrition/targets")
    suspend fun getNutritionTargets(): Response<NutritionalTargets>
}
