"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Loader2,
  Minus,
  Package,
  Plus,
  ScanEye,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import type { PantryDto } from "@/lib/types";

type CatalogItem = {
  name: string;
  displayName: string;
  category: string;
  calories: number;
  protein: number;
  compounds: string[];
};

const CATEGORIES = [
  "All",
  "Spices",
  "Vegetables",
  "Legumes",
  "Grains",
  "Dairy",
  "Fruits",
  "Herbs",
  "Oils",
  "Other",
];

export function PantryManager({
  initialPantry,
  catalog,
}: {
  initialPantry: PantryDto[];
  catalog: CatalogItem[];
}) {
  const router = useRouter();
  const [pantry, setPantry] = useState(initialPantry);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState("100");
  const [unit, setUnit] = useState("g");
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const catalogByName = useMemo(
    () => new Map(catalog.map((item) => [item.name, item])),
    [catalog],
  );
  const pantryNames = useMemo(() => new Set(pantry.map((item) => item.name)), [pantry]);

  const filtered = pantry.filter((item) => {
    const matchesSearch =
      item.displayName.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(pantry.map((item) => item.category))];
  const totalMass = pantry.reduce((total, item) => total + item.quantity, 0);
  const avgConfidence =
    pantry.length > 0
      ? pantry.reduce((total, item) => total + item.confidence, 0) / pantry.length
      : 0;
  const suggestions = catalog.filter((item) => !pantryNames.has(item.name)).slice(0, 6);

  const selectedCatalog = catalog.find((item) => item.name === selected);

  async function addItem(payload: {
    name: string;
    category?: string;
    quantity?: number;
    unit?: string;
    source?: string;
    confidence?: number;
  }) {
    setBusy(payload.name);
    setMessage(null);
    try {
      const response = await fetch("/api/pantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          category: payload.category ?? selectedCatalog?.category ?? "Spices",
          quantity: payload.quantity ?? 100,
          unit: payload.unit ?? "g",
          source: payload.source ?? "manual",
          confidence: payload.confidence ?? 0.97,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage({ type: "error", text: data.error ?? "Unable to add ingredient." });
        return false;
      }
      const item = data.item as PantryDto;
      setPantry((current) => {
        const existing = current.find((entry) => entry.id === item.id);
        return existing
          ? current.map((entry) => (entry.id === item.id ? item : entry))
          : [item, ...current];
      });
      setMessage({ type: "ok", text: `${item.displayName} added to pantry.` });
      router.refresh();
      return true;
    } catch {
      setMessage({ type: "error", text: "Network unavailable." });
      return false;
    } finally {
      setBusy(null);
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const name = selected || search;
    if (!name.trim()) {
      setMessage({ type: "error", text: "Choose an ingredient first." });
      return;
    }
    const ok = await addItem({
      name,
      category: selectedCatalog?.category ?? "Spices",
      quantity: Number(quantity) || 100,
      unit,
      source: "manual",
      confidence: 1,
    });
    if (ok) {
      setSelected("");
      setQuantity("100");
    }
  }

  async function removeItem(item: PantryDto) {
    setBusy(item.id);
    setMessage(null);
    try {
      const response = await fetch(`/api/pantry/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        setMessage({ type: "error", text: data.error ?? "Unable to remove ingredient." });
        return;
      }
      setPantry((current) => current.filter((entry) => entry.id !== item.id));
      setMessage({ type: "ok", text: `${item.displayName} removed.` });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Network unavailable." });
    } finally {
      setBusy(null);
    }
  }

  async function adjust(item: PantryDto, amount: number) {
    const nextQuantity = Math.max(0, item.quantity + amount);
    setBusy(item.id);
    try {
      const response = await fetch(`/api/pantry/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage({ type: "error", text: data.error ?? "Unable to update." });
        return;
      }
      setPantry((current) =>
        current.map((entry) => (entry.id === item.id ? data.item : entry)),
      );
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow mb-2.5">Live inventory</div>
          <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            Your <span className="italic text-gold-gradient">pantry.</span>
          </h1>
          <p className="mt-2.5 max-w-[620px] text-[0.78rem] leading-6 text-[#8F8373]">
            Every visible ingredient becomes a molecular input. Add, remove or
            adjust stock — recipe scores recalculate instantly.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Signals" value={String(pantry.length)} detail="active ingredients" />
        <Stat label="Catalog coverage" value={`${Math.round((pantry.length / Math.max(catalog.length, 1)) * 100)}%`} detail={`${catalog.length} ingredient ontology`} />
        <Stat label="Total mass" value={`${(totalMass / 1000).toFixed(1)}kg`} detail="across all units" />
        <Stat label="Mean confidence" value={`${Math.round(avgConfidence * 100)}%`} detail={`${categories.length} categories`} />
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="min-w-0 space-y-4">
          <section className="app-card p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <Plus size={14} className="text-[#FF8A32]" />
              <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
                Add ingredient
              </h2>
            </div>
            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="label" htmlFor="ingredient-search">
                  Ingredient
                </label>
                <input
                  id="ingredient-search"
                  className="field"
                  list="ingredient-catalog"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setSelected(event.target.value);
                  }}
                  placeholder="Search turmeric, paneer, cumin…"
                />
                <datalist id="ingredient-catalog">
                  {catalog.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.displayName} · {item.category}
                    </option>
                  ))}
                </datalist>
                {selectedCatalog && (
                  <div className="mt-1.5 flex items-center gap-2 text-[0.55rem] text-[#756D62]">
                    <span className="chip chip-gold !py-0.5">{selectedCatalog.category}</span>
                    <span>{selectedCatalog.calories} kcal / 100g</span>
                    <span>{selectedCatalog.protein}g protein</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="label" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    className="field"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="unit">
                    Unit
                  </label>
                  <select id="unit" className="field" value={unit} onChange={(event) => setUnit(event.target.value)}>
                    <option value="g">grams</option>
                    <option value="ml">millilitres</option>
                    <option value="pieces">pieces</option>
                    <option value="pods">pods</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={busy !== null} className="btn btn-gold w-full btn-sm">
                {busy ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                Add to pantry
              </button>
            </form>

            {message && (
              <div
                className={`mt-3 flex items-start gap-2 rounded-lg border px-3 py-2 text-[0.62rem] ${
                  message.type === "ok"
                    ? "border-[rgba(143,169,137,.25)] bg-[rgba(143,169,137,.06)] text-[#B8CCB3]"
                    : "border-[rgba(226,112,90,.28)] bg-[rgba(226,112,90,.06)] text-[#E9A091]"
                }`}
              >
                {message.type === "ok" ? <Check size={12} className="mt-0.5" /> : <X size={12} className="mt-0.5" />}
                {message.text}
              </div>
            )}
          </section>

          <section className="relative overflow-hidden rounded-[18px] border border-[rgba(232,181,106,.16)] bg-[linear-gradient(150deg,rgba(255,138,50,.07),rgba(12,11,10,.92))] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ScanEye size={14} className="text-[#FF8A32]" />
                <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#D9C7AE]">
                  Live Mobile Scanner
                </h2>
              </div>
              <span className="chip chip-gold !py-0.5 text-[0.44rem]">Android</span>
            </div>
            <div className="mt-3 rounded-xl border border-[rgba(232,181,106,.13)] bg-[rgba(8,8,8,.6)] p-3 text-center">
              <div className="font-display text-[1.1rem] leading-snug text-[#F3D3A1]">
                On-device Computer Vision
              </div>
              <p className="mt-1.5 text-[0.62rem] leading-relaxed text-[#A99F91]">
                Use the native DRISHYAM Android app to point your camera at spices, containers and pantry staples. Items recognized via OCR, local edge models, or Deep Inspect sync to your web inventory in real time.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[0.55rem] text-[#756D62]">
              <span>Sources: Android Scanner · Manual · Deep Inspect</span>
            </div>
          </section>
        </div>

        <section className="app-card p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[0.48rem] uppercase tracking-[0.18em] text-[#756D62]">
                Active inventory
              </div>
              <h2 className="mt-0.5 font-display text-[1.5rem] leading-none text-[#F6EFE4]">
                {filtered.length} signals
              </h2>
            </div>
            <div className="relative w-full sm:w-[220px]">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F665B]" />
              <input
                className="field !h-9 !pl-8 text-[0.7rem]"
                placeholder="Filter pantry"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`chip transition-all ${
                  category === item ? "chip-gold" : "hover:border-[rgba(232,181,106,.3)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-[rgba(232,181,106,.16)] px-5 py-10 text-center">
              <Package size={22} className="mx-auto text-[#756D62]" />
              <p className="mt-3 text-[0.72rem] text-[#8F8373]">
                No ingredients match this filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="btn btn-ghost btn-sm mt-3"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {filtered.map((item) => {
                const catalogItem = catalogByName.get(item.name);
                return (
                  <article
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl border border-[rgba(232,181,106,.12)] bg-[rgba(255,255,255,.014)] p-3 transition-colors hover:border-[rgba(232,181,106,.28)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-[0.74rem] text-[#E9DFD0]">{item.displayName}</div>
                        <div className="mt-0.5 text-[0.46rem] uppercase tracking-[0.1em] text-[#6F665B]">
                          {item.category} · {item.source}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        disabled={busy !== null}
                        className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-[#E2705A]"
                        aria-label={`Remove ${item.displayName}`}
                      >
                        {busy === item.id ? (
                          <Loader2 size={13} className="animate-spin text-[#E8B56A]" />
                        ) : (
                          <Trash2 size={13} className="text-[#756D62]" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <div>
                        <span className="font-display text-[1.45rem] leading-none text-[#F3D3A1]">
                          {Math.round(item.quantity)}
                        </span>
                        <span className="ml-1 text-[0.5rem] uppercase tracking-[0.1em] text-[#756D62]">
                          {item.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjust(item, -25)}
                          className="icon-btn !h-6 !w-6"
                          aria-label="Decrease"
                        >
                          <Minus size={10} />
                        </button>
                        <button
                          type="button"
                          onClick={() => adjust(item, 25)}
                          className="icon-btn !h-6 !w-6"
                          aria-label="Increase"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="progress-track h-1 flex-1">
                        <div
                          className="progress-fill"
                          style={{ width: `${Math.round(item.confidence * 100)}%` }}
                        />
                      </div>
                      <span className="text-[0.44rem] tabular-nums text-[#5F574D]">
                        {Math.round(item.confidence * 100)}%
                      </span>
                    </div>
                    {catalogItem && (
                      <div className="mt-1.5 truncate text-[0.46rem] text-[#5F574D]">
                        {catalogItem.calories} kcal · {catalogItem.protein}g protein / 100g
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="app-card p-4">
      <div className="text-[0.46rem] uppercase tracking-[0.16em] text-[#756D62]">{label}</div>
      <div className="mt-2 font-display text-[2rem] leading-none text-[#F3D3A1]">{value}</div>
      <div className="mt-1.5 truncate text-[0.48rem] uppercase tracking-[0.1em] text-[#5F574D]">{detail}</div>
    </div>
  );
}
