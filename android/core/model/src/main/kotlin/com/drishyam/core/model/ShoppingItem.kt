package com.drishyam.core.model

import kotlinx.serialization.Serializable

@Serializable
data class ShoppingItem(
    val id: String,
    val name: String,
    val category: String = "Pantry",
    val quantity: Double = 1.0,
    val unit: String = "pack",
    val purchased: Boolean = false,
    val reason: String? = null,
    val version: Int = 1,
    val isDeleted: Boolean = false
)
