package com.drishyam.app.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.ViewInAr
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.drishyam.core.designsystem.theme.BioCarbGold
import com.drishyam.core.designsystem.theme.DeepCharcoal
import com.drishyam.core.designsystem.theme.MoltenOrange
import com.drishyam.core.designsystem.theme.ObsidianBlack
import com.drishyam.core.designsystem.theme.SurfaceBorder
import com.drishyam.core.designsystem.theme.SurfaceCard
import com.drishyam.core.designsystem.theme.TextMuted
import com.drishyam.core.designsystem.theme.TextPrimary
import com.drishyam.core.designsystem.theme.TextSecondary
import com.drishyam.core.designsystem.theme.TurmericAmber
import com.drishyam.core.model.FlavourGraphNode
import com.drishyam.domain.repository.FlavourRepository
import kotlinx.coroutines.launch
import kotlin.math.cos
import kotlin.math.min
import kotlin.math.sin
import kotlin.math.sqrt

data class ProjectedNode(
    val node: FlavourGraphNode,
    val screenX: Float,
    val screenY: Float,
    val depthZ: Float,
    val radius: Float
)

private fun project3DNodes(
    nodes: List<FlavourGraphNode>,
    rotX: Float,
    rotY: Float,
    zoomScale: Float,
    width: Float,
    height: Float
): List<ProjectedNode> {
    val centerX = width / 2f
    val centerY = height / 2f
    val baseRadius = min(width, height) * 0.38f * zoomScale

    val cosY = cos(rotY.toDouble()).toFloat()
    val sinY = sin(rotY.toDouble()).toFloat()
    val cosX = cos(rotX.toDouble()).toFloat()
    val sinX = sin(rotX.toDouble()).toFloat()

    return nodes.map { n ->
        val x1 = n.x * cosY + n.z * sinY
        val z1 = -n.x * sinY + n.z * cosY

        val y2 = n.y * cosX - z1 * sinX
        val z2 = n.y * sinX + z1 * cosX

        val fov = 3.5f
        val factor = fov / (fov + z2)

        val sx = centerX + x1 * baseRadius * factor
        val sy = centerY + y2 * baseRadius * factor
        val r = if (n.node_type == "ingredient") 24f * factor else 14f * factor

        ProjectedNode(n, sx, sy, z2, r)
    }
}

