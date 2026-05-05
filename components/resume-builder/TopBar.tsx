"use client";

type Props = {
  title: string;
  onTitleChange: (t: string) => void;
  mode: "form" | "code";
  onModeChange: (m: "form" | "code") => void;
  onSave: () => void;
  onDownload: () => void;
  onCompile: () => void;
  compileState: "idle" | "compiling" | "error";
  pdfReady: boolean;
};

export default function TopBar({
  title, onTitleChange, mode, onModeChange,
  onSave, onDownload, onCompile, compileState, pdfReady
}: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 h-12 shrink-0">
      {/* Left: title input */}
      <input
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        className="bg-transparent text-gray-900 font-medium text-sm border-b border-transparent hover:border-gray-300 focus:border-purple-500 focus:outline-none px-1"
      />

      {/* Center: mode toggle */}
      <div className="flex gap-1 bg-gray-100 rounded p-1">
        {(["form", "code"] as const).map(m => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            className={`px-3 py-1 text-xs rounded capitalize transition ${
              mode === m ? "bg-white text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {m === "form" ? "Form" : "LaTeX"}
          </button>
        ))}
      </div>

      {/* Right: status + actions */}
      <div className="flex items-center gap-3">
        {compileState === "compiling" && (
          <span className="text-xs text-yellow-600 animate-pulse">Compiling...</span>
        )}
        {compileState === "error" && (
          <span className="text-xs text-red-600">Compile error</span>
        )}
        {compileState === "idle" && pdfReady && (
          <span className="text-xs text-green-600">Ready</span>
        )}

        <button
          onClick={onCompile}
          disabled={compileState === "compiling"}
          className="text-xs px-3 py-1 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-40 rounded transition shadow-sm"
        >
          Compile
        </button>
        
        <button
          onClick={onSave}
          className="text-xs px-3 py-1 text-gray-700 hover:bg-gray-100 border border-gray-200 rounded transition"
        >
          Save
        </button>
        <button
          onClick={onDownload}
          disabled={!pdfReady}
          className="text-xs px-3 py-1 bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed rounded transition shadow-sm"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
