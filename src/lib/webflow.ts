const WEBFLOW_API_BASE = "https://api.webflow.com/v2";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[#\w]+;/g, "") // catch any remaining entities
    .trim();
}

interface WebflowCollection {
  id: string;
  displayName: string;
  slug: string;
}

interface WebflowImage {
  fileId: string;
  url: string;
  alt: string | null;
}

interface WebflowCollectionItem {
  id: string;
  fieldData: {
    name: string;
    slug: string;
    "publication-date"?: string;
    lede?: string;
    "post-body"?: string;
    url?: string;
    "hero-image"?: WebflowImage;
    [key: string]: unknown;
  };
}

interface CollectionsResponse {
  collections: WebflowCollection[];
}

interface CollectionItemsResponse {
  items: WebflowCollectionItem[];
}

export interface FeedItem {
  id: string;
  url: string;
  name: string;
  slug: string;
  summary?: string;
  contentHtml?: string;
  externalUrl?: string;
  image?: string;
  pubDate: Date;
  collection: "posts" | "links";
}

function getResizedImageUrl(url: string): string {
  return `${url}?w=800&q=80`;
}

export class RateLimitError extends Error {
  retryAfter: string;

  constructor(retryAfter: string) {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

async function webflowFetch<T>(
  endpoint: string,
  apiToken: string
): Promise<T> {
  const response = await fetch(`${WEBFLOW_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After") || "60";
    throw new RateLimitError(retryAfter);
  }

  if (!response.ok) {
    throw new Error(`Webflow API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getCollections(
  siteId: string,
  apiToken: string
): Promise<WebflowCollection[]> {
  const data = await webflowFetch<CollectionsResponse>(
    `/sites/${siteId}/collections`,
    apiToken
  );
  return data.collections;
}

export async function getCollectionItems(
  collectionId: string,
  apiToken: string,
  limit: number = 10
): Promise<WebflowCollectionItem[]> {
  const data = await webflowFetch<CollectionItemsResponse>(
    `/collections/${collectionId}/items/live?limit=${limit}`,
    apiToken
  );
  return data.items;
}

export async function getFeedItems(
  siteId: string,
  apiToken: string
): Promise<FeedItem[]> {
  // Get all collections to find Posts and Links
  const collections = await getCollections(siteId, apiToken);

  const postsCollection = collections.find(
    (c) => c.slug === "post" || c.displayName.toLowerCase() === "posts"
  );
  const linksCollection = collections.find(
    (c) => c.slug === "link" || c.displayName.toLowerCase() === "links"
  );

  const items: FeedItem[] = [];

  if (postsCollection) {
    const posts = await getCollectionItems(postsCollection.id, apiToken, 10);
    for (const post of posts) {
      const postUrl = `https://duncan.dev/post/${post.fieldData.slug}`;
      const heroImage = post.fieldData["hero-image"];
      const imageUrl = heroImage?.url ? getResizedImageUrl(heroImage.url) : undefined;
      const largeImageUrl = heroImage?.url ? `${heroImage.url}?w=1200&q=80` : undefined;
      const imageHtml = largeImageUrl
        ? `<p><img src="${largeImageUrl}" alt="${heroImage?.alt || post.fieldData.name}" /></p>`
        : "";
      const bodyHtml = post.fieldData["post-body"] || "";
      items.push({
        id: postUrl,
        url: postUrl,
        name: post.fieldData.name,
        slug: post.fieldData.slug,
        summary: post.fieldData.lede ? stripHtml(post.fieldData.lede) : undefined,
        contentHtml: imageHtml + bodyHtml,
        image: imageUrl,
        pubDate: new Date(post.fieldData["publication-date"] || Date.now()),
        collection: "posts",
      });
    }
  }

  if (linksCollection) {
    const links = await getCollectionItems(linksCollection.id, apiToken, 10);
    for (const link of links) {
      const linkUrl = `https://duncan.dev/link/${link.fieldData.slug}`;
      const externalUrl = link.fieldData.url;
      items.push({
        id: linkUrl,
        url: externalUrl || linkUrl,
        name: link.fieldData.name,
        slug: link.fieldData.slug,
        contentHtml: link.fieldData["post-body"],
        externalUrl: externalUrl,
        pubDate: new Date(link.fieldData["publication-date"] || Date.now()),
        collection: "links",
      });
    }
  }

  // Sort all items by publication date, newest first
  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return items;
}
