import { ResumeForm, Experience, Project, Education } from "@/types/resume";
import { escapeTex } from "./escapeTex";

/* =========================
   EXPERIENCE
========================= */
function renderExperience(exp: Experience): string {
  const bullets = exp.bullets
    .filter(b => b.trim())
    .map(b => `    \\item ${escapeTex(b)}`)
    .join("\n");

  return `\\noindent
\\begin{tabularx}{\\linewidth}{@{}X r@{}}
  \\textbf{${escapeTex(exp.company)}} & \\textit{\\small ${escapeTex(exp.startDate)} -- ${escapeTex(exp.endDate)}} \\\\
  \\textit{\\small ${escapeTex(exp.role)}} & \\textit{\\small ${escapeTex(exp.location)}}
\\end{tabularx}
\\vspace{-6pt}
\\begin{itemize}[nosep, leftmargin=1.5em, itemsep=1pt, topsep=2pt]
${bullets}
\\end{itemize}
\\vspace{2pt}`;
}

/* =========================
   PROJECTS
========================= */
function renderProject(proj: Project): string {
  const bullets = proj.bullets
    .filter(b => b.trim())
    .map(b => `    \\item ${escapeTex(b)}`)
    .join("\n");

  const titleLink = proj.url
    ? `\\href{${proj.url}}{\\textbf{${escapeTex(proj.title)}} {\\footnotesize\\color{accent}$\\nearrow$}}`
    : `\\textbf{${escapeTex(proj.title)}}`;

  return `\\noindent
\\begin{tabularx}{\\linewidth}{@{}X r@{}}
  ${titleLink} & {\\small ${proj.year || "2025"}} \\\\
  {\\small\\textit{${escapeTex(proj.techStack)}}} &
\\end{tabularx}
\\vspace{-6pt}
\\begin{itemize}[nosep, leftmargin=1.5em, itemsep=1pt, topsep=2pt]
${bullets}
\\end{itemize}
\\vspace{2pt}`;
}

/* =========================
   EDUCATION
========================= */
function renderEducation(edu: Education): string {
  return `\\noindent
\\begin{tabularx}{\\linewidth}{@{}X r@{}}
  \\textbf{${escapeTex(edu.institution)}} & {\\small ${escapeTex(edu.startDate)} -- ${escapeTex(edu.endDate)}} \\\\
  {\\small ${escapeTex(edu.degree)}} & {\\small\\textbf{${escapeTex(edu.grade)}}}
\\end{tabularx}
\\vspace{4pt}`;
}

/* =========================
   SECTION HEADER HELPER
========================= */
function section(title: string): string {
  return `\\section*{${title}}`;
}

/* =========================
   MAIN GENERATOR
========================= */
export function generateLatex(data: ResumeForm): string {
  const {
    name,
    email,
    phone,
    github,
    linkedin,
    portfolio,
    skills,
    experience,
    projects,
    education,
    achievements,
  } = data;

  const achievementItems = achievements
    .filter(a => a.trim())
    .map(a => `    \\item ${escapeTex(a)}`)
    .join("\n");

  const achievementBlock = achievementItems
    ? `${section("Achievements")}
\\begin{itemize}[nosep, leftmargin=1.5em, itemsep=1pt, topsep=2pt]
${achievementItems}
\\end{itemize}`
    : "";

  // Build contact line — skip empty fields gracefully
  const contactParts: string[] = [];
  if (email)     contactParts.push(`\\href{mailto:${escapeTex(email)}}{${escapeTex(email)}}`);
  if (phone)     contactParts.push(escapeTex(phone));
  if (github)    contactParts.push(`\\href{https://github.com/${escapeTex(github)}}{github/${escapeTex(github)}}`);
  if (linkedin)  contactParts.push(`\\href{https://linkedin.com/in/${escapeTex(linkedin)}}{linkedin/${escapeTex(linkedin)}}`);
  if (portfolio) contactParts.push(`\\href{https://${escapeTex(portfolio)}}{${escapeTex(portfolio)}}`);

  const contactLine = contactParts.join(" {\\color{accent}$\\cdot$} ");

  return `\\documentclass[a4paper,10pt]{article}

% ---------- Page geometry ----------
\\usepackage[top=0.55in, bottom=0.55in, left=0.65in, right=0.65in]{geometry}

% ---------- Fonts ----------
\\usepackage{fontspec}
\\setmainfont{TeX Gyre Termes}   % Times-compatible, widely available
\\setsansfont{TeX Gyre Heros}    % Helvetica-compatible

% ---------- Core packages ----------
\\usepackage{parskip}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{tabularx}
\\usepackage{titlesec}
\\usepackage{multicol}
\\usepackage{microtype}          % Better text justification

% ---------- Color ----------
\\definecolor{accent}{HTML}{1a6496}   % Professional navy-blue accent
\\definecolor{rule}{HTML}{cccccc}     % Light grey section rules
\\definecolor{subtext}{HTML}{444444}  % Slightly muted body text

% ---------- Section style ----------
\\titleformat{\\section}
  {\\normalfont\\normalsize\\bfseries\\color{accent}\\uppercase}
  {}{0em}{}
  [\\vspace{1pt}{\\color{rule}\\titlerule[0.5pt]}\\vspace{-4pt}]

\\titlespacing*{\\section}{0pt}{8pt}{4pt}

% ---------- List style ----------
\\setlist[itemize]{
  label=\\textcolor{accent}{\\textbullet},
  leftmargin=1.5em,
  itemsep=1pt,
  topsep=2pt,
  parsep=0pt
}

% ---------- Spacing ----------
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

% ---------- Hyperlink style ----------
\\hypersetup{
  colorlinks=false,
  urlcolor=accent
}

\\begin{document}
\\pagestyle{empty}

% ========== HEADER ==========
\\begin{center}
  {\\fontsize{22}{26}\\selectfont\\textbf{${escapeTex(name)}}}\\\\[4pt]
  {\\small\\color{subtext} ${contactLine}}
\\end{center}

\\vspace{2pt}

% ========== SKILLS ==========
${section("Technical Skills")}
\\setlength{\\tabcolsep}{0pt}
\\begin{tabularx}{\\linewidth}{@{} l @{\\hskip 6pt} X}
  \\textbf{Languages}     & ${escapeTex(skills.languages)} \\\\[2pt]
  \\textbf{Frontend}      & ${escapeTex(skills.frontend)} \\\\[2pt]
  \\textbf{Backend}       & ${escapeTex(skills.backend)} \\\\[2pt]
  \\textbf{DevOps \\& Tools} & ${escapeTex(skills.devops)} \\\\
\\end{tabularx}

% ========== EXPERIENCE ==========
${section("Experience")}
${experience.map(renderExperience).join("\n\\vspace{4pt}\n")}

% ========== PROJECTS ==========
${section("Projects")}
${projects.map(renderProject).join("\n\\vspace{4pt}\n")}

% ========== EDUCATION ==========
${section("Education")}
${education.map(renderEducation).join("\n")}

${achievementBlock}

\\end{document}`;
}