package com.drishyam.data.repository

import com.drishyam.core.database.DrishyamDatabase
import com.drishyam.core.database.MealLogEntity
import com.drishyam.core.database.OutboxOpEntity
import com.drishyam.core.database.PantryEntity
import com.drishyam.core.database.PlannedMealEntity
import com.drishyam.core.database.ShoppingItemEntity
import com.drishyam.core.model.DailyNutritionSummary
import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.FlavourGraphResponse
import com.drishyam.core.model.GastronomyScore
import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.IngredientCategory
import com.drishyam.core.model.IngredientSource
import com.drishyam.core.model.MealLog
import com.drishyam.core.model.MealType
import com.drishyam.core.model.NutritionFacts
import com.drishyam.core.model.NutritionalTargets
import com.drishyam.core.model.PlannedMeal
import com.drishyam.core.model.Recipe
import com.drishyam.core.model.ShoppingItem
import com.drishyam.core.model.UserProfile
import com.drishyam.core.model.UserPreferences
import com.drishyam.core.model.UserSettings
import com.drishyam.core.network.AuthRequest
import com.drishyam.core.network.DrishyamApiService
import com.drishyam.core.network.ForgotPasswordRequest
import com.drishyam.core.network.MealLogDto
import com.drishyam.core.network.PantryItemDto
import com.drishyam.core.network.PlannedMealDto
import com.drishyam.core.network.PreferencesDto
import com.drishyam.core.network.ProfileDto
import com.drishyam.core.network.RegisterRequest
import com.drishyam.core.network.ResetPasswordRequest
import com.drishyam.core.network.SettingsDto
import com.drishyam.core.network.ShoppingItemDto
import com.drishyam.core.network.TokenManager
import com.drishyam.domain.repository.AccountRepository
import com.drishyam.domain.repository.AuthRepository
import com.drishyam.domain.repository.FlavourRepository
import com.drishyam.domain.repository.NutritionRepository
import com.drishyam.domain.repository.PantryRepository
import com.drishyam.domain.repository.PlannerRepository
import com.drishyam.domain.repository.RecipeRepository
import com.drishyam.domain.repository.ShoppingRepository
import com.drishyam.domain.repository.SyncRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.UUID

// ==============================================================================
// 1. Pantry Repository (Offline-First with Outbox)
// ==============================================================================

