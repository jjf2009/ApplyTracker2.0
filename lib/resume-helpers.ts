import { Experience, Project, Education } from "@/types/resume";

export function newExperience(): Experience {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    bullets: [""],
  };
}

export function newProject(): Project {
  return {
    id: crypto.randomUUID(),
    title: "",
    url: "",
    year: "",
    techStack: "",
    bullets: [""],
  };
}

export function newEducation(): Education {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    grade: "",
  };
}
