package com.drishyam.data

import com.drishyam.core.model.FlavourGraphResponse
import com.drishyam.core.model.NutritionalTargets
import com.drishyam.core.model.SyncPushResponse
import com.drishyam.core.network.PantryItemDto
import com.drishyam.core.network.RecipeDto
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test

class SyncAndContractTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `pantry contract json deserialization matches specification`() {
        val payload = """
        [
            {
                "id": "c1f8d384-8df6-48c9-b7e1-88849b29cb11",
                "name": "turmeric",
                "category": "Powdered Spices",
                "quantity": 150.0,
                "unit": "g",
                "confidence": 0.98,
                "confirmed": true,
                "source": "android_scanner",
                "isAvailable": true,
                "version": 2
            }
        ]
        """.trimIndent()

        val items = json.decodeFromString<List<PantryItemDto>>(payload)
        assertEquals(1, items.size)
        val item = items[0]
        assertEquals("turmeric", item.name)
        assertEquals(150.0, item.quantity ?: 0.0, 0.001)
        assertEquals("android_scanner", item.source)
        assertEquals(2, item.version)
    }

    @Test
    fun `recipe contract json deserialization matches specification`() {
        val payload = """
        [
            {
                "id": "rec_paneer_tikka",
                "title": "Paneer Tikka Masala Skillet",
                "cuisine": "North Indian",
                "diet": "Vegetarian",
                "prepTimeMinutes": 15,
                "cookTimeMinutes": 20,
                "servings": 2,
                "imageUrl": "/images/recipes/paneer_tikka.webp",
                "ingredientsAvailable": ["turmeric", "cumin", "garlic"],
                "ingredientsMissing": ["red chilli"],
                "matchPercentage": 0.75,
                "compositeScore": 0.88,
                "whyRecommended": "Synergizes lactic diacetyl with eugenol.",
                "calories": 365,
                "proteinGrams": 17.5,
                "carbsGrams": 14.8,
                "fatGrams": 26.2,
                "fibreGrams": 3.9,
                "oneIngredientToUnlock": "red chilli",
                "instructions": ["Step 1 bloom", "Step 2 fold"],
                "isSaved": true
            }
        ]
        """.trimIndent()

        val recipes = json.decodeFromString<List<RecipeDto>>(payload)
        assertEquals(1, recipes.size)
        val r = recipes[0]
        assertEquals("rec_paneer_tikka", r.id)
        assertEquals(365, r.calories)
        assertEquals(17.5, r.proteinGrams, 0.01)
        assertTrue(r.isSaved)
    }

    @Test
    fun `sync push contract response deserialization handles applied and conflict`() {
        val payload = """
        {
            "results": [
                {
                    "op_id": "op-101",
                    "status": "applied",
                    "version": 3
                },
                {
                    "op_id": "op-102",
                    "status": "conflict",
                    "server_data": {
                        "id": "c1f8d384-8df6-48c9-b7e1-88849b29cb11",
                        "name": "turmeric",
                        "quantity": 200.0,
                        "version": 4
                    }
                }
            ]
        }
        """.trimIndent()

        val response = json.decodeFromString<SyncPushResponse>(payload)
        assertEquals(2, response.results.size)
        assertEquals("applied", response.results[0].status)
        assertEquals(3, response.results[0].version)

        assertEquals("conflict", response.results[1].status)
        assertNotNull(response.results[1].server_data)
    }

    @Test
    fun `flavour graph contract json deserialization preserves 3D deterministic coordinates`() {
        val payload = """
        {
            "nodes": [
                {
                    "id": "turmeric",
                    "name": "Turmeric",
                    "node_type": "ingredient",
                    "x": 0.45,
                    "y": -0.82,
                    "z": 0.33,
                    "category": "Powdered Spices",
                    "degree": 5
                },
                {
                    "id": "curcumin",
                    "name": "Curcumin",
                    "node_type": "compound",
                    "x": 0.22,
                    "y": -0.41,
                    "z": 0.16,
                    "aroma_profile": "Warm, earthy, peppery",
                    "degree": 2
                }
            ],
            "edges": [
                {
                    "source": "turmeric",
                    "target": "curcumin",
                    "weight": 1.0
                }
            ]
        }
        """.trimIndent()

        val graph = json.decodeFromString<FlavourGraphResponse>(payload)
        assertEquals(2, graph.nodes.size)
        assertEquals(1, graph.edges.size)
        assertEquals("turmeric", graph.nodes[0].id)
        assertEquals(0.45f, graph.nodes[0].x, 0.001f)
        assertEquals(-0.82f, graph.nodes[0].y, 0.001f)
        assertEquals(0.33f, graph.nodes[0].z, 0.001f)
    }

    @Test
    fun `nutrition targets deserialization supports all 8 goal formulations`() {
        val payload = """
        {
            "dailyCalories": 2450,
            "proteinGrams": 165.0,
            "carbsGrams": 270.0,
            "fatGrams": 75.0,
            "fibreGrams": 35.0,
            "goal": "LEAN_BULK",
            "bmr": 1780.0,
            "tdee": 2520.0
        }
        """.trimIndent()

        val targets = json.decodeFromString<NutritionalTargets>(payload)
        assertEquals(2450, targets.dailyCalories)
        assertEquals(165.0, targets.proteinGrams, 0.01)
        assertEquals(1780.0, targets.bmr, 0.01)
    }
}
