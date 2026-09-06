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

## Uploading images / editing prices (for the business owner)
Go to `/admin`, log in with GitHub, open a product, use the image upload button (supports
unlimited additional images via "+ Add Image"), edit price fields, click Publish. No code.
