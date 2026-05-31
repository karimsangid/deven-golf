// ─────────────────────────────────────────────────────────────────────────
// DEVEN sells through its existing GoDaddy Online Store at deveneapen.com.
// This Vercel site is the brand front and links out to that store for the
// actual cart, checkout, customer accounts, tax, shipping, and inventory.
// All outbound store links flow through these constants so they're easy to
// retarget if the store URL ever changes.
// ─────────────────────────────────────────────────────────────────────────
export const STORE_URL = "https://deveneapen.com/shop";
export const STORE_ALL =
  "https://deveneapen.com/shop/ols/all?sortOption=descend_by_popularity";
// The hoodie lives on the GoDaddy store as ONE product with size/logo/colour
// variants — every Vercel SKU is a variant of it. Deep-link the PDP "Buy"
// button straight here so the buyer lands on the exact product, not the store
// landing. (Verified live 2026-05-30: deveneapen.com/shop/ols/products/everyday-hoodie
// renders $119 with Size/Logo/Colour selectors + Add to Cart.)
export const PRODUCT_URL =
  "https://deveneapen.com/shop/ols/products/everyday-hoodie";
export const CART_URL = "https://deveneapen.com/shop?olsPage=cart";
export const ACCOUNT_URL = "https://deveneapen.com/m/account";
export const CREATE_ACCOUNT_URL = "https://deveneapen.com/m/create-account";
export const ORDERS_URL = "https://deveneapen.com/m/orders";
