package com.drishyam.app.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
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
import androidx.compose.ui.text.style.TextDecoration
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
import com.drishyam.core.model.ShoppingItem
import com.drishyam.domain.repository.ShoppingRepository
import kotlinx.coroutines.launch
import java.util.UUID

@Composable
fun ShoppingScreen(
    shoppingRepository: ShoppingRepository
) {
    val shoppingItems by shoppingRepository.getShoppingList().collectAsState(initial = emptyList())
    val scope = rememberCoroutineScope()

    var showAddDialog by remember { mutableStateOf(false) }
    var newItemName by remember { mutableStateOf("") }
    var newItemQuantity by remember { mutableStateOf("1") }
    var newItemUnit by remember { mutableStateOf("pack") }

    val pendingItems = shoppingItems.filter { !it.purchased }
    val completedItems = shoppingItems.filter { it.purchased }

    Scaffold(
        containerColor = ObsidianBlack
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 20.dp)
        ) {
            Spacer(modifier = Modifier.height(16.dp))

            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Shopping Checklist",
                        color = TextPrimary,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Serif
                    )
                    Text(
                        text = "${pendingItems.size} items required for upcoming meal plans",
                        color = TextSecondary,
                        fontSize = 12.sp
                    )
                }

                IconButton(onClick = { showAddDialog = true }) {
                    Icon(Icons.Default.Add, contentDescription = "Add Item", tint = MoltenOrange)
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            if (shoppingItems.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.ShoppingCart, contentDescription = null, tint = TextMuted, modifier = Modifier.size(48.dp))
                        Spacer(modifier = Modifier.height(12.dp))
                        Text("No shopping items needed", color = TextPrimary, fontWeight = FontWeight.SemiBold)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Build from Meal Planner or tap + to add items", color = TextMuted, fontSize = 13.sp)
                    }
                }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    if (pendingItems.isNotEmpty()) {
                        item {
                            Text("NEEDED ITEMS", color = MoltenOrange, fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp, modifier = Modifier.padding(top = 8.dp, bottom = 4.dp))
                        }
                        items(pendingItems, key = { it.id }) { item ->
                            ShoppingRow(
                                item = item,
                                onToggle = { scope.launch { shoppingRepository.togglePurchased(item.id, !item.purchased) } },
                                onDelete = { scope.launch { shoppingRepository.removeShoppingItem(item.id) } }
                            )
                        }
                    }

                    if (completedItems.isNotEmpty()) {
                        item {
                            Text("PURCHASED", color = TextMuted, fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.sp, modifier = Modifier.padding(top = 16.dp, bottom = 4.dp))
                        }
                        items(completedItems, key = { it.id }) { item ->
                            ShoppingRow(
                                item = item,
                                onToggle = { scope.launch { shoppingRepository.togglePurchased(item.id, !item.purchased) } },
                                onDelete = { scope.launch { shoppingRepository.removeShoppingItem(item.id) } }
                            )
                        }
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        AlertDialog(
            onDismissRequest = { showAddDialog = false },
            title = { Text("Add Shopping Item", color = TextPrimary) },
            text = {
                Column {
                    OutlinedTextField(
                        value = newItemName,
                        onValueChange = { newItemName = it },
                        label = { Text("Item Name (e.g. Kashmiri Chilli Powder)") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = newItemQuantity,
                            onValueChange = { newItemQuantity = it },
                            label = { Text("Qty") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = newItemUnit,
                            onValueChange = { newItemUnit = it },
                            label = { Text("Unit") },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (newItemName.isNotBlank()) {
                            val newItem = ShoppingItem(
                                id = UUID.randomUUID().toString(),
                                name = newItemName.trim(),
                                quantity = newItemQuantity.toDoubleOrNull() ?: 1.0,
                                unit = newItemUnit.trim(),
                                purchased = false
                            )
                            scope.launch { shoppingRepository.addShoppingItem(newItem) }
                            newItemName = ""
                            showAddDialog = false
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MoltenOrange)
                ) {
                    Text("Add", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showAddDialog = false }) {
                    Text("Cancel", color = TextSecondary)
                }
            },
            containerColor = DeepCharcoal
        )
    }
}

@Composable
fun ShoppingRow(
    item: ShoppingItem,
    onToggle: () -> Unit,
    onDelete: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(SurfaceCard, RoundedCornerShape(12.dp))
            .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
            .clickable { onToggle() }
            .padding(14.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(24.dp)
                        .background(if (item.purchased) Color(0xFF2ED573) else Color.Transparent, CircleShape)
                        .border(1.5.dp, if (item.purchased) Color(0xFF2ED573) else SurfaceBorder, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    if (item.purchased) {
                        Icon(Icons.Default.Check, contentDescription = null, tint = ObsidianBlack, modifier = Modifier.size(16.dp))
                    }
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = item.name,
                        color = if (item.purchased) TextMuted else TextPrimary,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Medium,
                        textDecoration = if (item.purchased) TextDecoration.LineThrough else TextDecoration.None
                    )
                    Text(
                        text = "${item.quantity.toInt()} ${item.unit} ${if (item.reason != null) "· ${item.reason}" else ""}",
                        color = TextMuted,
                        fontSize = 12.sp
                    )
                }
            }

            IconButton(onClick = onDelete) {
                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = TextMuted, modifier = Modifier.size(16.dp))
            }
        }
    }
}
