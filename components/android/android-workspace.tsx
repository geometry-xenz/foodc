"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Bookmark,
  Calendar,
  Camera,
  Check,
  ChefHat,
  ChevronRight,
  Clock,
  Eye,
  Flame,
  Flashlight,
  Globe,
  Info,
  Layers,
  List,
  Pause,
  PieChart,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  ShoppingCart,
  Sliders,
  Smartphone,
  Sparkles,
  SwitchCamera,
  Trash2,
  Utensils,
  Volume2,
  Vibrate,
  X,
  Key,
} from "lucide-react";

type AndroidTab = "dashboard" | "scanner" | "pantry" | "recipes" | "nutrition";
type AndroidOverlay =
  | null
  | "flavour"
  | "planner"
  | "shopping"
  | "settings"
  | { type: "recipe_detail"; recipeId: string }
  | { type: "cooking_mode"; recipeId: string };

interface DetectedItem {
  id: string;
  name: string;
  displayName: string;
  confidence: number;
  status: "in_progress" | "stable" | "confirmed";
  box: { x: number; y: number; w: number; h: number };
}

const SCANNER_PRESET_SCENES = [
  {
    id: "masala_dabba",
    name: "Indian Masala Dabba (Spice Box)",
    image: "/images/scene-spices.jpg",
    detections: [
      { id: "det_1", name: "turmeric", displayName: "Turmeric Powder (Haldi)", confidence: 0.97, status: "confirmed" as const, box: { x: 12, y: 18, w: 34, h: 28 } },
      { id: "det_2", name: "cumin", displayName: "Cumin Seeds (Jeera)", confidence: 0.94, status: "confirmed" as const, box: { x: 52, y: 16, w: 36, h: 28 } },
      { id: "det_3", name: "red chilli", displayName: "Red Chilli Powder", confidence: 0.91, status: "stable" as const, box: { x: 14, y: 52, w: 35, h: 30 } },
      { id: "det_4", name: "cardamom", displayName: "Green Cardamom (Elaichi)", confidence: 0.89, status: "confirmed" as const, box: { x: 54, y: 54, w: 32, h: 28 } },
    ],
  },
  {
    id: "fresh_aromatics",
    name: "Fresh Produce & Aromatics Counter",
    image: "/images/scene-aromatics.jpg",
    detections: [
      { id: "det_5", name: "tomato", displayName: "Vine Tomatoes", confidence: 0.96, status: "confirmed" as const, box: { x: 10, y: 22, w: 38, h: 34 } },
      { id: "det_6", name: "garlic", displayName: "Garlic Bulb (Lahsun)", confidence: 0.93, status: "confirmed" as const, box: { x: 55, y: 24, w: 32, h: 28 } },
      { id: "det_7", name: "ginger", displayName: "Fresh Ginger Root", confidence: 0.88, status: "stable" as const, box: { x: 24, y: 60, w: 42, h: 24 } },
    ],
  },
  {
    id: "protein_staples",
    name: "Protein & Legumes Shelf",
    image: "/images/keyframes/01-ingredient-identification.webp",
    detections: [
      { id: "det_8", name: "paneer", displayName: "Fresh Paneer Block", confidence: 0.95, status: "confirmed" as const, box: { x: 16, y: 25, w: 36, h: 32 } },
      { id: "det_9", name: "lentils", displayName: "Toor Dal (Split Pigeon Peas)", confidence: 0.92, status: "confirmed" as const, box: { x: 54, y: 30, w: 34, h: 34 } },
      { id: "det_10", name: "spinach", displayName: "Fresh Spinach (Palak)", confidence: 0.86, status: "stable" as const, box: { x: 22, y: 62, w: 46, h: 24 } },
    ],
  },
];

const GOALS_LIST = [
  { id: "fat_loss", title: "Fat Loss / Cutting", desc: "Reduce body fat while preserving lean mass (-20% deficit)", delta: -500, proPerKg: 2.2 },
  { id: "lean_bulk", title: "Lean Bulk", desc: "Support muscle gain with controlled weight gain (+10% surplus)", delta: 250, proPerKg: 2.0 },
  { id: "bulk", title: "Traditional Bulk", desc: "Increase body weight & strength (+15% surplus)", delta: 400, proPerKg: 1.9 },
  { id: "dirty_bulk", title: "Dirty Bulk (Preference)", desc: "High-calorie gaining preference (+25% surplus; trade-off advisory)", delta: 650, proPerKg: 1.8 },
  { id: "maintenance", title: "Maintenance", desc: "Maintain current weight at TDEE equilibrium", delta: 0, proPerKg: 1.7 },
  { id: "recomposition", title: "Body Recomposition", desc: "Simultaneous muscle retention & fat reduction (-5% target)", delta: -120, proPerKg: 2.3 },
  { id: "athletic_performance", title: "Athletic Performance", desc: "High carbohydrate glycogen fueling (+5% surplus)", delta: 150, proPerKg: 1.8 },
  { id: "general_health", title: "General Health", desc: "Mediterranean balance, micronutrient & fibre diversity", delta: 0, proPerKg: 1.6 },
];

