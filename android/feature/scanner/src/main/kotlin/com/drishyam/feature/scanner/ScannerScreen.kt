package com.drishyam.feature.scanner

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Cameraswitch
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.FlashOn
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Snackbar
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.drishyam.core.designsystem.theme.BioProteinGreen
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.SurfaceCard
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.core.ui.BoundingBoxOverlay
import com.drishyam.core.ui.DrishyamButton
import com.drishyam.core.ui.IngredientChip

@Composable
fun ScannerScreen(
    viewModel: ScannerViewModel,
    onNavigateBack: () -> Unit,
    onNavigateToPantry: () -> Unit,
    modifier: Modifier = Modifier
) {
    val state by viewModel.uiState.collectAsState()
    var manualInputText by remember { mutableStateOf("") }
    var showManualInputDialog by remember { mutableStateOf(false) }

    Box(modifier = modifier.fillMaxSize().background(ObsidianBlack)) {
        // 1. Camera Preview Placeholder / Surface
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF0F0F0F))
        )

        // 2. HUD Computer Vision Bounding Box Overlay
        BoundingBoxOverlay(
            detections = state.activeDetections,
            modifier = Modifier.fillMaxSize()
        )

        // 3. Top Status & Controls Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 48.dp, start = 16.dp, end = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onNavigateBack,
                modifier = Modifier
                    .clip(CircleShape)
                    .background(Color(0x80000000))
                    .border(1.dp, SurfaceBorder, CircleShape)
            ) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextPrimary)
            }

            // Central Telemetry Pill
            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0xCC111111))
                    .border(1.dp, SurfaceBorder, RoundedCornerShape(20.dp))
                    .padding(horizontal = 14.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(modifier = Modifier.size(8.dp).background(BioProteinGreen, CircleShape))
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = if (state.isFrozen) "FRAME FROZEN" else "EDGE VISION 30 FPS",
                    color = if (state.isFrozen) MoltenOrange else TextPrimary,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
            }

            Row {
                // Freeze frame button
                IconButton(
                    onClick = { viewModel.toggleFreeze() },
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(if (state.isFrozen) MoltenOrange.copy(alpha = 0.3f) else Color(0x80000000))
                        .border(1.dp, if (state.isFrozen) MoltenOrange else SurfaceBorder, CircleShape)
                ) {
                    Icon(
                        if (state.isFrozen) Icons.Default.PlayArrow else Icons.Default.Pause,
                        contentDescription = "Freeze",
                        tint = if (state.isFrozen) MoltenOrange else TextPrimary
                    )
                }

                Spacer(modifier = Modifier.width(6.dp))

                // Switch Camera
                IconButton(
                    onClick = { viewModel.toggleCamera() },
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(Color(0x80000000))
                        .border(1.dp, SurfaceBorder, CircleShape)
                ) {
                    Icon(Icons.Default.Cameraswitch, contentDescription = "Switch Camera", tint = TextPrimary)
                }

                Spacer(modifier = Modifier.width(6.dp))

                // Torch
                IconButton(
                    onClick = { viewModel.toggleTorch() },
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(if (state.isTorchEnabled) MoltenOrange.copy(alpha = 0.3f) else Color(0x80000000))
                        .border(1.dp, if (state.isTorchEnabled) MoltenOrange else SurfaceBorder, CircleShape)
                ) {
                    Icon(
                        Icons.Default.FlashOn,
                        contentDescription = "Torch",
                        tint = if (state.isTorchEnabled) MoltenOrange else TextPrimary
                    )
                }
            }
        }

        // 4. Bottom Ingredient Accumulator Tray
        Column(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                .background(SurfaceCard.copy(alpha = 0.95f))
                .border(1.dp, SurfaceBorder, RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
                .padding(20.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "LIVE INGREDIENT TRAY",
                        color = MoltenOrange,
                        fontSize = 11.sp,
                        fontFamily = FontFamily.Monospace,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "${state.accumulatedIngredients.size} items confirmed (>75% / 1.0s)",
                        color = TextSecondary,
                        fontSize = 13.sp
                    )
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    // Deep Inspect button (§4, §21)
                    IconButton(onClick = { viewModel.setConsentSheetVisible(true) }) {
                        Icon(Icons.Default.Visibility, contentDescription = "Deep Inspect", tint = MoltenOrange)
                    }

                    // Manual Add button
                    IconButton(onClick = { showManualInputDialog = true }) {
                        Icon(Icons.Default.Add, contentDescription = "Add manual ingredient", tint = TextSecondary)
                    }

                    if (state.accumulatedIngredients.isNotEmpty()) {
                        Spacer(modifier = Modifier.width(4.dp))
                        DrishyamButton(
                            text = "Confirm All ➔",
                            onClick = {
                                viewModel.confirmAllAccumulated()
                                onNavigateToPantry()
                            }
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            if (state.accumulatedIngredients.isEmpty()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(60.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Point camera at spice labels, produce or jars...",
                        color = TextMuted,
                        fontSize = 13.sp
                    )
                }
            } else {
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    items(state.accumulatedIngredients) { ingredient ->
                        IngredientChip(
                            name = ingredient.displayName,
                            isConfirmed = ingredient.confirmed,
                            confidence = ingredient.confidence,
                            onRemove = { viewModel.removeAccumulated(ingredient.id) }
                        )
                    }
                }
            }
        }

        // 5. Deep Inspect Consent Dialog (§21)
        if (state.showConsentSheet) {
            AlertDialog(
                onDismissRequest = { viewModel.setConsentSheetVisible(false) },
                icon = { Icon(Icons.Default.Info, contentDescription = null, tint = MoltenOrange) },
                title = { Text("Deep Inspect Cloud Vision", color = TextPrimary) },
                text = {
                    Column {
                        Text(
                            text = "Deep Inspect takes a single frame and submits it to cloud vision models for multi-ingredient identification.",
                            color = TextSecondary,
                            fontSize = 13.sp
                        )
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = "Privacy Disclosure (§21): The image is processed ephemerally in server memory and is never saved, retained, or used for training. Max 10 requests/minute.",
                            color = TextMuted,
                            fontSize = 11.sp,
                            lineHeight = 16.sp
                        )
                    }
                },
                confirmButton = {
                    Button(
                        onClick = {
                            viewModel.setDeepInspectLoading(true)
                            // Simulate returned candidates from /api/scan/deep-inspect
                            viewModel.onDeepInspectCandidatesReceived(
                                listOf(
                                    Pair("turmeric", 0.95f),
                                    Pair("cumin", 0.92f),
                                    Pair("garam masala", 0.88f)
                                )
                            )
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange)
                    ) {
                        Text("I Consent — Analyze", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { viewModel.setConsentSheetVisible(false) }) {
                        Text("Cancel", color = TextSecondary)
                    }
                },
                containerColor = DeepCharcoal
            )
        }

        // 6. Manual Ingredient Input Dialog
        if (showManualInputDialog) {
            AlertDialog(
                onDismissRequest = { showManualInputDialog = false },
                title = { Text("Quick Add Ingredient", color = TextPrimary) },
                text = {
                    OutlinedTextField(
                        value = manualInputText,
                        onValueChange = { manualInputText = it },
                        placeholder = { Text("e.g. Cardamom, Turmeric, Tomato") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                },
                confirmButton = {
                    Button(
                        onClick = {
                            viewModel.addManualIngredient(manualInputText)
                            manualInputText = ""
                            showManualInputDialog = false
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange)
                    ) {
                        Text("Add", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showManualInputDialog = false }) {
                        Text("Cancel", color = TextSecondary)
                    }
                },
                containerColor = DeepCharcoal
            )
        }

        // 7. Toast Notification
        state.lastAddedMessage?.let { msg ->
            Snackbar(
                modifier = Modifier
                    .align(Alignment.TopCenter)
                    .padding(top = 100.dp, start = 20.dp, end = 20.dp),
                containerColor = SurfaceCard,
                contentColor = BioProteinGreen
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Check, contentDescription = null, tint = BioProteinGreen)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(msg, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
