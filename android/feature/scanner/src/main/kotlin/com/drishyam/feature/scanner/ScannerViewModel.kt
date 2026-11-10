package com.drishyam.feature.scanner

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.drishyam.core.model.Detection
import com.drishyam.core.model.Ingredient
import com.drishyam.domain.usecase.ConfirmScannedIngredientUseCase
import com.drishyam.vision.accumulator.IngredientAccumulator
import com.drishyam.vision.tracking.DetectionTracker
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class ScannerUiState(
    val activeDetections: List<Detection> = emptyList(),
    val accumulatedIngredients: List<Ingredient> = emptyList(),
    val isTorchEnabled: Boolean = false,
    val isScanning: Boolean = true,
    val lastAddedMessage: String? = null
)

class ScannerViewModel(
    private val confirmIngredientUseCase: ConfirmScannedIngredientUseCase,
    private val tracker: DetectionTracker = DetectionTracker(),
    private val accumulator: IngredientAccumulator = IngredientAccumulator()
) : ViewModel() {

    private val _uiState = MutableStateFlow(ScannerUiState())
    val uiState: StateFlow<ScannerUiState> = _uiState.asStateFlow()

    init {
        viewModelScope.launch {
            accumulator.accumulatedIngredients.collect { ingredients ->
                _uiState.value = _uiState.value.copy(accumulatedIngredients = ingredients)
            }
        }
    }

    fun onRawDetectionsReceived(rawDetections: List<Detection>) {
        if (!_uiState.value.isScanning) return

        val tracked = tracker.update(rawDetections)
        _uiState.value = _uiState.value.copy(activeDetections = tracked)

        // Pass to accumulator
        accumulator.processConfirmedDetections(tracked)
    }

    fun confirmIngredient(ingredient: Ingredient) {
        viewModelScope.launch {
            confirmIngredientUseCase(ingredient)
            accumulator.removeIngredient(ingredient.id)
            _uiState.value = _uiState.value.copy(
                lastAddedMessage = "Added ${ingredient.displayName} to pantry"
            )
        }
    }

    fun removeAccumulated(ingredientId: String) {
        accumulator.removeIngredient(ingredientId)
    }

    fun toggleTorch() {
        _uiState.value = _uiState.value.copy(isTorchEnabled = !_uiState.value.isTorchEnabled)
    }

    fun dismissMessage() {
        _uiState.value = _uiState.value.copy(lastAddedMessage = null)
    }
}