class PantryRepositoryImpl(
    private val database: DrishyamDatabase,
    private val apiService: DrishyamApiService,
    private val syncRepository: SyncRepository? = null,
    private val scope: CoroutineScope = CoroutineScope(Dispatchers.IO)
) : PantryRepository {

    override fun getPantry(): Flow<List<Ingredient>> {
        return database.pantryDao().getAllPantryItems().map { entities ->
            entities.map { entity ->
                Ingredient(
                    id = entity.id,
                    canonicalName = entity.canonicalName,
                    displayName = entity.displayName,
                    category = runCatching { IngredientCategory.valueOf(entity.category) }.getOrDefault(IngredientCategory.SPICES),
                    quantity = entity.quantity,
                    unit = entity.unit,
                    isAvailable = entity.isAvailable,
                    source = runCatching { IngredientSource.valueOf(entity.source) }.getOrDefault(IngredientSource.MANUAL),
                    confidence = entity.confidence,
                    confirmed = entity.confirmed,
                    lastUpdated = entity.lastUpdated
                )
            }
        }
    }

    override suspend fun addIngredient(ingredient: Ingredient): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            // 1. Write locally to Room
            val entity = PantryEntity(
                id = ingredient.id,
                canonicalName = ingredient.canonicalName,
                displayName = ingredient.displayName,
                category = ingredient.category.name,
                quantity = ingredient.quantity ?: 100.0,
                unit = ingredient.unit ?: "g",
                isAvailable = ingredient.isAvailable,
                source = ingredient.source.name,
                confidence = ingredient.confidence ?: 1.0f,
                confirmed = ingredient.confirmed,
                version = 1,
                isDeleted = false,
                lastUpdated = System.currentTimeMillis()
            )
            database.pantryDao().insertOrUpdate(entity)

            // 2. Enqueue Outbox mutation operation (§5.5)
            val opId = UUID.randomUUID().toString()
            val payloadJson = """{"name":"${ingredient.canonicalName}","category":"${ingredient.category.displayName}","quantity":${ingredient.quantity ?: 100.0},"unit":"${ingredient.unit ?: "g"}","confidence":${ingredient.confidence ?: 1.0f},"confirmed":true,"source":"${ingredient.source.name.lowercase()}"}"""
            database.outboxDao().enqueueOp(
                OutboxOpEntity(
                    opId = opId,
                    entity = "pantry_item",
                    targetId = ingredient.id,
                    op = "upsert",
                    baseVersion = null,
                    payloadJson = payloadJson
                )
            )

            // 3. Trigger optimistic background sync
            syncRepository?.let { repo -> scope.launch { repo.pushPendingOps() } }
            Unit
        }
    }

    override suspend fun updateIngredient(ingredient: Ingredient): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            val existing = database.pantryDao().getById(ingredient.id)
            val nextVersion = (existing?.version ?: 1) + 1
            database.pantryDao().insertOrUpdate(
                PantryEntity(
                    id = ingredient.id,
                    canonicalName = ingredient.canonicalName,
                    displayName = ingredient.displayName,
                    category = ingredient.category.name,
                    quantity = ingredient.quantity,
                    unit = ingredient.unit,
                    isAvailable = ingredient.isAvailable,
                    source = ingredient.source.name,
                    confidence = ingredient.confidence,
                    confirmed = ingredient.confirmed,
                    version = nextVersion,
                    isDeleted = false,
                    lastUpdated = System.currentTimeMillis()
                )
            )

            val opId = UUID.randomUUID().toString()
            val payloadJson = """{"name":"${ingredient.canonicalName}","quantity":${ingredient.quantity ?: 100.0},"unit":"${ingredient.unit ?: "g"}"}"""
            database.outboxDao().enqueueOp(
                OutboxOpEntity(
                    opId = opId,
                    entity = "pantry_item",
                    targetId = ingredient.id,
                    op = "upsert",
                    baseVersion = existing?.version,
                    payloadJson = payloadJson
                )
            )
            syncRepository?.let { repo -> scope.launch { repo.pushPendingOps() } }
            Unit
        }
    }

    override suspend fun removeIngredient(id: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            val existing = database.pantryDao().getById(id)
            database.pantryDao().markDeleted(id)

            val opId = UUID.randomUUID().toString()
            database.outboxDao().enqueueOp(
                OutboxOpEntity(
                    opId = opId,
                    entity = "pantry_item",
                    targetId = id,
                    op = "delete",
                    baseVersion = existing?.version,
                    payloadJson = null
                )
            )
            syncRepository?.let { repo -> scope.launch { repo.pushPendingOps() } }
            Unit
        }
    }

    override suspend fun syncPantry(): Result<Unit> = withContext(Dispatchers.IO) {
        syncRepository?.performFullSync() ?: runCatching {
            val res = apiService.getPantry()
            if (res.isSuccessful && res.body() != null) {
                val entities = res.body()!!.map { dto ->
                    PantryEntity(
                        id = dto.id,
                        canonicalName = dto.name,
                        displayName = dto.name.replaceFirstChar { it.uppercase() },
                        category = IngredientCategory.SPICES.name,
                        quantity = dto.quantity,
                        unit = dto.unit,
                        isAvailable = dto.isAvailable,
                        source = dto.source,
                        confidence = dto.confidence,
                        confirmed = dto.confirmed,
                        version = dto.version,
                        isDeleted = false,
                        lastUpdated = System.currentTimeMillis()
                    )
                }
                database.pantryDao().insertAll(entities)
            }
        }
    }
}

// ==============================================================================
// 2. Recipe Repository
// ==============================================================================

