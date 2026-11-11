package com.drishyam.app.screens

import android.app.Activity
import android.view.WindowManager
import androidx.compose.foundation.ExperimentalFoundationApi
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.BookmarkBorder
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Key
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
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
import com.drishyam.core.model.MealLog
import com.drishyam.core.model.MealType
import com.drishyam.core.model.Recipe
import com.drishyam.domain.repository.NutritionRepository
import com.drishyam.domain.repository.RecipeRepository
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.util.UUID

// ==============================================================================
// 1. Recipes Discovery Screen
// ==============================================================================

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun RecipesScreen(
    recipeRepository: RecipeRepository,
    onNavigateToDetail: (String) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCuisine by remember { mutableStateOf<String?>(null) }
    var selectedDiet by remember { mutableStateOf<String?>(null) }
    var recipes by remember { mutableStateOf<List<Recipe>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    val scope = rememberCoroutineScope()

    fun loadRecipes() {
        scope.launch {
            isLoading = true
            val res = recipeRepository.getRecommendedRecipes(
                query = searchQuery.ifBlank { null },
                cuisine = selectedCuisine,
                diet = selectedDiet
            )
            recipes = res.getOrDefault(emptyList())
            isLoading = false
        }
    }

    LaunchedEffect(selectedCuisine, selectedDiet) {
        loadRecipes()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Culinary Intelligence",
            color = TextPrimary,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Serif
        )
        Text(
            text = "Recipes ranked by your pantry coverage, volatile flavour pairings & nutrition targets.",
            color = TextSecondary,
            fontSize = 12.sp
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Search Field
        OutlinedTextField(
            value = searchQuery,
            onValueChange = {
                searchQuery = it
                loadRecipes()
            },
            placeholder = { Text("Search recipes or ingredients...", color = TextMuted) },
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

        Spacer(modifier = Modifier.height(12.dp))

        // Filter Chips
        val cuisines = listOf("All Cuisines", "North Indian", "South Indian", "Mughlai", "Coastal")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            cuisines.forEach { c ->
                val isSelected = (c == "All Cuisines" && selectedCuisine == null) || (selectedCuisine == c)
                Box(
                    modifier = Modifier
                        .background(if (isSelected) DeepCharcoal else SurfaceCard, RoundedCornerShape(8.dp))
                        .border(1.dp, if (isSelected) MoltenOrange else SurfaceBorder, RoundedCornerShape(8.dp))
                        .clickable {
                            selectedCuisine = if (c == "All Cuisines") null else c
                        }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text(c, color = if (isSelected) MoltenOrange else TextPrimary, fontSize = 12.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator(color = MoltenOrange)
            }
        } else {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                items(recipes, key = { it.id }) { recipe ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(SurfaceCard, RoundedCornerShape(16.dp))
                            .border(1.dp, SurfaceBorder, RoundedCornerShape(16.dp))
                            .clickable { onNavigateToDetail(recipe.id) }
                            .padding(18.dp)
                    ) {
                        Column {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = recipe.cuisine.uppercase(),
                                    color = MoltenOrange,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 1.sp
                                )
                                // Gastronomy Match Badge (§5.6)
                                Text(
                                    text = "${(recipe.matchPercentage * 100).toInt()}% Pantry Match",
                                    color = Color(0xFF2ED573),
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }

                            Spacer(modifier = Modifier.height(4.dp))

                            Text(
                                text = recipe.title,
                                color = TextPrimary,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold
                            )

                            Spacer(modifier = Modifier.height(4.dp))

                            Text(
                                text = recipe.whyRecommended,
                                color = TextSecondary,
                                fontSize = 12.sp,
                                maxLines = 2
                            )

                            Spacer(modifier = Modifier.height(12.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text("${recipe.nutrition.calories} kcal", color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text("•", color = TextMuted)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text("${recipe.nutrition.proteinGrams.toInt()}g P", color = BioProteinGreen, fontSize = 12.sp)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text("•", color = TextMuted)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text("${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min", color = TextSecondary, fontSize = 12.sp)
                                }

                                if (recipe.oneIngredientToUnlock != null) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        modifier = Modifier
                                            .background(Color(0x26FF8A32), RoundedCornerShape(6.dp))
                                            .padding(horizontal = 8.dp, vertical = 4.dp)
                                    ) {
                                        Icon(Icons.Default.Key, contentDescription = null, tint = MoltenOrange, modifier = Modifier.size(12.dp))
                                        Spacer(modifier = Modifier.width(4.dp))
                                        Text("+${recipe.oneIngredientToUnlock}", color = MoltenOrange, fontSize = 11.sp, fontWeight = FontWeight.Medium)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// ==============================================================================
// 2. Recipe Detail Screen
// ==============================================================================

@Composable
fun RecipeDetailScreen(
    recipeId: String,
    recipeRepository: RecipeRepository,
    onNavigateBack: () -> Unit,
    onStartCooking: (String) -> Unit
) {
    var recipe by remember { mutableStateOf<Recipe?>(null) }
    var isSaved by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(recipeId) {
        val res = recipeRepository.getRecipeDetails(recipeId)
        recipe = res.getOrNull()
        isSaved = recipe?.isSaved == true
    }

    val r = recipe
    if (r == null) {
        Box(modifier = Modifier.fillMaxSize().background(ObsidianBlack), contentAlignment = Alignment.Center) {
            CircularProgressIndicator(color = MoltenOrange)
        }
        return
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(20.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onNavigateBack) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextPrimary)
            }
            IconButton(onClick = {
                scope.launch {
                    val next = !isSaved
                    isSaved = next
                    recipeRepository.toggleSaveRecipe(r.id, next)
                }
            }) {
                Icon(
                    if (isSaved) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                    contentDescription = "Save",
                    tint = if (isSaved) MoltenOrange else TextPrimary
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text(r.cuisine.uppercase(), color = MoltenOrange, fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 2.sp)
        Spacer(modifier = Modifier.height(4.dp))
        Text(r.title, color = TextPrimary, fontSize = 26.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)

        Spacer(modifier = Modifier.height(8.dp))
        Text(r.whyRecommended, color = TextSecondary, fontSize = 13.sp)

        Spacer(modifier = Modifier.height(20.dp))

        // Nutrition Overview Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceCard, RoundedCornerShape(14.dp))
                .border(1.dp, SurfaceBorder, RoundedCornerShape(14.dp))
                .padding(16.dp)
        ) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("ENERGY", color = TextMuted, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("${r.nutrition.calories}", color = TextPrimary, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Text("kcal", color = TextMuted, fontSize = 11.sp)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("PROTEIN", color = TextMuted, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("${r.nutrition.proteinGrams}g", color = BioProteinGreen, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Text("essential amino", color = TextMuted, fontSize = 11.sp)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("CARBS", color = TextMuted, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("${r.nutrition.carbsGrams}g", color = BioCarbGold, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Text("fuel", color = TextMuted, fontSize = 11.sp)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("TIME", color = TextMuted, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("${r.prepTimeMinutes + r.cookTimeMinutes}", color = TextPrimary, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Text("minutes", color = TextMuted, fontSize = 11.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Ingredients Section
        Text("INGREDIENTS IN YOUR KITCHEN", color = MoltenOrange, fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
        Spacer(modifier = Modifier.height(8.dp))
        r.ingredientsAvailable.forEach { ing ->
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(vertical = 4.dp)) {
                Icon(Icons.Default.Check, contentDescription = null, tint = Color(0xFF2ED573), modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text(ing.replaceFirstChar { it.uppercase() }, color = TextPrimary, fontSize = 14.sp)
            }
        }

        if (r.ingredientsMissing.isNotEmpty()) {
            Spacer(modifier = Modifier.height(16.dp))
            Text("MISSING ITEMS TO ACQUIRE", color = Color(0xFFFF4757), fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
            Spacer(modifier = Modifier.height(8.dp))
            r.ingredientsMissing.forEach { ing ->
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(vertical = 4.dp)) {
                    Icon(Icons.Default.Close, contentDescription = null, tint = Color(0xFFFF4757), modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(ing.replaceFirstChar { it.uppercase() }, color = TextSecondary, fontSize = 14.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(32.dp))

        // CTA: Start Cooking Mode
        Button(
            onClick = { onStartCooking(r.id) },
            modifier = Modifier.fillMaxWidth().height(52.dp),
            colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange),
            shape = RoundedCornerShape(12.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Restaurant, contentDescription = null, tint = ObsidianBlack)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Start Step-by-Step Cooking Mode", color = ObsidianBlack, fontWeight = FontWeight.Bold, fontSize = 15.sp)
            }
        }
    }
}

// ==============================================================================
// 3. Fullscreen Cooking Mode with WakeLock & Step Pager (§5.8)
// ==============================================================================

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun CookingModeScreen(
    recipeId: String,
    recipeRepository: RecipeRepository,
    nutritionRepository: NutritionRepository,
    onCookingFinished: () -> Unit,
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    // 1. Keep Screen Awake (Screen Wake Lock API)
    DisposableEffect(Unit) {
        val window = (context as? Activity)?.window
        window?.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        onDispose {
            window?.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
    }

    var recipe by remember { mutableStateOf<Recipe?>(null) }
    LaunchedEffect(recipeId) {
        recipe = recipeRepository.getRecipeDetails(recipeId).getOrNull()
    }

    val r = recipe
    val instructions = r?.instructions ?: listOf(
        "Bloom whole aromatics and cumin seeds in hot oil.",
        "Add aromatics, simmer until fragrant.",
        "Fold in main ingredients and simmer for 5 minutes."
    )

    val pagerState = rememberPagerState(pageCount = { instructions.size })

    // Kitchen Timer
    var timerSeconds by remember { mutableIntStateOf(180) }
    var isTimerRunning by remember { mutableStateOf(false) }

    LaunchedEffect(isTimerRunning) {
        while (isTimerRunning && timerSeconds > 0) {
            delay(1000L)
            timerSeconds--
        }
        if (timerSeconds == 0) isTimerRunning = false
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(24.dp),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        // Top Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onNavigateBack) {
                Icon(Icons.Default.Close, contentDescription = "Exit Cooking Mode", tint = TextPrimary)
            }
            Text("COOKING MODE · STEP ${pagerState.currentPage + 1} OF ${instructions.size}", color = MoltenOrange, fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Timer, contentDescription = null, tint = if (isTimerRunning) MoltenOrange else TextMuted, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = String.format("%02d:%02d", timerSeconds / 60, timerSeconds % 60),
                    color = if (isTimerRunning) MoltenOrange else TextPrimary,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp
                )
                IconButton(onClick = { isTimerRunning = !isTimerRunning }) {
                    Icon(if (isTimerRunning) Icons.Default.Close else Icons.Default.PlayArrow, contentDescription = "Timer toggle", tint = TextPrimary, modifier = Modifier.size(16.dp))
                }
            }
        }

        // Middle: Step Card via HorizontalPager
        HorizontalPager(
            state = pagerState,
            modifier = Modifier.weight(1f).fillMaxWidth()
        ) { page ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(vertical = 32.dp)
                    .background(DeepCharcoal, RoundedCornerShape(20.dp))
                    .border(1.dp, SurfaceBorder, RoundedCornerShape(20.dp))
                    .padding(28.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .background(SurfaceCard, CircleShape)
                            .border(1.dp, MoltenOrange, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("${page + 1}", color = MoltenOrange, fontSize = 22.sp, fontWeight = FontWeight.Bold)
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    Text(
                        text = instructions[page],
                        color = TextPrimary,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.SemiBold,
                        lineHeight = 30.sp,
                        fontFamily = FontFamily.Serif
                    )
                }
            }
        }

        // Bottom Controls (One-handed ergonomic tap zones)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            if (pagerState.currentPage > 0) {
                Button(
                    onClick = { scope.launch { pagerState.animateScrollToPage(pagerState.currentPage - 1) } },
                    colors = ButtonDefaults.buttonColors(containerColor = DeepCharcoal),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text("Previous", color = TextPrimary)
                }
            } else {
                Spacer(modifier = Modifier.width(1.dp))
            }

            if (pagerState.currentPage < instructions.size - 1) {
                Button(
                    onClick = { scope.launch { pagerState.animateScrollToPage(pagerState.currentPage + 1) } },
                    colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text("Next Step", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                }
            } else {
                // Last step: Complete & Log Meal
                Button(
                    onClick = {
                        scope.launch {
                            r?.let { recipeItem ->
                                nutritionRepository.logMeal(
                                    MealLog(
                                        id = UUID.randomUUID().toString(),
                                        date = java.time.LocalDate.now().toString(),
                                        mealType = MealType.DINNER,
                                        name = recipeItem.title,
                                        calories = recipeItem.nutrition.calories,
                                        proteinG = recipeItem.nutrition.proteinGrams,
                                        carbsG = recipeItem.nutrition.carbsGrams,
                                        fatG = recipeItem.nutrition.fatGrams,
                                        recipeId = recipeItem.id
                                    )
                                )
                            }
                            onCookingFinished()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2ED573)),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text("Finish & Log Meal", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
