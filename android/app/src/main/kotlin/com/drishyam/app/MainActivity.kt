package com.drishyam.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Kitchen
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.PieChart
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.ViewInAr
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.drishyam.app.screens.AuthScreen
import com.drishyam.app.screens.CookingModeScreen
import com.drishyam.app.screens.FlavourScienceScreen
import com.drishyam.app.screens.MealPlannerScreen
import com.drishyam.app.screens.NutritionScreen
import com.drishyam.app.screens.OnboardingScreen
import com.drishyam.app.screens.PantryScreen
import com.drishyam.app.screens.RecipeDetailScreen
import com.drishyam.app.screens.RecipesScreen
import com.drishyam.app.screens.SettingsScreen
import com.drishyam.app.screens.ShoppingScreen
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.DrishyamMotion
import com.drishyam.core.designsystem.theme.DrishyamTheme
import com.drishyam.core.designsystem.theme.LocalReducedMotion
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.feature.dashboard.DashboardScreen
import com.drishyam.feature.dashboard.DashboardViewModel
import com.drishyam.feature.scanner.ScannerScreen
import com.drishyam.feature.scanner.ScannerViewModel

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    data object Dashboard : Screen("dashboard", "Home", Icons.Default.PieChart)
    data object Scanner : Screen("scanner", "Scanner", Icons.Default.CameraAlt)
    data object Pantry : Screen("pantry", "Pantry", Icons.Default.Kitchen)
    data object Recipes : Screen("recipes", "Discover", Icons.Default.MenuBook)
    data object Nutrition : Screen("nutrition", "Nutrition", Icons.Default.PieChart)
}

class MainActivity : ComponentActivity() {

    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val app = application as DrishyamApplication

        val dashboardViewModel = DashboardViewModel(
            getPantryUseCase = app.getPantryUseCase,
            recommendRecipesUseCase = app.recommendRecipesUseCase
        )

        val scannerViewModel = ScannerViewModel(
            confirmIngredientUseCase = app.confirmScannedIngredientUseCase
        )