class RecipeRepositoryImpl(
    private val apiService: DrishyamApiService
) : RecipeRepository {

    override suspend fun getRecommendedRecipes(
        query: String?,
        cuisine: String?,
        diet: String?,
        maxMinutes: Int?,
        goal: FitnessGoal?
    ): Result<List<Recipe>> = withContext(Dispatchers.IO) {
        runCatching {
            val response = runCatching {
                apiService.getRecipes(
                    query = query,
                    cuisine = cuisine,
                    diet = diet,
                    maxMinutes = maxMinutes,
                    goal = goal?.name?.lowercase()
                )
            }.getOrNull()

            if (response != null && response.isSuccessful && response.body() != null) {
                response.body()!!.map { dto ->
                    Recipe(
                        id = dto.id,
                        title = dto.title,
                        cuisine = dto.cuisine,
                        diet = dto.diet,
                        prepTimeMinutes = dto.prepTimeMinutes,
                        cookTimeMinutes = dto.cookTimeMinutes,
                        servings = dto.servings,
                        imageUrl = dto.imageUrl,
                        ingredientsAvailable = dto.ingredientsAvailable,
                        ingredientsMissing = dto.ingredientsMissing,
                        matchPercentage = dto.matchPercentage,
                        gastronomyScore = GastronomyScore(0.85f, 0.70f, 0.90f, 0.88f, dto.compositeScore),
                        whyRecommended = dto.whyRecommended,
                        nutrition = NutritionFacts(dto.calories, dto.proteinGrams, dto.carbsGrams, dto.fatGrams, dto.fibreGrams),
                        oneIngredientToUnlock = dto.oneIngredientToUnlock,
                        instructions = dto.instructions,
                        molecularPairingNotes = dto.molecularPairingNotes,
                        isSaved = dto.isSaved
                    )
                }
            } else {
                // High-precision offline culinary recipe fallback (Zero-dead state)
                getCuratedOfflineRecipes()
            }
        }
    }

    override suspend fun getRecipeDetails(id: String): Result<Recipe> = withContext(Dispatchers.IO) {
        runCatching {
            val res = runCatching { apiService.getRecipeDetails(id) }.getOrNull()
            if (res != null && res.isSuccessful && res.body() != null) {
                val dto = res.body()!!
                Recipe(
                    id = dto.id,
                    title = dto.title,
                    cuisine = dto.cuisine,
                    diet = dto.diet,
                    prepTimeMinutes = dto.prepTimeMinutes,
                    cookTimeMinutes = dto.cookTimeMinutes,
                    servings = dto.servings,
                    imageUrl = dto.imageUrl,
                    ingredientsAvailable = dto.ingredientsAvailable,
                    ingredientsMissing = dto.ingredientsMissing,
                    matchPercentage = dto.matchPercentage,
                    gastronomyScore = GastronomyScore(0.85f, 0.70f, 0.90f, 0.88f, dto.compositeScore),
                    whyRecommended = dto.whyRecommended,
                    nutrition = NutritionFacts(dto.calories, dto.proteinGrams, dto.carbsGrams, dto.fatGrams, dto.fibreGrams),
                    oneIngredientToUnlock = dto.oneIngredientToUnlock,
                    instructions = dto.instructions,
                    molecularPairingNotes = dto.molecularPairingNotes,
                    isSaved = dto.isSaved
                )
            } else {
                getCuratedOfflineRecipes().firstOrNull { it.id == id } ?: getCuratedOfflineRecipes().first()
            }
        }
    }

    override suspend fun toggleSaveRecipe(id: String, save: Boolean): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            if (save) apiService.saveRecipe(id) else apiService.unsaveRecipe(id)
            Unit
        }
    }

    override suspend fun getSavedRecipes(): Result<List<Recipe>> = withContext(Dispatchers.IO) {
        runCatching {
            val res = apiService.getSavedRecipes()
            if (res.isSuccessful && res.body() != null) {
                res.body()!!.map { dto ->
                    Recipe(
                        id = dto.id,
                        title = dto.title,
                        cuisine = dto.cuisine,
                        diet = dto.diet,
                        prepTimeMinutes = dto.prepTimeMinutes,
                        cookTimeMinutes = dto.cookTimeMinutes,
                        servings = dto.servings,
                        imageUrl = dto.imageUrl,
                        ingredientsAvailable = dto.ingredientsAvailable,
                        ingredientsMissing = dto.ingredientsMissing,
                        matchPercentage = dto.matchPercentage,
                        gastronomyScore = GastronomyScore(0.85f, 0.70f, 0.90f, 0.88f, dto.compositeScore),
                        whyRecommended = dto.whyRecommended,
                        nutrition = NutritionFacts(dto.calories, dto.proteinGrams, dto.carbsGrams, dto.fatGrams, dto.fibreGrams),
                        oneIngredientToUnlock = dto.oneIngredientToUnlock,
                        instructions = dto.instructions,
                        molecularPairingNotes = dto.molecularPairingNotes,
                        isSaved = true
                    )
                }
            } else {
                emptyList()
            }
        }
    }

    private fun getCuratedOfflineRecipes(): List<Recipe> = listOf(
        Recipe(
            id = "rec_paneer_tikka",
            title = "Paneer Tikka Masala Skillet",
            cuisine = "North Indian",
            diet = "Vegetarian",
            prepTimeMinutes = 15,
            cookTimeMinutes = 20,
            servings = 2,
            ingredientsAvailable = listOf("turmeric", "cumin", "garlic", "ginger"),
            ingredientsMissing = listOf("red chilli", "coriander"),
            matchPercentage = 0.67f,
            gastronomyScore = GastronomyScore(0.80f, 0.75f, 0.88f, 0.82f, 0.81f),
            whyRecommended = "Uses 75% of your pantry spices. Synergizes lactic diacetyl umami with eugenol and piperine aromatics.",
            nutrition = NutritionFacts(365, 17.5, 14.8, 26.2, 3.9),
            oneIngredientToUnlock = "red chilli",
            instructions = listOf(
                "Bloom cumin seeds and whole aromatics in hot ghee for 45 seconds.",
                "Add minced garlic, ginger, and diced tomatoes; simmer until oil separates.",
                "Fold in cubed paneer and simmer gently for 5 minutes."
            )
        ),
        Recipe(
            id = "rec_dal_tadka",
            title = "Homestyle Yellow Dal Tadka",
            cuisine = "North Indian",
            diet = "Vegetarian",
            prepTimeMinutes = 10,
            cookTimeMinutes = 25,
            servings = 3,
            ingredientsAvailable = listOf("turmeric", "cumin", "onion", "garlic", "salt"),
            ingredientsMissing = listOf("red chilli"),
            matchPercentage = 0.83f,
            gastronomyScore = GastronomyScore(0.90f, 0.85f, 0.85f, 0.90f, 0.88f),
            whyRecommended = "High-protein recovery fuel. Cuminaldehyde and allicin volatile release creates deep savory grounding.",
            nutrition = NutritionFacts(215, 11.8, 32.4, 4.5, 7.8),
            oneIngredientToUnlock = "red chilli",
            instructions = listOf(
                "Pressure cook yellow lentils with turmeric and salt until tender.",
                "Prepare tempering in hot ghee with cumin seeds and garlic.",
                "Pour aromatic tadka over simmering lentils."
            )
        )
    )
}

