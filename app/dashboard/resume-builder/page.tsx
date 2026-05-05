"use client";

import { useState, useEffect, useRef } from "react";
import { ResumeForm, Resume } from "@/types/resume";
import { defaultForm } from "@/lib/defaultForm";
import { generateLatex } from "@/lib/generateLatex";
import { compileLatex } from "@/services/latex.service";
import { saveResume } from "@/lib/storage";
import TopBar from "@/components/resume-builder/TopBar";
import EditorPanel from "@/components/resume-builder/EditorPanel";
import PreviewPanel from "@/components/resume-builder/PreviewPanel";

import { useResumeStore } from "@/store/useResumeStore";

export default function ResumeBuilderPage() {
  const { formData, setFormData } = useResumeStore();
  const [latex, setLatex] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"form" | "code">("form");
  const [compileState, setCompileState] = useState<"idle" | "compiling" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [resumeTitle, setResumeTitle] = useState<string>("My Resume");
  const resumeIdRef = useRef<string>(crypto.randomUUID());
  const prevUrlRef = useRef<string | null>(null);

  // When form changes → regenerate LaTeX
  useEffect(() => {
    if (mode === "form") {
      setLatex(generateLatex(formData));
    }
  }, [formData, mode]);

  const handleCompile = async () => {
    if (!latex.trim()) return;
    
    try {
      setCompileState("compiling");
      setErrorMsg("");

      const blob = await compileLatex(latex);

      // Revoke previous blob URL to prevent memory leak
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
      }

      const url = URL.createObjectURL(blob);
      prevUrlRef.current = url;
      setPdfUrl(url);
      setCompileState("idle");
    } catch (err: any) {
      setCompileState("error");
      setErrorMsg(err.message || "Compile failed");
    }
  };

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  function handleSave() {
    const resume: Resume = {
      id: resumeIdRef.current,
      title: resumeTitle,
      formData,
      latex,
      updatedAt: Date.now(),
    };
    saveResume(resume);
  }

  function handleDownload() {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${resumeTitle.replace(/\s+/g, "_")}.pdf`;
    a.click();
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      <TopBar
        title={resumeTitle}
        onTitleChange={setResumeTitle}
        mode={mode}
        onModeChange={setMode}
        onSave={handleSave}
        onDownload={handleDownload}
        onCompile={handleCompile}
        compileState={compileState}
        pdfReady={!!pdfUrl}
      />
      <div className="flex flex-1 overflow-hidden">
        <EditorPanel
          mode={mode}
          latex={latex}
          onLatexChange={setLatex}
        />
        <PreviewPanel
          pdfUrl={pdfUrl}
          compileState={compileState}
          errorMsg={errorMsg}
        />
      </div>
    </div>
  );
}
