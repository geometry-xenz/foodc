package com.drishyam.core.network

import okhttp3.Call
import okhttp3.Interceptor
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Protocol
import okhttp3.Request
import okhttp3.Response
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class TokenAuthenticatorTest {

    @Test
    fun `auth interceptor adds bearer token and request id`() {
        val tokenManager = InMemoryTokenManager(accessToken = "test-token-123", refreshToken = "ref-123")
        val interceptor = AuthInterceptor(tokenManager)

        var interceptedRequest: Request? = null
        val chain = object : Interceptor.Chain {
            override fun request(): Request = Request.Builder().url("https://api.drishyam.internal/api/pantry").build()
            override fun proceed(request: Request): Response {
                interceptedRequest = request
                return Response.Builder()
                    .request(request)
                    .protocol(Protocol.HTTP_1_1)
                    .code(200)
                    .message("OK")
                    .body("{}".toResponseBody("application/json".toMediaType()))
                    .build()
            }
            override fun call(): Call = throw NotImplementedError()
            override fun connectTimeoutMillis(): Int = 0
            override fun readTimeoutMillis(): Int = 0
            override fun writeTimeoutMillis(): Int = 0
            override fun withConnectTimeout(timeout: Int, unit: java.util.concurrent.TimeUnit): Interceptor.Chain = this
            override fun withReadTimeout(timeout: Int, unit: java.util.concurrent.TimeUnit): Interceptor.Chain = this
            override fun withWriteTimeout(timeout: Int, unit: java.util.concurrent.TimeUnit): Interceptor.Chain = this
            override fun connection() = null
        }

        interceptor.intercept(chain)

        assertNotNull(interceptedRequest)
        assertEquals("Bearer test-token-123", interceptedRequest?.header("Authorization"))
        assertNotNull(interceptedRequest?.header("X-Request-ID"))
    }

    @Test
    fun `authenticator retries with new token when refreshed`() {
        val tokenManager = InMemoryTokenManager(accessToken = "old-token", refreshToken = "valid-refresh-token")

        // Mock OkHttpClient for refresh call
        val mockRefreshClient = OkHttpClient.Builder()
            .addInterceptor { chain ->
                Response.Builder()
                    .request(chain.request())
                    .protocol(Protocol.HTTP_1_1)
                    .code(200)
                    .message("OK")
                    .body("""{"access_token":"new-rotated-token","refresh_token":"new-rotated-refresh"}""".toResponseBody("application/json".toMediaType()))
                    .build()
            }
            .build()

        val authenticator = TokenAuthenticator(
            tokenManager = tokenManager,
            baseUrl = "https://api.drishyam.internal",
            refreshClient = mockRefreshClient
        )

        val originalRequest = Request.Builder()
            .url("https://api.drishyam.internal/api/pantry")
            .header("Authorization", "Bearer old-token")
            .build()

        val response401 = Response.Builder()
            .request(originalRequest)
            .protocol(Protocol.HTTP_1_1)
            .code(401)
            .message("Unauthorized")
            .body("{}".toResponseBody("application/json".toMediaType()))
            .build()

        val retryRequest = authenticator.authenticate(null, response401)

        assertNotNull(retryRequest)
        assertEquals("Bearer new-rotated-token", retryRequest?.header("Authorization"))
        assertEquals("new-rotated-token", tokenManager.getAccessToken())
        assertEquals("new-rotated-refresh", tokenManager.getRefreshToken())
    }

    @Test
    fun `authenticator clears tokens on 401 refresh failure`() {
        val tokenManager = InMemoryTokenManager(accessToken = "old-token", refreshToken = "expired-refresh-token")

        val mockRefreshClient = OkHttpClient.Builder()
            .addInterceptor { chain ->
                Response.Builder()
                    .request(chain.request())
                    .protocol(Protocol.HTTP_1_1)
                    .code(401)
                    .message("Unauthorized")
                    .body("""{"detail":"Token expired"}""".toResponseBody("application/json".toMediaType()))
                    .build()
            }
            .build()

        val authenticator = TokenAuthenticator(
            tokenManager = tokenManager,
            baseUrl = "https://api.drishyam.internal",
            refreshClient = mockRefreshClient
        )

        val originalRequest = Request.Builder()
            .url("https://api.drishyam.internal/api/pantry")
            .header("Authorization", "Bearer old-token")
            .build()

        val response401 = Response.Builder()
            .request(originalRequest)
            .protocol(Protocol.HTTP_1_1)
            .code(401)
            .message("Unauthorized")
            .body("{}".toResponseBody("application/json".toMediaType()))
            .build()

        val retryRequest = authenticator.authenticate(null, response401)

        assertNull(retryRequest)
        assertFalse(tokenManager.isLoggedIn())
        assertNull(tokenManager.getAccessToken())
    }
}
