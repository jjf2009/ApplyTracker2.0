"use client";
import { Experience } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";

export default function ExperienceFields() {
  const { formData, addExperience, removeExperience, updateExperience } = useResumeStore();
  const { experience } = formData;

  function updateBullet(expIdx: number, bulletIdx: number, value: string) {
    const bullets = [...experience[expIdx].bullets];
    bullets[bulletIdx] = value;
    updateExperience(expIdx, "bullets", bullets);
  }

  function addBullet(expIdx: number) {
    const bullets = [...experience[expIdx].bullets, ""];
    updateExperience(expIdx, "bullets", bullets);
  }

  function removeBullet(expIdx: number, bulletIdx: number) {
    const bullets = experience[expIdx].bullets.filter((_, j) => j !== bulletIdx);
    updateExperience(expIdx, "bullets", bullets);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Experience</h2>
        <button
          onClick={addExperience}
          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, i) => (
          <div key={exp.id} className="bg-gray-50 rounded p-4 border border-gray-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Entry {i + 1}</span>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>

            {([
              ["company", "Company Name"],
              ["role", "Role / Title"],
              ["location", "Location"],
              ["startDate", "Start Date (e.g. Dec 2025)"],
              ["endDate", "End Date (e.g. Present)"],
            ] as [keyof Experience, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="block text-xs text-gray-600 mb-1">{label}</label>
                <input
                  value={exp[field] as string}
                  onChange={e => updateExperience(i, field, e.target.value)}
                  className="w-full bg-white text-gray-900 text-sm px-3 py-2 rounded border border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-gray-600 mb-1">Bullet Points</label>
              {exp.bullets.map((b, j) => (
                <div key={j} className="flex gap-2 mb-1">
                  <input
                    value={b}
                    onChange={e => updateBullet(i, j, e.target.value)}
                    placeholder={`Bullet ${j + 1}`}
                    className="flex-1 bg-white text-gray-900 text-sm px-3 py-1.5 rounded border border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <button onClick={() => removeBullet(i, j)} className="text-red-500 text-xs px-2 hover:text-red-600">×</button>
                </div>
              ))}
              <button onClick={() => addBullet(i)} className="text-xs text-purple-600 hover:text-purple-700 mt-1">
                + Add bullet
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