// ==============================================================================
// 3. Planner Repository
// ==============================================================================

class PlannerRepositoryImpl(
    private val database: DrishyamDatabase,
    private val apiService: DrishyamApiService
) : PlannerRepository {

    override fun getPlannedMeals(): Flow<List<PlannedMeal>> {
        return database.plannerDao().getAllPlannedMeals().map { list ->
            list.map { entity ->
                PlannedMeal(
                    id = entity.id,
                    planId = entity.planId,
                    date = entity.date,
                    mealType = runCatching { MealType.valueOf(entity.mealType.uppercase()) }.getOrDefault(MealType.DINNER),
                    position = entity.position,
                    recipeId = entity.recipeId,
                    customName = entity.customName,
                    calories = entity.calories,
                    proteinG = entity.proteinG,
                    carbsG = entity.carbsG,
                    fatG = entity.fatG,
                    isCompleted = entity.isCompleted,
                    version = entity.version
                )
            }
        }
    }

    override suspend fun addPlannedMeal(meal: PlannedMeal): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.plannerDao().insertOrUpdate(
                PlannedMealEntity(
                    id = meal.id,
                    planId = meal.planId,
                    date = meal.date,
                    mealType = meal.mealType.name.lowercase(),
                    position = meal.position,
                    recipeId = meal.recipeId,
                    customName = meal.customName,
                    calories = meal.calories,
                    proteinG = meal.proteinG,
                    carbsG = meal.carbsG,
                    fatG = meal.fatG,
                    isCompleted = meal.isCompleted,
                    version = 1,
                    isDeleted = false
                )
            )
            runCatching {
                apiService.addPlannedMeal(
                    planId = meal.planId,
                    meal = PlannedMealDto(
                        id = meal.id,
                        plan_id = meal.planId,
                        date = meal.date,
                        meal_type = meal.mealType.name.lowercase(),
                        position = meal.position,
                        recipe_id = meal.recipeId,
                        custom_name = meal.customName,
                        calories = meal.calories,
                        protein_g = meal.proteinG,
                        carbs_g = meal.carbsG,
                        fat_g = meal.fatG
                    )
                )
            }
            Unit
        }
    }

    override suspend fun updatePlannedMeal(meal: PlannedMeal): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.plannerDao().insertOrUpdate(
                PlannedMealEntity(
                    id = meal.id,
                    planId = meal.planId,
                    date = meal.date,
                    mealType = meal.mealType.name.lowercase(),
                    position = meal.position,
                    recipeId = meal.recipeId,
                    customName = meal.customName,
                    calories = meal.calories,
                    proteinG = meal.proteinG,
                    carbsG = meal.carbsG,
                    fatG = meal.fatG,
                    isCompleted = meal.isCompleted,
                    version = meal.version + 1,
                    isDeleted = false
                )
            )
            runCatching {
                apiService.updatePlannedMeal(
                    id = meal.id,
                    meal = PlannedMealDto(
                        id = meal.id,
                        plan_id = meal.planId,
                        date = meal.date,
                        meal_type = meal.mealType.name.lowercase(),
                        position = meal.position,
                        recipe_id = meal.recipeId,
                        custom_name = meal.customName,
                        calories = meal.calories,
                        protein_g = meal.proteinG,
                        carbs_g = meal.carbsG,
                        fat_g = meal.fatG
                    )
                )
            }
            Unit
        }
    }

    override suspend fun removePlannedMeal(id: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.plannerDao().markDeleted(id)
            runCatching { apiService.deletePlannedMeal(id) }
            Unit
        }
    }

    override suspend fun buildShoppingList(planId: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            apiService.buildShoppingFromPlan(planId)
            Unit
        }
    }
}

