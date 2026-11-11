package com.drishyam.core.designsystem.theme

import android.content.Context
import android.provider.Settings
import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.runtime.compositionLocalOf

val LocalReducedMotion = compositionLocalOf { false }

object DrishyamMotion {
    // Duration Tokens (§5.8)
    const val DurationInstantMs = 90
    const val DurationQuickMs = 180
    const val DurationStandardMs = 320
    const val DurationEmphasizedMs = 560

    // Easing Curves (§5.8)
    // Easing standard: cubic-bezier(.2, 0, 0, 1)
    val EasingStandard = CubicBezierEasing(0.2f, 0.0f, 0.0f, 1.0f)

    // Easing decelerate: cubic-bezier(.05, .7, .1, 1)
    val EasingDecelerate = CubicBezierEasing(0.05f, 0.7f, 0.1f, 1.0f)

    // Easing exit: cubic-bezier(.3, 0, .8, .15)
    val EasingExit = CubicBezierEasing(0.3f, 0.0f, 0.8f, 0.15f)

    // Gesture springs: Damping 0.8, medium-low stiffness (§5.8)
    fun <T> gestureSpring() = spring<T>(
        dampingRatio = 0.8f,
        stiffness = Spring.StiffnessMediumLow
    )

    /**
     * Inspects system ANIMATOR_DURATION_SCALE to determine if user requested reduced motion (§5.8).
     */
    fun isSystemReducedMotion(context: Context): Boolean {
        return try {
            val scale = Settings.Global.getFloat(
                context.contentResolver,
                Settings.Global.ANIMATOR_DURATION_SCALE,
                1.0f
            )
            scale == 0f
        } catch (_: Exception) {
            false
        }
    }
}

