// ─────────────────────────────────────────────────────────────────────────
// DEVEN sells through its GoDaddy Online Store — a FULL cart + checkout
// (any quantity, mix sizes/colours, one payment). This Vercel site is the
// brand front + catalogue; the GoDaddy store handles the cart, checkout,
// payments, customer accounts, tax, shipping, and inventory.
//
// ▸ The store is connected to the brand's OWN subdomain — shop.devenbrand.shop —
//   so the shopper NEVER leaves the Deven brand and deveneapen.com is never
//   shown. Every store link below derives from STORE_ORIGIN, so this one line is
//   the single switch for the whole buy + account flow.
//
// ⚠️ GO-LIVE GATE: this now points at shop.devenbrand.shop. Do NOT deploy to
//   prod until that subdomain is connected to the GoDaddy store (it must
//   resolve), or every buy/account link will be dead. Until then prod stays on
//   the prior (Pay Links) commit. Connect the subdomain in GoDaddy → then deploy.
// ─────────────────────────────────────────────────────────────────────────

export const STORE_ORIGIN = "https://shop.devenbrand.shop";

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
// BUY FLOW → GoDaddy store cart + checkout
// Every Vercel SKU is a variant of the single "everyday-hoodie" product on the
// GoDaddy store. The buy button sends the shopper to that product on
// shop.devenbrand.shop, where they pick this colour/style + size, set ANY
// quantity, add it to the cart (mixing variants if they like), and check out —
// the full GoDaddy cart + checkout, GoDaddy Payments → Deven's bank, all on the
// Deven brand domain (no deveneapen.com anywhere).
// ─────────────────────────────────────────────────────────────────────────

// Optional per-slug override, for when a variant becomes its own store product
// or gets a deep-link with pre-selected options. Empty for now → every SKU opens
// the one hoodie product page; fill this once the subdomain is live and the
// store's variant URL params are known (one place to add deep-linking later).
const STORE_PRODUCT_OVERRIDES: Record<string, string> = {};

// The store URL a given product slug's buy button should open.
export function storeProductUrl(slug: string): string {
  return STORE_PRODUCT_OVERRIDES[slug] ?? PRODUCT_URL;
}

// ─────────────────────────────────────────────────────────────────────────
// LEGACY — per-product GoDaddy Pay Links. No longer wired into the buy button
// (retired in favour of the full store cart above); kept ONLY for a fast
// rollback if the subdomain cutover has to be reverted. Do not use in new code.
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
