"use client";
import { Project } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";

export default function ProjectFields() {
  const { formData, addProject, removeProject, updateProject } = useResumeStore();
  const { projects } = formData;

  function updateBullet(projIdx: number, bulletIdx: number, value: string) {
    const bullets = [...projects[projIdx].bullets];
    bullets[bulletIdx] = value;
    updateProject(projIdx, "bullets", bullets);
  }

  function addBullet(projIdx: number) {
    const bullets = [...projects[projIdx].bullets, ""];
    updateProject(projIdx, "bullets", bullets);
  }

  function removeBullet(projIdx: number, bulletIdx: number) {
    const bullets = projects[projIdx].bullets.filter((_, j) => j !== bulletIdx);
    updateProject(projIdx, "bullets", bullets);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Projects</h2>
        <button
          onClick={addProject}
          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj, i) => (
          <div key={proj.id} className="bg-gray-50 rounded p-4 border border-gray-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Project {i + 1}</span>
              <button
                onClick={() => removeProject(proj.id)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>

            {([
              ["title", "Project Title"],
              ["url", "Project URL (optional)"],
              ["year", "Year / Date Range"],
              ["techStack", "Tech Stack (comma-separated)"],
            ] as [keyof Project, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="block text-xs text-gray-600 mb-1">{label}</label>
                <input
                  value={proj[field] as string}
                  onChange={e => updateProject(i, field, e.target.value)}
                  className="w-full bg-white text-gray-900 text-sm px-3 py-2 rounded border border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-gray-600 mb-1">Bullet Points</label>
              {proj.bullets.map((b, j) => (
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
              <button onClick={() => addBullet(i)} className="text-xs text-purple-600 hover:text-purple-700 mt-1 font-medium">+ Add bullet</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
