# Trackerezz Resume Builder — Frontend Implementation Guide

> **Context for Claude**: The LaTeX compile backend is already deployed on Railway. It accepts a POST request with `{ latex: string }` and returns a PDF blob. Your job is to build the entire Next.js frontend that collects resume data via a form, generates the LaTeX string from that data, sends it to the backend via a Next.js API proxy route, and displays the resulting PDF in a live preview panel. Follow this guide exactly, in order.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: `@monaco-editor/react` (lazy loaded)
- **Storage**: localStorage (MVP)
- **Environment Variable**: `LATEX_SERVICE_URL` in `.env.local` — the Railway backend URL

---

## Folder Structure to Create

```
/src
  /app
    /resume-builder
      page.tsx              ← main page, owns all state
    /api
      /compile
        route.ts            ← proxy to Railway backend
  /components
    /resume-builder
      TopBar.tsx
      EditorPanel.tsx
      PreviewPanel.tsx
      FormFields/
        HeaderFields.tsx
        SkillsFields.tsx
        ExperienceFields.tsx
        ProjectFields.tsx
        EducationFields.tsx
        AchievementsFields.tsx
      CodeEditor.tsx        ← Monaco, lazy loaded
  /lib
    generateLatex.ts        ← form data → LaTeX string
    escapeTex.ts            ← sanitize user input for LaTeX
    storage.ts              ← localStorage CRUD
    defaultForm.ts          ← empty form initial state
  /services
    latex.service.ts        ← fetch wrapper for /api/compile
  /types
    resume.ts               ← all TypeScript types
```

---

## Step 1 — TypeScript Types

**File: `/types/resume.ts`**

```ts
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
```

---

## Step 2 — Default Form State

**File: `/lib/defaultForm.ts`**

```ts
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
```

---

## Step 3 — LaTeX Escaping Utility

**File: `/lib/escapeTex.ts`**

> **Critical**: Every string coming from user input must be passed through this function before being inserted into the LaTeX template. Failure to escape will cause compile errors.

```ts
export function escapeTex(str: string): string {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}
```

---

## Step 4 — LaTeX Generator

**File: `/lib/generateLatex.ts`**

This is the core logic. It takes `ResumeForm` and returns the full LaTeX string. Use the template below exactly — this matches the design from the original resume.

```ts
import { ResumeForm, Experience, Project, Education } from "@/types/resume";
import { escapeTex } from "./escapeTex";

function renderExperience(exp: Experience): string {
  const bullets = exp.bullets
    .filter(b => b.trim())
    .map(b => `        \\item ${escapeTex(b)}`)
    .join("\n");

  return `
\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
\\color[HTML]{1C033C} \\textbf{${escapeTex(exp.company)}} \\hfill \\color[HTML]{371e77} ${escapeTex(exp.startDate)} -- ${escapeTex(exp.endDate)} \\\\[2pt]
\\color[HTML]{371e77}\\textit{${escapeTex(exp.role)} | ${escapeTex(exp.location)}} \\hfill \\\\[3pt]
\\begin{minipage}[t]{\\linewidth}
    \\begin{itemize}[nosep, after=\\strut, leftmargin=2em, itemsep=1pt]
${bullets}
    \\end{itemize}
\\end{minipage}
\\end{tabularx}
`;
}

function renderProject(proj: Project): string {
  const bullets = proj.bullets
    .filter(b => b.trim())
    .map(b => `        \\item ${escapeTex(b)}`)
    .join("\n");

  const title = proj.url
    ? `\\href{${proj.url}}{\\textcolor[HTML]{1C033C}{\\textbf{${escapeTex(proj.title)}}}}`
    : `\\textbf{${escapeTex(proj.title)}}`;

  return `
\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
${title} \\hfill \\textcolor[HTML]{371e77}{2025} \\\\[2pt]
\\color[HTML]{371e77}\\textit{${escapeTex(proj.techStack)}} \\hfill \\\\[3pt]
\\begin{minipage}[t]{\\linewidth}
    \\begin{itemize}[nosep,after=\\strut, leftmargin=2em, itemsep=1pt]
