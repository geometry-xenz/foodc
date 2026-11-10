pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "drishyam-android"

// Main Application
include(":app")

// Core modules
include(":core:common")
include(":core:model")
include(":core:designsystem")
include(":core:ui")
include(":core:network")
include(":core:database")
include(":core:security")
include(":core:sync")

// Vision & Edge AI
include(":vision")

// Domain & Data
include(":domain")
include(":data")

// Feature modules
include(":feature:auth")
include(":feature:dashboard")
include(":feature:scanner")
include(":feature:pantry")
include(":feature:recipes")
include(":feature:recipedetails")
include(":feature:flavorscience")
include(":feature:nutrition")
include(":feature:goals")
include(":feature:mealplanner")
