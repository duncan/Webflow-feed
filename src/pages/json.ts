import type { APIRoute } from "astro";
import { getFeedItems, RateLimitError } from "../lib/webflow";

export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime;
  const siteId = runtime?.env?.WEBFLOW_SITE_ID;
  const apiToken = runtime?.env?.WEBFLOW_SITE_API_TOKEN;

  if (!siteId || !apiToken) {
    return new Response(
      JSON.stringify({ error: "Missing WEBFLOW_SITE_ID or WEBFLOW_SITE_API_TOKEN" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const items = await getFeedItems(siteId, apiToken);

    const feed = {
      version: "https://jsonfeed.org/version/1.1",
      title: "Duncan Davidson",
      home_page_url: "https://duncan.dev",
      feed_url: "https://duncan.dev/feed/json",
      description:
        "The personal website of software developer and photographer James Duncan Davidson.",
      icon: "https://cdn.prod.website-files.com/68cc47f2dd4fe7f3f4d6064f/692c8d1e9b8a97c3e69424d6_dd-256.png",
      favicon:
        "https://cdn.prod.website-files.com/68cc47f2dd4fe7f3f4d6064f/692c8d3c1a3fa012d7acea94_dd-32.png",
      language: "en",
      authors: [
        {
          name: "Duncan Davidson",
          url: "https://duncan.dev",
        },
      ],
      items: items.map((item) => ({
        id: item.id,
        title: item.name,
        url: item.id,
        ...(item.externalUrl && { external_url: item.externalUrl }),
        ...(item.image && { image: item.image }),
        ...(item.summary && { summary: item.summary }),
        ...(item.contentHtml && { content_html: item.contentHtml }),
        date_published: item.pubDate.toISOString(),
      })),
    };

    return new Response(JSON.stringify(feed, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded" }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": error.retryAfter,
          },
        }
      );
    }
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
