"use client";
import { ResumeForm } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

const skillFields = [
  { key: "languages", label: "Languages" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps & Tools" },
] as const;

export default function SkillsFields({ data, onChange }: Props) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Technical Skills</h2>
      <div className="space-y-3">
        {skillFields.map(f => (
          <div key={f.key}>
            <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
            <input
              value={data.skills[f.key]}
              onChange={e => onChange({ ...data, skills: { ...data.skills, [f.key]: e.target.value } })}
              className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
