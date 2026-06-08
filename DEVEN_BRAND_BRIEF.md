# DEVEN BRAND — Master Brief (for GoDaddy site build)

Everything needed to build/reproduce the Deven Brand storefront. Compiled 2026-06-07.

---

## Brand
- **Name:** DEVEN (wordmark casing; "Deven Brand" normalized to "DEVEN")
- **Owner/Client:** Deven Eapen — Golf apparel brand (long-term vision: full athlete apparel, golf is the launch vertical — positioning is "athlete," not just "golfer")
- **Logo:** Signature Rottweiler head with green eyes (`public/images/logo-icon.png` = head mark; `public/images/logo.png` = full lockup with "DEVEN" in gold)
- **Design north stars (Deven's own picks):** petermillar.com + greysonclothiers.com — minimalist, classy, restrained, less clutter. (Deven explicitly wants RESTRAINT, not flashy animation.)

## Mission Statement (Deven's OWN words — use VERBATIM, do not paraphrase)
> MORE THAN A GAME.
> A LIFESTYLE. A LEGACY.
> I'm Deven. A golfer. A dreamer. A future business leader.
> I created Deven Brand to build luxury golf apparel for athletes who are driven to be the best — on and off the course.

- Hero motto: **"MORE THAN A GAME"**
- Section h2: **"A LIFESTYLE. A LEGACY."**

## Color Palette
- Forest green (fairway): `#1a3c2a`
- Trophy gold (primary accent): `#c9a054`
- Linen white (backgrounds): `#faf8f4`
- Cream (alt sections): `#f5f0e8`
- Charcoal (dark sections): `#1c1c1c`
- Black (nav/footer/hero overlay): `#0a0a0a`

## Typography
- Headings: **Cormorant Garamond** (serif, luxury editorial)
- Body: **Montserrat** (sans-serif, clean)

---

## Product / Catalog
- **Product:** 1 hoodie, **4 colorways × 2 logo styles** (Big Chest Logo line + Madison Collection / shoulder line)
- **Colorway official names (NO word "Hoodie" in names):**
  - Yellow → **Peanut Cream**
  - Gray → **Silver Oak**
  - Light Blue → **Diesel Sky**
  - Navy → **Georgia Blue** (navy shoulder is SOLD OUT)
- **Madison Collection** = its own signature line (shoulder/small-dog logo), shown as a DISTINCT dark section, separate from the Big Chest line.
- **Inventory at launch:** 107 units total (per-size breakdown in `inventory/inventory.json` and `src/lib/products.ts`).

## Pricing & Policies (LOCKED — provided by Karim 2026-05-30)
- **Price:** every piece **$119 USD**
- **Shipping:** **FREE over $200**; otherwise rates at checkout
- **Returns:** **NO REFUNDS — EXCHANGES ONLY** (30 days, unworn with tags)
- **Sales tax:** per-state, based on buyer's shipping state, calculated at checkout
- **Coupon:** **DEVEN10** = 10% off (scratch-to-win popup on site; must exist in GoDaddy store to work at checkout)

## Contact / Business Info
- **Address:** 1101 Wootton Parkway, Suite 400, Rockville, MD 20852
- **Phone:** (301) 701-6226  (`tel:+13017016226`)
- **Email:** info@devonbrand.shop  ⚠️ NOTE domain is **devonbrand.shop** ("devon", not "deven")
- **Instagram:** @shopdeven  (https://instagram.com/shopdeven)

---

## Domains & Checkout (GoDaddy)
- **Primary domain:** `devenbrand.shop` (also owns `devenbrand.net`)
- **Custom storefront (this repo):** deployed on Vercel at `deven-golf.vercel.app` — this is the designed front-end.
- **Old GoDaddy Website Builder site:** `deveneapen.com`
- **Email:** M365 — MX = `devenbrand-shop.mail.protection.outlook.com` (keep intact through any DNS change)

### CHECKOUT IS GODADDY-ONLY (hard rule — no Stripe/Square/PayPal/Supabase/custom processor)
- **GoDaddy Payments Pay Links** are the active checkout. Base:
  `https://2a01d853-f750-426d-8a55-0b90b745946e.paylinks.godaddy.com/<id>`
  - One product per payment; a pay link is a FULL hosted checkout page (size radios, card, Apple/Google Pay, billing, auto tax, reCAPTCHA). It CANNOT be prefilled via URL params.
  - All 10 SKU pay links are mapped in `src/lib/store.ts` (PAY_LINKS).
- **Correct GoDaddy store = the "deven" store (`deveneapen.com`)** — it has the Commerce plan + GoDaddy Payments/bank + the Everyday Hoodie catalog.
  - Do NOT use the "Eapen Enterprises" store (free plan, Pay-Links-only, no Commerce).
- **Two GoDaddy-only paths to a unified checkout** (either is acceptable; both keep money flowing to Deven's bank via GoDaddy Payments):
  1. Keep the custom Vercel site as the storefront at `devenbrand.shop`, Buy buttons → GoDaddy Pay Links (current setup).
  2. Point `devenbrand.shop` apex straight at the GoDaddy Websites+Marketing "deven" store (GoDaddy-hosted cart/checkout) — replaces the custom front.

---

## Repo / Tech
- **Repo:** `karimsangid/deven-golf` (GitHub)
- **Stack:** Next.js 16 + Tailwind + TypeScript, Vercel
- **Prod branch:** `feat/minimal-redesign`
- **Key source files:**
  - `src/lib/products.ts` — catalog, prices, colors, inventory, COLOR_LABELS
  - `src/lib/store.ts` — GoDaddy Pay Links (PAY_LINKS)
  - `src/lib/cart.tsx` — multi-item bag (localStorage), per-line pay-link checkout
  - `src/components/` — Nav, CartDrawer, ScratchPopup, ShopBrowser, ProductActions, etc.
  - `inventory/` — inventory.json + stock.mjs (decrement engine + low-stock email)
- **Assets:** `public/images/` (logo, on-model campaign shots, product flat-lays, marquee crops)

## Notes
- Filenames are NOT always accurate to contents — verify images visually (historical: product-yellow.jpg was actually navy; some "logo" images are AI redraws).
- This zip excludes `node_modules/`, `.next/`, `out/`, and `.git/` (build/dependency artifacts). Run `npm install` to restore dependencies.
