"use client";

import dynamic from "next/dynamic";
import { ResumeForm } from "@/types/resume";
import HeaderFields from "./FormFields/HeaderFields";
import SkillsFields from "./FormFields/SkillsFields";
import ExperienceFields from "./FormFields/ExperienceFields";
import ProjectFields from "./FormFields/ProjectFields";
import EducationFields from "./FormFields/EducationFields";
import AchievementsFields from "./FormFields/AchievementsFields";

// Lazy load Monaco — do NOT SSR it
const CodeEditor = dynamic(() => import("./CodeEditor"), { ssr: false });

type Props = {
  mode: "form" | "code";
  formData: ResumeForm;
  onFormChange: (data: ResumeForm) => void;
  latex: string;
  onLatexChange: (latex: string) => void;
};

export default function EditorPanel({ mode, formData, onFormChange, latex, onLatexChange }: Props) {
  return (
    <div className="w-1/2 flex flex-col border-r border-gray-800 overflow-hidden">
      {mode === "form" ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <HeaderFields data={formData} onChange={onFormChange} />
          <SkillsFields data={formData} onChange={onFormChange} />
          <ExperienceFields data={formData} onChange={onFormChange} />
          <ProjectFields data={formData} onChange={onFormChange} />
          <EducationFields data={formData} onChange={onFormChange} />
          <AchievementsFields data={formData} onChange={onFormChange} />
        </div>
      ) : (
        <CodeEditor value={latex} onChange={onLatexChange} />
      )}
    </div>
  );
}
