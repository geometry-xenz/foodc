package com.drishyam.vision.tracking

import com.drishyam.core.model.BoundingBox
import com.drishyam.core.model.Detection
import com.drishyam.vision.postprocessing.PostProcessor

class DetectionTracker(
    private val iouMatchThreshold: Float = 0.35f,
    private val maxFrameAgeMs: Long = 1200L,
    private val minConfidence: Float = 0.75f,
    private val minDurationMs: Long = 1000L
) {
    private var nextTrackId = 1
    private val activeTracks = mutableMapOf<Int, TrackEntry>()

    data class TrackEntry(
        val trackId: Int,
        var label: String,
        var confidence: Float,
        var box: BoundingBox,
        val firstDetectedTimestamp: Long,
        var lastSeenTimestamp: Long,
        var isConfirmed: Boolean = false
    )

    @Synchronized
    fun update(rawDetections: List<Detection>, currentTimestamp: Long = System.currentTimeMillis()): List<Detection> {
        // Remove stale tracks
        activeTracks.entries.removeIf { currentTimestamp - it.value.lastSeenTimestamp > maxFrameAgeMs }

        val unmatchedRaw = rawDetections.toMutableList()

        // Match raw detections with existing active tracks
        activeTracks.values.forEach { track ->
            val match = unmatchedRaw.maxByOrNull { raw ->
                if (raw.label == track.label) PostProcessor.calculateIoU(raw.box, track.box) else 0f
            }

            if (match != null && PostProcessor.calculateIoU(match.box, track.box) >= iouMatchThreshold) {
                // Update track with smooth box interpolation
                track.box = BoundingBox(
                    left = track.box.left * 0.3f + match.box.left * 0.7f,
                    top = track.box.top * 0.3f + match.box.top * 0.7f,
                    right = track.box.right * 0.3f + match.box.right * 0.7f,
                    bottom = track.box.bottom * 0.3f + match.box.bottom * 0.7f
                )
                track.confidence = track.confidence * 0.3f + match.confidence * 0.7f
                track.lastSeenTimestamp = currentTimestamp

                // Check temporal stabilization gate (>75% conf for >= 1.0s)
                val duration = currentTimestamp - track.firstDetectedTimestamp
                if (track.confidence >= minConfidence && duration >= minDurationMs) {
                    track.isConfirmed = true
                }
                unmatchedRaw.remove(match)
            }
        }

        // Create new tracks for remaining unmatched detections
        unmatchedRaw.forEach { raw ->
            val newId = nextTrackId++
            activeTracks[newId] = TrackEntry(
                trackId = newId,
                label = raw.label,
                confidence = raw.confidence,
                box = raw.box,
                firstDetectedTimestamp = currentTimestamp,
                lastSeenTimestamp = currentTimestamp,
                isConfirmed = false
            )
        }

        return activeTracks.values.map {
            Detection(
                trackId = it.trackId,
                label = it.label,
                confidence = it.confidence,
                box = it.box,
                firstDetectedTimestamp = it.firstDetectedTimestamp,
                lastSeenTimestamp = it.lastSeenTimestamp,
                isConfirmed = it.isConfirmed
            )
        }
    }

    @Synchronized
    fun reset() {
        activeTracks.clear()
        nextTrackId = 1
    }
}
