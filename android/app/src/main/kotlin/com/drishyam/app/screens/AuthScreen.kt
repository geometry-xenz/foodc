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
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Mail
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
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
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SaffronGlow
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.SurfaceCard
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.domain.repository.AuthRepository
import kotlinx.coroutines.launch

enum class AuthMode {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}

@Composable
fun AuthScreen(
    authRepository: AuthRepository,
    onAuthSuccess: () -> Unit
) {
    var mode by remember { mutableStateOf(AuthMode.LOGIN) }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var name by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    var infoMessage by remember { mutableStateOf<String?>(null) }

    val scope = rememberCoroutineScope()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // Logo / Wordmark
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Restaurant,
                    contentDescription = "DRISHYAM",
                    tint = MoltenOrange,
                    modifier = Modifier.size(36.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Text(
                    text = "DRISHYAM",
                    color = TextPrimary,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 4.sp,
                    fontFamily = FontFamily.Serif
                )
            }

            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Computational Gastronomy & Nutrition",
                color = TextSecondary,
                fontSize = 13.sp,
                letterSpacing = 1.sp
            )

            Spacer(modifier = Modifier.height(32.dp))

            // Auth Card
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(SurfaceCard, RoundedCornerShape(16.dp))
                    .border(1.dp, SurfaceBorder, RoundedCornerShape(16.dp))
                    .padding(24.dp)
            ) {
                Column {
                    Text(
                        text = when (mode) {
                            AuthMode.LOGIN -> "Welcome Back"
                            AuthMode.REGISTER -> "Create Account"
                            AuthMode.FORGOT_PASSWORD -> "Reset Password"
                        },
                        color = TextPrimary,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.SemiBold
                    )

                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = when (mode) {
                            AuthMode.LOGIN -> "Sign in to access your kitchen intelligence."
                            AuthMode.REGISTER -> "Join the future of personalized culinary science."
                            AuthMode.FORGOT_PASSWORD -> "Enter your email to receive recovery instructions."
                        },
                        color = TextMuted,
                        fontSize = 12.sp
                    )

                    if (errorMessage != null) {
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = errorMessage!!,
                            color = Color(0xFFFF4757),
                            fontSize = 13.sp
                        )
                    }

                    if (infoMessage != null) {
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = infoMessage!!,
                            color = Color(0xFF2ED573),
                            fontSize = 13.sp
                        )
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    if (mode == AuthMode.REGISTER) {
                        OutlinedTextField(
                            value = name,
                            onValueChange = { name = it },
                            label = { Text("Full Name", color = TextSecondary) },
                            leadingIcon = { Icon(Icons.Default.Person, contentDescription = null, tint = TextMuted) },
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedTextColor = TextPrimary,
                                unfocusedTextColor = TextPrimary,
                                focusedBorderColor = MoltenOrange,
                                unfocusedBorderColor = SurfaceBorder
                            )
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                    }

                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("Email Address", color = TextSecondary) },
                        leadingIcon = { Icon(Icons.Default.Mail, contentDescription = null, tint = TextMuted) },
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                        modifier = Modifier.fillMaxWidth(),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = TextPrimary,
                            unfocusedTextColor = TextPrimary,
                            focusedBorderColor = MoltenOrange,
                            unfocusedBorderColor = SurfaceBorder
                        )
                    )

                    if (mode != AuthMode.FORGOT_PASSWORD) {
                        Spacer(modifier = Modifier.height(12.dp))
                        OutlinedTextField(
                            value = password,
                            onValueChange = { password = it },
                            label = { Text("Password", color = TextSecondary) },
                            leadingIcon = { Icon(Icons.Default.Lock, contentDescription = null, tint = TextMuted) },
                            singleLine = true,
                            visualTransformation = PasswordVisualTransformation(),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                            modifier = Modifier.fillMaxWidth(),
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedTextColor = TextPrimary,
                                unfocusedTextColor = TextPrimary,
                                focusedBorderColor = MoltenOrange,
                                unfocusedBorderColor = SurfaceBorder
                            )
                        )
                    }

                    if (mode == AuthMode.LOGIN) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.End
                        ) {
                            TextButton(onClick = { mode = AuthMode.FORGOT_PASSWORD }) {
                                Text("Forgot password?", color = MoltenOrange, fontSize = 12.sp)
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Primary Action Button
                    Button(
                        onClick = {
                            errorMessage = null
                            infoMessage = null
                            isLoading = true
                            scope.launch {
                                when (mode) {
                                    AuthMode.LOGIN -> {
                                        val res = authRepository.login(email.trim(), password)
                                        isLoading = false
                                        if (res.isSuccess) onAuthSuccess() else errorMessage = "Invalid email or password"
                                    }
                                    AuthMode.REGISTER -> {
                                        val res = authRepository.register(email.trim(), password, name.ifBlank { null })
                                        isLoading = false
                                        if (res.isSuccess) onAuthSuccess() else errorMessage = "Registration failed. Password must be >= 8 chars."
                                    }
                                    AuthMode.FORGOT_PASSWORD -> {
                                        val res = authRepository.forgotPassword(email.trim())
                                        isLoading = false
                                        if (res.isSuccess) infoMessage = "Reset instructions sent to your email." else errorMessage = "Failed to send reset link."
                                    }
                                }
                            }
                        },
                        modifier = Modifier.fillMaxWidth().height(48.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange),
                        shape = RoundedCornerShape(8.dp),
                        enabled = !isLoading && email.isNotBlank() && (mode == AuthMode.FORGOT_PASSWORD || password.isNotBlank())
                    ) {
                        if (isLoading) {
                            CircularProgressIndicator(modifier = Modifier.size(20.dp), color = ObsidianBlack, strokeWidth = 2.dp)
                        } else {
                            Text(
                                text = when (mode) {
                                    AuthMode.LOGIN -> "Sign In"
                                    AuthMode.REGISTER -> "Create Account"
                                    AuthMode.FORGOT_PASSWORD -> "Send Reset Link"
                                },
                                color = ObsidianBlack,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp
                            )
                        }
                    }

                    if (mode == AuthMode.LOGIN) {
                        Spacer(modifier = Modifier.height(12.dp))
                        // Demo Access Button (§5.4)
                        OutlinedButton(
                            onClick = {
                                errorMessage = null
                                isLoading = true
                                scope.launch {
                                    val res = authRepository.loginDemo()
                                    isLoading = false
                                    if (res.isSuccess) onAuthSuccess() else errorMessage = "Demo login failed."
                                }
                            },
                            modifier = Modifier.fillMaxWidth().height(48.dp),
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.outlinedButtonColors(contentColor = TextPrimary),
                            border = ButtonDefaults.outlinedButtonBorder.copy(brush = androidx.compose.ui.graphics.SolidColor(SurfaceBorder))
                        ) {
                            Text("Explore as Demo Chef", color = TextPrimary, fontSize = 13.sp)
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Switch Mode Links
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        when (mode) {
                            AuthMode.LOGIN -> {
                                Text("New to DRISHYAM?", color = TextSecondary, fontSize = 13.sp)
                                TextButton(onClick = { mode = AuthMode.REGISTER }) {
                                    Text("Register", color = MoltenOrange, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                                }
                            }
                            AuthMode.REGISTER -> {
                                Text("Already have an account?", color = TextSecondary, fontSize = 13.sp)
                                TextButton(onClick = { mode = AuthMode.LOGIN }) {
                                    Text("Sign In", color = MoltenOrange, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                                }
                            }
                            AuthMode.FORGOT_PASSWORD -> {
                                IconButton(onClick = { mode = AuthMode.LOGIN }) {
                                    Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = MoltenOrange)
                                }
                                Text("Back to Sign In", color = TextSecondary, fontSize = 13.sp)
                            }
                        }
                    }
                }
            }
        }
    }
}