// ==============================================================================
// 4. Shopping Repository
// ==============================================================================

class ShoppingRepositoryImpl(
    private val database: DrishyamDatabase,
    private val apiService: DrishyamApiService
) : ShoppingRepository {

    override fun getShoppingList(): Flow<List<ShoppingItem>> {
        return database.shoppingDao().getAllShoppingItems().map { list ->
            list.map { entity ->
                ShoppingItem(
                    id = entity.id,
                    name = entity.name,
                    category = entity.category,
                    quantity = entity.quantity,
                    unit = entity.unit,
                    purchased = entity.purchased,
                    reason = entity.reason,
                    version = entity.version,
                    isDeleted = entity.isDeleted
                )
            }
        }
    }

    override suspend fun addShoppingItem(item: ShoppingItem): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.shoppingDao().insertOrUpdate(
                ShoppingItemEntity(
                    id = item.id,
                    name = item.name,
                    category = item.category,
                    quantity = item.quantity,
                    unit = item.unit,
                    purchased = item.purchased,
                    reason = item.reason,
                    version = 1,
                    isDeleted = false
                )
            )
            runCatching {
                apiService.addShoppingItem(
                    ShoppingItemDto(
                        id = item.id,
                        name = item.name,
                        category = item.category,
                        quantity = item.quantity,
                        unit = item.unit,
                        purchased = item.purchased,
                        reason = item.reason
                    )
                )
            }
            Unit
        }
    }

    override suspend fun togglePurchased(id: String, purchased: Boolean): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.shoppingDao().togglePurchased(id, purchased)
            runCatching {
                apiService.updateShoppingItem(
                    id = id,
                    item = ShoppingItemDto(id = id, name = "", purchased = purchased)
                )
            }
            Unit
        }
    }

    override suspend fun removeShoppingItem(id: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.shoppingDao().markDeleted(id)
            runCatching { apiService.deleteShoppingItem(id) }
            Unit
        }
    }
}

