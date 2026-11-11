package com.drishyam.app.screens

import androidx.compose.animation.animateColorAsState
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarResult
import androidx.compose.material3.SwipeToDismissBox
import androidx.compose.material3.SwipeToDismissBoxValue
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberSwipeToDismissBoxState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.SurfaceCard
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.core.model.Ingredient
import com.drishyam.core.model.IngredientCategory
import com.drishyam.core.model.IngredientSource
import com.drishyam.domain.repository.PantryRepository
import kotlinx.coroutines.launch
import java.util.UUID

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantryScreen(
    pantryRepository: PantryRepository,
    onNavigateToScanner: () -> Unit
) {
    val pantryItems by pantryRepository.getPantry().collectAsState(initial = emptyList())
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    var searchQuery by remember { mutableStateOf("") }
    var showAddDialog by remember { mutableStateOf(false) }

    // Dialog fields
    var newName by remember { mutableStateOf("") }
    var newCategory by remember { mutableStateOf(IngredientCategory.SPICES) }
    var newQuantity by remember { mutableStateOf("100") }
    var newUnit by remember { mutableStateOf("g") }

    val filteredItems = pantryItems.filter {
        it.displayName.contains(searchQuery, ignoreCase = true) ||
        it.canonicalName.contains(searchQuery, ignoreCase = true)
    }

    val groupedItems = filteredItems.groupBy { it.category }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { onNavigateToScanner() },
                containerColor = MoltenOrange,
                contentColor = ObsidianBlack
            ) {
                Icon(Icons.Default.CameraAlt, contentDescription = "Scan with Camera")
            }
        },
        containerColor = ObsidianBlack
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 20.dp)
        ) {
            Spacer(modifier = Modifier.height(16.dp))

            // Header Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Pantry Inventory",
                        color = TextPrimary,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Serif
                    )
                    Text(
                        text = "${pantryItems.size} verified culinary ingredients",
                        color = TextSecondary,
                        fontSize = 12.sp
                    )
                }

                Row {
                    IconButton(onClick = { scope.launch { pantryRepository.syncPantry() } }) {
                        Icon(Icons.Default.Sync, contentDescription = "Sync", tint = MoltenOrange)
                    }
                    IconButton(onClick = { showAddDialog = true }) {
                        Icon(Icons.Default.Add, contentDescription = "Add Manually", tint = MoltenOrange)
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = { Text("Search spices, produce, aromatics...", color = TextMuted) },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = TextMuted) },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedTextColor = TextPrimary,
                    unfocusedTextColor = TextPrimary,
                    focusedBorderColor = MoltenOrange,
                    unfocusedBorderColor = SurfaceBorder
                )
            )

            Spacer(modifier = Modifier.height(16.dp))

            if (pantryItems.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.CameraAlt, contentDescription = null, tint = TextMuted, modifier = Modifier.size(48.dp))
                        Spacer(modifier = Modifier.height(12.dp))
                        Text("Your kitchen inventory is empty", color = TextPrimary, fontWeight = FontWeight.SemiBold)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Tap the camera icon below to scan ingredients", color = TextMuted, fontSize = 13.sp)
                    }
                }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    groupedItems.forEach { (category, items) ->
                        item {
                            Text(
                                text = category.displayName.uppercase(),
                                color = MoltenOrange,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 1.sp,
                                modifier = Modifier.padding(top = 12.dp, bottom = 4.dp)
                            )
                        }

                        items(items, key = { it.id }) { item ->
                            val dismissState = rememberSwipeToDismissBoxState(
                                confirmValueChange = { dismissValue ->
                                    if (dismissValue == SwipeToDismissBoxValue.EndToStart || dismissValue == SwipeToDismissBoxValue.StartToEnd) {
                                        scope.launch {
                                            pantryRepository.removeIngredient(item.id)
                                            val result = snackbarHostState.showSnackbar(
                                                message = "${item.displayName} removed",
                                                actionLabel = "Undo",
                                                duration = SnackbarDuration.Short
                                            )
                                            if (result == SnackbarResult.ActionPerformed) {
                                                pantryRepository.addIngredient(item)
                                            }
                                        }
                                        true
                                    } else {
                                        false
                                    }
                                }
                            )

                            SwipeToDismissBox(
                                state = dismissState,
                                backgroundContent = {
                                    val color by animateColorAsState(
                                        when (dismissState.targetValue) {
                                            SwipeToDismissBoxValue.EndToStart, SwipeToDismissBoxValue.StartToEnd -> Color(0xFFFF4757)
                                            else -> Color.Transparent
                                        }, label = "dismissColor"
                                    )
                                    Box(
                                        modifier = Modifier
                                            .fillMaxSize()
                                            .background(color, RoundedCornerShape(12.dp))
                                            .padding(horizontal = 20.dp),
                                        contentAlignment = Alignment.CenterEnd
                                    ) {
                                        Icon(Icons.Default.Delete, contentDescription = "Delete", tint = Color.White)
                                    }
                                },
                                content = {
                                    Box(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .background(SurfaceCard, RoundedCornerShape(12.dp))
                                            .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
                                            .padding(16.dp)
                                    ) {
                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.SpaceBetween,
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            Column {
                                                Text(
                                                    text = item.displayName,
                                                    color = TextPrimary,
                                                    fontWeight = FontWeight.SemiBold,
                                                    fontSize = 15.sp
                                                )
                                                Spacer(modifier = Modifier.height(2.dp))
                                                Row(verticalAlignment = Alignment.CenterVertically) {
                                                    Text(
                                                        text = "${item.quantity?.toInt() ?: 100} ${item.unit ?: "g"}",
                                                        color = TextSecondary,
                                                        fontSize = 12.sp
                                                    )
                                                    Spacer(modifier = Modifier.width(8.dp))
                                                    Text("•", color = TextMuted)
                                                    Spacer(modifier = Modifier.width(8.dp))
                                                    // Source Badge (§5.1)
                                                    val badgeColor = when (item.source) {
                                                        IngredientSource.ANDROID_EDGE_CAMERA -> MoltenOrange
                                                        IngredientSource.SYNCED_WEB -> Color(0xFF2ED573)
                                                        else -> TextMuted
                                                    }
                                                    val conf = item.confidence
                                                    val badgeText = when (item.source) {
                                                        IngredientSource.ANDROID_EDGE_CAMERA -> "Edge Vision ${if (conf != null) "(${(conf * 100).toInt()}%)" else ""}"
                                                        IngredientSource.SYNCED_WEB -> "Web Synced"
                                                        else -> "Manual"
                                                    }
                                                    Text(badgeText, color = badgeColor, fontSize = 11.sp, fontWeight = FontWeight.Medium)
                                                }
                                            }

                                            IconButton(onClick = {
                                                scope.launch {
                                                    pantryRepository.removeIngredient(item.id)
                                                    val res = snackbarHostState.showSnackbar(
                                                        message = "${item.displayName} deleted",
                                                        actionLabel = "Undo"
                                                    )
                                                    if (res == SnackbarResult.ActionPerformed) {
                                                        pantryRepository.addIngredient(item)
                                                    }
                                                }
                                            }) {
                                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = TextMuted, modifier = Modifier.size(18.dp))
                                            }
                                        }
                                    }
                                }
                            )
                        }
                    }
                }
            }
        }
    }

    // Manual Add Ingredient Dialog
    if (showAddDialog) {
        AlertDialog(
            onDismissRequest = { showAddDialog = false },
            title = { Text("Add Ingredient to Pantry", color = TextPrimary) },
            text = {
                Column {
                    OutlinedTextField(
                        value = newName,
                        onValueChange = { newName = it },
                        label = { Text("Ingredient Name") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = newQuantity,
                            onValueChange = { newQuantity = it },
                            label = { Text("Quantity") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = newUnit,
                            onValueChange = { newUnit = it },
                            label = { Text("Unit") },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (newName.isNotBlank()) {
                            val ingredient = Ingredient(
                                id = UUID.randomUUID().toString(),
                                canonicalName = newName.trim().lowercase(),
                                displayName = newName.trim().replaceFirstChar { it.uppercase() },
                                category = newCategory,
                                quantity = newQuantity.toDoubleOrNull() ?: 100.0,
                                unit = newUnit.trim(),
                                source = IngredientSource.MANUAL,
                                confidence = 1.0f,
                                confirmed = true
                            )
                            scope.launch { pantryRepository.addIngredient(ingredient) }
                            newName = ""
                            showAddDialog = false
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange)
                ) {
                    Text("Add", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showAddDialog = false }) {
                    Text("Cancel", color = TextSecondary)
                }
            },
            containerColor = DeepCharcoal
        )
    }
}
