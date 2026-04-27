export async function compileLatex(latex: string): Promise<Blob> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latex }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Compile failed: ${text}`);
    }

    return await response.blob();
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}