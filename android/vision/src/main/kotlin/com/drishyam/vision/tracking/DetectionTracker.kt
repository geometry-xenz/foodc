package com.drishyam.vision.tracking

import com.drishyam.core.model.BoundingBox
import com.drishyam.core.model.Detection
import com.drishyam.vision.postprocessing.PostProcessor

enum class TrackingState {
    IN_PROGRESS,
    STABLE,
    AWAITING_CONFIRMATION,
    CONFIRMED,
    UNCERTAIN
}

data class TrackedIngredient(
    val trackId: Int,
    var label: String,
    var confidence: Float,
    var box: BoundingBox,
    val firstDetectedTimestamp: Long,
    var lastSeenTimestamp: Long,
    var state: TrackingState = TrackingState.IN_PROGRESS,
    var signalPriority: Int = 1
)

class DetectionTracker(
    private val iouMatchThreshold: Float = 0.35f,
    private val maxFrameAgeMs: Long = 1200L,
    private val minConfidenceThreshold: Float = 0.75f, // §4: Confidence threshold >= 0.75
    private val minDurationGateMs: Long = 1000L        // §4: Minimum 1000 ms stability
) {
    private var nextTrackId = 1
    private val activeTracks = mutableMapOf<Int, TrackedIngredient>()

    @Synchronized
    fun update(
        rawDetections: List<Detection>,
        currentTimestamp: Long = System.currentTimeMillis()
    ): List<TrackedIngredient> {
        // 1. Filter out raw detections below 0.75 confidence (§4)
        val filteredRaw = rawDetections.filter { it.confidence >= minConfidenceThreshold }

        // 2. Remove stale tracks exceeding maxFrameAgeMs
        activeTracks.entries.removeIf { currentTimestamp - it.value.lastSeenTimestamp > maxFrameAgeMs }

        val unmatchedRaw = filteredRaw.toMutableList()

        // 3. Match with existing tracks using IoU
        activeTracks.values.forEach { track ->
            val match = unmatchedRaw.maxByOrNull { raw ->
                if (raw.label == track.label) PostProcessor.calculateIoU(raw.box, track.box) else 0f
            }

            if (match != null && PostProcessor.calculateIoU(match.box, track.box) >= iouMatchThreshold) {
                // Smooth bounding box interpolation (30% current + 70% measurement)
                track.box = BoundingBox(
                    left = track.box.left * 0.3f + match.box.left * 0.7f,
                    top = track.box.top * 0.3f + match.box.top * 0.7f,
                    right = track.box.right * 0.3f + match.box.right * 0.7f,
                    bottom = track.box.bottom * 0.3f + match.box.bottom * 0.7f
                )
                track.confidence = track.confidence * 0.3f + match.confidence * 0.7f
                track.lastSeenTimestamp = currentTimestamp

                // Check 1000 ms stability gate
                val duration = currentTimestamp - track.firstDetectedTimestamp
                if (track.confidence >= minConfidenceThreshold && duration >= minDurationGateMs) {
                    track.state = TrackingState.STABLE
                } else {
                    track.state = TrackingState.IN_PROGRESS
                }
                unmatchedRaw.remove(match)
            } else {
                // Decay or set uncertain if no frame match
                if (currentTimestamp - track.lastSeenTimestamp > 400L) {
                    track.state = TrackingState.UNCERTAIN
                }
            }
        }

        // 4. Create new tracks for unmatched detections
        unmatchedRaw.forEach { raw ->
            val newId = nextTrackId++
            activeTracks[newId] = TrackedIngredient(
                trackId = newId,
                label = raw.label,
                confidence = raw.confidence,
                box = raw.box,
                firstDetectedTimestamp = currentTimestamp,
                lastSeenTimestamp = currentTimestamp,
                state = TrackingState.IN_PROGRESS
            )
        }

        return activeTracks.values.toList()
    }

    @Synchronized
    fun markConfirmed(trackId: Int) {
        activeTracks[trackId]?.state = TrackingState.CONFIRMED
    }

    @Synchronized
    fun reset() {
        activeTracks.clear()
        nextTrackId = 1
    }
}
