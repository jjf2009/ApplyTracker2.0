"use client";

type Props = {
  pdfUrl: string | null;
  compileState: "idle" | "compiling" | "error";
  errorMsg: string;
};

export default function PreviewPanel({ pdfUrl, compileState, errorMsg }: Props) {
  return (
    <div className="w-1/2 flex flex-col bg-gray-50 overflow-hidden">
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
