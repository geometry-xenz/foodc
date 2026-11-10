package com.drishyam.core.ui

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.drishyam.core.designsystem.theme.BioCarbGold
import com.drishyam.core.designsystem.theme.BioFatCrimson
import com.drishyam.core.designsystem.theme.BioProteinGreen
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary

@Composable
fun MacroProgressRing(
    caloriesCurrent: Int,
    caloriesTarget: Int,
    proteinProgress: Float,
    carbProgress: Float,
    fatProgress: Float,
    modifier: Modifier = Modifier,
    size: Dp = 180.dp,
    strokeWidth: Dp = 10.dp
) {
    val animCalories = remember { Animatable(0f) }
    val animProtein = remember { Animatable(0f) }
    val animCarb = remember { Animatable(0f) }
    val animFat = remember { Animatable(0f) }

    val calProgress = (caloriesCurrent.toFloat() / caloriesTarget.coerceAtLeast(1).toFloat()).coerceIn(0f, 1f)

    LaunchedEffect(caloriesCurrent, proteinProgress) {
        animCalories.animateTo(calProgress, tween(900, easing = FastOutSlowInEasing))
        animProtein.animateTo(proteinProgress.coerceIn(0f, 1f), tween(1100, easing = FastOutSlowInEasing))
        animCarb.animateTo(carbProgress.coerceIn(0f, 1f), tween(1200, easing = FastOutSlowInEasing))
        animFat.animateTo(fatProgress.coerceIn(0f, 1f), tween(1300, easing = FastOutSlowInEasing))
    }

    Box(
        modifier = modifier.size(size),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.size(size)) {
            val strokePx = strokeWidth.toPx()
            val radius = (size.toPx() - strokePx) / 2
            val center = Offset(size.toPx() / 2, size.toPx() / 2)

            // Outer Base Ring (Track)
            drawCircle(
                color = SurfaceBorder,
                radius = radius,
                center = center,
                style = Stroke(strokePx)
            )

            // 1. Calorie Outer Ring (Molten Orange)
            drawArc(
                color = MoltenOrange,
                startAngle = -90f,
                sweepAngle = animCalories.value * 360f,
                useCenter = false,
                topLeft = Offset(strokePx / 2, strokePx / 2),
                size = Size(size.toPx() - strokePx, size.toPx() - strokePx),
                style = Stroke(strokePx, cap = StrokeCap.Round)
            )

            // 2. Protein Inner Concentric Arc (Green)
            val pInset = strokePx * 1.35f
            drawArc(
                color = BioProteinGreen,
                startAngle = -90f,
                sweepAngle = animProtein.value * 360f,
                useCenter = false,
                topLeft = Offset(strokePx / 2 + pInset, strokePx / 2 + pInset),
                size = Size(size.toPx() - strokePx - 2 * pInset, size.toPx() - strokePx - 2 * pInset),
                style = Stroke(strokePx * 0.75f, cap = StrokeCap.Round)
            )

            // 3. Carb Mid Concentric Arc (Gold)
            val cInset = strokePx * 2.35f
            drawArc(
                color = BioCarbGold,
                startAngle = -90f,
                sweepAngle = animCarb.value * 360f,
                useCenter = false,
                topLeft = Offset(strokePx / 2 + cInset, strokePx / 2 + cInset),
                size = Size(size.toPx() - strokePx - 2 * cInset, size.toPx() - strokePx - 2 * cInset),
                style = Stroke(strokePx * 0.75f, cap = StrokeCap.Round)
            )
        }

        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "$caloriesCurrent",
                color = TextPrimary,
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "of $caloriesTarget kcal",
                color = TextMuted,
                fontSize = 11.sp,
                fontFamily = FontFamily.Monospace
            )
        }
    }
}
