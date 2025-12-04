import type { APIRoute } from "astro";
import { getFeedItems } from "../lib/webflow";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime;
  const siteId = runtime?.env?.WEBFLOW_SITE_ID;
  const apiToken = runtime?.env?.WEBFLOW_SITE_API_TOKEN;

  if (!siteId || !apiToken) {
    return new Response("Missing WEBFLOW_SITE_ID or WEBFLOW_SITE_API_TOKEN", {
      status: 500,
    });
  }

  try {
    const items = await getFeedItems(siteId, apiToken);
    const lastUpdated = items.length > 0 ? items[0].pubDate : new Date();

    const entries = items
      .map((item) => {
        const externalUrlLink = item.externalUrl
          ? `\n    <link rel="related" href="${escapeXml(item.externalUrl)}" />`
          : "";

        return `  <entry>
    <id>${escapeXml(item.id)}</id>
    <title>${escapeXml(item.name)}</title>
    <link rel="alternate" href="${escapeXml(item.url)}" />${externalUrlLink}
    <published>${item.pubDate.toISOString()}</published>
    <updated>${item.pubDate.toISOString()}</updated>${item.summary ? `\n    <summary>${escapeXml(item.summary)}</summary>` : ""}${item.contentHtml ? `\n    <content type="html"><![CDATA[${item.contentHtml}]]></content>` : ""}
  </entry>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Duncan Davidson</title>
  <subtitle>The personal website of software developer and photographer James Duncan Davidson.</subtitle>
  <link rel="alternate" href="https://duncan.dev" />
  <link rel="self" href="https://duncan.dev/feed/xml" />
  <id>https://duncan.dev/</id>
  <updated>${lastUpdated.toISOString()}</updated>
  <icon>https://cdn.prod.website-files.com/68cc47f2dd4fe7f3f4d6064f/692c8d1e9b8a97c3e69424d6_dd-256.png</icon>
  <logo>https://cdn.prod.website-files.com/68cc47f2dd4fe7f3f4d6064f/692c8d1e9b8a97c3e69424d6_dd-256.png</logo>
  <author>
    <name>Duncan Davidson</name>
    <uri>https://duncan.dev</uri>
  </author>
${entries}
</feed>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    });
  } catch (error) {
    return new Response(`Error: ${String(error)}`, { status: 500 });
  }
};
