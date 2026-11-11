# DRISHYAM — Kinetic Design & Motion System (§5.8)

DRISHYAM adheres to a unified kinetic design language that bridges Next.js web animations and Jetpack Compose mobile interactions.

---

## 1. Shared Kinetic Motion Tokens

| Token | Value | Web (CSS / GSAP) | Android (`DrishyamMotion`) | Purpose |
|---|---|---|---|---|
| **Duration `instant`** | 90 ms | `var(--duration-instant)` | `DrishyamMotion.DurationInstantMs` | Press & haptic feedback |
| **Duration `quick`** | 180 ms | `var(--duration-quick)` | `DrishyamMotion.DurationQuickMs` | Hover, chips, tab indicators |
| **Duration `standard`** | 320 ms | `var(--duration-standard)` | `DrishyamMotion.DurationStandardMs` | Panels, sheets, dialogs |
| **Duration `emphasized`**| 560 ms | `var(--duration-emphasized)`| `DrishyamMotion.DurationEmphasizedMs`| Page reveals, hero animations |
| **Easing `standard`** | `(0.2, 0.0, 0.0, 1.0)` | `cubic-bezier(.2, 0, 0, 1)` | `DrishyamMotion.EasingStandard` | Default fluid transitions |
| **Easing `decelerate`**| `(0.05, 0.7, 0.1, 1.0)`| `cubic-bezier(.05, .7, .1, 1)` | `DrishyamMotion.EasingDecelerate`| Elements entering viewport |
| **Easing `exit`** | `(0.3, 0.0, 0.8, 0.15)`| `cubic-bezier(.3, 0, .8, .15)` | `DrishyamMotion.EasingExit` | Elements leaving viewport |
| **Springs** | Damping 0.8 | GSAP CustomEase | `gestureSpring()` (medium-low stiffness) | Swipes, dismissals, drags |

---

## 2. Web Implementation (GSAP 3.15 + Three.js 0.180)

1. **Scroll-Driven Scrubbing:**
   Cinematic hero video and section reveals are synchronized with scroll progress via GSAP `ScrollTrigger`.
2. **Three.js Flavor Network:**
   - 3D particle and force-directed graph rendering volatile flavor compounds.
   - Low-end hardware throttling: particle count is halved when `navigator.hardwareConcurrency <= 4` or `navigator.deviceMemory <= 4`.
   - Device pixel ratio capped at 2.0 to avoid mobile GPU thermal throttling.
   - Rendering pauses automatically when the tab is hidden (`document.visibilityState === 'hidden'`) or when the scene is off-screen.

---

## 3. Android Implementation (Jetpack Compose)

1. **Hardware-Accelerated Layer Transitions:**
   - Animates solely `transform` and `opacity` properties using `graphicsLayer { ... }`.
   - Never animates layout measurements (`padding`, `width`) inside render loops.
2. **3D Flavour Science Canvas:**
   - Uses a pure, deterministic Fibonacci sphere projection mapping 3D molecular coordinates $(x, y, z)$ to 2D screen coordinates with depth sorting.
   - Drag and pinch gestures rotate and zoom the aroma sphere smoothly at 60 FPS.
3. **Camera HUD & Scanner Sweep:**
   - Edge computer vision bounding boxes render with corner brackets and confidence badges.
   - When idling, a subtle vertical laser beam sweeps the camera viewfinder.

---

## 4. Reduced Motion & Accessibility Rules

DRISHYAM enforces strict compliance with accessibility standards:

### Web (`prefers-reduced-motion: reduce`)
- Smooth scroll scrubbing via `ScrollSmoother` is completely disabled.
- Three.js WebGL canvas is replaced by a static 2D aroma network or structured table view.
- Page animations switch from translate/scale transforms to simple fade opacity transitions.

### Android (`ANIMATOR_DURATION_SCALE == 0` or User Preference)
- Provided globally via `LocalReducedMotion`.
- The scanner sweep laser animation is replaced with a static targeting crosshair.
- 3D Fibonacci sphere Canvas provides an accessible list toggle button allowing screen-reader friendly textual navigation.
- Every gesture interaction (drag-to-reorder, swipe-to-dismiss) has an explicit accessible button equivalent.
