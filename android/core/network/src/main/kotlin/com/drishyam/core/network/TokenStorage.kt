package com.drishyam.core.network

import android.content.Context
import android.content.SharedPreferences

interface TokenManager {
    fun getAccessToken(): String?
    fun getRefreshToken(): String?
    fun setTokens(accessToken: String, refreshToken: String)
    fun clearTokens()
    fun isLoggedIn(): Boolean
}

class SharedPreferencesTokenManager(context: Context) : TokenManager {
    private val prefs: SharedPreferences = context.getSharedPreferences("drishyam_auth_tokens", Context.MODE_PRIVATE)

    override fun getAccessToken(): String? = prefs.getString(KEY_ACCESS_TOKEN, null)

    override fun getRefreshToken(): String? = prefs.getString(KEY_REFRESH_TOKEN, null)

    override fun setTokens(accessToken: String, refreshToken: String) {
        prefs.edit()
            .putString(KEY_ACCESS_TOKEN, accessToken)
            .putString(KEY_REFRESH_TOKEN, refreshToken)
            .apply()
    }

    override fun clearTokens() {
        prefs.edit()
            .remove(KEY_ACCESS_TOKEN)
            .remove(KEY_REFRESH_TOKEN)
            .apply()
    }

    override fun isLoggedIn(): Boolean = getAccessToken() != null

    companion object {
        private const val KEY_ACCESS_TOKEN = "access_token"
        private const val KEY_REFRESH_TOKEN = "refresh_token"
    }
}

class InMemoryTokenManager(
    private var accessToken: String? = null,
    private var refreshToken: String? = null
) : TokenManager {
    override fun getAccessToken(): String? = accessToken
    override fun getRefreshToken(): String? = refreshToken

    override fun setTokens(accessToken: String, refreshToken: String) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    override fun clearTokens() {
        this.accessToken = null
        this.refreshToken = null
    }

    override fun isLoggedIn(): Boolean = accessToken != null
}
