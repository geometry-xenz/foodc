package com.drishyam.core.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

@Serializable
data class SyncOpItem(
    val op_id: String,
    val entity: String,
    val id: String,
    val op: String = "upsert",
    val base_version: Int? = null,
    val data: JsonObject? = null
)

@Serializable
data class SyncPushRequest(
    val ops: List<SyncOpItem>
)

@Serializable
data class SyncOpResult(
    val op_id: String,
    val status: String, // "applied", "duplicate", "conflict", "rejected"
    val version: Int? = null,
    val error: String? = null,
    val server_data: JsonObject? = null
)

@Serializable
data class SyncPushResponse(
    val results: List<SyncOpResult>
)

@Serializable
data class SyncChangeItem(
    val entity: String,
    val id: String,
    val version: Int = 1,
    val deleted: Boolean = false,
    val updated_at: String,
    val data: JsonObject? = null
)

@Serializable
data class SyncChangesResponse(
    val changes: List<SyncChangeItem>,
    val cursor: String? = null,
    val has_more: Boolean = false
)
