export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    "https://latex-service-production-a603.up.railway.app/compile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}