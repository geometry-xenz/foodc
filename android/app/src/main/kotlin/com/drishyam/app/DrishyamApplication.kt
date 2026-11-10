package com.drishyam.app

import android.app.Application
import androidx.room.Room
import com.drishyam.core.database.DrishyamDatabase
import com.drishyam.core.network.DrishyamApiService
import com.drishyam.data.repository.PantryRepositoryImpl
import com.drishyam.data.repository.RecipeRepositoryImpl
import com.drishyam.domain.repository.PantryRepository
import com.drishyam.domain.repository.RecipeRepository
import com.drishyam.domain.usecase.ConfirmScannedIngredientUseCase
import com.drishyam.domain.usecase.GetPantryUseCase
import com.drishyam.domain.usecase.RecommendRecipesUseCase
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import java.util.concurrent.TimeUnit

class DrishyamApplication : Application() {

    lateinit var database: DrishyamDatabase
    lateinit var apiService: DrishyamApiService

    lateinit var pantryRepository: PantryRepository
    lateinit var recipeRepository: RecipeRepository

    lateinit var getPantryUseCase: GetPantryUseCase
    lateinit var confirmScannedIngredientUseCase: ConfirmScannedIngredientUseCase
    lateinit var recommendRecipesUseCase: RecommendRecipesUseCase

    override fun onCreate() {
        super.onCreate()

        // 1. Initialize Room Local Database (Offline-First)
        database = Room.databaseBuilder(
            applicationContext,
            DrishyamDatabase::class.java,
            "drishyam_android.db"
        ).fallbackToDestructiveMigration().build()

        // 2. Initialize Retrofit + OkHttp with connection timeouts
        val okHttpClient = OkHttpClient.Builder()
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .addInterceptor(HttpLoggingInterceptor().apply { level = HttpLoggingInterceptor.Level.BASIC })
            .build()

        val json = Json {
            ignoreUnknownKeys = true
            isLenient = true
        }

        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8000/") // Default Android Emulator to host machine mapping
            .client(okHttpClient)
            .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
            .build()

        apiService = retrofit.create(DrishyamApiService::class.java)

        // 3. Initialize Repositories & Domain Use Cases
        pantryRepository = PantryRepositoryImpl(database.pantryDao(), apiService)
        recipeRepository = RecipeRepositoryImpl(apiService)

        getPantryUseCase = GetPantryUseCase(pantryRepository)
        confirmScannedIngredientUseCase = ConfirmScannedIngredientUseCase(pantryRepository)
        recommendRecipesUseCase = RecommendRecipesUseCase(recipeRepository)
    }
}
