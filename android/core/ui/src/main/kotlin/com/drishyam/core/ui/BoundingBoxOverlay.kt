package com.drishyam.core.ui

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Paint
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.nativeCanvas
import com.drishyam.core.designsystem.theme.BioProteinGreen
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.model.Detection

@Composable
fun BoundingBoxOverlay(
    detections: List<Detection>,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier.fillMaxSize()) {
        val canvasWidth = size.width
        val canvasHeight = size.height

        detections.forEach { detection ->
            // Map normalized coordinates [0..1] to canvas pixels
            val left = detection.box.left * canvasWidth
            val top = detection.box.top * canvasHeight
            val right = detection.box.right * canvasWidth
            val bottom = detection.box.bottom * canvasHeight
            val width = right - left
            val height = bottom - top

            val accentColor = if (detection.isStable) BioProteinGreen else MoltenOrange

            // 1. Draw rounded bounding frame
            drawRoundRect(
                color = accentColor,
                topLeft = Offset(left, top),
                size = Size(width, height),
                cornerRadius = CornerRadius(16f, 16f),
                style = Stroke(width = 4f)
            )

            // 2. Draw subtle corner brackets for premium tech HUD aesthetic
            val bracketLen = (width * 0.2f).coerceAtMost(36f)
            // Top-left
            drawLine(accentColor, Offset(left, top), Offset(left + bracketLen, top), 7f)
            drawLine(accentColor, Offset(left, top), Offset(left, top + bracketLen), 7f)
            // Top-right
            drawLine(accentColor, Offset(right, top), Offset(right - bracketLen, top), 7f)
            drawLine(accentColor, Offset(right, top), Offset(right, top + bracketLen), 7f)
            // Bottom-left
            drawLine(accentColor, Offset(left, bottom), Offset(left + bracketLen, bottom), 7f)
            drawLine(accentColor, Offset(left, bottom), Offset(left, bottom - bracketLen), 7f)
            // Bottom-right
            drawLine(accentColor, Offset(right, bottom), Offset(right - bracketLen, bottom), 7f)
            drawLine(accentColor, Offset(right, bottom), Offset(right, bottom - bracketLen), 7f)

            // 3. Draw Pill Label above bounding box
            val labelText = "${detection.label.uppercase()} ${((detection.confidence) * 100).toInt()}%"
            val textPaint = android.graphics.Paint().apply {
                color = android.graphics.Color.WHITE
                textSize = 32f
                isFakeBoldText = true
                isAntiAlias = true
            }

            val textBounds = android.graphics.Rect()
            textPaint.getTextBounds(labelText, 0, labelText.length, textBounds)
            val pillPadding = 16f
            val pillWidth = textBounds.width() + pillPadding * 2
            val pillHeight = textBounds.height() + pillPadding * 1.5f
            val pillTop = (top - pillHeight - 8f).coerceAtLeast(10f)

            // Background pill
            drawRoundRect(
                color = if (detection.isStable) Color(0xDD1B5E20) else Color(0xDD8A3800),
                topLeft = Offset(left, pillTop),
                size = Size(pillWidth, pillHeight),
                cornerRadius = CornerRadius(12f, 12f)
            )

            // Border
            drawRoundRect(
                color = accentColor,
                topLeft = Offset(left, pillTop),
                size = Size(pillWidth, pillHeight),
                cornerRadius = CornerRadius(12f, 12f),
                style = Stroke(width = 2f)
            )

            // Label text
            drawContext.canvas.nativeCanvas.drawText(
                labelText,
                left + pillPadding,
                pillTop + pillHeight - pillPadding * 0.6f,
                textPaint
            )
        }
    }
}
