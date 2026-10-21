# Jumbo Sales — Hardware & Construction Website

Static, git-based website with a visual admin (Decap CMS). No database, no custom backend.
All content (products, categories, settings, pages) lives as JSON files in `content/`.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build (production check)
```bash
npm run build
```

## Discounts
On any product, fill in "Previous Price" (the old, higher price) alongside "Current Price".
The site automatically shows a strikethrough old price plus a red "% Off" badge — no extra
steps needed. Leave "Previous Price" empty for items with no discount.

## Deploying — see the full step-by-step in this repo's history / prior chat instructions:
1. Push to GitHub
2. Import into Vercel (main site — static export, Root Directory = repo root)
3. Deploy `oauth-proxy/` as its OWN separate Vercel project (Root Directory = `oauth-proxy`)
4. Create a GitHub OAuth App pointing its callback at `<oauth-proxy-url>/api/callback`
5. Update `public/admin/config.yml` with your real repo name and oauth-proxy base_url
6. Push — Vercel auto-redeploys — test `/admin`

## Google integrations (optional environment variables)
Add these in Vercel → Settings → Environment Variables. The site works fine without them —
each one only activates once you add it, then redeploy.

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — your Google Analytics (GA4) Measurement ID, looks like
  `G-XXXXXXXXXX`. Once set, every page view is tracked automatically, plus WhatsApp/Call/
  Quote button clicks are sent as events (`whatsapp_click`, `call_click`, `quote_click`) so
  you can see which one actually drives enquiries.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — the verification code Google Search Console gives
  you when adding the site via the "HTML tag" method. Once set, the tag is added to every
  page automatically — no need to upload a separate HTML file.

## Uploading images / editing prices (for the business owner)
Go to `/admin`, log in with GitHub, open a product, use the image upload button (supports
unlimited additional images via "+ Add Image"), edit price fields, click Publish. No code.
