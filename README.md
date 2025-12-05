# Webflow Feed

This is a Webflow Cloud application that generates JSON Feed and Atom feeds from Webflow CMS content for the Webflow version of [duncan.dev](https://duncan.dev). It pulls items from two collections (Posts and Links) and merges them into one, using the last 10 from each.

This project was created using the Webflow tool and the Astro starter template.

## Endpoints

- `/feed/json` serves a JSON feed
- `/feed/xml` serves an Atom feed

## Adapting for use in your own Webflow site

It’s not quite plug and play at this point to use this application in another site. You’ll need to fork this repo and update `src/lib/webflow.ts` to pull from your own CMS collections.

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file with Webflow credentials:

   ```
   WEBFLOW_SITE_ID="your-site-id"
   WEBFLOW_SITE_API_TOKEN="your-api-token"
   ```

   The API token needs the `cms:read` scope.

3. Run the dev server:
   ```sh
   npm run dev
   ```

## Deployment

You’ll need to ensure that the `WEBFLOW_SITE_ID` and `WEBFLOW_SITE_API_TOKEN` environment variables are set in your Webflow Cloud app dashboard.

```sh
npx webflow deploy
```

## Q&A

**But doesn’t Webflow provide feeds?** Why yes, but two things: First, the feed functionality is per-collection and I needed to combine two collections; Second, I wanted to provide a JSON feed.

**Why would you combine the feed for two collections?** I have two primary content types on my site, but want to provide a combined feed. It’s the way my site was before I moved it to Webflow, and I wanted to keep it.

**What’s this JSON feed you speak of?** [JSON Feed](https://www.jsonfeed.org/) is a modernized format for feeds. It's simpler to write and consume.

**Are feeds still important?** It’s true that RSS isn’t as used as it used to be. In particular, many people moved to discovering and following content via Twitter and the other socials. But, feeds are still useful for a lot of people.

**Why Astro?** Currently, Webflow Cloud supports Astro and Next. The functionality in this app is so simple it could just be a straight up Cloudflare Worker. Hopefully Webflow Cloud will be able to do that soon.
