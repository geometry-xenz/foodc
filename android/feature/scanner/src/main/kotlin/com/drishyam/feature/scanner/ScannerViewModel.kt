package com.drishyam.feature.scanner

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.drishyam.core.model.BoundingBox
import com.drishyam.core.model.Detection
import com.drishyam.core.model.Ingredient
import com.drishyam.domain.usecase.ConfirmScannedIngredientUseCase
import com.drishyam.vision.accumulator.IngredientAccumulator
import com.drishyam.vision.ocr.OcrAliasMatcher
import com.drishyam.vision.tracking.DetectionTracker
import com.drishyam.vision.tracking.TrackingState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class ScannerUiState(
    val activeDetections: List<Detection> = emptyList(),
    val accumulatedIngredients: List<Ingredient> = emptyList(),
    val isTorchEnabled: Boolean = false,
    val isFrontCamera: Boolean = false,
    val isFrozen: Boolean = false,
    val isScanning: Boolean = true,
    val showConsentSheet: Boolean = false,
    val isDeepInspectLoading: Boolean = false,
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

    fun onRawDetectionsReceived(rawDetections: List<Detection>, timestamp: Long = System.currentTimeMillis()) {
        if (!_uiState.value.isScanning || _uiState.value.isFrozen) return

        val tracked = tracker.update(rawDetections, timestamp)
        val detections = tracked.map {
            Detection(
                trackId = it.trackId,
                label = it.label,
                confidence = it.confidence,
                box = it.box,
                firstDetectedTimestamp = it.firstDetectedTimestamp,
                lastSeenTimestamp = it.lastSeenTimestamp,
                isConfirmed = it.state == TrackingState.STABLE || it.state == TrackingState.CONFIRMED
            )
        }
        _uiState.value = _uiState.value.copy(activeDetections = detections)

        // Pass to accumulator
        accumulator.processTrackedIngredients(tracked)
    }

    /**
     * Signal 1: Label OCR processor
     * Matches raw camera frame OCR text against the bilingual alias dictionary
     */
    fun onOcrTextDetected(ocrText: String, box: BoundingBox = BoundingBox(0.2f, 0.3f, 0.8f, 0.7f), timestamp: Long = System.currentTimeMillis()) {
        if (!_uiState.value.isScanning || _uiState.value.isFrozen) return

        val matchedCanonical = OcrAliasMatcher.match(ocrText)
        if (matchedCanonical != null) {
            val ocrDetection = Detection(
                trackId = 0,
                label = matchedCanonical,
                confidence = 0.96f, // OCR has highest confidence precision (§4)
                box = box,
                firstDetectedTimestamp = timestamp,
                lastSeenTimestamp = timestamp
            )
            onRawDetectionsReceived(listOf(ocrDetection), timestamp)
        }
    }

    fun onDeepInspectCandidatesReceived(candidates: List<Pair<String, Float>>) {
        candidates.forEach { (name, conf) ->
            accumulator.addManualCandidate(name, conf)
        }
        _uiState.value = _uiState.value.copy(
            isDeepInspectLoading = false,
            showConsentSheet = false,
            lastAddedMessage = "Deep Inspect identified ${candidates.size} ingredients"
        )
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

    fun confirmAllAccumulated() {
        viewModelScope.launch {
            val items = _uiState.value.accumulatedIngredients
            items.forEach { ing ->
                confirmIngredientUseCase(ing)
            }
            accumulator.clear()
            _uiState.value = _uiState.value.copy(
                lastAddedMessage = "Confirmed ${items.size} ingredients to pantry"
            )
        }
    }

    fun removeAccumulated(ingredientId: String) {
        accumulator.removeIngredient(ingredientId)
    }

    fun addManualIngredient(name: String) {
        if (name.isNotBlank()) {
            accumulator.addManualCandidate(name.trim().lowercase(), 1.0f)
        }
    }

    fun toggleTorch() {
        _uiState.value = _uiState.value.copy(isTorchEnabled = !_uiState.value.isTorchEnabled)
    }

    fun toggleCamera() {
        _uiState.value = _uiState.value.copy(isFrontCamera = !_uiState.value.isFrontCamera)
    }

    fun toggleFreeze() {
        _uiState.value = _uiState.value.copy(isFrozen = !_uiState.value.isFrozen)
    }

    fun setConsentSheetVisible(visible: Boolean) {
        _uiState.value = _uiState.value.copy(showConsentSheet = visible)
    }

    fun setDeepInspectLoading(loading: Boolean) {
        _uiState.value = _uiState.value.copy(isDeepInspectLoading = loading)
    }

    fun dismissMessage() {
        _uiState.value = _uiState.value.copy(lastAddedMessage = null)
    }
}