// ==============================================================================
// 5. Nutrition Repository
// ==============================================================================

class NutritionRepositoryImpl(
    private val database: DrishyamDatabase,
    private val apiService: DrishyamApiService
) : NutritionRepository {

    override suspend fun getTargets(): Result<NutritionalTargets> = withContext(Dispatchers.IO) {
        runCatching {
            val res = runCatching { apiService.getNutritionTargets() }.getOrNull()
            if (res != null && res.isSuccessful && res.body() != null) {
                res.body()!!
            } else {
                NutritionalTargets(
                    dailyCalories = 2200,
                    proteinGrams = 155.0,
                    carbsGrams = 240.0,
                    fatGrams = 65.0,
                    fibreGrams = 32.0,
                    goal = FitnessGoal.LEAN_BULK
                )
            }
        }
    }

    override suspend fun updateGoal(goal: FitnessGoal): Result<NutritionalTargets> = withContext(Dispatchers.IO) {
        getTargets().map { it.copy(goal = goal) }
    }

    override fun getMealLogs(): Flow<List<MealLog>> {
        return database.mealLogDao().getAllMealLogs().map { list ->
            list.map { entity ->
                MealLog(
                    id = entity.id,
                    date = entity.date,
                    mealType = runCatching { MealType.valueOf(entity.mealType.uppercase()) }.getOrDefault(MealType.LUNCH),
                    name = entity.name,
                    calories = entity.calories,
                    proteinG = entity.proteinG,
                    carbsG = entity.carbsG,
                    fatG = entity.fatG,
                    fibreG = entity.fibreG,
                    recipeId = entity.recipeId,
                    version = entity.version
                )
            }
        }
    }

    override suspend fun logMeal(meal: MealLog): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.mealLogDao().insertOrUpdate(
                MealLogEntity(
                    id = meal.id,
                    date = meal.date,
                    mealType = meal.mealType.name.lowercase(),
                    name = meal.name,
                    calories = meal.calories,
                    proteinG = meal.proteinG,
                    carbsG = meal.carbsG,
                    fatG = meal.fatG,
                    fibreG = meal.fibreG,
                    recipeId = meal.recipeId,
                    version = 1,
                    isDeleted = false
                )
            )
            runCatching {
                apiService.logMeal(
                    MealLogDto(
                        id = meal.id,
                        date = meal.date,
                        meal_type = meal.mealType.name.lowercase(),
                        name = meal.name,
                        servings = meal.servings,
                        calories = meal.calories,
                        protein_g = meal.proteinG,
                        carbs_g = meal.carbsG,
                        fat_g = meal.fatG,
                        fibre_g = meal.fibreG,
                        recipe_id = meal.recipeId
                    )
                )
            }
            Unit
        }
    }

    override suspend fun deleteMealLog(id: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            database.mealLogDao().markDeleted(id)
            runCatching { apiService.deleteMealLog(id) }
            Unit
        }
    }

    override suspend fun getSummary(date: String): Result<DailyNutritionSummary> = withContext(Dispatchers.IO) {
        runCatching {
            val res = runCatching { apiService.getNutritionSummary(date = date) }.getOrNull()
            if (res != null && res.isSuccessful && res.body() != null) {
                val dto = res.body()!!
                DailyNutritionSummary(
                    date = dto.date,
                    totalCalories = dto.total_calories,
                    totalProteinG = dto.total_protein_g,
                    totalCarbsG = dto.total_carbs_g,
                    totalFatG = dto.total_fat_g,
                    totalFibreG = dto.total_fibre_g,
                    targetCalories = dto.target_calories,
                    targetProteinG = dto.target_protein_g,
                    targetCarbsG = dto.target_carbs_g,
                    targetFatG = dto.target_fat_g
                )
            } else {
                DailyNutritionSummary(
                    date = date,
                    totalCalories = 1450,
                    totalProteinG = 110.0,
                    totalCarbsG = 160.0,
                    totalFatG = 42.0,
                    totalFibreG = 22.0
                )
            }
        }
    }
}

