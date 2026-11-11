package com.drishyam.app.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.SurfaceCard
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.core.model.UserProfile
import com.drishyam.core.model.UserSettings
import com.drishyam.domain.repository.AccountRepository
import com.drishyam.domain.repository.AuthRepository
import kotlinx.coroutines.launch

@Composable
fun SettingsScreen(
    accountRepository: AccountRepository,
    authRepository: AuthRepository,
    onLogout: () -> Unit
) {
    var profile by remember { mutableStateOf<UserProfile?>(null) }
    var settings by remember { mutableStateOf(UserSettings()) }
    var showDeleteConfirmDialog by remember { mutableStateOf(false) }

    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        val p = accountRepository.getProfile().getOrNull()
        val s = accountRepository.getSettings().getOrNull()
        if (p != null) profile = p
        if (s != null) settings = s
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Settings & Profile",
            color = TextPrimary,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Serif
        )
        Text(
            text = "Hardware feedback, units & account governance (§5.4)",
            color = TextSecondary,
            fontSize = 12.sp
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Hardware & Motion Toggles
        Text("DEVICE SENSORY PREFERENCES", color = MoltenOrange, fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
        Spacer(modifier = Modifier.height(8.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceCard, RoundedCornerShape(14.dp))
                .border(1.dp, SurfaceBorder, RoundedCornerShape(14.dp))
                .padding(16.dp)
        ) {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("Audio Chimes", color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                        Text("Play chime on confirmed camera detection", color = TextMuted, fontSize = 12.sp)
                    }
                    Switch(
                        checked = settings.soundEnabled,
                        onCheckedChange = {
                            settings = settings.copy(soundEnabled = it)
                            scope.launch { accountRepository.updateSettings(settings) }
                        },
                        colors = SwitchDefaults.colors(checkedThumbColor = MoltenOrange, checkedTrackColor = DeepCharcoal)
                    )
                }

                Spacer(modifier = Modifier.height(14.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("Tactile Haptics", color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                        Text("Haptic pulse on swipe commit & detection lock", color = TextMuted, fontSize = 12.sp)
                    }
                    Switch(
                        checked = settings.hapticsEnabled,
                        onCheckedChange = {
                            settings = settings.copy(hapticsEnabled = it)
                            scope.launch { accountRepository.updateSettings(settings) }
                        },
                        colors = SwitchDefaults.colors(checkedThumbColor = MoltenOrange, checkedTrackColor = DeepCharcoal)
                    )
                }

                Spacer(modifier = Modifier.height(14.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("Reduced Motion", color = TextPrimary, fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                        Text("Disable 3D rotation & continuous sweep", color = TextMuted, fontSize = 12.sp)
                    }
                    Switch(
                        checked = settings.reducedMotion,
                        onCheckedChange = {
                            settings = settings.copy(reducedMotion = it)
                            scope.launch { accountRepository.updateSettings(settings) }
                        },
                        colors = SwitchDefaults.colors(checkedThumbColor = MoltenOrange, checkedTrackColor = DeepCharcoal)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        // Account Governance Section
        Text("ACCOUNT & SECURITY", color = Color(0xFFFF4757), fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp)
        Spacer(modifier = Modifier.height(8.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceCard, RoundedCornerShape(14.dp))
                .border(1.dp, SurfaceBorder, RoundedCornerShape(14.dp))
                .padding(16.dp)
        ) {
            Column {
                Button(
                    onClick = {
                        scope.launch {
                            authRepository.logout()
                            onLogout()
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = DeepCharcoal),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text("Sign Out", color = TextPrimary, fontWeight = FontWeight.SemiBold)
                }

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedButton(
                    onClick = {
                        scope.launch {
                            authRepository.logoutAll()
                            onLogout()
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = MoltenOrange),
                    border = ButtonDefaults.outlinedButtonBorder.copy(brush = androidx.compose.ui.graphics.SolidColor(SurfaceBorder))
                ) {
                    Text("Log Out from All Devices", color = MoltenOrange, fontSize = 13.sp)
                }

                Spacer(modifier = Modifier.height(10.dp))

                Button(
                    onClick = { showDeleteConfirmDialog = true },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0x33FF4757)),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text("Delete Account & All Culinary Data", color = Color(0xFFFF4757), fontWeight = FontWeight.Bold, fontSize = 13.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(32.dp))
    }

    if (showDeleteConfirmDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteConfirmDialog = false },
            title = { Text("Delete Account Confirmation", color = Color(0xFFFF4757)) },
            text = {
                Text(
                    "This action is permanent and conforms to §5.3. All pantry inventory, recipes, meal plans, and biometric profiles will be deleted.",
                    color = TextSecondary,
                    fontSize = 13.sp
                )
            },
            confirmButton = {
                Button(
                    onClick = {
                        scope.launch {
                            authRepository.logout()
                            onLogout()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFFF4757))
                ) {
                    Text("Confirm Deletion", color = Color.White, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteConfirmDialog = false }) {
                    Text("Cancel", color = TextSecondary)
                }
            },
            containerColor = DeepCharcoal
        )
    }
}
