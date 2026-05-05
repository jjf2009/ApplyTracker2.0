import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ResumeForm, Experience, Project, Education } from "@/types/resume";
import { defaultForm } from "@/lib/defaultForm";
import { newExperience, newProject, newEducation } from "@/lib/resume-helpers";

interface ResumeStore {
  formData: ResumeForm;
  
  // Actions
  setFormData: (data: ResumeForm) => void;
  updateField: (field: keyof ResumeForm, value: any) => void;
  updateSkills: (field: keyof ResumeForm["skills"], value: string) => void;
  
  // Array Actions
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (index: number, field: keyof Experience, value: any) => void;
  
  addProject: () => void;
  removeProject: (id: string) => void;
  updateProject: (index: number, field: keyof Project, value: any) => void;
  
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (index: number, field: keyof Education, value: any) => void;

  updateAchievements: (achievements: string[]) => void;
  
  // Reset
  resetForm: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      formData: defaultForm,

      setFormData: (data) => set({ formData: data }),

      updateField: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),

      updateSkills: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            skills: {
              ...state.formData.skills,
              [field]: value,
            },
          },
        })),

      addExperience: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            experience: [...state.formData.experience, newExperience()],
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          formData: {
            ...state.formData,
            experience: state.formData.experience.filter((e) => e.id !== id),
          },
        })),

      updateExperience: (index, field, value) =>
        set((state) => {
          const experience = [...state.formData.experience];
          experience[index] = { ...experience[index], [field]: value };
          return { formData: { ...state.formData, experience } };
        }),

      addProject: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            projects: [...state.formData.projects, newProject()],
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          formData: {
            ...state.formData,
            projects: state.formData.projects.filter((p) => p.id !== id),
          },
        })),

      updateProject: (index, field, value) =>
        set((state) => {
          const projects = [...state.formData.projects];
          projects[index] = { ...projects[index], [field]: value };
          return { formData: { ...state.formData, projects } };
        }),

      addEducation: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: [...state.formData.education, newEducation()],
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: state.formData.education.filter((e) => e.id !== id),
          },
        })),

      updateEducation: (index, field, value) =>
        set((state) => {
          const education = [...state.formData.education];
          education[index] = { ...education[index], [field]: value };
          return { formData: { ...state.formData, education } };
        }),

      updateAchievements: (achievements) =>
        set((state) => ({
          formData: {
            ...state.formData,
            achievements,
          },
        })),

      resetForm: () => set({ formData: defaultForm }),
    }),
    {
      name: "resume-storage",
    }
  )
);
