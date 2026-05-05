"use client";
import { useResumeStore } from "@/store/useResumeStore";

export default function AchievementsFields() {
  const { formData, updateAchievements } = useResumeStore();
  const { achievements } = formData;

  function update(index: number, value: string) {
    const updated = achievements.map((a, i) => i === index ? value : a);
    updateAchievements(updated);
  }

  function remove(index: number) {
    updateAchievements(achievements.filter((_, i) => i !== index));
  }

  function add() {
    updateAchievements([...achievements, ""]);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Achievements</h2>
        <button
          onClick={add}
          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {achievements.map((a, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={a}
              onChange={e => update(i, e.target.value)}
              placeholder="e.g. 2x Hackathon Winner – ..."
              className="flex-1 bg-white text-gray-900 text-sm px-3 py-2 rounded border border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <button onClick={() => remove(i)} className="text-red-500 text-xs px-2 hover:text-red-600">×</button>
          </div>
        ))}
      </div>
    </section>
  );
}
