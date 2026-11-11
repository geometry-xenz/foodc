package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
data class FlavourGraphNode(
    val id: String,
    val name: String,
    val node_type: String, // "ingredient" or "compound"
    val x: Float,
    val y: Float,
    val z: Float,
    val category: String? = null,
    val aroma_profile: String? = null,
    val degree: Int = 0
)

@Serializable
data class FlavourGraphEdge(
    val source: String,
    val target: String,
    val weight: Float = 1.0f
)

@Serializable
data class FlavourGraphResponse(
    val nodes: List<FlavourGraphNode>,
    val edges: List<FlavourGraphEdge>,
    val timestamp: String? = null
)
