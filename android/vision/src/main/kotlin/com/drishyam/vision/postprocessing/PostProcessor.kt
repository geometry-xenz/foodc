package com.drishyam.vision.postprocessing

import com.drishyam.core.model.BoundingBox
import com.drishyam.core.model.Detection
import kotlin.math.max
import kotlin.math.min

object PostProcessor {

    fun calculateIoU(a: BoundingBox, b: BoundingBox): Float {
        val interLeft = max(a.left, b.left)
        val interTop = max(a.top, b.top)
        val interRight = min(a.right, b.right)
        val interBottom = min(a.bottom, b.bottom)

        val interArea = max(0f, interRight - interLeft) * max(0f, interBottom - interTop)
        val areaA = a.width * a.height
        val areaB = b.width * b.height

        val unionArea = areaA + areaB - interArea
        return if (unionArea <= 0f) 0f else interArea / unionArea
    }

    fun applyNms(
        detections: List<Detection>,
        iouThreshold: Float = 0.45f
    ): List<Detection> {
        if (detections.isEmpty()) return emptyList()

        val sorted = detections.sortedByDescending { it.confidence }.toMutableList()
        val result = mutableListOf<Detection>()

        while (sorted.isNotEmpty()) {
            val highest = sorted.removeAt(0)
            result.add(highest)

            val iterator = sorted.iterator()
            while (iterator.hasNext()) {
                val current = iterator.next()
                if (highest.label == current.label && calculateIoU(highest.box, current.box) > iouThreshold) {
                    iterator.remove()
                }
            }
        }
        return result
    }
}
