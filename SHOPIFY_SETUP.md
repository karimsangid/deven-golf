# DEVEN — Shopify Checkout Setup

The Deven site is now wired for **headless Shopify commerce**. The site stays the
custom storefront (browse, product pages, the on-brand bag); Shopify powers the
cart, inventory, tax, shipping, and the secure payment. The bag becomes **one
unified checkout**: several pieces, any quantity, a single payment — everything
the GoDaddy Pay Links couldn't do.

It's **fully gated by two env vars**. Until they're set, the site keeps using the
current GoDaddy Pay Link checkout, so nothing goes down while you set Shopify up.

---

## What I need from you (3 things)

1. **Store domain** — your `…myshopify.com` domain (e.g. `deven-brand.myshopify.com`).
2. **Storefront API access token** — see Step 2 below. (Publishable, browser-safe.
   **Not** the Admin API key.)
3. A quick **"products are live with the SKUs below"** confirmation.

Send me 1 and 2 and I'll set them on Vercel and flip the site to Shopify checkout.

---

## Step 1 — Add the products in Shopify

Recreate the hoodie line in your Shopify store. You can do this **either** way —
the site doesn't care, because it matches variants by **SKU**:

- one product ("DEVEN Hoodie") with Colour / Style / Size options, **or**
- one product per colourway+style, each with a Size option.

For each piece set the **price ($119)**, **stock per size**, and a **photo**.

## Step 2 — Create the Storefront API token

1. Shopify admin → **Settings** → **Apps and sales channels** → **Develop apps**.
2. **Create an app** (name it e.g. "Deven Website") → **Configure Storefront API scopes**.
3. Enable at least: `unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`,
   `unauthenticated_read_checkouts`.
4. **Install app** → under **API credentials** copy the **Storefront API access token**.
5. Send me that token + your `…myshopify.com` domain. (Don't paste the Admin token.)

## Step 3 — Set the variant SKUs (the only mapping)

The site connects each item to Shopify by a SKU shaped **`slug-size`** (lower-case).
On each variant in Shopify, set the SKU field to the matching value below.
(Add the sizes you actually stock; this is today's catalog.)

| Piece | Colour · Style | SKUs (per size) |
|---|---|---|
| `yellow-shoulder` | Peanut Cream · Madison | `yellow-shoulder-m`, `yellow-shoulder-l`, `yellow-shoulder-xl` |
| `yellow-chest` | Peanut Cream · Big Chest | `yellow-chest-m`, `yellow-chest-l` |
| `yellow-smalldog` | Peanut Cream · Small Shoulder | `yellow-smalldog-m`, `yellow-smalldog-l` |
| `gray-shoulder` | Silver Oak · Madison | `gray-shoulder-m`, `gray-shoulder-l`, `gray-shoulder-xl` |
| `gray-chest` | Silver Oak · Big Chest | `gray-chest-s`, `gray-chest-m`, `gray-chest-l` |
| `gray-smalldog` | Silver Oak · Small Shoulder | `gray-smalldog-s` |
| `light-blue-shoulder` | Diesel Sky · Madison | `light-blue-shoulder-m`, `light-blue-shoulder-l` |
| `light-blue-chest` | Diesel Sky · Big Chest | `light-blue-chest-s`, `light-blue-chest-m`, `light-blue-chest-l` |
| `navy-madison` | Georgia Blue · Madison | `navy-madison-m`, `navy-madison-l` |
| `navy-chest` | Georgia Blue · Big Chest | `navy-chest-m`, `navy-chest-l` |

> If you'd rather not hand-set SKUs, send me the token + domain anyway — I can pull
> your variant IDs and adapt the mapping. SKUs are just the cleanest, most durable
> way to keep the site and store in sync.

## Step 4 — Brand the checkout (optional but worth it)

The card-entry page itself runs on Shopify's secure checkout (this is required —
collecting cards on our own page needs Shopify Plus). It's still on-brand:
Shopify admin → **Settings → Checkout → Customize** (or **Branding**) → set the
DEVEN logo, the cream/black/gold colours, and fonts so it matches the site.

## Step 5 — Hand it back to me

Once the token + domain are set, I:
- add `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
  to Vercel,
- deploy,
- test a real multi-item, multi-quantity checkout end to end on the live site.

The bag flips from per-item GoDaddy links to one Shopify checkout automatically —
no code change needed.

---

### How the modes switch (for reference)

`src/lib/shopify.ts` reads the two env vars. `shopifyEnabled` is `true` only when
both are present:

- **Shopify on** → `src/lib/cart.tsx` mirrors the bag into a Shopify cart and the
  drawer shows one **"Checkout Securely"** button (`checkoutUrl`).
- **Shopify off** → the bag uses the GoDaddy `PAY_LINKS` in `src/lib/store.ts`
  and the drawer shows the per-line checkout buttons (current live behaviour).

Local dev: copy `.env.local.example` → `.env.local`, fill it in, `npm run dev`.
