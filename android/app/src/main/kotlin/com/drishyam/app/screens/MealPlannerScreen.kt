package com.drishyam.app.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import com.drishyam.core.designsystem.theme.BioProteinGreen
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.SurfaceCard
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.core.model.MealType
import com.drishyam.core.model.PlannedMeal
import com.drishyam.domain.repository.PlannerRepository
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.util.UUID

@Composable
fun MealPlannerScreen(
    plannerRepository: PlannerRepository,
    onNavigateToShopping: () -> Unit
) {
    val plannedMeals by plannerRepository.getPlannedMeals().collectAsState(initial = emptyList())
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    var selectedDayIndex by remember { mutableStateOf(0) }
    val daysOfWeek = listOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")

    var showAddDialog by remember { mutableStateOf(false) }
    var selectedMealTypeForAdd by remember { mutableStateOf(MealType.DINNER) }
    var mealCustomName by remember { mutableStateOf("") }
    var mealCalories by remember { mutableStateOf("450") }
    var mealProtein by remember { mutableStateOf("30") }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        containerColor = ObsidianBlack
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 20.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Spacer(modifier = Modifier.height(16.dp))

            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Meal Planner",
                        color = TextPrimary,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Serif
                    )
                    Text(
                        text = "Target-aligned weekly culinary schedule",
                        color = TextSecondary,
                        fontSize = 12.sp
                    )
                }

                Button(
                    onClick = {
                        scope.launch {
                            plannerRepository.buildShoppingList("current-week")
                            snackbarHostState.showSnackbar("Shopping list compiled from planned meals!")
                            onNavigateToShopping()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Icon(Icons.Default.ShoppingCart, contentDescription = null, tint = ObsidianBlack, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Build List", color = ObsidianBlack, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Day Selector Row
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(daysOfWeek.indices.toList()) { index ->
                    val isSelected = selectedDayIndex == index
                    Box(
                        modifier = Modifier
                            .background(if (isSelected) DeepCharcoal else SurfaceCard, RoundedCornerShape(10.dp))
                            .border(1.dp, if (isSelected) MoltenOrange else SurfaceBorder, RoundedCornerShape(10.dp))
                            .clickable { selectedDayIndex = index }
                            .padding(horizontal = 16.dp, vertical = 10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = daysOfWeek[index],
                            color = if (isSelected) MoltenOrange else TextPrimary,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Meal Slots (Breakfast, Lunch, Dinner, Snack)
            val slots = listOf(MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER, MealType.SNACK)

            slots.forEach { slot ->
                val slotMeals = plannedMeals.filter { it.mealType == slot }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = slot.displayName.uppercase(),
                        color = MoltenOrange,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )
                    IconButton(onClick = {
                        selectedMealTypeForAdd = slot
                        showAddDialog = true
                    }) {
                        Icon(Icons.Default.Add, contentDescription = "Add Meal", tint = MoltenOrange, modifier = Modifier.size(18.dp))
                    }
                }

                Spacer(modifier = Modifier.height(6.dp))

                if (slotMeals.isEmpty()) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(SurfaceCard, RoundedCornerShape(12.dp))
                            .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
                            .clickable {
                                selectedMealTypeForAdd = slot
                                showAddDialog = true
                            }
                            .padding(16.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("+ Assign recipe to ${slot.displayName}", color = TextMuted, fontSize = 13.sp)
                    }
                } else {
                    slotMeals.forEach { meal ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp)
                                .background(SurfaceCard, RoundedCornerShape(12.dp))
                                .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
                                .padding(14.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(
                                        text = meal.customName ?: "Planned Recipe",
                                        color = TextPrimary,
                                        fontWeight = FontWeight.SemiBold,
                                        fontSize = 15.sp
                                    )
                                    Text(
                                        text = "${meal.calories} kcal · ${meal.proteinG.toInt()}g protein",
                                        color = BioProteinGreen,
                                        fontSize = 12.sp
                                    )
                                }

                                IconButton(onClick = { scope.launch { plannerRepository.removePlannedMeal(meal.id) } }) {
                                    Icon(Icons.Default.Delete, contentDescription = "Delete", tint = TextMuted, modifier = Modifier.size(18.dp))
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }

    if (showAddDialog) {
        AlertDialog(
            onDismissRequest = { showAddDialog = false },
            title = { Text("Assign Meal to ${selectedMealTypeForAdd.displayName}", color = TextPrimary) },
            text = {
                Column {
                    OutlinedTextField(
                        value = mealCustomName,
                        onValueChange = { mealCustomName = it },
                        label = { Text("Recipe or Dish Title") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = mealCalories,
                            onValueChange = { mealCalories = it },
                            label = { Text("Calories") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = mealProtein,
                            onValueChange = { mealProtein = it },
                            label = { Text("Protein (g)") },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (mealCustomName.isNotBlank()) {
                            val newPlannedMeal = PlannedMeal(
                                id = UUID.randomUUID().toString(),
                                planId = "current-week",
                                date = LocalDate.now().toString(),
                                mealType = selectedMealTypeForAdd,
                                customName = mealCustomName.trim(),
                                calories = mealCalories.toIntOrNull() ?: 450,
                                proteinG = mealProtein.toDoubleOrNull() ?: 30.0
                            )
                            scope.launch { plannerRepository.addPlannedMeal(newPlannedMeal) }
                            mealCustomName = ""
                            showAddDialog = false
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange)
                ) {
                    Text("Save", color = ObsidianBlack, fontWeight = FontWeight.Bold)
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
