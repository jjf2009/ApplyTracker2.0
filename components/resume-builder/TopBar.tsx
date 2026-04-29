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
