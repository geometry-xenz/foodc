package com.drishyam.vision.inference

import android.graphics.Bitmap
import com.drishyam.core.model.Detection

interface IngredientDetector {
    suspend fun initialize(): Result<Unit>
    suspend fun detect(frame: Bitmap): List<Detection>
    suspend fun close()
}