// ==============================================================================
// 6. Flavour Repository
// ==============================================================================

class FlavourRepositoryImpl(
    private val apiService: DrishyamApiService
) : FlavourRepository {

    override suspend fun getFlavourGraph(ingredients: List<String>): Result<FlavourGraphResponse> = withContext(Dispatchers.IO) {
        runCatching {
            val queryStr = if (ingredients.isNotEmpty()) ingredients.joinToString(",") else null
            val res = apiService.getFlavourGraph(queryStr)
            if (res.isSuccessful && res.body() != null) {
                res.body()!!
            } else {
                FlavourGraphResponse(emptyList(), emptyList())
            }
        }
    }
}

// ==============================================================================
// 7. Account Repository
// ==============================================================================

class AccountRepositoryImpl(
    private val apiService: DrishyamApiService
) : AccountRepository {

    override suspend fun getProfile(): Result<UserProfile> = withContext(Dispatchers.IO) {
        runCatching {
            val res = apiService.getProfile()
            if (res.isSuccessful && res.body() != null) {
                val dto = res.body()!!
                UserProfile(
                    id = "",
                    email = "",
                    age = dto.age,
                    gender = dto.gender,
                    heightCm = dto.height_cm,
                    weightKg = dto.weight_kg,
                    activityLevel = dto.activity_level,
                    experienceLevel = dto.experience_level,
                    kitchenEquipment = dto.kitchen_equipment,
                    version = dto.version
                )
            } else {
                UserProfile(id = "", email = "demo@drishyam.kitchen", age = 28, heightCm = 175f, weightKg = 72f)
            }
        }
    }

    override suspend fun updateProfile(profile: UserProfile): Result<UserProfile> = withContext(Dispatchers.IO) {
        runCatching {
            val dto = ProfileDto(
                age = profile.age,
                gender = profile.gender,
                height_cm = profile.heightCm,
                weight_kg = profile.weightKg,
                activity_level = profile.activityLevel,
                experience_level = profile.experienceLevel,
                kitchen_equipment = profile.kitchenEquipment,
                version = profile.version
            )
            val res = apiService.updateProfile(dto)
            if (res.isSuccessful && res.body() != null) {
                profile.copy(version = res.body()!!.version)
            } else {
                profile
            }
        }
    }

    override suspend fun getPreferences(): Result<UserPreferences> = withContext(Dispatchers.IO) {
        runCatching {
            val res = apiService.getPreferences()
            if (res.isSuccessful && res.body() != null) {
                val dto = res.body()!!
                UserPreferences(
                    lifestyle = dto.lifestyle,
                    restrictions = dto.restrictions,
                    allergies = dto.allergies,
                    version = dto.version
                )
            } else {
                UserPreferences()
            }
        }
    }

    override suspend fun updatePreferences(preferences: UserPreferences): Result<UserPreferences> = withContext(Dispatchers.IO) {
        runCatching {
            val dto = PreferencesDto(
                lifestyle = preferences.lifestyle,
                restrictions = preferences.restrictions,
                allergies = preferences.allergies,
                version = preferences.version
            )
            val res = apiService.updatePreferences(dto)
            if (res.isSuccessful && res.body() != null) {
                preferences.copy(version = res.body()!!.version)
            } else {
                preferences
            }
        }
    }

    override suspend fun getSettings(): Result<UserSettings> = withContext(Dispatchers.IO) {
        runCatching {
            val res = apiService.getSettings()
            if (res.isSuccessful && res.body() != null) {
                val dto = res.body()!!
                UserSettings(
                    soundEnabled = dto.sound_enabled,
                    hapticsEnabled = dto.haptics_enabled,
                    unitSystem = dto.unit_system,
                    reducedMotion = dto.reduced_motion,
                    version = dto.version
                )
            } else {
                UserSettings()
            }
        }
    }

    override suspend fun updateSettings(settings: UserSettings): Result<UserSettings> = withContext(Dispatchers.IO) {
        runCatching {
            val dto = SettingsDto(
                sound_enabled = settings.soundEnabled,
                haptics_enabled = settings.hapticsEnabled,
                unit_system = settings.unitSystem,
                reduced_motion = settings.reducedMotion,
                version = settings.version
            )
            val res = apiService.updateSettings(dto)
            if (res.isSuccessful && res.body() != null) {
                settings.copy(version = res.body()!!.version)
            } else {
                settings
            }
        }
    }
}

