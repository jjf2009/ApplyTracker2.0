"use client";
import { ResumeForm, Project } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

function newProject(): Project {
  return { id: crypto.randomUUID(), title: "", url: "", techStack: "", bullets: [""] };
}

export default function ProjectFields({ data, onChange }: Props) {
  const { projects } = data;

  function updateProject(index: number, field: keyof Project, value: any) {
    const updated = projects.map((p, i) => i === index ? { ...p, [field]: value } : p);
    onChange({ ...data, projects: updated });
  }

  function updateBullet(projIdx: number, bulletIdx: number, value: string) {
    const updated = projects.map((p, i) => {
      if (i !== projIdx) return p;
      const bullets = p.bullets.map((b, j) => j === bulletIdx ? value : b);
      return { ...p, bullets };
    });
    onChange({ ...data, projects: updated });
  }

  function addBullet(projIdx: number) {
    const updated = projects.map((p, i) =>
      i === projIdx ? { ...p, bullets: [...p.bullets, ""] } : p
    );
    onChange({ ...data, projects: updated });
  }

  function removeBullet(projIdx: number, bulletIdx: number) {
    const updated = projects.map((p, i) => {
      if (i !== projIdx) return p;
      return { ...p, bullets: p.bullets.filter((_, j) => j !== bulletIdx) };
    });
    onChange({ ...data, projects: updated });
  }

  function removeProject(index: number) {
    onChange({ ...data, projects: projects.filter((_, i) => i !== index) });
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Projects</h2>
        <button
          onClick={() => onChange({ ...data, projects: [...projects, newProject()] })}
          className="text-xs text-purple-400 hover:text-purple-300"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj, i) => (
          <div key={proj.id} className="bg-gray-900 rounded p-4 border border-gray-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Project {i + 1}</span>
              <button onClick={() => removeProject(i)} className="text-xs text-red-400">Remove</button>
            </div>

            {([
              ["title", "Project Title"],
              ["url", "Project URL (optional)"],
              ["techStack", "Tech Stack (comma-separated)"],
            ] as [keyof Project, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="block text-xs text-gray-400 mb-1">{label}</label>
                <input
                  value={proj[field] as string}
                  onChange={e => updateProject(i, field, e.target.value)}
                  className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-gray-400 mb-1">Bullet Points</label>
              {proj.bullets.map((b, j) => (
                <div key={j} className="flex gap-2 mb-1">
                  <input
                    value={b}
                    onChange={e => updateBullet(i, j, e.target.value)}
                    placeholder={`Bullet ${j + 1}`}
                    className="flex-1 bg-gray-800 text-white text-sm px-3 py-1.5 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
                  />
                  <button onClick={() => removeBullet(i, j)} className="text-red-400 text-xs px-2">×</button>
                </div>
              ))}
              <button onClick={() => addBullet(i)} className="text-xs text-purple-400 mt-1">+ Add bullet</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
