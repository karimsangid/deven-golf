// ─────────────────────────────────────────────────────────────────────────
// DEVEN — Shopify Storefront API client (headless commerce).
//
// The Deven site stays the custom storefront (browse, PDP, on-brand bag). When
// a Shopify Storefront token is configured, the BAG becomes a real Shopify cart:
// one unified, multi-item, dynamic-quantity checkout with live inventory, tax,
// shipping and a single payment — handed off to Shopify's secure (brand-themed)
// checkout for the card step. No card data ever touches our site (PCI stays with
// Shopify), exactly like every headless Shopify storefront.
//
// ▸ ALL CALLS USE THE STOREFRONT API (publishable token) — safe in the browser.
//   Never put the Admin API key here; it's a server secret and isn't needed.
// ▸ ZERO dependencies (raw fetch) so the site still exports as static HTML.
// ▸ FULLY ENV-GATED: with no token the whole module is inert and the site falls
//   back to the existing GoDaddy Pay Link bag (see src/lib/cart.tsx). Setting the
//   two env vars + the variant SKUs is the entire switch. See SHOPIFY_SETUP.md.
//
// SKU CONVENTION (the only mapping you maintain): each Shopify variant that
// matches a Deven SKU + size carries SKU `<slug>-<size>` — e.g. `gray-chest-M`.
// That's structure-agnostic (works whether Deven is one product with options or
// one product per colour/style), so the bag resolves variants by that SKU alone.
// ─────────────────────────────────────────────────────────────────────────

// Publishable Storefront config — both are NEXT_PUBLIC (shipped to the browser
// by design; the Storefront token is meant to be public, scoped to read + cart).
const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim() ?? "";
const STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN?.trim() ?? "";
// Pin a Storefront API version; override only if Shopify deprecates it.
const API_VERSION =
  process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION?.trim() || "2025-01";

/** True once the store domain + Storefront token are configured. */
export const shopifyEnabled = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

const ENDPOINT = shopifyEnabled
  ? `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`
  : "";

// The SKU a (slug, size) checks out through — the single naming contract with
// the Shopify store. Lower-cased so casing never breaks a lookup.
export function variantSku(slug: string, size: string): string {
  return `${slug}-${size}`.toLowerCase();
}

// ── Money + cart shapes (only what the UI needs) ────────────────────────────
export type ShopifyMoney = { amount: number; currencyCode: string };

export type ResolvedVariant = {
  sku: string;
  merchandiseId: string; // gid://shopify/ProductVariant/...
  price: ShopifyMoney;
  availableForSale: boolean;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: ShopifyMoney | null;
};

// A line we want in the Shopify cart, addressed by SKU (resolved to a variant).
export type DesiredLine = { sku: string; quantity: number };

// ── Low-level GraphQL fetch ─────────────────────────────────────────────────
async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!shopifyEnabled) {
    throw new Error("Shopify is not configured (missing Storefront env vars).");
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Shopify Storefront error ${res.status}`);
  }
  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) throw new Error("Shopify returned no data.");
  return json.data;
}

const money = (m: { amount: string; currencyCode: string } | null) =>
  m ? { amount: Number(m.amount), currencyCode: m.currencyCode } : null;

// ── Variant resolution (SKU → variant) ──────────────────────────────────────
// One paginated sweep of every variant in the store, indexed by SKU. The store
// is tiny (one hoodie, a few dozen variants), so this is one or two calls and is
// cached for the session. Gives us live price + availability for free.
let variantCache: Map<string, ResolvedVariant> | null = null;
let variantCachePromise: Promise<Map<string, ResolvedVariant>> | null = null;

const VARIANTS_QUERY = /* GraphQL */ `
  query DevenVariants($cursor: String) {
    productVariants(first: 250, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        sku
        availableForSale
        price { amount currencyCode }
      }
    }
  }
`;

async function loadVariantMap(): Promise<Map<string, ResolvedVariant>> {
  const map = new Map<string, ResolvedVariant>();
  let cursor: string | null = null;
  // Bound the loop defensively; 250/page covers far more than Deven will hold.
  for (let page = 0; page < 10; page++) {
    const data: {
      productVariants: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        nodes: {
          id: string;
          sku: string | null;
          availableForSale: boolean;
          price: { amount: string; currencyCode: string };
        }[];
      };
    } = await storefront(VARIANTS_QUERY, { cursor });
    for (const v of data.productVariants.nodes) {
      if (!v.sku) continue;
      map.set(v.sku.toLowerCase(), {
        sku: v.sku.toLowerCase(),
        merchandiseId: v.id,
        price: money(v.price)!,
        availableForSale: v.availableForSale,
      });
    }
    if (!data.productVariants.pageInfo.hasNextPage) break;
    cursor = data.productVariants.pageInfo.endCursor;
  }
  return map;
}

/** Resolve every Deven variant by SKU (cached for the session). */
export async function getVariantMap(): Promise<Map<string, ResolvedVariant>> {
  if (variantCache) return variantCache;
  if (!variantCachePromise) {
    variantCachePromise = loadVariantMap()
      .then((m) => {
        variantCache = m;
        return m;
      })
      .catch((err) => {
        variantCachePromise = null; // allow a later retry
        throw err;
      });
  }
  return variantCachePromise;
}

/** Look up one variant by (slug, size). Null if it isn't in the store yet. */
export async function resolveVariant(
  slug: string,
  size: string
): Promise<ResolvedVariant | null> {
  const map = await getVariantMap();
  return map.get(variantSku(slug, size)) ?? null;
}

// ── Cart ─────────────────────────────────────────────────────────────────────
const CART_FRAGMENT = /* GraphQL */ `
  fragment CartParts on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { subtotalAmount { amount currencyCode } }
  }
`;

const CART_CREATE = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation DevenCartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartParts }
      userErrors { message }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } | null };
};

const toCart = (c: RawCart): ShopifyCart => ({
  id: c.id,
  checkoutUrl: c.checkoutUrl,
  totalQuantity: c.totalQuantity,
  subtotal: money(c.cost?.subtotalAmount ?? null),
});

// Build a Shopify cart from the desired lines and return its (fresh) checkout
// URL. We recreate the cart on each change rather than tracking line GIDs — the
// bag is small and the cart is ephemeral, so this is the simplest correct sync.
// Any SKU not yet set up in Shopify is skipped and reported so it never blocks
// the rest of the bag.
export async function buildCart(
  lines: DesiredLine[]
): Promise<{ cart: ShopifyCart | null; missingSkus: string[] }> {
  const map = await getVariantMap();
  const cartLines: { merchandiseId: string; quantity: number }[] = [];
  const missingSkus: string[] = [];

  for (const line of lines) {
    if (line.quantity <= 0) continue;
    const variant = map.get(line.sku.toLowerCase());
    if (!variant) {
      missingSkus.push(line.sku);
      continue;
    }
    cartLines.push({
      merchandiseId: variant.merchandiseId,
      quantity: line.quantity,
    });
  }

  if (!cartLines.length) return { cart: null, missingSkus };

  const data: {
    cartCreate: { cart: RawCart | null; userErrors: { message: string }[] };
  } = await storefront(CART_CREATE, { lines: cartLines });

  if (data.cartCreate.userErrors?.length) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join("; ")
    );
  }
  const cart = data.cartCreate.cart;
  return { cart: cart ? toCart(cart) : null, missingSkus };
}
