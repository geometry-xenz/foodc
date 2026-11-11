# DRISHYAM — System Limitations & Edge Cases

In accordance with our core engineering principles, DRISHYAM maintains absolute transparency regarding operational constraints, hardware boundaries, and physical limitations.

---

## 1. Computer Vision & Physical Kitchen Constraints

### 1.1 Look-Alike Powder Visual Overlap
- **Constraint:** Finely ground powders such as roasted cumin (*bhuna jeera*) powder, coriander (*dhaniya*) powder, and garam masala share overlapping RGB chromatic signatures under certain lighting conditions.
- **System Mitigation:** Rather than hallucinating a high-confidence prediction, the edge pipeline restricts confidence to the 0.75–0.90 bracket and presents the user with top-2 disambiguation chips. If uncertainty persists, the user is prompted to scan packaging text via OCR or use barcode lookup.

### 1.2 Extreme Lighting & Specular Glare
- **Constraint:** Stainless steel spice containers (*katoris* / *masala dabbas*) and transparent plastic jars produce severe specular highlights under harsh fluorescent or overhead kitchen spot lighting.
- **System Mitigation:** Android CameraX exposure compensation allows quick manual touch-to-expose adjustments. Edge inference filters out saturated white pixels before feeding crops to LiteRT.

### 1.3 Text OCR Language Coverage
- **Constraint:** On-device ML Kit OCR currently targets Latin (English) and Devanagari (Hindi) scripts for Indian spice packaging.
- **Future Scope:** Extended multilingual alias models covering regional scripts (Tamil, Telugu, Bengali, Kannada, Malayalam).

---

## 2. Platform & Hardware Boundaries

### 2.1 Web Browser Limitations (§3.1, §26)
- **Constraint:** Web browsers running on laptops, tablets, or smartphones are **deliberately forbidden** from accessing the camera scanner.
- **Rationale:** High-frequency 30 FPS inference with low-latency NPU delegates and physical haptic feedback is unachievable reliably via standard WebRTC / Canvas in standard browsers without excessive latency, battery drain, and thermal throttling. The camera scanner is strictly reserved for the native Android application.

### 2.2 Android OS Compatibility
- **Minimum SDK:** Android 8.0 Oreo (API 26) due to CameraX hardware-level requirement and modern crypto Keystore APIs. Older devices (API 25 and below) are unsupported.
- **NPU Acceleration:** Full int8 hardware acceleration requires Android 9.0+ Neural Networks API (NNAPI) or LiteRT GPU delegates. Devices lacking Vulkan/OpenCL drivers fall back to multi-threaded CPU inference.

---

## 3. Distributed Sync & Eventual Consistency

### 3.1 Server-Authoritative Concurrency
- When two devices mutate the same ingredient simultaneously while offline, the device syncing last receives a `409 Conflict` payload containing the server's current state. The server state always prevails; silent client overwrites never occur.
- For non-conflicting collections (adding different pantry items), mutations merge seamlessly.

### 3.2 Ephemeral Deep Inspect Constraints (§21)
- Deep Inspect requires active internet connectivity to reach the FastAPI backend.
- Requests are strictly capped at 10 requests per minute per authenticated account to preserve backend resources and prevent Denial of Service.
