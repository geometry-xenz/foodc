package com.drishyam.vision.accumulator

import com.drishyam.core.model.Detection
import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.IngredientCategory
import com.drishyam.core.model.IngredientSource
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
        "mustard seeds" to IngredientCategory.WHOLE_SPICES,
        "clove" to IngredientCategory.WHOLE_SPICES,
        "cloves" to IngredientCategory.WHOLE_SPICES,
        "cardamom" to IngredientCategory.WHOLE_SPICES,
        "cinnamon" to IngredientCategory.WHOLE_SPICES,
        "salt" to IngredientCategory.PANTRY_STAPLES,
        "onion" to IngredientCategory.FRESH_PRODUCE,
        "tomato" to IngredientCategory.FRESH_PRODUCE,
        "garlic" to IngredientCategory.FRESH_PRODUCE,
        "ginger" to IngredientCategory.FRESH_PRODUCE,
        "green chilli" to IngredientCategory.FRESH_PRODUCE,
        "paneer" to IngredientCategory.DAIRY,
        "rice" to IngredientCategory.GRAINS
    )

    @Synchronized
    fun processConfirmedDetections(stableDetections: List<Detection>) {
        val currentList = _accumulatedIngredients.value.toMutableList()

        stableDetections.filter { it.isConfirmed }.forEach { detection ->
            val normalizedLabel = detection.label.lowercase().trim()
            val alreadyExists = currentList.any { it.canonicalName.equals(normalizedLabel, ignoreCase = true) }

            if (!alreadyExists) {
                val category = canonicalClassCategories[normalizedLabel] ?: IngredientCategory.SPICES
                val newIngredient = Ingredient(
                    id = UUID.randomUUID().toString(),
                    canonicalName = normalizedLabel,
                    displayName = normalizedLabel.replaceFirstChar { it.uppercase() },
                    category = category,
                    source = IngredientSource.ANDROID_EDGE_CAMERA,
                    confidence = detection.confidence,
                    confirmed = true
                )
                currentList.add(newIngredient)
            }
        }

        _accumulatedIngredients.value = currentList
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
