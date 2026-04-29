import { ResumeForm } from "@/types/resume";

export const defaultForm: ResumeForm = {
  name: "",
  email: "",
  phone: "",
  github: "",
  linkedin: "",
  portfolio: "",
  skills: {
    languages: "",
    frontend: "",
    backend: "",
    devops: "",
  },
  experience: [],
  projects: [],
  education: [],
  achievements: [],
};
