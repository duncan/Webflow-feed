# Webflow Feed

A Webflow Cloud appliation that generates JSON Feed and Atom feeds from Webflow CMS content for [duncan.dev](https://duncan.dev). It pulls items from two collections (Posts and Links) and merges them into one, using the last 10 from each.

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
