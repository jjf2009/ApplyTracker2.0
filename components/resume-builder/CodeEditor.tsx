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