        setContent {
            val systemReducedMotion = DrishyamMotion.isSystemReducedMotion(this@MainActivity)
            CompositionLocalProvider(LocalReducedMotion provides systemReducedMotion) {
                DrishyamTheme {
                val navController = rememberNavController()
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                val isFullscreenRoute = currentRoute == "auth" ||
                        currentRoute == "onboarding" ||
                        currentRoute == Screen.Scanner.route ||
                        (currentRoute?.startsWith("cooking_mode") == true)

                val bottomNavItems = listOf(
                    Screen.Dashboard,
                    Screen.Scanner,
                    Screen.Pantry,
                    Screen.Recipes,
                    Screen.Nutrition
                )

                Scaffold(
                    modifier = Modifier.fillMaxSize().background(ObsidianBlack),
                    topBar = {
                        if (!isFullscreenRoute) {
                            TopAppBar(
                                title = {
                                    Text(
                                        text = "DRISHYAM",
                                        color = TextPrimary,
                                        fontWeight = FontWeight.Bold,
                                        letterSpacing = 2.sp,
                                        fontFamily = FontFamily.Serif,
                                        fontSize = 18.sp
                                    )
                                },
                                actions = {
                                    IconButton(onClick = { navController.navigate("flavour") }) {
                                        Icon(Icons.Default.ViewInAr, contentDescription = "Flavour 3D", tint = if (currentRoute == "flavour") MoltenOrange else TextSecondary)
                                    }
                                    IconButton(onClick = { navController.navigate("planner") }) {
                                        Icon(Icons.Default.CalendarMonth, contentDescription = "Meal Planner", tint = if (currentRoute == "planner") MoltenOrange else TextSecondary)
                                    }
                                    IconButton(onClick = { navController.navigate("shopping") }) {
                                        Icon(Icons.Default.ShoppingCart, contentDescription = "Shopping", tint = if (currentRoute == "shopping") MoltenOrange else TextSecondary)
                                    }
                                    IconButton(onClick = { navController.navigate("settings") }) {
                                        Icon(Icons.Default.Settings, contentDescription = "Settings", tint = if (currentRoute == "settings") MoltenOrange else TextSecondary)
                                    }
                                },
                                colors = TopAppBarDefaults.topAppBarColors(
                                    containerColor = DeepCharcoal,
                                    titleContentColor = TextPrimary
                                )
                            )
                        }
                    },
                    bottomBar = {
                        if (!isFullscreenRoute) {
                            NavigationBar(
                                containerColor = DeepCharcoal,
                                contentColor = TextPrimary
                            ) {
                                bottomNavItems.forEach { screen ->
                                    val isSelected = currentRoute == screen.route
                                    NavigationBarItem(
                                        selected = isSelected,
                                        onClick = {
                                            if (currentRoute != screen.route) {
                                                navController.navigate(screen.route) {
                                                    popUpTo(Screen.Dashboard.route) { saveState = true }
                                                    launchSingleTop = true
                                                    restoreState = true
                                                }
                                            }
                                        },
                                        icon = {
                                            Icon(
                                                screen.icon,
                                                contentDescription = screen.title,
                                                tint = if (isSelected) MoltenOrange else TextMuted
                                            )
                                        },
                                        label = {
                                            Text(
                                                screen.title,
                                                color = if (isSelected) MoltenOrange else TextMuted,
                                                fontSize = 11.sp
                                            )
                                        },
                                        colors = NavigationBarItemDefaults.colors(
                                            indicatorColor = DeepCharcoal
                                        )
                                    )
                                }
                            }
                        }
                    }
                ) { innerPadding ->
                    val startDest = if (app.authRepository.isUserLoggedIn()) Screen.Dashboard.route else "auth"

                    NavHost(
                        navController = navController,
                        startDestination = startDest,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable("auth") {
                            AuthScreen(
                                authRepository = app.authRepository,
                                onAuthSuccess = {
                                    navController.navigate("onboarding") {
                                        popUpTo("auth") { inclusive = true }
                                    }
                                }
                            )
                        }

                        composable("onboarding") {
                            OnboardingScreen(
                                accountRepository = app.accountRepository,
                                onOnboardingComplete = {
                                    navController.navigate(Screen.Dashboard.route) {
                                        popUpTo("onboarding") { inclusive = true }
                                    }
                                }
                            )
                        }

                        composable(Screen.Dashboard.route) {
                            DashboardScreen(
                                viewModel = dashboardViewModel,
                                onNavigateToScanner = { navController.navigate(Screen.Scanner.route) },
                                onNavigateToPantry = { navController.navigate(Screen.Pantry.route) },
                                onNavigateToRecipeDetail = { recipeId ->
                                    navController.navigate("recipe_detail/$recipeId")
                                },
                                onNavigateToGoals = { navController.navigate(Screen.Nutrition.route) }
                            )
                        }

                        composable(Screen.Scanner.route) {
                            ScannerScreen(
                                viewModel = scannerViewModel,
                                onNavigateBack = { navController.popBackStack() },
                                onNavigateToPantry = {
                                    navController.navigate(Screen.Pantry.route) {
                                        popUpTo(Screen.Dashboard.route)
                                    }
                                }
                            )
                        }

                        composable(Screen.Pantry.route) {
                            PantryScreen(
                                pantryRepository = app.pantryRepository,
                                onNavigateToScanner = { navController.navigate(Screen.Scanner.route) }
                            )
                        }

                        composable(Screen.Recipes.route) {
                            RecipesScreen(
                                recipeRepository = app.recipeRepository,
                                onNavigateToDetail = { recipeId ->
                                    navController.navigate("recipe_detail/$recipeId")
                                }
                            )
                        }

                        composable(
                            route = "recipe_detail/{recipeId}",
                            arguments = listOf(navArgument("recipeId") { type = NavType.StringType })
                        ) { backStackEntry ->
                            val recipeId = backStackEntry.arguments?.getString("recipeId") ?: ""
                            RecipeDetailScreen(
                                recipeId = recipeId,
                                recipeRepository = app.recipeRepository,
                                onNavigateBack = { navController.popBackStack() },
                                onStartCooking = { rId ->
                                    navController.navigate("cooking_mode/$rId")
                                }
                            )
                        }

                        composable(
                            route = "cooking_mode/{recipeId}",
                            arguments = listOf(navArgument("recipeId") { type = NavType.StringType })
                        ) { backStackEntry ->
                            val recipeId = backStackEntry.arguments?.getString("recipeId") ?: ""
                            CookingModeScreen(
                                recipeId = recipeId,
                                recipeRepository = app.recipeRepository,
                                nutritionRepository = app.nutritionRepository,
                                onCookingFinished = {
                                    navController.navigate(Screen.Nutrition.route) {
                                        popUpTo(Screen.Dashboard.route)
                                    }
                                },
                                onNavigateBack = { navController.popBackStack() }
                            )
                        }

                        composable("flavour") {
                            FlavourScienceScreen(
                                flavourRepository = app.flavourRepository
                            )
                        }

                        composable(Screen.Nutrition.route) {
                            NutritionScreen(
                                nutritionRepository = app.nutritionRepository
                            )
                        }

                        composable("planner") {
                            MealPlannerScreen(
                                plannerRepository = app.plannerRepository,
                                onNavigateToShopping = { navController.navigate("shopping") }
                            )
                        }

                        composable("shopping") {
                            ShoppingScreen(
                                shoppingRepository = app.shoppingRepository
                            )
                        }

                        composable("settings") {
                            SettingsScreen(
                                accountRepository = app.accountRepository,
                                authRepository = app.authRepository,
                                onLogout = {
                                    navController.navigate("auth") {
                                        popUpTo(0) { inclusive = true }
                                    }
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
}
