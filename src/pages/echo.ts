import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const headers: Record<string, string> = {};
  for (const [key, value] of request.headers) headers[key] = value;

  return new Response(JSON.stringify({ headers }, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};
