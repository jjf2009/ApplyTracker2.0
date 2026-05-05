"use client";
import { ResumeForm, Experience } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

function newExp(): Experience {
  return {
    id: crypto.randomUUID(),
    company: "", role: "", location: "",
    startDate: "", endDate: "", bullets: [""],
  };
}

export default function ExperienceFields({ data, onChange }: Props) {
  const { experience } = data;

  function updateExp(index: number, field: keyof Experience, value: any) {
    const updated = experience.map((e, i) => i === index ? { ...e, [field]: value } : e);
    onChange({ ...data, experience: updated });
  }

  function updateBullet(expIdx: number, bulletIdx: number, value: string) {
    const updated = experience.map((e, i) => {
      if (i !== expIdx) return e;
      const bullets = e.bullets.map((b, j) => j === bulletIdx ? value : b);
      return { ...e, bullets };
    });
    onChange({ ...data, experience: updated });
  }

  function addBullet(expIdx: number) {
    const updated = experience.map((e, i) =>
      i === expIdx ? { ...e, bullets: [...e.bullets, ""] } : e
    );
    onChange({ ...data, experience: updated });
  }

  function removeBullet(expIdx: number, bulletIdx: number) {
    const updated = experience.map((e, i) => {
      if (i !== expIdx) return e;
      return { ...e, bullets: e.bullets.filter((_, j) => j !== bulletIdx) };
    });
    onChange({ ...data, experience: updated });
  }

  function removeExp(index: number) {
    onChange({ ...data, experience: experience.filter((_, i) => i !== index) });
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Experience</h2>
        <button
          onClick={() => onChange({ ...data, experience: [...experience, newExp()] })}
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
              <button onClick={() => removeExp(i)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
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
                  onChange={e => updateExp(i, field, e.target.value)}
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
