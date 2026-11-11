"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Flame, Loader2, Plus, Sparkles, Trash2, Utensils } from "lucide-react";
import { todayISO } from "@/lib/utils";

interface MealHistoryItem {
  id: string;
  date: string;
  meal_type: string;
  eaten_at: string;
  total_calories: number;
  total_protein_g: number;
  notes?: string;
  items: Array<{
    name: string;
    servings: number;
    calories: number;
    protein_g: number;
  }>;
}

export function MealHistoryWorkspace({ initialLogs }: { initialLogs: MealHistoryItem[] }) {
  const router = useRouter();
  const [logs, setLogs] = useState<MealHistoryItem[]>(initialLogs);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [date, setDate] = useState(todayISO());
  const [mealType, setMealType] = useState("lunch");
  const [name, setName] = useState("");
  const [servings, setServings] = useState(1);
  const [calories, setCalories] = useState(450);
  const [proteinG, setProteinG] = useState(30);
  const [notes, setNotes] = useState("");

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/nutrition/meal-log/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLogs((prev) => prev.filter((l) => l.id !== id));
        router.refresh();
      }
    } catch {
      // error
    } finally {
      setDeletingId(null);
    }
  }

  async function handleAddLog(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/nutrition/meal-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          meal_type: mealType,
          items: [
            {
              name,
              servings: Number(servings),
              calories: Number(calories),
              protein_g: Number(proteinG),
              carbs_g: 40,
              fat_g: 15,
            },
          ],
          notes,
        }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setName("");
        router.refresh();
        const historyRes = await fetch("/api/nutrition/history");
        if (historyRes.ok) {
          const freshLogs = await historyRes.json();
          setLogs(freshLogs);
        }
      }
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#8B7E6D]">
          {logs.length} logged meals recorded
        </span>
        <button
          type="button"
          onClick={() => setShowAddForm((v) => !v)}
          className="btn btn-gold btn-sm"
        >
          <Plus size={14} />
          {showAddForm ? "Cancel" : "Log a Meal"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddLog} className="rounded-2xl border border-[rgba(232,181,106,.25)] bg-[rgba(16,14,12,.85)] p-6 space-y-4 shadow-xl">
          <div className="text-sm font-semibold text-[#F6EFE4]">Quick Meal Logger</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field"
              />
            </div>
            <div>
              <label className="label" htmlFor="type">Meal Slot</label>
              <select
                id="type"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="field"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="post_workout">Post-Workout</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="dish-name">Dish / Ingredient Name</label>
            <input
              id="dish-name"
              required
              placeholder="Paneer Tikka with Paratha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label" htmlFor="servings">Portion / Servings</label>
              <input
                id="servings"
                type="number"
                step="0.25"
                min="0.25"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="field"
              />
            </div>
            <div>
              <label className="label" htmlFor="calories">Calories (kcal)</label>
              <input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="field"
              />
            </div>
            <div>
              <label className="label" htmlFor="protein">Protein (g)</label>
              <input
                id="protein"
                type="number"
                value={proteinG}
                onChange={(e) => setProteinG(Number(e.target.value))}
                className="field"
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="notes">Notes</label>
            <input
              id="notes"
              placeholder="e.g. Cooked with extra cumin and ghee"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="field"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-gold btn-sm">
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
              Save to Metabolic History
            </button>
          </div>
        </form>
      )}

      {logs.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-12 text-center">
          <Utensils size={32} className="mx-auto text-[#756D62] mb-3" />
          <h3 className="font-display text-lg text-[#F6EFE4]">No Meals Logged Yet</h3>
          <p className="mt-1 text-xs text-[#8B7E6D]">
            Meals you finish in Cooking Mode or log manually will appear here with calculated macros.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded px-2 py-0.5 text-[0.6rem] uppercase tracking-wider font-semibold bg-[#E8B56A]/15 text-[#E8B56A]">
                    {log.meal_type}
                  </span>
                  <span className="text-xs text-[#756D62] flex items-center gap-1">
                    <Calendar size={12} /> {log.date}
                  </span>
                </div>
                <div className="font-medium text-sm text-[#F6EFE4]">
                  {log.items.map((i) => `${i.name} (${i.servings}x)`).join(", ")}
                </div>
                {log.notes && (
                  <div className="text-xs text-[#8B7E6D] italic">
                    &ldquo;{log.notes}&rdquo;
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-1 font-display text-base text-[#F6EFE4]">
                    <Flame size={14} className="text-[#FF8A32]" />
                    {Math.round(log.total_calories)} kcal
                  </div>
                  <div className="text-[0.65rem] text-[#8FA989]">
                    {Math.round(log.total_protein_g)} g protein
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(log.id)}
                  disabled={deletingId === log.id}
                  className="icon-btn hover:text-red-400"
                  title="Delete Log"
                >
                  {deletingId === log.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
