package com.drishyam.data.sync

import com.drishyam.core.database.DrishyamDatabase
import com.drishyam.core.database.PantryEntity
import com.drishyam.core.database.ShoppingItemEntity
import com.drishyam.core.model.SyncOpItem
import com.drishyam.core.model.SyncPushRequest
import com.drishyam.core.network.DrishyamApiService
import com.drishyam.domain.repository.SyncRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.floatOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class SyncRepositoryImpl(
    private val database: DrishyamDatabase,
    private val apiService: DrishyamApiService
) : SyncRepository {

    private val json = Json { ignoreUnknownKeys = true }
    private var lastCursor: String? = null

    override suspend fun pushPendingOps(): Result<Int> = withContext(Dispatchers.IO) {
        runCatching {
            val pendingOps = database.outboxDao().getAllPendingOps()
            if (pendingOps.isEmpty()) return@runCatching 0

            val syncOpItems = pendingOps.map { entity ->
                val payloadObj = entity.payloadJson?.let {
                    runCatching { json.parseToJsonElement(it).jsonObject }.getOrNull()
                }
                SyncOpItem(
                    op_id = entity.opId,
                    entity = entity.entity,
                    id = entity.targetId,
                    op = entity.op,
                    base_version = entity.baseVersion,
                    data = payloadObj
                )
            }

            val response = apiService.syncPush(SyncPushRequest(syncOpItems))
            if (response.isSuccessful && response.body() != null) {
                val results = response.body()!!.results
                for (res in results) {
                    when (res.status) {
                        "applied", "duplicate" -> {
                            database.outboxDao().deleteOp(res.op_id)
                        }
                        "conflict" -> {
                            // §5.5 Server authoritative rule: server copy wins on conflict
                            database.outboxDao().deleteOp(res.op_id)
                            res.server_data?.let { serverJson ->
                                applyServerConflictRow(serverJson)
                            }
                        }
                        "rejected" -> {
                            database.outboxDao().deleteOp(res.op_id)
                        }
                    }
                }
                results.size
            } else {
                0
            }
        }
    }

    override suspend fun pullRemoteChanges(): Result<Int> = withContext(Dispatchers.IO) {
        runCatching {
            val response = apiService.syncChanges(since = lastCursor)
            if (response.isSuccessful && response.body() != null) {
                val body = response.body()!!
                lastCursor = body.cursor

                for (change in body.changes) {
                    when (change.entity) {
                        "pantry_item" -> {
                            val d = change.data
                            if (change.deleted) {
                                database.pantryDao().deleteById(change.id)
                            } else if (d != null) {
                                database.pantryDao().insertOrUpdate(
                                    PantryEntity(
                                        id = change.id,
                                        canonicalName = d["name"]?.jsonPrimitive?.content ?: change.id,
                                        displayName = (d["name"]?.jsonPrimitive?.content ?: change.id).replaceFirstChar { it.uppercase() },
                                        category = d["category"]?.jsonPrimitive?.content ?: "Spices",
                                        quantity = d["quantity"]?.jsonPrimitive?.doubleOrNull ?: 100.0,
                                        unit = d["unit"]?.jsonPrimitive?.content ?: "g",
                                        isAvailable = true,
                                        source = d["source"]?.jsonPrimitive?.content ?: "sync",
                                        confidence = d["confidence"]?.jsonPrimitive?.floatOrNull ?: 1.0f,
                                        confirmed = d["confirmed"]?.jsonPrimitive?.booleanOrNull ?: true,
                                        version = change.version,
                                        isDeleted = false,
                                        lastUpdated = System.currentTimeMillis()
                                    )
                                )
                            }
                        }
                        "shopping_item" -> {
                            val d = change.data
                            if (change.deleted) {
                                database.shoppingDao().deleteById(change.id)
                            } else if (d != null) {
                                database.shoppingDao().insertOrUpdate(
                                    ShoppingItemEntity(
                                        id = change.id,
                                        name = d["name"]?.jsonPrimitive?.content ?: change.id,
                                        quantity = d["quantity"]?.jsonPrimitive?.doubleOrNull ?: 1.0,
                                        unit = d["unit"]?.jsonPrimitive?.content ?: "pack",
                                        purchased = d["purchased"]?.jsonPrimitive?.booleanOrNull ?: false,
                                        reason = d["reason"]?.jsonPrimitive?.content,
                                        version = change.version,
                                        isDeleted = false,
                                        lastUpdated = System.currentTimeMillis()
                                    )
                                )
                            }
                        }
                    }
                }
                body.changes.size
            } else {
                0
            }
        }
    }

    override suspend fun performFullSync(): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            pushPendingOps()
            pullRemoteChanges()
            Unit
        }
    }

    private suspend fun applyServerConflictRow(serverJson: JsonObject) {
        val name = serverJson["name"]?.jsonPrimitive?.content ?: return
        val id = serverJson["id"]?.jsonPrimitive?.content ?: return
        val version = serverJson["version"]?.jsonPrimitive?.intOrNull ?: 1

        database.pantryDao().insertOrUpdate(
            PantryEntity(
                id = id,
                canonicalName = name,
                displayName = name.replaceFirstChar { it.uppercase() },
                category = serverJson["category"]?.jsonPrimitive?.content ?: "Spices",
                quantity = serverJson["quantity"]?.jsonPrimitive?.doubleOrNull ?: 100.0,
                unit = serverJson["unit"]?.jsonPrimitive?.content ?: "g",
                isAvailable = true,
                source = serverJson["source"]?.jsonPrimitive?.content ?: "sync",
                confidence = serverJson["confidence"]?.jsonPrimitive?.floatOrNull ?: 1.0f,
                confirmed = true,
                version = version,
                isDeleted = false,
                lastUpdated = System.currentTimeMillis()
            )
        )
    }

    private val JsonPrimitive.intOrNull: Int?
        get() = runCatching { this.content.toInt() }.getOrNull()
}
