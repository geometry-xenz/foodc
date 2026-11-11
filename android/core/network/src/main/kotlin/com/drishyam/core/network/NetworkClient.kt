package com.drishyam.core.network

import retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import java.util.concurrent.TimeUnit

object NetworkClient {

    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
        encodeDefaults = true
    }

    fun createApiService(
        baseUrl: String = "http://10.0.2.2:8000/",
        tokenManager: TokenManager,
        isDebug: Boolean = true
    ): DrishyamApiService {
        val loggingInterceptor = HttpLoggingInterceptor().apply {
            level = if (isDebug) HttpLoggingInterceptor.Level.BODY else HttpLoggingInterceptor.Level.NONE
        }

        val authInterceptor = AuthInterceptor(tokenManager)
        val tokenAuthenticator = TokenAuthenticator(tokenManager, baseUrl)

        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .authenticator(tokenAuthenticator)
            .addInterceptor(loggingInterceptor)
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(20, TimeUnit.SECONDS)
            .writeTimeout(20, TimeUnit.SECONDS)
            .build()

        val contentType = "application/json".toMediaType()

        val retrofit = Retrofit.Builder()
            .baseUrl(if (baseUrl.endsWith("/")) baseUrl else "$baseUrl/")
            .client(okHttpClient)
            .addConverterFactory(json.asConverterFactory(contentType))
            .build()

        return retrofit.create(DrishyamApiService::class.java)
    }
}
