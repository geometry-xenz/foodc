package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
data class BoundingBox(
    val left: Float,
    val top: Float,
    val right: Float,
    val bottom: Float
) {
    val width: Float get() = right - left
    val height: Float get() = bottom - top
    val centerX: Float get() = (left + right) / 2f
    val centerY: Float get() = (top + bottom) / 2f
}

@Serializable
data class Detection(
    val trackId: Int,
    val label: String,
    val confidence: Float,
    val box: BoundingBox,
    val firstDetectedTimestamp: Long,
    val lastSeenTimestamp: Long,
    val isConfirmed: Boolean = false
) {
    val durationVisibleMs: Long get() = lastSeenTimestamp - firstDetectedTimestamp
    val isStable: Boolean get() = confidence >= 0.75f && durationVisibleMs >= 1000L
}
