package com.drishyam.core.network

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import okhttp3.Authenticator
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import okhttp3.Route

class TokenAuthenticator(
    private val tokenManager: TokenManager,
    private val baseUrl: String,
    private val refreshClient: OkHttpClient = OkHttpClient()
) : Authenticator {

    private val lock = Any()
    private val json = Json { ignoreUnknownKeys = true }

    override fun authenticate(route: Route?, response: Response): Request? {
        val originalToken = tokenManager.getAccessToken()

        // If the request already failed with this access token, attempt refresh
        val requestAuthHeader = response.request.header("Authorization")
        if (requestAuthHeader != null && originalToken != null && !requestAuthHeader.endsWith(originalToken)) {
            // Token was already refreshed by another thread, retry immediately with the new token
            return response.request.newBuilder()
                .header("Authorization", "Bearer $originalToken")
                .build()
        }

        synchronized(lock) {
            val currentToken = tokenManager.getAccessToken()
            // Check again inside lock in case another thread just completed refresh
            if (currentToken != null && currentToken != originalToken) {
                return response.request.newBuilder()
                    .header("Authorization", "Bearer $currentToken")
                    .build()
            }

            val refreshToken = tokenManager.getRefreshToken() ?: return null

            // Perform synchronous refresh call
            val refreshUrl = if (baseUrl.endsWith("/")) "${baseUrl}api/auth/refresh" else "$baseUrl/api/auth/refresh"
            val jsonBody = """{"refresh_token":"$refreshToken"}"""
            val refreshRequest = Request.Builder()
                .url(refreshUrl)
                .post(jsonBody.toRequestBody("application/json".toMediaType()))
                .build()

            try {
                val refreshResponse = refreshClient.newCall(refreshRequest).execute()
                if (refreshResponse.isSuccessful) {
                    val responseBody = refreshResponse.body?.string() ?: return null
                    val parsed = json.parseToJsonElement(responseBody).jsonObject
                    val newAccessToken = parsed["access_token"]?.jsonPrimitive?.content
                    val newRefreshToken = parsed["refresh_token"]?.jsonPrimitive?.content ?: refreshToken

                    if (newAccessToken != null) {
                        tokenManager.setTokens(newAccessToken, newRefreshToken)
                        return response.request.newBuilder()
                            .header("Authorization", "Bearer $newAccessToken")
                            .build()
                    }
                } else {
                    // Refresh failed (e.g. 401 expired or revoked session) -> clear tokens
                    tokenManager.clearTokens()
                }
            } catch (e: Exception) {
                // Network error during refresh, fail without clearing tokens
                return null
            }
            return null
        }
    }
}
