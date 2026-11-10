package com.drishyam.domain.usecase

import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.Recipe
import com.drishyam.domain.repository.PantryRepository
import com.drishyam.domain.repository.RecipeRepository
import kotlinx.coroutines.flow.Flow

class GetPantryUseCase(private val repository: PantryRepository) {
    operator fun invoke(): Flow<List<Ingredient>> = repository.getPantry()
}

class ConfirmScannedIngredientUseCase(private val repository: PantryRepository) {
    suspend operator fun invoke(ingredient: Ingredient): Result<Unit> {
        return repository.addIngredient(ingredient.copy(confirmed = true))
    }
}

class RecommendRecipesUseCase(private val repository: RecipeRepository) {
    suspend operator fun invoke(diet: String? = null, goal: FitnessGoal? = null): Result<List<Recipe>> {
        return repository.getRecommendedRecipes(diet, goal)
    }
}
