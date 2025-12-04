import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Test Feed",
    items: [],
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