// ==============================================================================
// 8. Auth Repository
// ==============================================================================

class AuthRepositoryImpl(
    private val apiService: DrishyamApiService,
    private val tokenManager: TokenManager,
    private val database: DrishyamDatabase
) : AuthRepository {

    override suspend fun login(email: String, password: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            val res = apiService.login(AuthRequest(email = email, password = password))
            if (res.isSuccessful && res.body() != null) {
                val body = res.body()!!
                val accessToken = body.access_token
                val refreshToken = body.refresh_token
                if (accessToken != null && refreshToken != null) {
                    tokenManager.setTokens(accessToken, refreshToken)
                }
                Unit
            } else {
                error("Login failed: ${res.code()} ${res.message()}")
            }
        }
    }

    override suspend fun register(email: String, password: String, name: String?): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            val res = apiService.register(RegisterRequest(email = email, password = password, name = name))
            if (res.isSuccessful && res.body() != null) {
                val body = res.body()!!
                val accessToken = body.access_token
                val refreshToken = body.refresh_token
                if (accessToken != null && refreshToken != null) {
                    tokenManager.setTokens(accessToken, refreshToken)
                }
                Unit
            } else {
                error("Registration failed: ${res.code()} ${res.message()}")
            }
        }
    }

    override suspend fun loginDemo(): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            val res = apiService.loginDemo()
            if (res.isSuccessful && res.body() != null) {
                val body = res.body()!!
                val accessToken = body.access_token
                val refreshToken = body.refresh_token
                if (accessToken != null && refreshToken != null) {
                    tokenManager.setTokens(accessToken, refreshToken)
                }
                Unit
            } else {
                error("Demo login failed: ${res.code()} ${res.message()}")
            }
        }
    }

    override suspend fun logout(): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            runCatching { apiService.logout() }
            tokenManager.clearTokens()
            database.pantryDao().clearAll()
            database.outboxDao().clearAll()
            database.plannerDao().clearAll()
            database.shoppingDao().clearAll()
            database.mealLogDao().clearAll()
            Unit
        }
    }

    override suspend fun logoutAll(): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            runCatching { apiService.logoutAll() }
            tokenManager.clearTokens()
            database.pantryDao().clearAll()
            database.outboxDao().clearAll()
            database.plannerDao().clearAll()
            database.shoppingDao().clearAll()
            database.mealLogDao().clearAll()
            Unit
        }
    }

    override suspend fun forgotPassword(email: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            apiService.forgotPassword(ForgotPasswordRequest(email))
            Unit
        }
    }

    override suspend fun resetPassword(token: String, newPassword: String): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            apiService.resetPassword(ResetPasswordRequest(token = token, new_password = newPassword))
            Unit
        }
    }

    override fun isUserLoggedIn(): Boolean = tokenManager.isLoggedIn()
}
