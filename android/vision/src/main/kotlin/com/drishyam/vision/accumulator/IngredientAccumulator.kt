package com.drishyam.vision.accumulator

import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.IngredientCategory
import com.drishyam.core.model.IngredientSource
import com.drishyam.vision.tracking.TrackedIngredient
import com.drishyam.vision.tracking.TrackingState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.UUID

class IngredientAccumulator {

    private val _accumulatedIngredients = MutableStateFlow<List<Ingredient>>(emptyList())
    val accumulatedIngredients: StateFlow<List<Ingredient>> = _accumulatedIngredients.asStateFlow()

    private val canonicalClassCategories = mapOf(
        "turmeric" to IngredientCategory.SPICES,
        "chilli" to IngredientCategory.SPICES,
        "red chilli" to IngredientCategory.SPICES,
        "cumin" to IngredientCategory.WHOLE_SPICES,
        "coriander" to IngredientCategory.SPICES,
        "garam masala" to IngredientCategory.SPICES,
        "mustard seeds" to IngredientCategory.WHOLE_SPICES,
        "clove" to IngredientCategory.WHOLE_SPICES,
        "cloves" to IngredientCategory.WHOLE_SPICES,
        "cardamom" to IngredientCategory.WHOLE_SPICES,
        "cinnamon" to IngredientCategory.WHOLE_SPICES,
        "fenugreek" to IngredientCategory.WHOLE_SPICES,
        "asafoetida" to IngredientCategory.SPICES,
        "carom seeds" to IngredientCategory.WHOLE_SPICES,
        "fennel seeds" to IngredientCategory.WHOLE_SPICES,
        "salt" to IngredientCategory.PANTRY_STAPLES,
        "onion" to IngredientCategory.FRESH_PRODUCE,
        "tomato" to IngredientCategory.FRESH_PRODUCE,
        "garlic" to IngredientCategory.FRESH_PRODUCE,
        "ginger" to IngredientCategory.FRESH_PRODUCE,
        "paneer" to IngredientCategory.DAIRY,
        "rice" to IngredientCategory.GRAINS
    )

    @Synchronized
    fun processTrackedIngredients(tracked: List<TrackedIngredient>) {
        val currentList = _accumulatedIngredients.value.toMutableList()

        // Filter stable or confirmed detections
        tracked.filter { it.state == TrackingState.STABLE || it.state == TrackingState.CONFIRMED }
            .forEach { item ->
                val normalized = item.label.lowercase().trim()
                val exists = currentList.any { it.canonicalName.equals(normalized, ignoreCase = true) }

                if (!exists) {
                    val category = canonicalClassCategories[normalized] ?: IngredientCategory.SPICES
                    val newIngredient = Ingredient(
                        id = UUID.randomUUID().toString(),
                        canonicalName = normalized,
                        displayName = normalized.replaceFirstChar { it.uppercase() },
                        category = category,
                        quantity = 100.0,
                        unit = "g",
                        source = IngredientSource.ANDROID_EDGE_CAMERA,
                        confidence = item.confidence,
                        confirmed = false
                    )
                    currentList.add(newIngredient)
                }
            }

        _accumulatedIngredients.value = currentList
    }

    @Synchronized
    fun addManualCandidate(canonicalName: String, confidence: Float = 1.0f) {
        val currentList = _accumulatedIngredients.value.toMutableList()
        val normalized = canonicalName.lowercase().trim()
        val exists = currentList.any { it.canonicalName.equals(normalized, ignoreCase = true) }

        if (!exists) {
            val category = canonicalClassCategories[normalized] ?: IngredientCategory.SPICES
            val newIngredient = Ingredient(
                id = UUID.randomUUID().toString(),
                canonicalName = normalized,
                displayName = normalized.replaceFirstChar { it.uppercase() },
                category = category,
                quantity = 100.0,
                unit = "g",
                source = IngredientSource.ANDROID_EDGE_CAMERA,
                confidence = confidence,
                confirmed = true
            )
            currentList.add(newIngredient)
            _accumulatedIngredients.value = currentList
        }
    }

    @Synchronized
    fun removeIngredient(id: String) {
        _accumulatedIngredients.value = _accumulatedIngredients.value.filterNot { it.id == id }
    }

    @Synchronized
    fun clear() {
        _accumulatedIngredients.value = emptyList()
    }
}
