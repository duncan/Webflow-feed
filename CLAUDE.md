# CLAUDE.md

This file provides context for Claude Code when working on this project.

## Project Overview

This is a Webflow Cloud application that generates JSON Feed and Atom feeds from Webflow CMS content for [duncan.dev](https://duncan.dev). It's built with Astro and deployed to Webflow Cloud (Cloudflare Workers).

## Key Files

- `src/lib/webflow.ts` - Core library for fetching from Webflow CMS API
- `src/pages/json.ts` - JSON Feed 1.1 endpoint at `/feed/json`
- `src/pages/xml.ts` - Atom feed endpoint at `/feed/xml`
- `src/pages/[...slug].ts` - Catch-all redirect to `/feed/xml`

## Webflow CMS Structure

The app pulls from two collections on the Webflow site (site ID: `68cc47f2dd4fe7f3f4d6064f`):

**Posts Collection** (`68d172b973fc804f36671175`):
- `name` - Post title
- `slug` - URL slug
- `publication-date` - Publication date
- `lede` - Deck/summary (rich text, stripped to plain text for feed summary)
- `post-body` - Full article content (rich text/HTML)
- `hero-image` - Optional hero image with `{ fileId, url, alt }`

**Links Collection** (`68d008f84711b007096ab168`):
- `name` - Link title
- `slug` - URL slug
- `publication-date` - Publication date
- `url` - External URL being linked to
- `post-body` - Commentary/body content (rich text/HTML)

## Feed Behavior

- Fetches last 10 posts + last 10 links, sorted by publication date
- Posts use `https://duncan.dev/post/{slug}` as canonical URL
- Links use the external URL for `url` field, with `https://duncan.dev/link/{slug}` as `id`
- Hero images: 800px for `image` field (thumbnails), 1200px for inline `<img>` in content
- Handles Webflow API rate limiting (429) with `Retry-After` header passthrough

## Environment Variables

Required in `.env` (local) or Webflow Cloud dashboard (production):
- `WEBFLOW_SITE_ID` - Webflow site ID
- `WEBFLOW_SITE_API_TOKEN` - API token with `cms:read` scope

## Commands

```sh
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
npx webflow deploy  # Deploy to Webflow Cloud
```

## Base URL

All URLs use `https://duncan.dev` as the base domain.
