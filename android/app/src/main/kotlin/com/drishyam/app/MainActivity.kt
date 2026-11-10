package com.drishyam.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Kitchen
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.PieChart
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.DrishyamTheme
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.feature.dashboard.DashboardScreen
import com.drishyam.feature.dashboard.DashboardViewModel
import com.drishyam.feature.scanner.ScannerScreen
import com.drishyam.feature.scanner.ScannerViewModel

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    data object Dashboard : Screen("dashboard", "Home", Icons.Default.PieChart)
    data object Scanner : Screen("scanner", "Scanner", Icons.Default.CameraAlt)
    data object Pantry : Screen("pantry", "Pantry", Icons.Default.Kitchen)
    data object Recipes : Screen("recipes", "Recipes", Icons.Default.MenuBook)
}

class MainActivity : ComponentActivity() {

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
            DrishyamTheme {
                val navController = rememberNavController()
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                Scaffold(
                    modifier = Modifier.fillMaxSize().background(ObsidianBlack),
                    bottomBar = {
                        // Hide bottom bar in full-screen camera scanner mode
                        if (currentRoute != Screen.Scanner.route) {
                            NavigationBar(
                                containerColor = DeepCharcoal,
                                contentColor = TextPrimary
                            ) {
                                val items = listOf(Screen.Dashboard, Screen.Scanner, Screen.Pantry, Screen.Recipes)
                                items.forEach { screen ->
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
                                                color = if (isSelected) MoltenOrange else TextMuted
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
                    NavHost(
                        navController = navController,
                        startDestination = Screen.Dashboard.route,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable(Screen.Dashboard.route) {
                            DashboardScreen(
                                viewModel = dashboardViewModel,
                                onNavigateToScanner = { navController.navigate(Screen.Scanner.route) },
                                onNavigateToPantry = { navController.navigate(Screen.Pantry.route) },
                                onNavigateToRecipeDetail = { /* Handled in detail flow */ },
                                onNavigateToGoals = { /* Handled in goals flow */ }
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
                            DashboardScreen(
                                viewModel = dashboardViewModel,
                                onNavigateToScanner = { navController.navigate(Screen.Scanner.route) },
                                onNavigateToPantry = {},
                                onNavigateToRecipeDetail = {},
                                onNavigateToGoals = {}
                            )
                        }

                        composable(Screen.Recipes.route) {
                            DashboardScreen(
                                viewModel = dashboardViewModel,
                                onNavigateToScanner = { navController.navigate(Screen.Scanner.route) },
                                onNavigateToPantry = {},
                                onNavigateToRecipeDetail = {},
                                onNavigateToGoals = {}
                            )
                        }
                    }
                }
            }
        }
    }
}
