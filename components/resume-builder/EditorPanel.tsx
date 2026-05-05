"use client";

import dynamic from "next/dynamic";
import { ResumeForm } from "@/types/resume";
import HeaderFields from "./FormFields/HeaderFields";
import SkillsFields from "./FormFields/SkillsFields";
import ExperienceFields from "./FormFields/ExperienceFields";
import ProjectFields from "./FormFields/ProjectFields";
import EducationFields from "./FormFields/EducationFields";
import AchievementsFields from "./FormFields/AchievementsFields";

import { useResumeStore } from "@/store/useResumeStore";

// Lazy load Monaco — do NOT SSR it
const CodeEditor = dynamic(() => import("./CodeEditor"), { ssr: false });

type Props = {
  mode: "form" | "code";
  latex: string;
  onLatexChange: (latex: string) => void;
};

export default function EditorPanel({ mode, latex, onLatexChange }: Props) {
  const { formData } = useResumeStore();

  return (
    <div className="w-1/2 flex flex-col border-r border-gray-200 overflow-hidden">
      {mode === "form" ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <HeaderFields />
          <SkillsFields />
          <ExperienceFields />
          <ProjectFields />
          <EducationFields />
          <AchievementsFields />
        </div>
      ) : (
        <CodeEditor value={latex} onChange={onLatexChange} />
      )}
    </div>
  );
}
