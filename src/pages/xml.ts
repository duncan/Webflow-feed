import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Test Feed</title>
  <id>urn:uuid:test</id>
  <updated>${new Date().toISOString()}</updated>
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
};