@Composable
fun FlavourScienceScreen(
    flavourRepository: FlavourRepository
) {
    var isListView by remember { mutableStateOf(false) }
    var nodes by remember { mutableStateOf<List<FlavourGraphNode>>(emptyList()) }
    var edges by remember { mutableStateOf<List<Pair<String, String>>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var selectedNode by remember { mutableStateOf<FlavourGraphNode?>(null) }

    val scope = rememberCoroutineScope()

    var rotX by remember { mutableFloatStateOf(0.3f) }
    var rotY by remember { mutableFloatStateOf(0.6f) }
    var zoomScale by remember { mutableFloatStateOf(1.0f) }

    LaunchedEffect(Unit) {
        isLoading = true
        scope.launch {
            val res = flavourRepository.getFlavourGraph()
            val data = res.getOrNull()
            if (data != null && data.nodes.isNotEmpty()) {
                nodes = data.nodes
                edges = data.edges.map { Pair(it.source, it.target) }
            } else {
                nodes = listOf(
                    FlavourGraphNode("turmeric", "Turmeric", "ingredient", 0.6f, -0.4f, 0.5f, "Powdered Spices", "Warm, peppery", 6),
                    FlavourGraphNode("cumin", "Cumin", "ingredient", -0.5f, 0.5f, 0.4f, "Whole Aromatics", "Nutty, earthy", 5),
                    FlavourGraphNode("coriander", "Coriander", "ingredient", 0.3f, 0.7f, -0.5f, "Whole Aromatics", "Citrus, floral", 5),
                    FlavourGraphNode("cardamom", "Green Cardamom", "ingredient", -0.6f, -0.4f, -0.5f, "Whole Aromatics", "Eucalyptus, spicy", 4),
                    FlavourGraphNode("curcumin", "Curcumin", "compound", 0.35f, -0.25f, 0.3f, null, "Woody, medicinal", 2),
                    FlavourGraphNode("cuminaldehyde", "Cuminaldehyde", "compound", -0.4f, 0.3f, 0.25f, null, "Pungent green cumin", 2),
                    FlavourGraphNode("linalool", "Linalool", "compound", 0.1f, 0.4f, -0.3f, null, "Sweet floral citrus", 3),
                    FlavourGraphNode("eucalyptol", "1,8-Cineole", "compound", -0.45f, -0.2f, -0.35f, null, "Cool herbal camphor", 2)
                )
                edges = listOf(
                    Pair("turmeric", "curcumin"),
                    Pair("cumin", "cuminaldehyde"),
                    Pair("coriander", "linalool"),
                    Pair("cardamom", "eucalyptol"),
                    Pair("cardamom", "linalool"),
                    Pair("turmeric", "linalool")
                )
            }
            isLoading = false
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Flavour Network 3D",
                        color = TextPrimary,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Serif
                    )
                    Text(
                        text = "Volatile aroma compound centroids (§5.8)",
                        color = TextSecondary,
                        fontSize = 12.sp
                    )
                }

                Row {
                    IconButton(onClick = { isListView = !isListView }) {
                        Icon(
                            if (isListView) Icons.Default.ViewInAr else Icons.Default.List,
                            contentDescription = "Toggle View",
                            tint = MoltenOrange
                        )
                    }
                    IconButton(onClick = {
                        rotX = 0.3f
                        rotY = 0.6f
                        zoomScale = 1.0f
                    }) {
                        Icon(Icons.Default.Refresh, contentDescription = "Reset Camera", tint = TextMuted)
                    }
                }
            }

            if (isLoading) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator(color = MoltenOrange)
                }
            } else if (isListView) {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 20.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    items(nodes, key = { it.id }) { node ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(SurfaceCard, RoundedCornerShape(12.dp))
                                .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
                                .padding(16.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(node.name, color = TextPrimary, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                                    Text(
                                        text = if (node.node_type == "ingredient") node.category ?: "Ingredient" else "Volatile Compound · ${node.aroma_profile ?: "Aromatic"}",
                                        color = if (node.node_type == "ingredient") MoltenOrange else BioCarbGold,
                                        fontSize = 12.sp
                                    )
                                }
                                Text("${node.degree} links", color = TextMuted, fontSize = 12.sp)
                            }
                        }
                    }
                }
            } else {
                BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
                    val density = LocalDensity.current
                    val widthPx = with(density) { maxWidth.toPx() }
                    val heightPx = with(density) { maxHeight.toPx() }

                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .pointerInput(Unit) {
                                detectTransformGestures { _, pan, zoom, _ ->
                                    zoomScale = (zoomScale * zoom).coerceIn(0.5f, 3.0f)
                                    rotY += pan.x * 0.008f
                                    rotX -= pan.y * 0.008f
                                }
                            }
                            .pointerInput(widthPx, heightPx, rotX, rotY, zoomScale, nodes) {
                                detectTapGestures { tapOffset ->
                                    val projected = project3DNodes(nodes, rotX, rotY, zoomScale, widthPx, heightPx)
                                    val hit = projected.minByOrNull { p ->
                                        val dx = p.screenX - tapOffset.x
                                        val dy = p.screenY - tapOffset.y
                                        sqrt(dx * dx + dy * dy)
                                    }
                                    if (hit != null) {
                                        val dx = hit.screenX - tapOffset.x
                                        val dy = hit.screenY - tapOffset.y
                                        val dist = sqrt(dx * dx + dy * dy)
                                        if (dist <= hit.radius * 2.5f) {
                                            selectedNode = hit.node
                                        }
                                    }
                                }
                            }
                    ) {
                        Canvas(modifier = Modifier.fillMaxSize()) {
                            val projected = project3DNodes(nodes, rotX, rotY, zoomScale, size.width, size.height)
                            val sorted = projected.sortedBy { it.depthZ }
                            val nodeMap = projected.associateBy { it.node.id }

                            // Draw Edges
                            edges.forEach { (srcId, tgtId) ->
                                val p1 = nodeMap[srcId]
                                val p2 = nodeMap[tgtId]
                                if (p1 != null && p2 != null) {
                                    val avgZ = (p1.depthZ + p2.depthZ) / 2f
                                    val alpha = ((avgZ + 1f) / 2f).coerceIn(0.15f, 0.85f)
                                    drawLine(
                                        color = MoltenOrange.copy(alpha = alpha * 0.4f),
                                        start = Offset(p1.screenX, p1.screenY),
                                        end = Offset(p2.screenX, p2.screenY),
                                        strokeWidth = 2.dp.toPx()
                                    )
                                }
                            }

                            // Draw Nodes
                            sorted.forEach { p ->
                                val isSelected = selectedNode?.id == p.node.id
                                val baseColor = if (p.node.node_type == "ingredient") TurmericAmber else BioCarbGold
                                val alpha = ((p.depthZ + 1.2f) / 2.4f).coerceIn(0.3f, 1f)

                                drawCircle(
                                    color = baseColor.copy(alpha = alpha),
                                    radius = p.radius,
                                    center = Offset(p.screenX, p.screenY)
                                )

                                if (isSelected) {
                                    drawCircle(
                                        color = MoltenOrange,
                                        radius = p.radius + 4.dp.toPx(),
                                        center = Offset(p.screenX, p.screenY),
                                        style = Stroke(width = 2.dp.toPx())
                                    )
                                }
                            }
                        }

                        // Detail Overlay Sheet
                        val activeNode = selectedNode
                        if (activeNode != null) {
                            Box(
                                modifier = Modifier
                                    .align(Alignment.BottomCenter)
                                    .fillMaxWidth()
                                    .padding(16.dp)
                                    .background(DeepCharcoal, RoundedCornerShape(16.dp))
                                    .border(1.dp, MoltenOrange, RoundedCornerShape(16.dp))
                                    .padding(18.dp)
                            ) {
                                Column {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Column {
                                            Text(activeNode.name, color = TextPrimary, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                                            Text(
                                                text = if (activeNode.node_type == "ingredient") "Catalogue Ingredient · ${activeNode.category ?: ""}" else "Volatile Organic Aroma Compound",
                                                color = MoltenOrange,
                                                fontSize = 12.sp,
                                                fontWeight = FontWeight.SemiBold
                                            )
                                        }
                                        IconButton(onClick = { selectedNode = null }) {
                                            Icon(Icons.Default.Close, contentDescription = "Close", tint = TextMuted)
                                        }
                                    }

                                    if (activeNode.aroma_profile != null) {
                                        Spacer(modifier = Modifier.height(8.dp))
                                        Text("Aroma note: ${activeNode.aroma_profile}", color = TextSecondary, fontSize = 13.sp)
                                    }

                                    Spacer(modifier = Modifier.height(8.dp))
                                    Text("Centroid coordinates: (x=${String.format("%.2f", activeNode.x)}, y=${String.format("%.2f", activeNode.y)}, z=${String.format("%.2f", activeNode.z)})", color = TextMuted, fontSize = 11.sp)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
