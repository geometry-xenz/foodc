"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCircle2, Circle, Loader2, Plus, ShoppingCart, Sparkles, Trash2 } from "lucide-react";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  reason?: string;
  version: number;
}

interface SuggestionItem {
  name: string;
  quantity: number;
  unit: string;
  reason: string;
}

export function ShoppingWorkspace({
  initialItems,
  initialSuggestions,
}: {
  initialItems: ShoppingItem[];
  initialSuggestions: SuggestionItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>(initialSuggestions);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState("piece");
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleTogglePurchased(item: ShoppingItem) {
    setTogglingId(item.id);
    const updatedStatus = !item.purchased;
    try {
      const res = await fetch(`/api/shopping/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchased: updatedStatus, version: item.version }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, purchased: updatedStatus, version: i.version + 1 } : i))
        );
        router.refresh();
      }
    } catch {
      // error
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(itemId: string) {
    setDeletingId(itemId);
    try {
      const res = await fetch(`/api/shopping/items/${itemId}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        router.refresh();
      }
    } catch {
      // error
    } finally {
      setDeletingId(null);
    }
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/shopping/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newItemName.trim(),
          quantity: Number(newItemQty),
          unit: newItemUnit,
          reason: "manual",
        }),
      });
      if (res.ok) {
        setNewItemName("");
        router.refresh();
        const listRes = await fetch("/api/shopping");
        if (listRes.ok) setItems(await listRes.json());
      }
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  }

  async function handleAddSuggestion(s: SuggestionItem) {
    try {
      const res = await fetch("/api/shopping/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: s.name,
          quantity: s.quantity,
          unit: s.unit,
          reason: s.reason,
        }),
      });
      if (res.ok) {
        setSuggestions((prev) => prev.filter((item) => item.name !== s.name));
        const listRes = await fetch("/api/shopping");
        if (listRes.ok) setItems(await listRes.json());
        router.refresh();
      }
    } catch {
      // error
    }
  }

  const pending = items.filter((i) => !i.purchased);
  const purchased = items.filter((i) => i.purchased);

  return (
    <div className="space-y-8">
      {/* Quick Add Form */}
      <form onSubmit={handleAddItem} className="rounded-2xl border border-white/10 bg-[#0e0c0a] p-4 flex flex-col sm:flex-row items-center gap-3">
        <input
          required
          placeholder="Add pantry item (e.g. Kasuri Methi, Coconut Milk)..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="field flex-1"
        />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={newItemQty}
            onChange={(e) => setNewItemQty(Number(e.target.value))}
            className="field w-20 text-center"
          />
          <select
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            className="field w-24"
          >
            <option value="piece">pcs</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="tbsp">tbsp</option>
            <option value="tsp">tsp</option>
          </select>
          <button type="submit" disabled={loading} className="btn btn-gold shrink-0">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add
          </button>
        </div>
      </form>

      {/* Suggested Items From Plan */}
      {suggestions.length > 0 && (
        <div className="rounded-2xl border border-[rgba(232,181,106,.2)] bg-[rgba(16,14,12,.7)] p-5">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8B56A]">
            <Sparkles size={14} />
            Smart Suggestions (Planned Meals minus Pantry Stock)
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => handleAddSuggestion(s)}
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-[#F6EFE4] hover:border-[#E8B56A] transition-colors"
              >
                <span>+ {s.name}</span>
                <span className="text-[0.6rem] text-[#756D62]">
                  ({s.quantity} {s.unit})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shopping List Items */}
      <div className="space-y-6">
        <div>
          <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#8B7E6D] mb-3">
            To Purchase ({pending.length})
          </div>
          {pending.length === 0 ? (
            <div className="rounded-xl border border-white/5 p-6 text-center text-xs text-[#756D62]">
              All items checked off or empty list!
            </div>
          ) : (
            <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#0e0c0a] overflow-hidden">
              {pending.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 hover:bg-white/[0.015] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => handleTogglePurchased(item)}
                    disabled={togglingId === item.id}
                    className="flex items-center gap-3 text-left flex-1"
                  >
                    <Circle size={18} className="text-[#8B7E6D] hover:text-[#E8B56A] transition-colors shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-[#F6EFE4]">{item.name}</div>
                      {item.reason && (
                        <div className="text-[0.62rem] text-[#756D62]">{item.reason}</div>
                      )}
                    </div>
                  </button>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#B3A798] font-mono">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="icon-btn hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {purchased.length > 0 && (
          <div>
            <div className="text-[0.62rem] font-semibold uppercase tracking-wider text-[#8FA989] mb-3">
              Purchased ({purchased.length})
            </div>
            <div className="divide-y divide-white/5 rounded-2xl border border-white/5 bg-black/20 overflow-hidden opacity-70">
              {purchased.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 hover:bg-white/[0.01] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => handleTogglePurchased(item)}
                    disabled={togglingId === item.id}
                    className="flex items-center gap-3 text-left flex-1"
                  >
                    <CheckCircle2 size={18} className="text-[#8FA989] shrink-0" />
                    <span className="text-sm text-[#756D62] line-through">{item.name}</span>
                  </button>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#5F574D] font-mono">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="icon-btn hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
