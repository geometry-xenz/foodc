package com.drishyam.vision

import com.drishyam.core.model.BoundingBox
import com.drishyam.core.model.Detection
import com.drishyam.vision.mapping.BoxMapper
import com.drishyam.vision.mapping.ScaleMode
import com.drishyam.vision.ocr.OcrAliasMatcher
import com.drishyam.vision.tracking.DetectionTracker
import com.drishyam.vision.tracking.TrackingState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class ScannerPipelineTest {

    // ==============================================================================
    // 1. OCR Alias Matching (§4, S13)
    // ==============================================================================

    @Test
    fun `ocr alias matching recognizes MDH Haldi Powder 100g as turmeric`() {
        val result = OcrAliasMatcher.match("MDH Haldi Powder 100g")
        assertEquals("turmeric", result)
    }

    @Test
    fun `ocr alias matching recognizes devanagari jeera as cumin`() {
        val result = OcrAliasMatcher.match("शाही जीरा 50g")
        assertEquals("cumin", result)
    }

    @Test
    fun `ocr alias matching recognizes Garam Masala`() {
        val result = OcrAliasMatcher.match("Everest Garam Masala Blend")
        assertEquals("garam masala", result)
    }

    @Test
    fun `ocr alias matching rejects Chilli Sauce due to exclusion gate`() {
        val result = OcrAliasMatcher.match("Chilli Sauce Bottle 200ml")
        assertNull(result)
    }

    // ==============================================================================
    // 2. Confidence Gate: 0_749 rejected, 0_75 accepted (§4, S13)
    // ==============================================================================

    @Test
    fun `tracker rejects confidence of 0_749 and accepts confidence of 0_75`() {
        val tracker = DetectionTracker()
        val timestamp = 1000L

        // Detection with 0.749f
        val lowConfDetection = Detection(
            trackId = 1,
            label = "turmeric",
            confidence = 0.749f,
            box = BoundingBox(0.1f, 0.1f, 0.3f, 0.3f),
            firstDetectedTimestamp = timestamp,
            lastSeenTimestamp = timestamp
        )
        val lowResult = tracker.update(listOf(lowConfDetection), timestamp)
        assertTrue("Detection with confidence 0.749 must be rejected", lowResult.isEmpty())

        // Detection with 0.75f
        val validDetection = Detection(
            trackId = 2,
            label = "turmeric",
            confidence = 0.75f,
            box = BoundingBox(0.1f, 0.1f, 0.3f, 0.3f),
            firstDetectedTimestamp = timestamp,
            lastSeenTimestamp = timestamp
        )
        val validResult = tracker.update(listOf(validDetection), timestamp)
        assertEquals(1, validResult.size)
        assertEquals("turmeric", validResult[0].label)
    }

    // ==============================================================================
    // 3. 1,000 ms Temporal Stability Persistence Gate (S13)
    // ==============================================================================

    @Test
    fun `tracker requires 1000ms persistence before reaching STABLE state`() {
        val tracker = DetectionTracker()

        val t0 = 1000L
        val det0 = Detection(1, "cumin", 0.85f, BoundingBox(0.2f, 0.2f, 0.5f, 0.5f), t0, t0)
        val r0 = tracker.update(listOf(det0), t0)
        assertEquals(TrackingState.IN_PROGRESS, r0[0].state)

        // After 500ms (t=1500ms): still IN_PROGRESS
        val t1 = 1500L
        val det1 = Detection(1, "cumin", 0.85f, BoundingBox(0.2f, 0.2f, 0.5f, 0.5f), t1, t1)
        val r1 = tracker.update(listOf(det1), t1)
        assertEquals(TrackingState.IN_PROGRESS, r1[0].state)

        // After 1000ms (t=2000ms): reaches STABLE
        val t2 = 2000L
        val det2 = Detection(1, "cumin", 0.85f, BoundingBox(0.2f, 0.2f, 0.5f, 0.5f), t2, t2)
        val r2 = tracker.update(listOf(det2), t2)
        assertEquals(TrackingState.STABLE, r2[0].state)
    }

    // ==============================================================================
    // 4. Bounding Box Transformation Mapping (0°, 90°, 270° in FILL and FIT) (S13)
    // ==============================================================================

    @Test
    fun `box mapping transforms coordinates accurately at 0, 90, and 270 degrees`() {
        val initial = BoundingBox(0.2f, 0.3f, 0.6f, 0.8f)

        // 0 degrees FIT
        val box0Fit = BoxMapper.mapBox(initial, rotationDegrees = 0, scaleMode = ScaleMode.FIT)
        assertTrue(box0Fit.left >= 0f && box0Fit.right <= 1f)
        assertTrue(box0Fit.top >= 0f && box0Fit.bottom <= 1f)

        // 90 degrees FILL
        val box90Fill = BoxMapper.mapBox(initial, rotationDegrees = 90, scaleMode = ScaleMode.FILL)
        assertTrue(box90Fill.left >= 0f && box90Fill.right <= 1f)
        assertTrue(box90Fill.top >= 0f && box90Fill.bottom <= 1f)

        // 270 degrees FIT
        val box270Fit = BoxMapper.mapBox(initial, rotationDegrees = 270, scaleMode = ScaleMode.FIT)
        assertTrue(box270Fit.left >= 0f && box270Fit.right <= 1f)
        assertTrue(box270Fit.top >= 0f && box270Fit.bottom <= 1f)
    }
}
