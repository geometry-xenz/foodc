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
include(":core:model")
include(":core:designsystem")
include(":core:ui")
include(":core:network")
include(":core:database")

// Domain, Data & Vision (D8)
include(":domain")
include(":data")
include(":vision")

// Feature modules
include(":feature:dashboard")
include(":feature:scanner")