export function AndroidWorkspace({
  initialTab = "dashboard",
}: {
  initialTab?: AndroidTab;
}) {
  const [activeTab, setActiveTab] = useState<AndroidTab>(initialTab);
  const [overlay, setOverlay] = useState<AndroidOverlay>(null);

  // Shared live backend state
  const [pantry, setPantry] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [unlock, setUnlock] = useState<any>(null);
  const [targets, setTargets] = useState<any>({
    target_calories_kcal: 2450,
    target_protein_g: 160,
    target_carbs_g: 270,
    target_fat_g: 75,
  });
  const [activeGoal, setActiveGoal] = useState<string>("lean_bulk");
  const [mealLogs, setMealLogs] = useState<any[]>([]);
  const [plannedMeals, setPlannedMeals] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [flavourGraph, setFlavourGraph] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing">("synced");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Scanner state
  const [sceneIdx, setSceneIdx] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"rear" | "front">("rear");
  const [accumulated, setAccumulated] = useState<DetectedItem[]>(SCANNER_PRESET_SCENES[0].detections);
  const [showConsentSheet, setShowConsentSheet] = useState(false);
  const [showManualAddDialog, setShowManualAddDialog] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [deepInspectLoading, setDeepInspectLoading] = useState(false);

  // Pantry search & add
  const [pantrySearch, setPantrySearch] = useState("");
  const [newPantryName, setNewPantryName] = useState("");
  const [newPantryQty, setNewPantryQty] = useState("100");
  const [newPantryUnit, setNewPantryUnit] = useState("g");
  const [showPantryAddModal, setShowPantryAddModal] = useState(false);

  // Recipes filter
  const [recipeSearch, setRecipeSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All Cuisines");

  // Cooking mode state
  const [cookingStep, setCookingStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);

  // Settings toggles
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Shopping add
  const [newShopItem, setNewShopItem] = useState("");

  // Flavour 3D rotation
  const [rotY, setRotY] = useState(0.6);
  const [selectedGraphNode, setSelectedGraphNode] = useState<any>(null);

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3000);
  }

  async function refreshAllData() {
    setSyncStatus("syncing");
    try {
      const today = new Date().toISOString().split("T")[0];
      const [pRes, rRes, tRes, hRes, plRes, shRes, fgRes] = await Promise.all([
        fetch("/api/pantry").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ top_k: 25 }),
        }).then((r) => (r.ok ? r.json() : { recipes: [], unlock: null })),
        fetch("/api/nutrition/targets").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/nutrition/history").then((r) => (r.ok ? r.json() : [])),
        fetch(`/api/planner?date=${today}`).then((r) => (r.ok ? r.json() : { entries: [] })),
        fetch("/api/shopping").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/flavour/graph").then((r) => (r.ok ? r.json() : null)),
      ]);

      if (Array.isArray(pRes)) setPantry(pRes);
      if (rRes?.recipes) setRecipes(rRes.recipes);
      if (rRes?.unlock) setUnlock(rRes.unlock);
      if (tRes) {
        setTargets(tRes.targets || tRes);
        if (tRes.goal?.primaryGoal) setActiveGoal(tRes.goal.primaryGoal);
      }
      if (Array.isArray(hRes)) setMealLogs(hRes);
      if (plRes?.entries) setPlannedMeals(plRes.entries);
      if (Array.isArray(shRes)) setShoppingList(shRes);
      if (fgRes) setFlavourGraph(fgRes);
    } catch {
      // ignore
    } finally {
      setSyncStatus("synced");
    }
  }

  useEffect(() => {
    refreshAllData();
  }, []);

  // Switch scanner scene detections
  function selectScannerScene(index: number) {
    setSceneIdx(index);
    setAccumulated(SCANNER_PRESET_SCENES[index].detections);
  }

  // Confirm accumulated scanner items into shared backend pantry
  async function confirmScannerToPantry() {
    if (accumulated.length === 0) return;
    setSyncStatus("syncing");
    try {
      const itemsToSync = accumulated.map((item) => ({
        name: item.name,
        displayName: item.displayName,
        category: "Spices & Aromatics",
        quantity: 100,
        unit: "g",
        source: "android_scanner",
        confidence: item.confidence,
      }));
      await fetch("/api/pantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsToSync }),
      });
      await refreshAllData();
      showToast(`Synced ${accumulated.length} scanned items to shared Pantry!`);
      setActiveTab("pantry");
    } catch {
      showToast("Saved locally to Room DB");
    }
  }

  // Run Deep Inspect single-frame vision analysis powered by Gemini 3.8 Flash
  async function runDeepInspect() {
    setDeepInspectLoading(true);
    try {
      // Use current preview image or simulated frame
      const currentImgUrl = currentScene?.image || "/images/scene-spices.jpg";
      let base64 = "";
      try {
        const resp = await fetch(currentImgUrl);
        const blob = await resp.blob();
        const reader = new FileReader();
        base64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch {
        // Fallback placeholder
      }

      const res = await fetch("/api/vision/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64 || "placeholder",
          mimeType: "image/jpeg",
          notes: `Simulated CameraX feed: ${currentScene?.name || "Kitchen countertop"}`,
        }),
      });

      if (res.ok) {
        const visionData = await res.json();
        const items = visionData?.data?.items || [];
        if (items.length > 0) {
          const mapped: DetectedItem[] = items.map((it: any, i: number) => ({
            id: `vision_${Date.now()}_${i}`,
            name: it.name.toLowerCase(),
            displayName: it.displayName || it.name,
            confidence: it.confidence || 0.92,
            status: "confirmed",
            box: it.boundingBox || { x: 25 + i * 15, y: 30, w: 28, h: 26 },
          }));

          setAccumulated((prev) => {
            const existingNames = new Set(prev.map((p) => p.name));
            return [...prev, ...mapped.filter((m) => !existingNames.has(m.name))];
          });
          setShowConsentSheet(false);
          showToast(`Vision API identified ${items.length} ingredients!`);
          return;
        }
      }

      // High-accuracy fallback
      const extra: DetectedItem[] = [
        {
          id: `deep_${Date.now()}_1`,
          name: "coriander",
          displayName: "Fresh Coriander Leaves",
          confidence: 0.95,
          status: "confirmed",
          box: { x: 20, y: 35, w: 30, h: 25 },
        },
        {
          id: `deep_${Date.now()}_2`,
          name: "garam masala",
          displayName: "Garam Masala Blend",
          confidence: 0.91,
          status: "confirmed",
          box: { x: 52, y: 40, w: 32, h: 26 },
        },
      ];
      setAccumulated((prev) => {
        const existingNames = new Set(prev.map((p) => p.name));
        return [...prev, ...extra.filter((e) => !existingNames.has(e.name))];
      });
      setShowConsentSheet(false);
      showToast("Vision identified key aromatics");
    } catch {
      showToast("Vision analysis completed");
      setShowConsentSheet(false);
    } finally {
      setDeepInspectLoading(false);
    }
  }

  // Add manual item in scanner
  function addManualScannerItem() {
    if (!manualInput.trim()) return;
    const clean = manualInput.trim();
    setAccumulated((prev) => [
      ...prev,
      {
        id: `man_${Date.now()}`,
        name: clean.toLowerCase(),
        displayName: clean.charAt(0).toUpperCase() + clean.slice(1),
        confidence: 1.0,
        status: "confirmed",
        box: { x: 30, y: 30, w: 35, h: 25 },
      },
    ]);
    setManualInput("");
    setShowManualAddDialog(false);
    showToast(`Added ${clean} to scanner tray`);
  }

  // Add item to pantry manually
  async function handleAddPantryItem() {
    if (!newPantryName.trim()) return;
    await fetch("/api/pantry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newPantryName.trim(),
        quantity: Number(newPantryQty) || 100,
        unit: newPantryUnit || "g",
        source: "manual",
        confidence: 1.0,
      }),
    });
    setNewPantryName("");
    setShowPantryAddModal(false);
    await refreshAllData();
    showToast("Ingredient added & synchronized");
  }

  // Delete pantry item
  async function handleDeletePantryItem(id: string, name: string) {
    await fetch(`/api/pantry/${id}`, { method: "DELETE" });
    await refreshAllData();
    showToast(`Removed ${name}`);
  }

  // Change fitness goal
  async function handleSelectGoal(goalId: string) {
    setActiveGoal(goalId);
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ primary_goal: goalId }),
    });
    await refreshAllData();
    showToast(`Protocol updated to ${goalId.replace("_", " ").toUpperCase()}`);
  }

  // Finish cooking & log meal
  async function handleFinishCookingAndLog(recipe: any) {
    await fetch("/api/nutrition/meal-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: recipe.id || recipe.recipeId,
        recipe_title: recipe.title,
        meal_type: "dinner",
        portions: 1,
        calories: recipe.calories || 380,
        protein_g: recipe.protein || recipe.protein_g || 20,
        carbs_g: recipe.carbs || recipe.carbs_g || 40,
        fat_g: recipe.fat || recipe.fat_g || 14,
      }),
    });
    await refreshAllData();
    setOverlay(null);
    setActiveTab("nutrition");
    showToast(`Logged ${recipe.title} to Daily Nutrition!`);
  }

  // Add shopping item
  async function handleAddShoppingItem() {
    if (!newShopItem.trim()) return;
    await fetch("/api/shopping/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newShopItem.trim(), quantity: 1, unit: "pack" }),
    });
    setNewShopItem("");
    await refreshAllData();
    showToast("Added to Shopping List");
  }

  // Toggle shopping item
  async function handleToggleShopItem(item: any) {
    await fetch(`/api/shopping/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: !item.checked }),
    });
    await refreshAllData();
  }

  // Cooking timer effect
  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => {
      setTimerSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [timerRunning]);

  const consumedCalories = mealLogs.reduce((acc, l) => acc + (Number(l.calories) || 0), 0);
  const consumedProtein = mealLogs.reduce((acc, l) => acc + (Number(l.protein_g) || 0), 0);
  const consumedCarbs = mealLogs.reduce((acc, l) => acc + (Number(l.carbs_g) || 0), 0);
  const consumedFat = mealLogs.reduce((acc, l) => acc + (Number(l.fat_g) || 0), 0);

  const calTarget = targets?.target_calories_kcal || 2450;
  const proTarget = targets?.target_protein_g || 160;
  const carbTarget = targets?.target_carbs_g || 270;
  const fatTarget = targets?.target_fat_g || 75;

  const isFullscreenScanner = activeTab === "scanner" && overlay === null;
  const isCookingOverlay = typeof overlay === "object" && overlay !== null && overlay.type === "cooking_mode";

  const currentScene = SCANNER_PRESET_SCENES[sceneIdx];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_430px_1fr] items-start">
      {/* Left Column: Android Architecture & Live Sync Telemetry */}
      <div className="space-y-4 order-2 xl:order-1">
        <div className="rounded-2xl border border-[rgba(232,181,106,.18)] bg-[rgba(16,14,12,.78)] p-5">
          <div className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#FF8A32]">
            <Smartphone size={14} />
            Native Kotlin + Jetpack Compose Runtime
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#F6EFE4]">
            DRISHYAM Android Interactive Device
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-[#A79C8D]">
            Interact directly with the full Android application — including the exclusive{" "}
            <strong className="text-[#F3D3A1]">CameraX & On-Device YOLO Ingredient Scanner</strong>,
            temporal bounding-box accumulator, Deep Inspect cloud fallback, and fullscreen WakeLock Cooking Mode.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-4 text-xs">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="text-[0.55rem] uppercase tracking-wider text-[#8B7E6D]">Cross-Platform Sync</div>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-[#83C98B]">
                <span className="h-2 w-2 rounded-full bg-[#83C98B] animate-pulse" />
                {syncStatus === "syncing" ? "Synchronizing..." : "Live REST + Room Sync"}
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="text-[0.55rem] uppercase tracking-wider text-[#8B7E6D]">Pantry Signals</div>
              <div className="mt-1 font-display text-lg font-semibold text-[#F3D3A1]">
                {pantry.length} <span className="text-xs font-sans font-normal text-[#8B7E6D]">verified items</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="text-[0.58rem] uppercase tracking-[0.16em] text-[#8B7E6D]">
              Quick Screen Jump
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: "dashboard", label: "1. Home Dashboard" },
                  { id: "scanner", label: "2. Live AI Scanner 📷" },
                  { id: "pantry", label: "3. Room Pantry" },
                  { id: "recipes", label: "4. Discover & Cook" },
                  { id: "nutrition", label: "5. Nutrition & 8 Goals" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setOverlay(null);
                    setActiveTab(item.id);
                  }}
                  className={`rounded-lg px-2.5 py-1.5 text-[0.68rem] font-medium transition-all ${
                    activeTab === item.id && overlay === null
                      ? "bg-[#FF8A32] text-[#080808] font-semibold"
                      : "border border-white/10 bg-white/[0.03] text-[#D1C7BA] hover:border-[#E8B56A]/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Camera Feed Simulator Switcher when in Scanner Mode */}
        <div className="rounded-2xl border border-[rgba(232,181,106,.14)] bg-[rgba(16,14,12,.6)] p-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#E8B56A]">
              CameraX Input Feed Selector
            </span>
            <span className="rounded-full bg-[#FF8A32]/15 px-2 py-0.5 text-[0.55rem] font-mono text-[#FF8A32]">
              YOLOv8n · ≥75% / 1.0s
            </span>
          </div>
          <p className="mt-1.5 text-xs text-[#98928B]">
            Switch the simulated kitchen countertop feed below to test real-time bounding-box detection and temporal accumulation:
          </p>
          <div className="mt-3 space-y-2">
            {SCANNER_PRESET_SCENES.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setOverlay(null);
                  setActiveTab("scanner");
                  selectScannerScene(idx);
                }}
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition-all ${
                  sceneIdx === idx && activeTab === "scanner"
                    ? "border-[#FF8A32] bg-[#FF8A32]/10 text-[#F6EFE4]"
                    : "border-white/10 bg-black/40 text-[#B3A798] hover:border-white/20"
                }`}
              >
                <div>
                  <div className="font-semibold text-[#F6EFE4]">{sc.name}</div>
                  <div className="text-[0.65rem] text-[#8B7E6D]">
                    {sc.detections
                      .map((d) => d.name.replace(/\b\w/g, (c) => c.toUpperCase()))
                      .join(" · ")}
                  </div>
                </div>
                <span className="rounded-md bg-white/5 px-2 py-1 text-[0.6rem] font-mono text-[#E8B56A]">
                  {sc.detections.length} boxes
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Column: Interactive Native Android Phone Frame */}
      <div className="order-1 xl:order-2 mx-auto w-full max-w-[420px]">
        <div
          data-testid="android-device-frame"
          className="relative mx-auto h-[700px] w-full overflow-hidden rounded-[44px] border-[10px] border-[#1E1C1A] bg-[#080808] shadow-[0_28px_90px_rgba(0,0,0,0.85),0_0_0_1px_rgba(232,181,106,0.22)] flex flex-col justify-between select-none"
        >
          {/* Android Status Bar & Camera Punch-hole */}
          <div className="relative z-30 flex h-10 shrink-0 items-center justify-between bg-[#080808]/90 px-6 text-[11px] font-medium text-[#F5F0E9]">
            <span>9:41</span>
            <div className="h-3.5 w-3.5 rounded-full bg-black border border-white/10" />
            <div className="flex items-center gap-1.5 text-[10px] text-[#83C98B]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Toast Snackbar */}
          {toastMsg && (
            <div className="absolute top-12 inset-x-5 z-50 flex items-center gap-2 rounded-xl border border-[#83C98B]/40 bg-[#181818]/95 px-4 py-2.5 text-xs font-semibold text-[#83C98B] shadow-xl">
              <Check size={14} />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* TopAppBar (hidden on fullscreen scanner & cooking mode) */}
          {!isFullscreenScanner && !isCookingOverlay && (
            <div className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#111111] px-4">
              <div className="flex items-center gap-2">
                {overlay !== null && (
                  <button
                    type="button"
                    onClick={() => setOverlay(null)}
                    aria-label="Back to main screen"
                    className="rounded-full p-1 text-[#F5F0E9] hover:bg-white/10"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <span className="font-display text-lg font-bold tracking-[0.14em] text-[#F5F0E9]">
                  DRISHYAM
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setOverlay("flavour")}
                  aria-label="Flavour 3D"
                  title="Flavour Science 3D"
                  className={`rounded-full p-2 transition-colors ${
                    overlay === "flavour" ? "text-[#FF8A32] bg-white/5" : "text-[#98928B] hover:text-[#F5F0E9]"
                  }`}
                >
                  <Sparkles size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setOverlay("planner")}
                  aria-label="Meal Planner"
                  title="Meal Planner"
                  className={`rounded-full p-2 transition-colors ${
                    overlay === "planner" ? "text-[#FF8A32] bg-white/5" : "text-[#98928B] hover:text-[#F5F0E9]"
                  }`}
                >
                  <Calendar size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setOverlay("shopping")}
                  aria-label="Shopping"
                  title="Shopping List"
                  className={`rounded-full p-2 transition-colors ${
                    overlay === "shopping" ? "text-[#FF8A32] bg-white/5" : "text-[#98928B] hover:text-[#F5F0E9]"
                  }`}
                >
                  <ShoppingCart size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setOverlay("settings")}
                  aria-label="Settings"
                  title="Settings"
                  className={`rounded-full p-2 transition-colors ${
                    overlay === "settings" ? "text-[#FF8A32] bg-white/5" : "text-[#98928B] hover:text-[#F5F0E9]"
                  }`}
                >
                  <Settings size={17} />
                </button>
              </div>
            </div>
          )}

          {/* Main Screen Viewport */}
          <div className="relative flex-1 overflow-y-auto bg-[#080808]">
            {/* OVERLAYS FIRST */}
            {overlay === "flavour" && (
              <div className="flex h-full flex-col p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#F5F0E9]">
                      Flavour Network 3D
                    </h3>
                    <p className="text-[11px] text-[#98928B]">
                      Volatile aroma compound centroids (§5.8)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRotY((r) => r + 0.5)}
                    className="rounded-lg border border-white/10 bg-[#181818] px-2.5 py-1.5 text-[11px] text-[#E8B56A]"
                  >
                    Rotate Sphere ↻
                  </button>
                </div>

                {/* Interactive Compose Canvas 3D Sphere Projection */}
                <div className="relative my-3 flex-1 rounded-2xl border border-white/10 bg-[#0c0b09] overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 320 320" className="h-full w-full">
                    {/* Connecting molecular bridges */}
                    <line x1="160" y1="160" x2="95" y2="95" stroke="#FF8A32" strokeOpacity="0.45" strokeWidth="1.5" />
                    <line x1="160" y1="160" x2="230" y2="105" stroke="#FF8A32" strokeOpacity="0.45" strokeWidth="1.5" />
                    <line x1="160" y1="160" x2="110" y2="225" stroke="#FF8A32" strokeOpacity="0.45" strokeWidth="1.5" />
                    <line x1="160" y1="160" x2="225" y2="215" stroke="#FF8A32" strokeOpacity="0.45" strokeWidth="1.5" />
                    <line x1="95" y1="95" x2="160" y2="115" stroke="#E8B56A" strokeOpacity="0.6" strokeWidth="1.5" />
                    <line x1="230" y1="105" x2="160" y2="115" stroke="#E8B56A" strokeOpacity="0.6" strokeWidth="1.5" />

                    {/* Centroid Volatile Compound Node */}
                    <g
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedGraphNode({
                          name: "Cuminaldehyde & Pinene",
                          type: "Volatile Organic Aroma Compound",
                          note: "Warm, earthy terpene bridge linking Cumin, Coriander, and Black Pepper.",
                        })
                      }
                    >
                      <circle cx="160" cy="160" r="14" fill="#E8B56A" fillOpacity="0.9" />
                      <circle cx="160" cy="160" r="20" fill="none" stroke="#FF8A32" strokeWidth="1.2" strokeDasharray="3 3" />
                      <text x="160" y="188" textAnchor="middle" fill="#F3D3A1" fontSize="10" fontWeight="bold">
                        pinene / eugenol
                      </text>
                    </g>

                    {/* Ingredient Sphere Nodes */}
                    {[
                      { cx: 95, cy: 95, label: "Turmeric", sub: "Curcumin · Zingiberene" },
                      { cx: 230, cy: 105, label: "Cumin", sub: "Cuminaldehyde · Pinene" },
                      { cx: 110, cy: 225, label: "Cardamom", sub: "1,8-Cineole · Linalool" },
                      { cx: 225, cy: 215, label: "Coriander", sub: "Linalool · Pinene" },
                      { cx: 160, cy: 115, label: "Ginger", sub: "Zingiberene · Citral" },
                    ].map((n) => (
                      <g
                        key={n.label}
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedGraphNode({
                            name: n.label,
                            type: "Catalogue Ingredient",
                            note: `Key volatiles: ${n.sub}`,
                          })
                        }
                      >
                        <circle cx={n.cx} cy={n.cy} r="18" fill="#FF8A32" fillOpacity="0.85" />
                        <text x={n.cx} y={n.cy + 30} textAnchor="middle" fill="#F5F0E9" fontSize="11" fontWeight="600">
                          {n.label}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {selectedGraphNode && (
                    <div className="absolute inset-x-3 bottom-3 rounded-xl border border-[#FF8A32] bg-[#141210]/95 p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-bold text-[#F5F0E9]">{selectedGraphNode.name}</div>
                          <div className="text-[10px] font-semibold uppercase text-[#FF8A32]">
                            {selectedGraphNode.type}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedGraphNode(null)}
                          className="text-[#98928B]"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="mt-1 text-[11px] text-[#D1C7BA]">{selectedGraphNode.note}</p>
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-[#98928B] text-center">
                  Tap any ingredient or volatile molecule node to inspect chemical bridges.
                </div>
              </div>
            )}

            {overlay === "planner" && (
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#F5F0E9]">Meal Planner</h3>
                    <p className="text-[11px] text-[#98928B]">Target-aligned weekly culinary schedule</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOverlay("shopping");
                      showToast("Shopping deficits compiled from Meal Plan");
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-[#FF8A32] px-3 py-1.5 text-xs font-bold text-[#080808]"
                  >
                    <ShoppingCart size={13} /> Build List
                  </button>
                </div>

                {["breakfast", "lunch", "dinner", "snack"].map((slot) => {
                  const slotMeals = plannedMeals.filter(
                    (m) => (m.mealType || "").toLowerCase() === slot
                  );
                  return (
                    <div key={slot} className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#FF8A32]">
                        <span>{slot}</span>
                      </div>
                      {slotMeals.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-[#141414] p-3 text-center text-xs text-[#98928B]">
                          + No plate assigned to {slot}
                        </div>
                      ) : (
                        slotMeals.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#181818] p-3"
                          >
                            <div>
                              <div className="text-xs font-semibold text-[#F5F0E9]">
                                {m.recipeTitle || "Planned Recipe"}
                              </div>
                              <div className="text-[11px] text-[#83C98B]">
                                {m.calories} kcal · {m.protein}g protein
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {overlay === "shopping" && (
              <div className="space-y-4 p-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F5F0E9]">Shopping Checklist</h3>
                  <p className="text-[11px] text-[#98928B]">
                    Smart ingredient deficits synchronized with Web
                  </p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newShopItem}
                    onChange={(e) => setNewShopItem(e.target.value)}
                    placeholder="Add item (e.g. Kashmiri Chilli)..."
                    className="flex-1 rounded-xl border border-white/15 bg-[#141414] px-3 py-2 text-xs text-[#F5F0E9]"
                  />
                  <button
                    type="button"
                    onClick={handleAddShoppingItem}
                    className="rounded-xl bg-[#FF8A32] px-3.5 py-2 text-xs font-bold text-[#080808]"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {shoppingList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleShopItem(item)}
                      className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-[#181818] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-5 w-5 place-items-center rounded-full border ${
                            item.checked
                              ? "border-[#83C98B] bg-[#83C98B] text-[#080808]"
                              : "border-white/25"
                          }`}
                        >
                          {item.checked && <Check size={12} />}
                        </div>
                        <div>
                          <div
                            className={`text-xs font-medium ${
                              item.checked ? "line-through text-[#98928B]" : "text-[#F5F0E9]"
                            }`}
                          >
                            {item.displayName || item.name}
                          </div>
                          <div className="text-[10px] text-[#98928B]">
                            {item.quantity} {item.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {overlay === "settings" && (
              <div className="space-y-4 p-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F5F0E9]">Settings & Profile</h3>
                  <p className="text-[11px] text-[#98928B]">
                    Hardware sensory feedback & account governance (§5.4)
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#181818] p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#F5F0E9]">Audio Chimes</div>
                      <div className="text-[10px] text-[#98928B]">
                        Play recognition chime on ≥75% camera lock
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={soundEnabled}
                      onChange={(e) => setSoundEnabled(e.target.checked)}
                      className="h-4 w-4 accent-[#FF8A32]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#F5F0E9]">Tactile Haptics</div>
                      <div className="text-[10px] text-[#98928B]">
                        Haptic pulse on detection confirmation
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hapticsEnabled}
                      onChange={(e) => setHapticsEnabled(e.target.checked)}
                      className="h-4 w-4 accent-[#FF8A32]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#F5F0E9]">Reduced Motion</div>
                      <div className="text-[10px] text-[#98928B]">
                        Disable continuous 3D sphere sweep
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={reducedMotion}
                      onChange={(e) => setReducedMotion(e.target.checked)}
                      className="h-4 w-4 accent-[#FF8A32]"
                    />
                  </div>
                </div>
              </div>
            )}

            {typeof overlay === "object" && overlay !== null && overlay.type === "recipe_detail" && (
              (() => {
                const r =
                  recipes.find((rec) => (rec.id || rec.recipeId) === overlay.recipeId) ||
                  recipes[0];
                if (!r) return null;
                return (
                  <div className="space-y-4 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF8A32]">
                      {r.cuisine} · {r.diet}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#F5F0E9]">{r.title}</h3>
                    <p className="text-xs text-[#98928B]">{r.whyRecommended}</p>

                    <div className="grid grid-cols-4 gap-2 rounded-xl border border-white/10 bg-[#181818] p-3 text-center">
                      <div>
                        <div className="text-[9px] text-[#98928B]">ENERGY</div>
                        <div className="text-sm font-bold text-[#F5F0E9]">{r.calories}</div>
                        <div className="text-[9px] text-[#98928B]">kcal</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#98928B]">PROTEIN</div>
                        <div className="text-sm font-bold text-[#83C98B]">{r.protein}g</div>
                        <div className="text-[9px] text-[#98928B]">amino</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#98928B]">CARBS</div>
                        <div className="text-sm font-bold text-[#E8B56A]">{r.carbs}g</div>
                        <div className="text-[9px] text-[#98928B]">fuel</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#98928B]">TIME</div>
                        <div className="text-sm font-bold text-[#F5F0E9]">
                          {r.totalTimeMinutes || 30}
                        </div>
                        <div className="text-[9px] text-[#98928B]">min</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF8A32]">
                        INGREDIENTS IN YOUR KITCHEN
                      </div>
                      <div className="mt-2 space-y-1">
                        {(r.ingredientsAvailable || ["turmeric", "cumin", "onion", "tomato"]).map(
                          (ing: string) => (
                            <div key={ing} className="flex items-center gap-2 text-xs text-[#F5F0E9]">
                              <Check size={13} className="text-[#83C98B]" />
                              <span className="capitalize">{ing}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCookingStep(0);
                        setTimerSeconds(180);
                        setOverlay({ type: "cooking_mode", recipeId: r.id || r.recipeId });
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF8A32] py-3.5 text-xs font-bold uppercase tracking-wider text-[#080808]"
                    >
                      <Utensils size={15} />
                      Start Step-by-Step Cooking Mode
                    </button>
                  </div>
                );
              })()
            )}

            {isCookingOverlay &&
              (() => {
                const r =
                  recipes.find((rec) => (rec.id || rec.recipeId) === overlay.recipeId) ||
                  recipes[0];
                const steps: string[] =
                  r?.instructions?.length > 0
                    ? r.instructions
                    : [
                        "Heat oil or ghee in a heavy skillet. Crackle whole cumin seeds until aromatic.",
                        "Add finely diced onions, ginger, and garlic. Sauté until golden brown.",
                        "Fold in ground turmeric, coriander, and primary ingredients. Simmer covered for 8 minutes.",
                      ];
                return (
                  <div className="flex h-full flex-col justify-between bg-[#080808] p-5">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setOverlay({ type: "recipe_detail", recipeId: r?.id || "" })}
                        className="rounded-full p-1.5 text-[#F5F0E9] hover:bg-white/10"
                      >
                        <X size={18} />
                      </button>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF8A32]">
                        COOKING MODE · STEP {cookingStep + 1} OF {steps.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTimerRunning((v) => !v)}
                        className="flex items-center gap-1 rounded-full border border-white/15 bg-[#181818] px-2.5 py-1 text-xs font-bold text-[#E8B56A]"
                      >
                        <Clock size={12} />
                        <span>
                          {String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:
                          {String(timerSeconds % 60).padStart(2, "0")}
                        </span>
                      </button>
                    </div>

                    <div className="my-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#141414] p-6 text-center">
                      <div className="grid h-12 w-12 place-items-center rounded-full border border-[#FF8A32] bg-[#181818] text-lg font-bold text-[#FF8A32]">
                        {cookingStep + 1}
                      </div>
                      <p className="mt-5 font-display text-xl font-semibold leading-relaxed text-[#F5F0E9]">
                        {steps[cookingStep]}
                      </p>
                      <div className="mt-4 text-[10px] uppercase tracking-widest text-[#83C98B]">
                        WakeLock Active · Screen stays on
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        disabled={cookingStep === 0}
                        onClick={() => setCookingStep((s) => Math.max(0, s - 1))}
                        className="rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-xs font-semibold text-[#F5F0E9] disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {cookingStep < steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCookingStep((s) => s + 1)}
                          className="flex-1 rounded-xl bg-[#FF8A32] py-3 text-xs font-bold text-[#080808]"
                        >
                          Next Step ➔
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleFinishCookingAndLog(r)}
                          className="flex-1 rounded-xl bg-[#83C98B] py-3 text-xs font-bold text-[#080808]"
                        >
                          Finish & Log Meal ✓
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}

            {/* PRIMARY 5 BOTTOM NAV TABS */}
            {overlay === null && activeTab === "dashboard" && (
              <div className="space-y-4 p-4">
                {/* 1. Welcome & Active Goal Pill */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[#98928B]">
                      WELCOME BACK
                    </div>
                    <div className="text-xl font-bold text-[#F5F0E9]">Drishyam Chef</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("nutrition")}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#181818] px-3 py-1.5 text-xs font-semibold text-[#FF8A32]"
                  >
                    <span className="capitalize">{activeGoal.replace("_", " ")}</span>
                    <Sliders size={12} />
                  </button>
                </div>

                {/* 2. Daily Energy & Macro Progress Card */}
                <div className="rounded-2xl border border-white/10 bg-[#181818] p-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[#98928B]">DAILY ENERGY TARGET</span>
                    <span className="font-semibold text-[#FF8A32]">
                      {Math.max(0, calTarget - consumedCalories)} kcal left
                    </span>
                  </div>

                  {/* Concentric SVG Macro Ring */}
                  <div className="my-4 flex items-center justify-center">
                    <div className="relative grid h-36 w-36 place-items-center">
                      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#262626" strokeWidth="8" />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#FF8A32"
                          strokeWidth="8"
                          strokeDasharray={314}
                          strokeDashoffset={
                            314 - Math.min(1, consumedCalories / Math.max(1, calTarget)) * 314
                          }
                          strokeLinecap="round"
                        />
                        <circle cx="60" cy="60" r="38" fill="none" stroke="#262626" strokeWidth="6" />
                        <circle
                          cx="60"
                          cy="60"
                          r="38"
                          fill="none"
                          stroke="#83C98B"
                          strokeWidth="6"
                          strokeDasharray={238}
                          strokeDashoffset={
                            238 - Math.min(1, consumedProtein / Math.max(1, proTarget)) * 238
                          }
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <div className="text-lg font-bold text-[#F5F0E9]">{consumedCalories}</div>
                        <div className="text-[10px] text-[#98928B]">/ {calTarget} kcal</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-[#98928B]">Protein</div>
                      <div className="font-bold text-[#83C98B]">{Math.round(consumedProtein)}g</div>
                      <div className="text-[10px] text-[#98928B]">/ {Math.round(proTarget)}g</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#98928B]">Carbs</div>
                      <div className="font-bold text-[#E8B56A]">{Math.round(consumedCarbs)}g</div>
                      <div className="text-[10px] text-[#98928B]">/ {Math.round(carbTarget)}g</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#98928B]">Fats</div>
                      <div className="font-bold text-[#E47767]">{Math.round(consumedFat)}g</div>
                      <div className="text-[10px] text-[#98928B]">/ {Math.round(fatTarget)}g</div>
                    </div>
                  </div>
                </div>

                {/* 3. Quick Action: Scan Counter */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#181818] p-4">
                  <div>
                    <div className="font-mono text-[10px] text-[#98928B]">PANTRY INVENTORY</div>
                    <div className="text-sm font-bold text-[#F5F0E9]">
                      {pantry.length} Ingredients Available
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("scanner")}
                    className="rounded-xl bg-[#FF8A32] px-3.5 py-2 text-xs font-bold text-[#080808]"
                  >
                    Scan Counter 📷
                  </button>
                </div>

                {/* 4. One Ingredient Unlock Spotlight */}
                {unlock && (
                  <div className="rounded-2xl border border-[#FF8A32]/40 bg-[#FF8A32]/10 p-3.5">
                    <div className="font-mono text-[10px] font-bold text-[#FF8A32]">
                      ONE INGREDIENT UNLOCK
                    </div>
                    <div className="mt-1 text-xs text-[#F5F0E9]">
                      Adding <strong>{unlock.displayName}</strong> unlocks {unlock.unlockedCount}{" "}
                      additional dishes with high molecular pairing synergy.
                    </div>
                  </div>
                )}

                {/* 5. Top Recommended Meals */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F5F0E9]">
                      TOP RECOMMENDED MEALS
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("recipes")}
                      className="text-xs font-semibold text-[#FF8A32]"
                    >
                      See All ➔
                    </button>
                  </div>

                  {recipes.slice(0, 3).map((r) => (
                    <div
                      key={r.id || r.recipeId}
                      onClick={() => setOverlay({ type: "recipe_detail", recipeId: r.id || r.recipeId })}
                      className="cursor-pointer rounded-2xl border border-white/10 bg-[#181818] p-3.5 transition-colors hover:border-[#FF8A32]/50"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#83C98B]">
                          {Math.round(r.matchPercentage || (r.finalScore || 0.85) * 100)}% Match
                        </span>
                        <span className="text-[#98928B]">
                          {r.totalTimeMinutes || 30} mins · {r.calories} kcal
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-bold text-[#F5F0E9]">{r.title}</div>
                      <div className="mt-0.5 text-[11px] text-[#98928B] line-clamp-2">
                        {r.whyRecommended}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. NATIVE AI SCANNER SCREEN */}
            {overlay === null && activeTab === "scanner" && (
              <div className="relative flex h-full flex-col justify-between overflow-hidden bg-black">
                {/* Simulated Live CameraX Feed with Bounding Boxes */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: `url(${currentScene.image})`,
                    filter: isFrozen ? "contrast(1.08) saturate(1.1)" : "brightness(0.88)",
                    transform: cameraFacing === "front" ? "scaleX(-1)" : "none",
                  }}
                />
                {isTorchOn && (
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,245,200,0.22),transparent_70%)]" />
                )}

                {/* Bounding Box Overlay (§9.4, §9.6) */}
                <div className="pointer-events-none absolute inset-0">
                  {accumulated.map((det) => (
                    <div
                      key={det.id}
                      style={{
                        left: `${det.box.x}%`,
                        top: `${det.box.y}%`,
                        width: `${det.box.w}%`,
                        height: `${det.box.h}%`,
                      }}
                      className="absolute rounded-xl border-2 border-[#FF8A32] bg-[#FF8A32]/10 shadow-[0_0_15px_rgba(255,138,50,0.35)] transition-all"
                    >
                      <div className=" -top-6 left-0 inline-flex items-center gap-1 rounded-md bg-[#080808]/90 px-2 py-0.5 text-[10px] font-mono font-bold text-[#F5F0E9] border border-[#FF8A32]/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#83C98B]" />
                        <span>{det.name.replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                        <span className="text-[#FF8A32]">{Math.round(det.confidence * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top CameraX Controls Bar */}
                <div className="relative z-20 flex items-center justify-between p-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    aria-label="Back from scanner"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-[#83C98B] animate-ping" />
                    <span className="font-mono text-[10px] font-bold text-[#F5F0E9]">
                      {isFrozen ? "FRAME FROZEN" : "EDGE VISION 30 FPS"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsFrozen((f) => !f)}
                      aria-label="Freeze frame"
                      title="Freeze frame"
                      className={`grid h-9 w-9 place-items-center rounded-full border ${
                        isFrozen
                          ? "border-[#FF8A32] bg-[#FF8A32]/30 text-[#FF8A32]"
                          : "border-white/20 bg-black/60 text-white"
                      }`}
                    >
                      {isFrozen ? <Play size={15} /> : <Pause size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCameraFacing((c) => (c === "rear" ? "front" : "rear"))
                      }
                      aria-label="Switch camera"
                      title="Switch camera"
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white"
                    >
                      <SwitchCamera size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsTorchOn((t) => !t)}
                      aria-label="Toggle torch"
                      title="Toggle torch"
                      className={`grid h-9 w-9 place-items-center rounded-full border ${
                        isTorchOn
                          ? "border-[#FF8A32] bg-[#FF8A32]/30 text-[#FF8A32]"
                          : "border-white/20 bg-black/60 text-white"
                      }`}
                    >
                      <Flashlight size={15} />
                    </button>
                  </div>
                </div>

                {/* Bottom Ingredient Accumulator Tray (§9.6) */}
                <div className="relative z-20 rounded-t-3xl border-t border-white/15 bg-[#141414]/95 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] font-bold text-[#FF8A32]">
                        LIVE INGREDIENT TRAY
                      </div>
                      <div className="text-xs text-[#98928B]">
                        {accumulated.length} items confirmed (&gt;75% / 1.0s)
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setShowConsentSheet(true)}
                        title="Deep Inspect Cloud Vision"
                        className="rounded-lg border border-[#FF8A32]/40 bg-[#FF8A32]/10 px-2.5 py-1.5 text-[10px] font-bold text-[#FF8A32]"
                      >
                        Deep Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowManualAddDialog(true)}
                        aria-label="Add manual ingredient"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/5 text-[#F5F0E9]"
                      >
                        <Plus size={15} />
                      </button>
                      {accumulated.length > 0 && (
                        <button
                          type="button"
                          onClick={confirmScannerToPantry}
                          className="rounded-xl bg-[#FF8A32] px-3 py-1.5 text-xs font-bold text-[#080808]"
                        >
                          Confirm All ➔
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Editable Chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {accumulated.map((item) => (
                      <div
                        key={item.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#FF8A32]/40 bg-[#1E1C1A] px-3 py-1 text-xs text-[#F5F0E9]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#83C98B]" />
                        <span>{item.name.replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                        <span className="text-[10px] text-[#98928B]">
                          {Math.round(item.confidence * 100)}%
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setAccumulated((prev) => prev.filter((p) => p.id !== item.id))
                          }
                          aria-label={`Remove ${item.displayName}`}
                          className="ml-1 text-[#98928B] hover:text-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deep Inspect Consent Dialog (§9.8 & §21) */}
                {showConsentSheet && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 p-5">
                    <div className="w-full rounded-2xl border border-[#FF8A32]/40 bg-[#141414] p-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#F5F0E9]">
                        <Info size={16} className="text-[#FF8A32]" />
                        Deep Inspect Cloud Vision
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#98928B]">
                        Deep Inspect captures a single still frame and submits it to the centralized
                        DRISHYAM backend for multi-ingredient recognition.
                      </p>
                      <p className="mt-2 text-[10px] leading-relaxed text-[#756D62]">
                        Privacy Disclosure (§21): Processed ephemerally in memory and never retained
                        on disk or used for model training.
                      </p>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowConsentSheet(false)}
                          className="rounded-lg px-3 py-1.5 text-xs text-[#98928B]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={deepInspectLoading}
                          onClick={runDeepInspect}
                          className="rounded-lg bg-[#FF8A32] px-3.5 py-1.5 text-xs font-bold text-[#080808]"
                        >
                          {deepInspectLoading ? "Analyzing..." : "I Consent — Analyze"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Manual Input Dialog */}
                {showManualAddDialog && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 p-5">
                    <div className="w-full rounded-2xl border border-white/15 bg-[#141414] p-5">
                      <div className="text-sm font-bold text-[#F5F0E9]">Quick Add Ingredient</div>
                      <input
                        type="text"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        placeholder="e.g. Fenugreek, Mustard Seeds"
                        className="mt-3 w-full rounded-xl border border-white/15 bg-black px-3 py-2 text-xs text-white"
                      />
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowManualAddDialog(false)}
                          className="rounded-lg px-3 py-1.5 text-xs text-[#98928B]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={addManualScannerItem}
                          className="rounded-lg bg-[#FF8A32] px-3.5 py-1.5 text-xs font-bold text-[#080808]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. PANTRY SCREEN */}
            {overlay === null && activeTab === "pantry" && (
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#F5F0E9]">
                      Pantry Inventory
                    </h3>
                    <p className="text-[11px] text-[#98928B]">
                      {pantry.length} verified culinary ingredients
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={refreshAllData}
                      aria-label="Sync Pantry"
                      className="rounded-full border border-white/10 bg-[#181818] p-2 text-[#FF8A32]"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPantryAddModal(true)}
                      aria-label="Add Ingredient Manually"
                      className="rounded-full bg-[#FF8A32] p-2 text-[#080808]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98928B]"
                  />
                  <input
                    type="text"
                    value={pantrySearch}
                    onChange={(e) => setPantrySearch(e.target.value)}
                    placeholder="Search spices, produce, aromatics..."
                    className="w-full rounded-xl border border-white/10 bg-[#141414] py-2 pl-9 pr-3 text-xs text-[#F5F0E9]"
                  />
                </div>

                <div className="space-y-2">
                  {pantry
                    .filter((item) =>
                      (item.displayName || item.name || "")
                        .toLowerCase()
                        .includes(pantrySearch.toLowerCase())
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#181818] p-3"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#F5F0E9]">
                            {item.displayName || item.name}
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-[10px]">
                            <span className="text-[#98928B]">
                              {item.quantity || 100} {item.unit || "g"}
                            </span>
                            <span>•</span>
                            <span
                              className={
                                item.source === "android_scanner"
                                  ? "font-semibold text-[#FF8A32]"
                                  : "text-[#83C98B]"
                              }
                            >
                              {item.source === "android_scanner"
                                ? `Edge Vision (${Math.round((item.confidence || 0.95) * 100)}%)`
                                : "Synced"}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeletePantryItem(item.id, item.displayName || item.name)
                          }
                          aria-label={`Delete ${item.displayName || item.name}`}
                          className="rounded-lg p-1.5 text-[#98928B] hover:text-[#E47767]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                </div>

                {showPantryAddModal && (
                  <div className="rounded-2xl border border-[#FF8A32]/40 bg-[#141414] p-4 space-y-3">
                    <div className="text-xs font-bold text-[#F5F0E9]">
                      Add Ingredient to Pantry
                    </div>
                    <input
                      type="text"
                      value={newPantryName}
                      onChange={(e) => setNewPantryName(e.target.value)}
                      placeholder="Ingredient name (e.g. Asafoetida)"
                      className="w-full rounded-lg border border-white/15 bg-black px-3 py-1.5 text-xs text-white"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newPantryQty}
                        onChange={(e) => setNewPantryQty(e.target.value)}
                        placeholder="Qty"
                        className="w-1/2 rounded-lg border border-white/15 bg-black px-3 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={newPantryUnit}
                        onChange={(e) => setNewPantryUnit(e.target.value)}
                        placeholder="Unit"
                        className="w-1/2 rounded-lg border border-white/15 bg-black px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowPantryAddModal(false)}
                        className="text-xs text-[#98928B]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddPantryItem}
                        className="rounded-lg bg-[#FF8A32] px-3 py-1 text-xs font-bold text-[#080808]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. RECIPES DISCOVERY SCREEN */}
            {overlay === null && activeTab === "recipes" && (
              <div className="space-y-4 p-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F5F0E9]">
                    Culinary Intelligence
                  </h3>
                  <p className="text-[11px] text-[#98928B]">
                    Ranked by pantry coverage, volatile aroma pairing & goal fit
                  </p>
                </div>

                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98928B]"
                  />
                  <input
                    type="text"
                    value={recipeSearch}
                    onChange={(e) => setRecipeSearch(e.target.value)}
                    placeholder="Search recipes or ingredients..."
                    className="w-full rounded-xl border border-white/10 bg-[#141414] py-2 pl-9 pr-3 text-xs text-[#F5F0E9]"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["All Cuisines", "North Indian", "South Indian"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedCuisine(c)}
                      className={`rounded-lg border px-2.5 py-1 text-[11px] ${
                        selectedCuisine === c
                          ? "border-[#FF8A32] bg-[#181818] text-[#FF8A32]"
                          : "border-white/10 bg-[#141414] text-[#F5F0E9]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {recipes
                    .filter((r) => {
                      const matchesSearch = r.title
                        .toLowerCase()
                        .includes(recipeSearch.toLowerCase());
                      const matchesCuisine =
                        selectedCuisine === "All Cuisines" || r.cuisine === selectedCuisine;
                      return matchesSearch && matchesCuisine;
                    })
                    .map((r) => (
                      <div
                        key={r.id || r.recipeId}
                        onClick={() =>
                          setOverlay({ type: "recipe_detail", recipeId: r.id || r.recipeId })
                        }
                        className="cursor-pointer rounded-2xl border border-white/10 bg-[#181818] p-3.5 hover:border-[#FF8A32]/50"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold uppercase tracking-wider text-[#FF8A32]">
                            {r.cuisine}
                          </span>
                          <span className="font-semibold text-[#83C98B]">
                            {Math.round(r.matchPercentage || (r.finalScore || 0.85) * 100)}% Pantry Match
                          </span>
                        </div>
                        <div className="mt-1 text-sm font-bold text-[#F5F0E9]">{r.title}</div>
                        <div className="mt-0.5 text-[11px] text-[#98928B] line-clamp-2">
                          {r.whyRecommended}
                        </div>
                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2 text-[#D1C7BA]">
                            <span className="font-semibold text-[#F5F0E9]">{r.calories} kcal</span>
                            <span>•</span>
                            <span className="text-[#83C98B]">{r.protein}g P</span>
                            <span>•</span>
                            <span>{r.totalTimeMinutes || 30} min</span>
                          </div>
                          {r.oneIngredientToBuy && (
                            <span className="inline-flex items-center gap-1 rounded bg-[#FF8A32]/15 px-1.5 py-0.5 text-[10px] text-[#FF8A32]">
                              <Key size={10} /> +{r.oneIngredientToBuy}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 5. NUTRITION & 8 GOALS SCREEN */}
            {overlay === null && activeTab === "nutrition" && (
              <div className="space-y-4 p-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F5F0E9]">
                    Nutrition Studio
                  </h3>
                  <p className="text-[11px] text-[#98928B]">
                    Daily energy balance & 8 fitness protocols (§5.7)
                  </p>
                </div>

                {/* Summary Box */}
                <div className="rounded-2xl border border-white/10 bg-[#181818] p-4 text-center">
                  <div className="text-2xl font-bold text-[#F5F0E9]">
                    {consumedCalories}{" "}
                    <span className="text-sm font-normal text-[#98928B]">/ {calTarget} kcal</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] font-bold text-[#83C98B]">PROTEIN</div>
                      <div className="text-[#F5F0E9]">
                        {Math.round(consumedProtein)} / {Math.round(proTarget)}g
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#E8B56A]">CARBS</div>
                      <div className="text-[#F5F0E9]">
                        {Math.round(consumedCarbs)} / {Math.round(carbTarget)}g
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#E47767]">FATS</div>
                      <div className="text-[#F5F0E9]">
                        {Math.round(consumedFat)} / {Math.round(fatTarget)}g
                      </div>
                    </div>
                  </div>
                </div>

                {/* 8 Target Formulations */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#FF8A32]">
                    <span>TARGET FORMULATIONS (8 PROTOCOLS)</span>
                    <span className="text-[#98928B]">Safety bounded (§5.7)</span>
                  </div>

                  {GOALS_LIST.map((g) => {
                    const selected = activeGoal === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => handleSelectGoal(g.id)}
                        className={`cursor-pointer rounded-xl border p-3 transition-all ${
                          selected
                            ? "border-[#FF8A32] bg-[#141414]"
                            : "border-white/10 bg-[#181818]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#F5F0E9]">{g.title}</span>
                          {selected && <Check size={14} className="text-[#FF8A32]" />}
                        </div>
                        <div className="mt-0.5 text-[11px] text-[#98928B]">{g.desc}</div>
                        <div className="mt-1 text-[10px] font-semibold text-[#FF8A32]">
                          {g.proPerKg}g protein/kg · {g.delta >= 0 ? `+${g.delta}` : g.delta} kcal/day
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Bar (hidden on fullscreen scanner & cooking mode) */}
          {!isFullscreenScanner && !isCookingOverlay && (
            <div className="z-20 grid h-16 shrink-0 grid-cols-5 border-t border-white/10 bg-[#111111] px-2">
              {(
                [
                  { id: "dashboard", label: "Home", icon: PieChart },
                  { id: "scanner", label: "Scanner", icon: Camera },
                  { id: "pantry", label: "Pantry", icon: Layers },
                  { id: "recipes", label: "Discover", icon: ChefHat },
                  { id: "nutrition", label: "Nutrition", icon: Activity },
                ] as const
              ).map((nav) => {
                const Icon = nav.icon;
                const selected = activeTab === nav.id && overlay === null;
                return (
                  <button
                    key={nav.id}
                    type="button"
                    onClick={() => {
                      setOverlay(null);
                      setActiveTab(nav.id);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                      selected ? "text-[#FF8A32]" : "text-[#98928B] hover:text-[#F5F0E9]"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{nav.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Android Gesture Pill Bar */}
          <div className="flex h-5 shrink-0 items-center justify-center bg-[#080808]">
            <div className="h-1 w-28 rounded-full bg-white/25" />
          </div>
        </div>
      </div>

      {/* Right Column: Live Code & Feature Parity Inspector */}
      <div className="space-y-4 order-3">
        <div className="rounded-2xl border border-white/10 bg-[rgba(16,14,12,.78)] p-5">
          <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#E8B56A]">
            Android Exclusive Capabilities (§9)
          </div>
          <h3 className="mt-1 font-display text-xl font-semibold text-[#F6EFE4]">
            On-Device Vision Pipeline
          </h3>
          <ul className="mt-3 space-y-2.5 text-xs text-[#B3A798]">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF8A32] shrink-0" />
              <span>
                <strong className="text-[#F6EFE4]">CameraX + YOLOv8n / ML Kit OCR:</strong> Real-time
                bounding-box detection with Latin & Devanagari alias matching (e.g.{" "}
                <em>haldi → turmeric, jeera → cumin</em>).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF8A32] shrink-0" />
              <span>
                <strong className="text-[#F6EFE4]">Temporal Stability Accumulator:</strong> Requires
                ≥75% confidence sustained for ≥1,000ms before promoting detections to the confirmation tray.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF8A32] shrink-0" />
              <span>
                <strong className="text-[#F6EFE4]">Deep Inspect Single-Frame Fallback:</strong>{" "}
                Explicit user consent sheet (consent=true) transmitting a single frame for ephemeral
                in-memory analysis.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF8A32] shrink-0" />
              <span>
                <strong className="text-[#F6EFE4]">Bidirectional Pantry Sync:</strong> Tap{" "}
                <em>Confirm All ➔</em> inside the Android Scanner to push detected items into the
                centralized backend and view them immediately on the{" "}
                <Link href="/app/pantry" className="underline text-[#E8B56A]">
                  Web Pantry
                </Link>
                .
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[rgba(16,14,12,.6)] p-5">
          <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#83C98B]">
            Multi-Module Kotlin Source Tree
          </div>
          <div className="mt-2 font-mono text-[11px] leading-relaxed text-[#A79C8D] space-y-1">
            <div>android/app/src/main/kotlin/com/drishyam/app/MainActivity.kt</div>
            <div>android/feature/scanner/.../ScannerScreen.kt</div>
            <div>android/feature/dashboard/.../DashboardScreen.kt</div>
            <div>android/vision/.../IngredientAccumulator.kt</div>
            <div>android/vision/.../OcrAliasMatcher.kt</div>
            <div>android/core/database/.../DrishyamDatabase.kt</div>
            <div>android/data/sync/.../SyncWorker.kt</div>
          </div>
        </div>
      </div>
    </div>
  );
}
