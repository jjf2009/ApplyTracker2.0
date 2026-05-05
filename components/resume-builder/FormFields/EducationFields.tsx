"use client";
import { ResumeForm, Education } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

function newEdu(): Education {
  return { id: crypto.randomUUID(), institution: "", degree: "", startDate: "", endDate: "", grade: "" };
}

export default function EducationFields({ data, onChange }: Props) {
  const { education } = data;

  function updateEdu(index: number, field: keyof Education, value: string) {
    const updated = education.map((e, i) => i === index ? { ...e, [field]: value } : e);
    onChange({ ...data, education: updated });
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Education</h2>
        <button
          onClick={() => onChange({ ...data, education: [...education, newEdu()] })}
          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, i) => (
          <div key={edu.id} className="bg-gray-50 rounded p-4 border border-gray-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Entry {i + 1}</span>
              <button
                onClick={() => onChange({ ...data, education: education.filter((_, j) => j !== i) })}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>

            {([
              ["institution", "Institution Name"],
              ["degree", "Degree"],
              ["startDate", "Start (e.g. June 2024)"],
              ["endDate", "End (e.g. 2028)"],
              ["grade", "Grade (e.g. SGPA: 9/10)"],
            ] as [keyof Education, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="block text-xs text-gray-600 mb-1">{label}</label>
                <input
                  value={edu[field] as string}
                  onChange={e => updateEdu(i, field, e.target.value)}
                  className="w-full bg-white text-gray-900 text-sm px-3 py-2 rounded border border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
