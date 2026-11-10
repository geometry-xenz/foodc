package com.drishyam.feature.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.NutritionalTargets
import com.drishyam.core.model.Recipe
import com.drishyam.domain.usecase.GetPantryUseCase
import com.drishyam.domain.usecase.RecommendRecipesUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class DashboardUiState(
    val userName: String = "Chef Suman",
    val activeGoal: FitnessGoal = FitnessGoal.LEAN_BULK,
    val targets: NutritionalTargets = NutritionalTargets(
        dailyCalories = 3230,
        proteinGrams = 148.0,
        carbsGrams = 410.0,
        fatGrams = 89.0,
        fibreGrams = 42.0,
        goal = FitnessGoal.LEAN_BULK
    ),
    val consumedCalories: Int = 215,
    val consumedProtein: Double = 11.8,
    val consumedCarbs: Double = 32.4,
    val consumedFat: Double = 4.5,
    val pantryItems: List<Ingredient> = emptyList(),
    val topRecipes: List<Recipe> = emptyList(),
    val unlockIngredient: String? = "red chilli",
    val isLoading: Boolean = false
)

class DashboardViewModel(
    private val getPantryUseCase: GetPantryUseCase,
    private val recommendRecipesUseCase: RecommendRecipesUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow(DashboardUiState())
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()

    init {
        loadData()
    }

    fun loadData() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)

            // Collect pantry
            launch {
                getPantryUseCase().collect { items ->
                    _uiState.value = _uiState.value.copy(pantryItems = items)
                }
            }

            // Fetch top recommended recipes
            recommendRecipesUseCase(goal = _uiState.value.activeGoal).onSuccess { recipes ->
                _uiState.value = _uiState.value.copy(
                    topRecipes = recipes.take(3),
                    isLoading = false
                )
            }.onFailure {
                _uiState.value = _uiState.value.copy(isLoading = false)
            }
        }
    }
}
