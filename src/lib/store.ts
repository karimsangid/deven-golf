// ─────────────────────────────────────────────────────────────────────────
// DEVEN sells through its GoDaddy Online Store. This Vercel site is the brand
// front + storefront; the GoDaddy store handles the actual cart, checkout,
// payments, customer accounts, tax, shipping, and inventory.
//
// ▸ ONE SWITCH controls where every store link points. Today it's the live,
//   working GoDaddy origin so no buy/account link is ever dead. The moment the
//   store is connected to its branded subdomain in GoDaddy (shop.devenbrand.shop),
//   change ONLY `STORE_ORIGIN` below and redeploy — every link follows.
// ─────────────────────────────────────────────────────────────────────────

// 🔁 FLIP THIS ONE LINE after the GoDaddy store is connected to the branded
//    subdomain:  "https://deveneapen.com"  →  "https://shop.devenbrand.shop"
export const STORE_ORIGIN = "https://deveneapen.com";

export const STORE_URL = `${STORE_ORIGIN}/shop`;
export const STORE_ALL = `${STORE_ORIGIN}/shop/ols/all?sortOption=descend_by_popularity`;
// The hoodie lives on the GoDaddy store as ONE product with size/logo/colour
// variants — every Vercel SKU is a variant of it. Deep-link the PDP "Buy" button
// straight to it so the buyer lands on the exact product, not the store landing.
export const PRODUCT_URL = `${STORE_ORIGIN}/shop/ols/products/everyday-hoodie`;
export const CART_URL = `${STORE_ORIGIN}/shop?olsPage=cart`;
export const ACCOUNT_URL = `${STORE_ORIGIN}/m/account`;
export const CREATE_ACCOUNT_URL = `${STORE_ORIGIN}/m/create-account`;
export const ORDERS_URL = `${STORE_ORIGIN}/m/orders`;

// Single source of truth for the brand inbox (contact form, newsletter, footer).
export const CONTACT_EMAIL = "info@devenbrand.shop";

// ─────────────────────────────────────────────────────────────────────────
// PER-PRODUCT GODADDY PAY LINKS
// Each variant checks out through its own GoDaddy Pay Link (GoDaddy Payments →
// Deven LLC bank). Style + colour are baked into each link; the customer picks
// SIZE from the link's own dropdown, so the order records the exact variant.
// These are the live public Pay Link URLs (verified resolving 2026-06-03).
// To add/replace a link: drop the URL here keyed by the product slug.
// ─────────────────────────────────────────────────────────────────────────
const PAY = "https://2a01d853-f750-426d-8a55-0b90b745946e.paylinks.godaddy.com";

export const PAY_LINKS: Record<string, string> = {
  // Madison Collection (shoulder)
  "yellow-shoulder": `${PAY}/1`,
  "light-blue-shoulder": `${PAY}/2`,
  "gray-shoulder": `${PAY}/c70d302f-108b-4f8f-bbcf-6cf`,
  "navy-madison": `${PAY}/fa92cc9b-7ade-4e79-ba6a-a60`,
  // Big Chest Logo (chest)
  "yellow-chest": `${PAY}/da128059-6888-409d-bba8-1d7`,
  "gray-chest": `${PAY}/5b93b309-4ba5-463c-a4ab-a0f`,
  "light-blue-chest": `${PAY}/7d427b15-1774-4a6f-b75f-427`,
  "navy-chest": `${PAY}/c7da78bf-3648-4a7f-a0cf-815`,
  // Small Shoulder Logo (smalldog)
  "yellow-smalldog": `${PAY}/4a00b645-19a0-4ae8-b0f3-c5d`,
  "gray-smalldog": `${PAY}/49221cf4-c088-4e81-a426-ded`,
};

// The checkout URL for a given product slug. Falls back to the browse store
// only if a slug is somehow unmapped (shouldn't happen — every SKU has a link).
export function payLinkFor(slug: string): string {
  return PAY_LINKS[slug] ?? STORE_URL;
}
