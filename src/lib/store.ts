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
