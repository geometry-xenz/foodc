package com.drishyam.core.network

import okhttp3.Interceptor
import okhttp3.Response
import java.util.UUID

class AuthInterceptor(
    private val tokenManager: TokenManager
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        val requestBuilder = originalRequest.newBuilder()
            .header("X-Request-ID", UUID.randomUUID().toString())

        // Attach Authorization header if access token exists and not already provided
        val token = tokenManager.getAccessToken()
        if (token != null && originalRequest.header("Authorization") == null) {
            requestBuilder.header("Authorization", "Bearer $token")
        }

        return chain.proceed(requestBuilder.build())
    }
}