${bullets}
    \\end{itemize}
\\end{minipage}
\\end{tabularx}
`;
}

function renderEducation(edu: Education): string {
  return `
\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
\\color[HTML]{1C033C} \\textbf{${escapeTex(edu.institution)}} & \\hfill \\color[HTML]{371e77} ${escapeTex(edu.startDate)} - ${escapeTex(edu.endDate)} \\\\
\\color[HTML]{371e77} ${escapeTex(edu.degree)} & \\hfill \\color[HTML]{4B28A4} \\textbf{${escapeTex(edu.grade)}} \\\\
\\multicolumn{2}{@{}X@{}}{\\textit{}}
\\end{tabularx}
`;
}

export function generateLatex(data: ResumeForm): string {
  const { name, email, phone, github, linkedin, portfolio, skills, experience, projects, education, achievements } = data;

  const achievementItems = achievements
    .filter(a => a.trim())
    .map(a => `  \\item ${escapeTex(a)}`)
    .join("\n");

  return `\\documentclass[a4paper,8pt]{article}

\\usepackage{parskip}
\\usepackage{hologo}
\\usepackage{fontspec}
\\RequirePackage{color}
\\RequirePackage{graphicx}
\\usepackage[usenames,dvipsnames]{xcolor}
\\usepackage[scale=0.9, top=.3in, bottom=.3in]{geometry}
\\usepackage[hidelinks]{hyperref}
\\usepackage{needspace}
\\usepackage{tabularx}
\\usepackage{enumitem}
\\newcolumntype{C}{>{\\centering\\arraybackslash}X}
\\usepackage{supertabular}
\\usepackage{tabularx}
\\newlength{\\fullcollw}
\\setlength{\\fullcollw}{0.42\\textwidth}
\\usepackage{titlesec}
\\usepackage{multicol}
\\usepackage{multirow}
\\titleformat{\\section}{\\Large\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{3pt}{3pt}
\\usepackage[style=authoryear,sorting=ynt, maxbibnames=2]{biblatex}
\\color[HTML]{110223}
\\setlength\\bibitemsep{1em}
\\usepackage{fontawesome5}
\\usepackage[normalem]{ulem}
\\setmainfont{Arial}

\\begin{document}
\\pagestyle{empty}

\\begin{tabularx}{\\linewidth}{@{} C @{}}
\\color[HTML]{1C033C} \\Huge{${escapeTex(name)}} \\\\[4pt]
\\href{mailto:${email}}{\\textcolor[HTML]{371e77}{\\faEnvelope\\ ${escapeTex(email)}}} $|$
\\href{tel:${phone}}{\\textcolor[HTML]{371e77}{\\faMobile\\ ${escapeTex(phone)}}} $|$
\\href{https://github.com/${escapeTex(github)}}{\\textcolor[HTML]{371e77}{\\faGithub\\ github.com/${escapeTex(github)}}} $|$
\\href{https://linkedin.com/in/${escapeTex(linkedin)}}{\\textcolor[HTML]{371e77}{\\faLinkedin\\ linkedin.com/in/${escapeTex(linkedin)}}} $|$
\\href{https://${escapeTex(portfolio)}}{\\textcolor[HTML]{371e77}{\\faGlobe\\ ${escapeTex(portfolio)}}} \\\\[2pt]
\\end{tabularx}

\\section{Technical Skills}
\\color[HTML]{1C033C}\\textbf{Languages:} ${escapeTex(skills.languages)}\\\\[2pt]
\\color[HTML]{1C033C}\\textbf{Frontend:} ${escapeTex(skills.frontend)}\\\\[2pt]
\\color[HTML]{1C033C}\\textbf{Backend:} ${escapeTex(skills.backend)}\\\\[2pt]
\\color[HTML]{1C033C}\\textbf{DevOps \\& Tools:} ${escapeTex(skills.devops)}\\\\[2pt]

\\section{Recent Experience}
${experience.map(renderExperience).join("\n")}

\\section{Projects}
${projects.map(renderProject).join("\n")}

\\section{Education}
${education.map(renderEducation).join("\n")}

\\section{Achievements}
\\begin{itemize}[nosep, leftmargin=2em]
${achievementItems}
\\end{itemize}

\\end{document}`;
}
```

---

## Step 5 — Storage Layer

**File: `/lib/storage.ts`**

```ts
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
```

---

## Step 6 — Service Layer

**File: `/services/latex.service.ts`**

```ts
export async function compileLatex(latex: string): Promise<Blob> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch("/api/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latex }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "Compile failed");
    }

    return await response.blob();
  } finally {
    clearTimeout(timeout);
  }
}
```

---

## Step 7 — API Proxy Route

**File: `/app/api/compile/route.ts`**

```ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { latex } = await req.json();

    if (!latex || typeof latex !== "string") {
      return new Response("Missing latex field", { status: 400 });
    }

    const upstream = await fetch(process.env.LATEX_SERVICE_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latex }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return new Response(errText || "Upstream compile error", { status: 500 });
    }

    const pdfBuffer = await upstream.arrayBuffer();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=resume.pdf",
      },
    });
  } catch (err: any) {
    return new Response(err.message || "Internal error", { status: 500 });
  }
}
```

**`.env.local`** — add this:

```
LATEX_SERVICE_URL=https://your-railway-service-url.railway.app/compile
```

Replace the URL with the actual Railway endpoint.

---

## Step 8 — Main Page

**File: `/app/resume-builder/page.tsx`**

This component owns ALL state. No prop drilling beyond what's necessary.

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ResumeForm, Resume } from "@/types/resume";
import { defaultForm } from "@/lib/defaultForm";
import { generateLatex } from "@/lib/generateLatex";
import { compileLatex } from "@/services/latex.service";
import { saveResume, getResumes } from "@/lib/storage";
import TopBar from "@/components/resume-builder/TopBar";
import EditorPanel from "@/components/resume-builder/EditorPanel";
import PreviewPanel from "@/components/resume-builder/PreviewPanel";

export default function ResumeBuilderPage() {
  const [formData, setFormData] = useState<ResumeForm>(defaultForm);
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

  // When LaTeX changes → debounced compile
  useEffect(() => {
    if (!latex.trim()) return;

    const timer = setTimeout(async () => {
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
    }, 1500);

    return () => clearTimeout(timer);
  }, [latex]);

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
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <TopBar
        title={resumeTitle}
        onTitleChange={setResumeTitle}
        mode={mode}
        onModeChange={setMode}
        onSave={handleSave}
        onDownload={handleDownload}
        compileState={compileState}
        pdfReady={!!pdfUrl}
      />
      <div className="flex flex-1 overflow-hidden">
        <EditorPanel
          mode={mode}
          formData={formData}
          onFormChange={setFormData}
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
```

---

## Step 9 — TopBar Component

**File: `/components/resume-builder/TopBar.tsx`**

```tsx
"use client";

type Props = {
  title: string;
  onTitleChange: (t: string) => void;
  mode: "form" | "code";
  onModeChange: (m: "form" | "code") => void;
  onSave: () => void;
  onDownload: () => void;
  compileState: "idle" | "compiling" | "error";
  pdfReady: boolean;
};

export default function TopBar({
  title, onTitleChange, mode, onModeChange,
  onSave, onDownload, compileState, pdfReady
}: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 h-12 shrink-0">
      {/* Left: title input */}
      <input
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        className="bg-transparent text-white font-medium text-sm border-b border-transparent hover:border-gray-600 focus:border-purple-500 focus:outline-none px-1"
      />

      {/* Center: mode toggle */}
      <div className="flex gap-1 bg-gray-800 rounded p-1">
        {(["form", "code"] as const).map(m => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            className={`px-3 py-1 text-xs rounded capitalize transition ${
              mode === m ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {m === "form" ? "Form" : "LaTeX"}
          </button>
        ))}
      </div>

      {/* Right: status + actions */}
      <div className="flex items-center gap-3">
        {compileState === "compiling" && (
          <span className="text-xs text-yellow-400 animate-pulse">Compiling...</span>
        )}
        {compileState === "error" && (
          <span className="text-xs text-red-400">Compile error</span>
        )}
        {compileState === "idle" && pdfReady && (
          <span className="text-xs text-green-400">Ready</span>
        )}

        <button
          onClick={onSave}
          className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition"
        >
          Save
        </button>
        <button
          onClick={onDownload}
          disabled={!pdfReady}
          className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
```

---

## Step 10 — Editor Panel

**File: `/components/resume-builder/EditorPanel.tsx`**

```tsx
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
```

---

## Step 11 — Preview Panel

**File: `/components/resume-builder/PreviewPanel.tsx`**

```tsx
"use client";

type Props = {
  pdfUrl: string | null;
  compileState: "idle" | "compiling" | "error";
  errorMsg: string;
};

export default function PreviewPanel({ pdfUrl, compileState, errorMsg }: Props) {
  return (
    <div className="w-1/2 flex flex-col bg-gray-950 overflow-hidden">
      {compileState === "error" ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-red-400 text-sm font-mono mb-2">LaTeX compile error:</p>
          <pre className="text-red-300 text-xs bg-gray-900 rounded p-4 w-full overflow-auto max-h-64">
            {errorMsg}
          </pre>
        </div>
      ) : pdfUrl ? (
        <iframe
          src={pdfUrl}
          className="flex-1 w-full border-0"
          title="Resume Preview"
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 text-sm">
            {compileState === "compiling" ? "Compiling PDF..." : "Fill in your details to see a preview"}
          </p>
        </div>
      )}
    </div>
  );
}
```

---

## Step 12 — Monaco Code Editor

**File: `/components/resume-builder/CodeEditor.tsx`**

```tsx
"use client";

import Editor from "@monaco-editor/react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function CodeEditor({ value, onChange }: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage="latex"
      theme="vs-dark"
      value={value}
      onChange={(val) => onChange(val || "")}
      options={{
        fontSize: 12,
        minimap: { enabled: false },
        wordWrap: "on",
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}
```

Install Monaco:

```bash
npm install @monaco-editor/react
```

---

## Step 13 — Form Field Components

Each component receives `data: ResumeForm` and `onChange: (data: ResumeForm) => void`. They call `onChange` with a full updated copy of `formData`.

### Helper pattern to use in all field components:

```ts
// To update a top-level string field:
onChange({ ...data, name: newValue });

// To update nested skills:
onChange({ ...data, skills: { ...data.skills, languages: newValue } });

// To update an array item:
const updated = data.experience.map((exp, i) =>
  i === index ? { ...exp, [field]: newValue } : exp
);
onChange({ ...data, experience: updated });
```

---

### `HeaderFields.tsx`

Six text inputs: name, email, phone, github, linkedin, portfolio.

```tsx
"use client";
import { ResumeForm } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

const fields = [
  { key: "name", label: "Full Name", placeholder: "Jared John Furtado" },
  { key: "email", label: "Email", placeholder: "jared@jaredfurtado.tech" },
  { key: "phone", label: "Phone", placeholder: "+91-8421012788" },
  { key: "github", label: "GitHub username", placeholder: "jjf2009" },
  { key: "linkedin", label: "LinkedIn username", placeholder: "jared-furtado" },
  { key: "portfolio", label: "Portfolio URL", placeholder: "www.jaredfurtado.tech" },
] as const;

export default function HeaderFields({ data, onChange }: Props) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Header</h2>
      <div className="grid grid-cols-2 gap-3">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
            <input
              value={(data as any)[f.key]}
              onChange={e => onChange({ ...data, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### `SkillsFields.tsx`

Four textarea inputs: languages, frontend, backend, devops.

```tsx
"use client";
import { ResumeForm } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

const skillFields = [
  { key: "languages", label: "Languages" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps & Tools" },
] as const;

export default function SkillsFields({ data, onChange }: Props) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Technical Skills</h2>
      <div className="space-y-3">
        {skillFields.map(f => (
          <div key={f.key}>
            <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
            <input
              value={data.skills[f.key]}
              onChange={e => onChange({ ...data, skills: { ...data.skills, [f.key]: e.target.value } })}
              className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### `ExperienceFields.tsx`

Dynamic list. Each entry has: company, role, location, startDate, endDate, and a dynamic bullets list.

```tsx
"use client";
import { ResumeForm, Experience } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

function newExp(): Experience {
  return {
    id: crypto.randomUUID(),
    company: "", role: "", location: "",
    startDate: "", endDate: "", bullets: [""],
  };
}

export default function ExperienceFields({ data, onChange }: Props) {
  const { experience } = data;

  function updateExp(index: number, field: keyof Experience, value: any) {
    const updated = experience.map((e, i) => i === index ? { ...e, [field]: value } : e);
    onChange({ ...data, experience: updated });
  }

  function updateBullet(expIdx: number, bulletIdx: number, value: string) {
    const updated = experience.map((e, i) => {
      if (i !== expIdx) return e;
      const bullets = e.bullets.map((b, j) => j === bulletIdx ? value : b);
      return { ...e, bullets };
    });
    onChange({ ...data, experience: updated });
  }

  function addBullet(expIdx: number) {
    const updated = experience.map((e, i) =>
      i === expIdx ? { ...e, bullets: [...e.bullets, ""] } : e
    );
    onChange({ ...data, experience: updated });
  }

  function removeBullet(expIdx: number, bulletIdx: number) {
    const updated = experience.map((e, i) => {
      if (i !== expIdx) return e;
      return { ...e, bullets: e.bullets.filter((_, j) => j !== bulletIdx) };
    });
    onChange({ ...data, experience: updated });
  }

  function removeExp(index: number) {
    onChange({ ...data, experience: experience.filter((_, i) => i !== index) });
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Experience</h2>
        <button
          onClick={() => onChange({ ...data, experience: [...experience, newExp()] })}
          className="text-xs text-purple-400 hover:text-purple-300"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, i) => (
          <div key={exp.id} className="bg-gray-900 rounded p-4 border border-gray-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Entry {i + 1}</span>
              <button onClick={() => removeExp(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
            </div>

            {([
              ["company", "Company Name"],
              ["role", "Role / Title"],
              ["location", "Location"],
              ["startDate", "Start Date (e.g. Dec 2025)"],
              ["endDate", "End Date (e.g. Present)"],
            ] as [keyof Experience, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="block text-xs text-gray-400 mb-1">{label}</label>
                <input
                  value={exp[field] as string}
                  onChange={e => updateExp(i, field, e.target.value)}
                  className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-gray-400 mb-1">Bullet Points</label>
              {exp.bullets.map((b, j) => (
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
              <button onClick={() => addBullet(i)} className="text-xs text-purple-400 hover:text-purple-300 mt-1">
                + Add bullet
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### `ProjectFields.tsx`

Same pattern as ExperienceFields. Each entry: title, url, techStack (single string, comma-separated), bullets.

```tsx
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
```

---

### `EducationFields.tsx`

Same dynamic pattern. Fields: institution, degree, startDate, endDate, grade.

```tsx
"use client";
import { ResumeForm, Education } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

function newEdu(): Education {
  return { id: crypto.randomUUID(), institution: "", degree: "", startDate: "", endDate: "", grade: "" };
}

export default function EducationFields({ data, onChange }: Props) {
  const { education } = data;

  function updateEdu(index: number, field: keyof Education, value: string) {
    const updated = education.map((e, i) => i === index ? { ...e, [field]: value } : e);
    onChange({ ...data, education: updated });
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Education</h2>
        <button
          onClick={() => onChange({ ...data, education: [...education, newEdu()] })}
          className="text-xs text-purple-400 hover:text-purple-300"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, i) => (
          <div key={edu.id} className="bg-gray-900 rounded p-4 border border-gray-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Entry {i + 1}</span>
              <button
                onClick={() => onChange({ ...data, education: education.filter((_, j) => j !== i) })}
                className="text-xs text-red-400"
              >
                Remove
              </button>
            </div>

            {([
              ["institution", "Institution Name"],
              ["degree", "Degree"],
              ["startDate", "Start (e.g. June 2024)"],
              ["endDate", "End (e.g. 2028)"],
              ["grade", "Grade (e.g. SGPA: 9/10)"],
            ] as [keyof Education, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="block text-xs text-gray-400 mb-1">{label}</label>
                <input
                  value={edu[field] as string}
                  onChange={e => updateEdu(i, field, e.target.value)}
                  className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### `AchievementsFields.tsx`

Simple dynamic list of text inputs.

```tsx
"use client";
import { ResumeForm } from "@/types/resume";

type Props = { data: ResumeForm; onChange: (d: ResumeForm) => void };

export default function AchievementsFields({ data, onChange }: Props) {
  const { achievements } = data;

  function update(index: number, value: string) {
    const updated = achievements.map((a, i) => i === index ? value : a);
    onChange({ ...data, achievements: updated });
  }

  function remove(index: number) {
    onChange({ ...data, achievements: achievements.filter((_, i) => i !== index) });
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">Achievements</h2>
        <button
          onClick={() => onChange({ ...data, achievements: [...achievements, ""] })}
          className="text-xs text-purple-400 hover:text-purple-300"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {achievements.map((a, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={a}
              onChange={e => update(i, e.target.value)}
              placeholder="e.g. 2x Hackathon Winner – ..."
              className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-purple-500 focus:outline-none"
            />
            <button onClick={() => remove(i)} className="text-red-400 text-xs px-2">×</button>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## Step 14 — Package Install Checklist

Run these before starting:

```bash
npm install @monaco-editor/react
```

Tailwind should already be set up in Next.js 14. If not:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Step 15 — Build Order Checklist

Build in this exact order. Don't jump ahead.

- [ ] `1.` Create all type files (`/types/resume.ts`, `/lib/defaultForm.ts`)
- [ ] `2.` Build `escapeTex.ts` and manually test it
- [ ] `3.` Build `generateLatex.ts`, test by console.logging the output and compiling it manually via Railway
- [ ] `4.` Build `storage.ts` (pure functions, no UI)
- [ ] `5.` Build `latex.service.ts` and `api/compile/route.ts`, test with a hardcoded LaTeX string via Postman or curl
- [ ] `6.` Build `PreviewPanel.tsx` (simplest component)
- [ ] `7.` Build `TopBar.tsx`
- [ ] `8.` Build all `FormFields/` components one by one, test each in isolation
- [ ] `9.` Build `CodeEditor.tsx`
- [ ] `10.` Build `EditorPanel.tsx` (wires together form + Monaco)
- [ ] `11.` Build `page.tsx` (wires everything, add state logic)
- [ ] `12.` End-to-end test: fill form → PDF renders → download works

---

## Common Mistakes to Avoid

- Do not SSR Monaco — it must be imported with `dynamic(() => import(...), { ssr: false })`
- Do not forget `URL.revokeObjectURL(oldUrl)` before setting a new blob URL — this leaks memory on every recompile
- Do not skip `escapeTex` on any user input — one unescaped `&` will crash the compile
- Do not call the compile API on every keystroke — the 1500ms debounce in `page.tsx` is mandatory
- Do not store blob URLs in state for longer than needed — revoke on unmount

---

## Environment Variables

```
# .env.local
LATEX_SERVICE_URL=https://your-railway-service.railway.app/your-compile-endpoint
```

This must never be committed to Git. Add `.env.local` to `.gitignore`.

---

*End of implementation guide.*