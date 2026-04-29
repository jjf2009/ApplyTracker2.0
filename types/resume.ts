export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;      // "Present" is a valid value
  bullets: string[];
};

export type Project = {
  id: string;
  title: string;
  url: string;
  techStack: string;    // comma-separated string, e.g. "React.js, Node.js, Firebase"
  bullets: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  grade: string;        // e.g. "SGPA: 9/10"
};

export type SkillsSection = {
  languages: string;
  frontend: string;
  backend: string;
  devops: string;
};

export type ResumeForm = {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: SkillsSection;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: string[];   // each string = one bullet point
};

export type Resume = {
  id: string;
  title: string;
  formData: ResumeForm;
  latex: string;
  updatedAt: number;
};
