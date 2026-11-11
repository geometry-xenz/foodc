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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
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
import com.drishyam.core.designsystem.theme.BioCarbGold
import com.drishyam.core.designsystem.theme.BioFatCrimson
import com.drishyam.core.designsystem.theme.BioProteinGreen
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.SurfaceCard
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.core.model.DailyNutritionSummary
import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.MealLog
import com.drishyam.core.model.MealType
import com.drishyam.core.ui.MacroProgressRing
import com.drishyam.domain.repository.NutritionRepository
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.util.UUID

@Composable
fun NutritionScreen(
    nutritionRepository: NutritionRepository
) {
    val mealLogs by nutritionRepository.getMealLogs().collectAsState(initial = emptyList())
    var activeGoal by remember { mutableStateOf(FitnessGoal.LEAN_BULK) }
    var showAddMealDialog by remember { mutableStateOf(false) }

    // Dialog state
    var mealName by remember { mutableStateOf("") }
    var mealCalories by remember { mutableStateOf("350") }
    var mealProtein by remember { mutableStateOf("25") }
    var mealCarbs by remember { mutableStateOf("35") }
    var mealFat by remember { mutableStateOf("10") }

    val scope = rememberCoroutineScope()

    val totalCalories = mealLogs.sumOf { it.calories }
    val totalProtein = mealLogs.sumOf { it.proteinG }
    val totalCarbs = mealLogs.sumOf { it.carbsG }
    val totalFat = mealLogs.sumOf { it.fatG }

    val targetCalories = 2450
    val targetProtein = 160.0
    val targetCarbs = 270.0
    val targetFat = 75.0

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Nutrition Studio",
                    color = TextPrimary,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif
                )
                Text(
                    text = "Daily energy balance & macronutrient partitioning (§5.7)",
                    color = TextSecondary,
                    fontSize = 12.sp
                )
            }
            IconButton(onClick = { showAddMealDialog = true }) {
                Icon(Icons.Default.Add, contentDescription = "Log Meal", tint = MoltenOrange)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Multi-Ring Macro Progress Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceCard, RoundedCornerShape(16.dp))
                .border(1.dp, SurfaceBorder, RoundedCornerShape(16.dp))
                .padding(20.dp)
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                MacroProgressRing(
                    caloriesCurrent = totalCalories,
                    caloriesTarget = targetCalories,
                    proteinProgress = (totalProtein / targetProtein).toFloat(),
                    carbProgress = (totalCarbs / targetCarbs).toFloat(),
                    fatProgress = (totalFat / targetFat).toFloat(),
                    size = 180.dp
                )

                Spacer(modifier = Modifier.height(20.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("PROTEIN", color = BioProteinGreen, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        Text("${totalProtein.toInt()} / ${targetProtein.toInt()}g", color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("CARBS", color = BioCarbGold, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        Text("${totalCarbs.toInt()} / ${targetCarbs.toInt()}g", color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("FATS", color = BioFatCrimson, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        Text("${totalFat.toInt()} / ${targetFat.toInt()}g", color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Goal Selection & Safety Bounds Note
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("TARGET FORMULATIONS", color = MoltenOrange, fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Info, contentDescription = null, tint = TextMuted, modifier = Modifier.size(13.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Safety bounded (§5.7)", color = TextMuted, fontSize = 11.sp)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        FitnessGoal.values().forEach { goal ->
            val isSelected = activeGoal == goal
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .background(if (isSelected) DeepCharcoal else SurfaceCard, RoundedCornerShape(12.dp))
                    .border(1.dp, if (isSelected) MoltenOrange else SurfaceBorder, RoundedCornerShape(12.dp))
                    .clickable {
                        activeGoal = goal
                        scope.launch { nutritionRepository.updateGoal(goal) }
                    }
                    .padding(14.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(goal.title, color = TextPrimary, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Text(goal.description, color = TextSecondary, fontSize = 12.sp)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            "${goal.proteinPerKg}g protein/kg · ${if (goal.calorieDelta >= 0) "+" else ""}${goal.calorieDelta} kcal/day",
                            color = MoltenOrange,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                    if (isSelected) {
                        Icon(Icons.Default.Check, contentDescription = "Active", tint = MoltenOrange)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Meal History List
        Text("TODAY'S INTAKE LOGS", color = MoltenOrange, fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
        Spacer(modifier = Modifier.height(10.dp))

        if (mealLogs.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(SurfaceCard, RoundedCornerShape(12.dp))
                    .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Text("No meals logged yet today. Tap + to record intake.", color = TextMuted, fontSize = 13.sp)
            }
        } else {
            mealLogs.forEach { log ->
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
                            Text(log.name, color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 15.sp)
                            Text("${log.calories} kcal · ${log.proteinG.toInt()}g P · ${log.carbsG.toInt()}g C · ${log.fatG.toInt()}g F", color = TextSecondary, fontSize = 12.sp)
                        }
                        IconButton(onClick = { scope.launch { nutritionRepository.deleteMealLog(log.id) } }) {
                            Icon(Icons.Default.Delete, contentDescription = "Delete", tint = TextMuted, modifier = Modifier.size(16.dp))
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(32.dp))
    }

    // Add Meal Dialog
    if (showAddMealDialog) {
        AlertDialog(
            onDismissRequest = { showAddMealDialog = false },
            title = { Text("Log Meal Intake", color = TextPrimary) },
            text = {
                Column {
                    OutlinedTextField(
                        value = mealName,
                        onValueChange = { mealName = it },
                        label = { Text("Meal or Dish Name") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = mealCalories,
                        onValueChange = { mealCalories = it },
                        label = { Text("Calories (kcal)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = mealProtein,
                            onValueChange = { mealProtein = it },
                            label = { Text("Protein (g)") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = mealCarbs,
                            onValueChange = { mealCarbs = it },
                            label = { Text("Carbs (g)") },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (mealName.isNotBlank()) {
                            val newLog = MealLog(
                                id = UUID.randomUUID().toString(),
                                date = LocalDate.now().toString(),
                                mealType = MealType.LUNCH,
                                name = mealName.trim(),
                                calories = mealCalories.toIntOrNull() ?: 350,
                                proteinG = mealProtein.toDoubleOrNull() ?: 25.0,
                                carbsG = mealCarbs.toDoubleOrNull() ?: 35.0,
                                fatG = mealFat.toDoubleOrNull() ?: 10.0
                            )
                            scope.launch { nutritionRepository.logMeal(newLog) }
                            mealName = ""
                            showAddMealDialog = false
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange)
                ) {
                    Text("Log", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showAddMealDialog = false }) {
                    Text("Cancel", color = TextSecondary)
                }
            },
            containerColor = DeepCharcoal
        )
    }
}
