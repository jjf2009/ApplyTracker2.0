"use client";
import { ResumeForm } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

const fields = [
  { key: "name", label: "Full Name", placeholder: "Jared John Furtado" },
  { key: "email", label: "Email", placeholder: "jared@jaredfurtado.tech" },
  { key: "phone", label: "Phone", placeholder: "+91-8421012788" },
  { key: "github", label: "GitHub username", placeholder: "jjf2009" },
  { key: "linkedin", label: "LinkedIn username", placeholder: "jared-furtado" },
  { key: "portfolio", label: "Portfolio URL", placeholder: "www.jaredfurtado.tech" },
] as const;

export default function HeaderFields({ data, onChange }: Props) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Header</h2>
      <div className="grid grid-cols-2 gap-3">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
            <input
              value={(data as any)[f.key]}
              onChange={e => onChange({ ...data, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
