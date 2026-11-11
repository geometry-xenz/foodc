package com.drishyam.vision.mapping

import com.drishyam.core.model.BoundingBox

enum class ScaleMode {
    FILL, // Center crop
    FIT   // Letterboxed
}

object BoxMapper {

    /**
     * Transforms normalized coordinates from image coordinate space (0..1)
     * to view coordinate space (0..1) considering rotation degrees and scale mode.
     */
    fun mapBox(
        box: BoundingBox,
        rotationDegrees: Int = 0,
        scaleMode: ScaleMode = ScaleMode.FILL,
        imageAspectRatio: Float = 4f / 3f,
        viewAspectRatio: Float = 16f / 9f
    ): BoundingBox {
        // 1. Rotate normalized coordinates
        val (rLeft, rTop, rRight, rBottom) = when ((rotationDegrees % 360 + 360) % 360) {
            90 -> {
                val left = 1f - box.bottom
                val top = box.left
                val right = 1f - box.top
                val bottom = box.right
                BoundingBox(left, top, right, bottom)
            }
            180 -> {
                val left = 1f - box.right
                val top = 1f - box.bottom
                val right = 1f - box.left
                val bottom = 1f - box.top
                BoundingBox(left, top, right, bottom)
            }
            270 -> {
                val left = box.top
                val top = 1f - box.right
                val right = box.bottom
                val bottom = 1f - box.left
                BoundingBox(left, top, right, bottom)
            }
            else -> box
        }

        // 2. Adjust for aspect ratio scale mode (FIT vs FILL)
        val (finalLeft, finalTop, finalRight, finalBottom) = when (scaleMode) {
            ScaleMode.FILL -> {
                // In fill mode, image is cropped to cover view
                if (imageAspectRatio > viewAspectRatio) {
                    val scale = imageAspectRatio / viewAspectRatio
                    val offset = (1f - 1f / scale) / 2f
                    BoundingBox(
                        left = (rLeft - offset) * scale,
                        top = rTop,
                        right = (rRight - offset) * scale,
                        bottom = rBottom
                    )
                } else {
                    val scale = viewAspectRatio / imageAspectRatio
                    val offset = (1f - 1f / scale) / 2f
                    BoundingBox(
                        left = rLeft,
                        top = (rTop - offset) * scale,
                        right = rRight,
                        bottom = (rBottom - offset) * scale
                    )
                }
            }
            ScaleMode.FIT -> {
                // In fit mode, image is scaled inside view with letterboxing
                if (imageAspectRatio > viewAspectRatio) {
                    val scale = viewAspectRatio / imageAspectRatio
                    val offset = (1f - scale) / 2f
                    BoundingBox(
                        left = rLeft,
                        top = rTop * scale + offset,
                        right = rRight,
                        bottom = rBottom * scale + offset
                    )
                } else {
                    val scale = imageAspectRatio / viewAspectRatio
                    val offset = (1f - scale) / 2f
                    BoundingBox(
                        left = rLeft * scale + offset,
                        top = rTop,
                        right = rRight * scale + offset,
                        bottom = rBottom
                    )
                }
            }
        }

        return BoundingBox(
            left = finalLeft.coerceIn(0f, 1f),
            top = finalTop.coerceIn(0f, 1f),
            right = finalRight.coerceIn(0f, 1f),
            bottom = finalBottom.coerceIn(0f, 1f)
        )
    }
}
