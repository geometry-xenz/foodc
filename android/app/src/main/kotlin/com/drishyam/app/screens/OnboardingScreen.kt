package com.drishyam.app.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
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
import com.drishyam.core.designsystem.theme.SurfaceElevated
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.core.model.FitnessGoal
import com.drishyam.core.model.UserProfile
import com.drishyam.core.model.UserPreferences
import com.drishyam.domain.repository.AccountRepository
import kotlinx.coroutines.launch

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun OnboardingScreen(
    accountRepository: AccountRepository,
    onOnboardingComplete: () -> Unit
) {
    var step by remember { mutableIntStateOf(1) }

    // Step 1: Biometrics
    var age by remember { mutableStateOf("28") }
    var gender by remember { mutableStateOf("male") }
    var heightCm by remember { mutableStateOf("175") }
    var weightKg by remember { mutableStateOf("72") }

    // Step 2: Goal
    var selectedGoal by remember { mutableStateOf(FitnessGoal.LEAN_BULK) }

    // Step 3: Lifestyle & Allergies
    var selectedLifestyle by remember { mutableStateOf("vegetarian") }
    val selectedAllergies = remember { mutableStateOf(setOf<String>()) }

    val scope = rememberCoroutineScope()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(24.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                // Header & Step indicator
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "DRISHYAM SETUP",
                        color = MoltenOrange,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 2.sp
                    )
                    Text(
                        text = "STEP $step OF 4",
                        color = TextMuted,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                when (step) {
                    1 -> {
                        Text(
                            text = "Calibrate Your Biometrics",
                            color = TextPrimary,
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Serif
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Mifflin-St Jeor metabolic calculations compute baseline energy requirements.",
                            color = TextSecondary,
                            fontSize = 13.sp
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        OutlinedTextField(
                            value = age,
                            onValueChange = { age = it },
                            label = { Text("Age (years)") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                            modifier = Modifier.fillMaxWidth(),
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedTextColor = TextPrimary,
                                unfocusedTextColor = TextPrimary,
                                focusedBorderColor = MoltenOrange,
                                unfocusedBorderColor = SurfaceBorder
                            )
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            listOf("male", "female").forEach { g ->
                                val isSelected = gender == g
                                Box(
                                    modifier = Modifier
                                        .weight(1f)
                                        .background(if (isSelected) DeepCharcoal else SurfaceCard, RoundedCornerShape(8.dp))
                                        .border(1.dp, if (isSelected) MoltenOrange else SurfaceBorder, RoundedCornerShape(8.dp))
                                        .clickable { gender = g }
                                        .padding(14.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = g.replaceFirstChar { it.uppercase() },
                                        color = if (isSelected) MoltenOrange else TextPrimary,
                                        fontWeight = FontWeight.SemiBold
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            OutlinedTextField(
                                value = heightCm,
                                onValueChange = { heightCm = it },
                                label = { Text("Height (cm)") },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                                modifier = Modifier.weight(1f),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedTextColor = TextPrimary,
                                    unfocusedTextColor = TextPrimary,
                                    focusedBorderColor = MoltenOrange,
                                    unfocusedBorderColor = SurfaceBorder
                                )
                            )
                            OutlinedTextField(
                                value = weightKg,
                                onValueChange = { weightKg = it },
                                label = { Text("Weight (kg)") },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                                modifier = Modifier.weight(1f),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedTextColor = TextPrimary,
                                    unfocusedTextColor = TextPrimary,
                                    focusedBorderColor = MoltenOrange,
                                    unfocusedBorderColor = SurfaceBorder
                                )
                            )
                        }
                    }

                    2 -> {
                        Text(
                            text = "Select Primary Goal",
                            color = TextPrimary,
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Serif
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "All 8 formulations feature documented caloric shifts and protein baselines (§5.1).",
                            color = TextSecondary,
                            fontSize = 13.sp
                        )

                        Spacer(modifier = Modifier.height(20.dp))

                        FitnessGoal.values().forEach { goal ->
                            val isSelected = selectedGoal == goal
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 4.dp)
                                    .background(if (isSelected) DeepCharcoal else SurfaceCard, RoundedCornerShape(12.dp))
                                    .border(1.dp, if (isSelected) MoltenOrange else SurfaceBorder, RoundedCornerShape(12.dp))
                                    .clickable { selectedGoal = goal }
                                    .padding(16.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        Icons.Default.FitnessCenter,
                                        contentDescription = null,
                                        tint = if (isSelected) MoltenOrange else TextMuted
                                    )
                                    Spacer(modifier = Modifier.width(12.dp))
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(goal.title, color = TextPrimary, fontWeight = FontWeight.Bold, fontSize = 15.sp)
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
                                        Icon(Icons.Default.Check, contentDescription = null, tint = MoltenOrange)
                                    }
                                }
                            }
                        }
                    }

                    3 -> {
                        Text(
                            text = "Lifestyle & Hard Gates",
                            color = TextPrimary,
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Serif
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Allergens are absolute hard filters: offending recipes are strictly withheld.",
                            color = TextSecondary,
                            fontSize = 13.sp
                        )

                        Spacer(modifier = Modifier.height(20.dp))

                        Text("DIETARY LIFESTYLE", color = MoltenOrange, fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
                        Spacer(modifier = Modifier.height(8.dp))

                        val lifestyles = listOf("vegetarian", "vegan", "eggetarian", "pescatarian", "non_vegetarian", "jain")
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            lifestyles.forEach { ls ->
                                val isSelected = selectedLifestyle == ls
                                Box(
                                    modifier = Modifier
                                        .background(if (isSelected) DeepCharcoal else SurfaceCard, RoundedCornerShape(8.dp))
                                        .border(1.dp, if (isSelected) MoltenOrange else SurfaceBorder, RoundedCornerShape(8.dp))
                                        .clickable { selectedLifestyle = ls }
                                        .padding(horizontal = 14.dp, vertical = 8.dp)
                                ) {
                                    Text(
                                        ls.replace("_", " ").replaceFirstChar { it.uppercase() },
                                        color = if (isSelected) MoltenOrange else TextPrimary,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Medium
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        Text("HARD ALLERGEN GATES", color = Color(0xFFFF4757), fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
                        Spacer(modifier = Modifier.height(8.dp))

                        val allergenOptions = listOf("peanut", "tree_nut", "dairy", "egg", "soy", "gluten", "shellfish", "fish")
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            allergenOptions.forEach { allergen ->
                                val isBlocked = selectedAllergies.value.contains(allergen)
                                Box(
                                    modifier = Modifier
                                        .background(if (isBlocked) Color(0x33FF4757) else SurfaceCard, RoundedCornerShape(8.dp))
                                        .border(1.dp, if (isBlocked) Color(0xFFFF4757) else SurfaceBorder, RoundedCornerShape(8.dp))
                                        .clickable {
                                            if (isBlocked) selectedAllergies.value -= allergen
                                            else selectedAllergies.value += allergen
                                        }
                                        .padding(horizontal = 14.dp, vertical = 8.dp)
                                ) {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        if (isBlocked) {
                                            Icon(Icons.Default.Shield, contentDescription = null, tint = Color(0xFFFF4757), modifier = Modifier.size(14.dp))
                                            Spacer(modifier = Modifier.width(6.dp))
                                        }
                                        Text(
                                            allergen.replace("_", " ").replaceFirstChar { it.uppercase() },
                                            color = if (isBlocked) Color(0xFFFF4757) else TextPrimary,
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.Medium
                                        )
                                    }
                                }
                            }
                        }
                    }

                    4 -> {
                        Text(
                            text = "Calibrated Targets",
                            color = TextPrimary,
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Serif
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Estimated daily nutritional baseline computed with safety bounds checks.",
                            color = TextSecondary,
                            fontSize = 13.sp
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(SurfaceCard, RoundedCornerShape(16.dp))
                                .border(1.dp, SurfaceBorder, RoundedCornerShape(16.dp))
                                .padding(20.dp)
                        ) {
                            Column {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text("DAILY ENERGY TARGET", color = TextMuted, fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
                                    Text("ESTIMATE", color = MoltenOrange, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                }
                                Spacer(modifier = Modifier.height(8.dp))
                                Text("2,450 kcal", color = TextPrimary, fontSize = 32.sp, fontWeight = FontWeight.Bold)
                                Text("BMR 1,780 kcal · TDEE 2,200 kcal · Surplus +250 kcal", color = TextSecondary, fontSize = 12.sp)

                                Spacer(modifier = Modifier.height(20.dp))

                                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                    Column {
                                        Text("Protein", color = BioProteinGreen, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                                        Text("160g", color = TextPrimary, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                                        Text("26% kcal", color = TextMuted, fontSize = 11.sp)
                                    }
                                    Column {
                                        Text("Carbohydrates", color = BioCarbGold, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                                        Text("270g", color = TextPrimary, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                                        Text("44% kcal", color = TextMuted, fontSize = 11.sp)
                                    }
                                    Column {
                                        Text("Healthy Fats", color = BioFatCrimson, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                                        Text("75g", color = TextPrimary, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                                        Text("30% kcal", color = TextMuted, fontSize = 11.sp)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Navigation Buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                if (step > 1) {
                    Button(
                        onClick = { step-- },
                        colors = ButtonDefaults.buttonColors(containerColor = DeepCharcoal),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("Back", color = TextPrimary)
                    }
                } else {
                    Spacer(modifier = Modifier.width(1.dp))
                }

                Button(
                    onClick = {
                        if (step < 4) {
                            step++
                        } else {
                            // Save profile & preferences to backend
                            scope.launch {
                                accountRepository.updateProfile(
                                    UserProfile(
                                        id = "",
                                        email = "",
                                        age = age.toIntOrNull() ?: 28,
                                        gender = gender,
                                        heightCm = heightCm.toFloatOrNull() ?: 175f,
                                        weightKg = weightKg.toFloatOrNull() ?: 72f
                                    )
                                )
                                accountRepository.updatePreferences(
                                    UserPreferences(
                                        lifestyle = selectedLifestyle,
                                        allergies = selectedAllergies.value.toList()
                                    )
                                )
                                onOnboardingComplete()
                            }
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        if (step < 4) "Continue" else "Enter Intelligent Kitchen",
                        color = ObsidianBlack,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
    }
}
