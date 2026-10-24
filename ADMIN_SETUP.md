# Dolayout Admin

The admin panel is available at `/adm/`. It uses Cloudflare Pages Functions and D1. The portfolio stays readable if the API is offline; admin publishing and comment moderation require the D1 binding. File uploads additionally require an R2 bucket. Until then, published images and videos can be referenced by HTTPS URL.

## Cloudflare resources

The production D1 database `dolayout-admin-content` is already created (ID `57af0563-4ed0-4f1e-bd20-67a7b3dce9ed`), its schema has been applied, and the `DB` binding is configured for Production. If the database must be recreated, apply the schema from the repository root:

```powershell
npx wrangler d1 execute dolayout-admin-content --remote --file migrations/0001_admin_content_comments.sql
```

In Cloudflare Dashboard, open **Workers & Pages → dolayout-site → Settings → Bindings** to review the binding. Optional media storage:

| Type | Variable name | Resource |
| --- | --- | --- |
| R2 bucket | `MEDIA_BUCKET` | Optional. Requires enabling R2 billing first. |

The `DB` binding is already configured for Production. R2 is intentionally not enabled: Cloudflare's current screen requires accepting a paid subscription backed by the account's saved payment card. No subscription or billing agreement was accepted. If you approve that later, create a bucket named `dolayout-media`, bind it as `MEDIA_BUCKET`, and redeploy.

## One-time admin setup

In the Pages project, open **Settings → Variables and Secrets** and add `ADMIN_SETUP_TOKEN` as a secret, not a plain-text variable. Use a password manager to generate a random value with at least 32 random bytes. Do not put the value in Git or in a public message.

After the deployment, open `https://dolayout.co/adm/`, enter that setup token, confirm the admin email and choose a unique password of at least 12 characters. The token only works while the admin table is empty. Once setup is complete, the public setup endpoint is disabled. The token can then be removed from Pages settings.

The admin password is salted and derived with PBKDF2-SHA-256. Sessions use random, hashed server-side tokens in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. No password or session token is stored in browser local storage.

## Content and comments

- Projects and inspiration articles can be drafted or published, with English and Portuguese titles/descriptions, categories, tags, hashtags, cover media, project galleries, article text, and outbound links.
- Published content is loaded by the main portfolio from `/api/content` and joins the existing curated feed.
- New comments remain pending. Only approved comments appear on internal pages; the admin can approve, reject, or permanently delete them.
- With R2 connected, media uploads accept JPEG, PNG, WebP, MP4, and WebM. Images are limited to 20 MB and videos to 100 MB. SVG uploads are intentionally blocked.
- The comment form has a honeypot and per-IP rate limit. For stronger abuse protection, create a Cloudflare Turnstile widget and add server-side Siteverify before opening comments to a larger audience.

## Local checks

`npm run build` copies the admin UI to `dist/site/adm/`. Cloudflare Pages detects the `functions/` directory at the repository root; keep it outside `dist/site/`.
