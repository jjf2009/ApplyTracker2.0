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