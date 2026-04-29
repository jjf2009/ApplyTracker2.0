import { Resume } from "@/types/resume";

const KEY = "trackerezz_resumes";

export function getResumes(): Resume[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveResume(resume: Resume): void {
  const all = getResumes();
  const idx = all.findIndex(r => r.id === resume.id);
  if (idx >= 0) {
    all[idx] = resume;
  } else {
    all.unshift(resume);
  }
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteResume(id: string): void {
  const filtered = getResumes().filter(r => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(filtered));
}
