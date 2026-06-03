# DEVEN — Storefront Plan (GoDaddy-only, ONE FLUID SITE)

**Decision (Karim, locked):** ONE fluid GoDaddy site. Point `devenbrand.shop` at the
GoDaddy Websites + Marketing store and **retire Vercel**. One domain, inline
checkout, **zero redirects**. GoDaddy does everything — no Stripe, no Supabase, no
other tool, ever.

This supersedes the earlier "keep the custom Vercel site + hand off to GoDaddy at
checkout" idea. Karim chose the seamless single-site experience over the custom
Vercel design.

---

## What this is

The GoDaddy store at `deveneapen.com` is already a FULL Websites + Marketing site —
brand pages + store + checkout, all on one domain, no redirect. We simply make
`devenbrand.shop` that site's domain. Then `devenbrand.shop` IS the one fluid
store, and the Vercel app is no longer attached.

```
  BEFORE:  devenbrand.shop  → Vercel (custom design)   ──redirect──→  deveneapen.com (GoDaddy store/checkout)
  AFTER:   devenbrand.shop  → GoDaddy W+M site (brand + store + checkout, one domain, no redirect)
           deveneapen.com   → redirects to devenbrand.shop
           (Vercel app retired / detached)
```

**The one tradeoff (accepted):** the live design becomes the GoDaddy builder site,
not the custom Next.js build. We re-skin the GoDaddy site to the brand as closely
as the builder allows. The custom Vercel design is retired.

---

## Step 1 — [KARIM, GoDaddy W+M dashboard, browser-only] Make devenbrand.shop the site's domain

1. GoDaddy → **My Products** → open the **Websites + Marketing** site (the one
   currently at `deveneapen.com`).
2. **Settings → Domain** (or **Site → Domains**).
3. **Connect a domain** / **Change domain** → choose **`devenbrand.shop`** and set it
   as the **primary** domain.
4. Keep **`deveneapen.com`** as a secondary that **redirects to** `devenbrand.shop`
   (so old links still work).
5. Save. GoDaddy repoints the web records for `devenbrand.shop` to the store and
   provisions SSL (a few min to ~1 hr). This automatically detaches it from Vercel.

⚠️ **EMAIL — do not break it.** `devenbrand.shop` email runs on Microsoft 365
(MX = `devenbrand-shop.mail.protection.outlook.com`). The W+M domain connection
only sets WEB records, not MX — but after the switch, **send a test email to
`info@devenbrand.shop` and confirm it still arrives.** If GoDaddy offers to "use
GoDaddy email," decline — leave the M365 MX untouched.

## Step 2 — [CLAUDE, after Step 1] Detach the domain from Vercel (cleanup)

Once `devenbrand.shop` resolves to GoDaddy, I remove the domain from the Vercel
project so there's no split-brain. (Optional — the DNS change alone already makes
GoDaddy authoritative; this is just housekeeping.)

## Step 3 — [KARIM, GoDaddy store, browser-only] Load the new renders + the new style

All clean renders are packaged at **`C:\tmp\deven_godaddy_assets\`** (also in the
repo at `public/images/`). Front+back ghost renders, all 4 colors × 3 logo styles,
Peanut Cream dog now BROWN.

1. **Add the NEW "Shoulder Mark" (non-Madison small dog) style.** On the hoodie
   product, the "Logo" option currently has [Chest, Shoulder/Madison]. Add a third
   value — **"Shoulder Mark"** — and attach its photos:
   `peanut-cream-shoulder-mark.jpg`, `silver-oak-shoulder-mark.jpg`,
   `diesel-sky-shoulder-mark.jpg`, `georgia-blue-shoulder-mark.jpg`.
2. **Refresh the existing product photos** with the new brown-dog renders:
   `peanut-cream-big-chest.jpg` + `peanut-cream-madison.jpg` (brown dog now),
   plus the cleaner Big Chest / Madison renders for the other colors.
3. **Lifestyle/hero image:** `lifestyle-couple.jpg` (Silver Oak big-chest +
   Peanut Cream shoulder-mark, on the course) for the homepage banner.

## Step 4 — [KARIM, GoDaddy store settings, browser-only] Finish store settings

- **DEVEN10 coupon** — was saved lowercase `deven10`; make it uppercase `DEVEN10`
  to match the on-site code.
- **Free shipping** on all orders. **Per-state sales tax** on.
- **Price or hide** the two **$0.00** products (Golf Polo, Quarter Zip).

## Step 5 — [KARIM, GoDaddy builder, browser-only] Re-skin to the brand

Logo, dark + gold palette, brand fonts, announcement bar (free shipping / exchanges
only), so the one fluid site reads as DEVEN end-to-end.

---

## Status

- [ ] **Step 1** — devenbrand.shop → GoDaddy W+M as primary domain (KARIM) ← the switch
- [ ] **Step 2** — detach domain from Vercel (CLAUDE, after Step 1)
- [ ] **Step 3** — upload renders + add Shoulder Mark style (KARIM)
- [ ] **Step 4** — DEVEN10 / shipping / tax / $0.00 products (KARIM)
- [ ] **Step 5** — re-skin GoDaddy site to brand (KARIM)

Renders ready: `C:\tmp\deven_godaddy_assets\` (11 images) + `public/images/ghost-*`.
No code flip needed — this path is pure GoDaddy domain + DNS. GoDaddy W+M has no
API, so Steps 1, 3, 4, 5 are browser-only on Karim's side; I guide + supply assets.
