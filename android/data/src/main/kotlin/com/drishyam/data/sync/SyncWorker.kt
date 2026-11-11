package com.drishyam.data.sync

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.drishyam.domain.repository.SyncRepository

class SyncWorker(
    appContext: Context,
    workerParams: WorkerParameters,
    private val syncRepository: SyncRepository
) : CoroutineWorker(appContext, workerParams) {

    override suspend fun doWork(): Result {
        return try {
            val result = syncRepository.performFullSync()
            if (result.isSuccess) {
                Result.success()
            } else {
                Result.retry()
            }
        } catch (e: Exception) {
            Result.retry()
        }
    }
}
