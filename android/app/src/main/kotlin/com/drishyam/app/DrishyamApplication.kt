package com.drishyam.app

import android.app.Application
import androidx.room.Room
import com.drishyam.core.database.DrishyamDatabase
import com.drishyam.core.network.DrishyamApiService
import com.drishyam.core.network.NetworkClient
import com.drishyam.core.network.SharedPreferencesTokenManager
import com.drishyam.core.network.TokenManager
import com.drishyam.data.repository.AccountRepositoryImpl
import com.drishyam.data.repository.AuthRepositoryImpl
import com.drishyam.data.repository.FlavourRepositoryImpl
import com.drishyam.data.repository.NutritionRepositoryImpl
import com.drishyam.data.repository.PantryRepositoryImpl
import com.drishyam.data.repository.PlannerRepositoryImpl
import com.drishyam.data.repository.RecipeRepositoryImpl
import com.drishyam.data.repository.ShoppingRepositoryImpl
import com.drishyam.data.sync.SyncRepositoryImpl
import com.drishyam.domain.repository.AccountRepository
import com.drishyam.domain.repository.AuthRepository
import com.drishyam.domain.repository.FlavourRepository
import com.drishyam.domain.repository.NutritionRepository
import com.drishyam.domain.repository.PantryRepository
import com.drishyam.domain.repository.PlannerRepository
import com.drishyam.domain.repository.RecipeRepository
import com.drishyam.domain.repository.ShoppingRepository
import com.drishyam.domain.repository.SyncRepository
import com.drishyam.domain.usecase.ConfirmScannedIngredientUseCase
import com.drishyam.domain.usecase.GetPantryUseCase
import com.drishyam.domain.usecase.RecommendRecipesUseCase

class DrishyamApplication : Application() {

    lateinit var tokenManager: TokenManager
    lateinit var database: DrishyamDatabase
    lateinit var apiService: DrishyamApiService

    lateinit var syncRepository: SyncRepository
    lateinit var pantryRepository: PantryRepository
    lateinit var recipeRepository: RecipeRepository
    lateinit var plannerRepository: PlannerRepository
    lateinit var shoppingRepository: ShoppingRepository
    lateinit var nutritionRepository: NutritionRepository
    lateinit var flavourRepository: FlavourRepository
    lateinit var accountRepository: AccountRepository
    lateinit var authRepository: AuthRepository

    lateinit var getPantryUseCase: GetPantryUseCase
    lateinit var confirmScannedIngredientUseCase: ConfirmScannedIngredientUseCase
    lateinit var recommendRecipesUseCase: RecommendRecipesUseCase

    override fun onCreate() {
        super.onCreate()

        // 1. Token Manager
        tokenManager = SharedPreferencesTokenManager(applicationContext)

        // 2. Room Local Database (Offline-First)
        database = Room.databaseBuilder(
            applicationContext,
            DrishyamDatabase::class.java,
            "drishyam_android.db"
        ).fallbackToDestructiveMigration().build()

        // 3. API Service with Refresh Authenticator & Auth Interceptor
        apiService = NetworkClient.createApiService(
            baseUrl = "http://10.0.2.2:8000/",
            tokenManager = tokenManager,
            isDebug = true
        )

        // 4. Repositories
        syncRepository = SyncRepositoryImpl(database, apiService)
        pantryRepository = PantryRepositoryImpl(database, apiService, syncRepository)
        recipeRepository = RecipeRepositoryImpl(apiService)
        plannerRepository = PlannerRepositoryImpl(database, apiService)
        shoppingRepository = ShoppingRepositoryImpl(database, apiService)
        nutritionRepository = NutritionRepositoryImpl(database, apiService)
        flavourRepository = FlavourRepositoryImpl(apiService)
        accountRepository = AccountRepositoryImpl(apiService)
        authRepository = AuthRepositoryImpl(apiService, tokenManager, database)

        // 5. Use Cases
        getPantryUseCase = GetPantryUseCase(pantryRepository)
        confirmScannedIngredientUseCase = ConfirmScannedIngredientUseCase(pantryRepository)
        recommendRecipesUseCase = RecommendRecipesUseCase(recipeRepository)
    }
}
