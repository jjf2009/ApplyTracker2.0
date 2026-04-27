"use client";

import { useState } from "react";
import { compileLatex } from "@/lib/services/latex.service";

export default function ResumeBuilder() {
  const [latex, setLatex] = useState(`\\documentclass{article}
\\begin{document}
Hello Trackerezz
\\end{document}`);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompile = async () => {
    setLoading(true);
    try {
      const blob = await compileLatex(latex);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error(err);
      alert("Compilation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "resume.pdf";
    a.click();
  };

  return (
    <div className="flex h-screen">
      
      {/* LEFT: Editor */}
      <div className="w-1/2 p-4 flex flex-col gap-2">
        <textarea
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          className="flex-1 border p-2 font-mono"
        />

        <div className="flex gap-2">
          <button onClick={handleCompile}>
            {loading ? "Compiling..." : "Compile"}
          </button>

          <button onClick={handleDownload} disabled={!pdfUrl}>
            Download PDF
          </button>
        </div>
      </div>

      {/* RIGHT: PDF Preview */}
      <div className="w-1/2 border-l">
        {pdfUrl ? (
          <iframe src={pdfUrl} className="w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full">
            No preview yet
          </div>
        )}
      </div>
    </div>
  );
}