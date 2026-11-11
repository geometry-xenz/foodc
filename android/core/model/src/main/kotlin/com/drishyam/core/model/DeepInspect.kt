package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
data class DeepInspectCandidate(
    val canonical_name: String,
    val display_name: String,
    val category: String,
    val confidence: Float,
    val reasoning: String? = null
)

@Serializable
data class DeepInspectResponse(
    val candidates: List<DeepInspectCandidate>,
    val provider: String,
    val processing_ms: Long? = null
)
