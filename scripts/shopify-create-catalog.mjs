// ─────────────────────────────────────────────────────────────────────────
// DEVEN — one-shot Shopify catalogue builder (Admin API).
//
// Creates the entire hoodie line in a fresh Shopify store: 10 products
// (colourway × style), each with Size variants carrying the SKU `<slug>-<size>`,
// $119 price, per-size stock, and the product photo pulled from the live site.
// Then mints a Storefront access token the website uses.
//
// RUN ONCE:
//   SHOPIFY_STORE_DOMAIN=fv1jyx-w5.myshopify.com \
//   SHOPIFY_ADMIN_TOKEN=shpat_xxx \
//   node scripts/shopify-create-catalog.mjs            # add --dry-run to preview
//
// The Admin token needs scopes: write_products, read_products, write_inventory,
// read_inventory, read_locations. (Browser-side: create a custom app, install
// it, copy the Admin API access token.)
//
// SAFE TO RE-READ, NOT TO RE-RUN: it CREATES products every run (no dedupe), so
// run it once on the empty store. Re-running makes duplicates.
// ─────────────────────────────────────────────────────────────────────────

const DOMAIN = (process.env.SHOPIFY_STORE_DOMAIN || "").trim();
const TOKEN = (process.env.SHOPIFY_ADMIN_TOKEN || "").trim();
const API_VERSION = (process.env.SHOPIFY_API_VERSION || "2025-01").trim();
// Where the product images are served (the live site). Override if needed.
const IMAGE_BASE = (
  process.env.DEVEN_IMAGE_BASE || "https://deven-golf.vercel.app"
).replace(/\/$/, "");
const DRY_RUN = process.argv.includes("--dry-run");
const PRICE = "119.00";

if (!DOMAIN || !TOKEN) {
  console.error(
    "Missing env. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_TOKEN."
  );
  process.exit(1);
}

const ENDPOINT = `https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

// ── Catalogue (mirror of src/lib/products.ts, 2026-06-08) ───────────────────
const STYLE_LABEL = {
  shoulder: "Madison Collection",
  chest: "Big Chest Logo",
  smalldog: "Small Shoulder Logo",
};
const STYLE_BLURB = {
  shoulder:
    "The small Rottweiler mark at the shoulder with the golfer silhouette across the chest — clean and quiet.",
  chest: "The Rottweiler mark set bold and centred across the chest.",
  smalldog:
    "Just the Rottweiler mark, small at the top of the shoulder — blank everywhere else. The quietest way to wear it.",
};
const DESCRIPTION =
  "A lightweight performance hoodie built for the course and everywhere after it, " +
  "carrying the signature Rottweiler mark with DEVEN scripted down the back. " +
  "Designed to move the way you do. Free shipping on all orders. Exchanges within 30 days.";

// slug, colourway name, style, image, stock per size
const CATALOG = [
  { slug: "yellow-shoulder", name: "Peanut Cream", color: "Yellow", style: "shoulder", image: "/images/model-yellow-madison-woman.jpg", stock: { M: 1, L: 7, XL: 1 } },
  { slug: "yellow-chest", name: "Peanut Cream", color: "Yellow", style: "chest", image: "/images/model-yellow-chest-woman.jpg", stock: { M: 2, L: 4 } },
  { slug: "yellow-smalldog", name: "Peanut Cream", color: "Yellow", style: "smalldog", image: "/images/ghost-yellow-smalldog-front.jpg", stock: { M: 7, L: 13 } },
  { slug: "gray-shoulder", name: "Silver Oak", color: "Gray", style: "shoulder", image: "/images/model-gray-madison-woman.jpg", stock: { M: 3, L: 4, XL: 2 } },
  { slug: "gray-chest", name: "Silver Oak", color: "Gray", style: "chest", image: "/images/model-gray-chest-woman.jpg", stock: { S: 3, M: 8, L: 6 } },
  { slug: "gray-smalldog", name: "Silver Oak", color: "Gray", style: "smalldog", image: "/images/model-gray-smalldog.jpg", stock: { S: 3 } },
  { slug: "light-blue-shoulder", name: "Diesel Sky", color: "Light Blue", style: "shoulder", image: "/images/model-lblue-madison-woman.jpg", stock: { M: 10, L: 10 } },
  { slug: "light-blue-chest", name: "Diesel Sky", color: "Light Blue", style: "chest", image: "/images/model-lblue-chest-man.jpg", stock: { S: 2, M: 5, L: 5 } },
  { slug: "navy-madison", name: "Georgia Blue", color: "Navy", style: "shoulder", image: "/images/ghost-navy-madison-front.jpg", stock: { M: 2, L: 3 } },
  { slug: "navy-chest", name: "Georgia Blue", color: "Navy", style: "chest", image: "/images/lookbook-navy-woman.jpg", stock: { M: 3, L: 3 } },
];

// ── Admin GraphQL ────────────────────────────────────────────────────────────
async function admin(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error(
      `Admin API ${res.status}: ${JSON.stringify(json.errors || json)}`
    );
  }
  return json.data;
}

function bail(label, userErrors) {
  if (userErrors && userErrors.length) {
    throw new Error(`${label} failed: ${JSON.stringify(userErrors)}`);
  }
}

// ── Mutations ────────────────────────────────────────────────────────────────
const LOCATIONS = `query { locations(first: 1) { nodes { id name } } }`;

// productSet creates the product, its Size option, and all variants (with SKU +
// price + tracked inventory) in one call. Inventory quantities are set after.
const PRODUCT_SET = `
  mutation DevenProductSet($input: ProductSetInput!) {
    productSet(synchronous: true, input: $input) {
      product {
        id
        title
        handle
        variants(first: 20) { nodes { id sku inventoryItem { id } } }
      }
      userErrors { field message }
    }
  }
`;

const CREATE_MEDIA = `
  mutation DevenMedia($productId: ID!, $media: [CreateMediaInput!]!) {
    productCreateMedia(productId: $productId, media: $media) {
      media { ... on MediaImage { id } }
      mediaUserErrors { field message }
    }
  }
`;

const SET_INVENTORY = `
  mutation DevenInventory($input: InventorySetQuantitiesInput!) {
    inventorySetQuantities(input: $input) {
      userErrors { field message }
    }
  }
`;

const STOREFRONT_TOKEN = `
  mutation DevenStorefrontToken($input: StorefrontAccessTokenInput!) {
    storefrontAccessTokenCreate(input: $input) {
      storefrontAccessToken { accessToken title }
      userErrors { field message }
    }
  }
`;

function buildProductInput(p, locationId) {
  const sizes = Object.keys(p.stock); // in stock order
  return {
    title: `${p.name} — ${STYLE_LABEL[p.style]}`,
    handle: p.slug, // matches the site's slug so handle lookups also work
    descriptionHtml: `<p>${STYLE_BLURB[p.style]}</p><p>${DESCRIPTION}</p>`,
    vendor: "DEVEN",
    productType: "Hoodie",
    status: "ACTIVE",
    tags: [p.color, STYLE_LABEL[p.style], "Golf"],
    productOptions: [
      { name: "Size", values: sizes.map((s) => ({ name: s })) },
    ],
    variants: sizes.map((s) => ({
      optionValues: [{ optionName: "Size", name: s }],
      price: PRICE,
      sku: `${p.slug}-${s}`.toLowerCase(),
      inventoryItem: { tracked: true },
      // Stock at the store's location; productSet activates the item here.
      inventoryQuantities: [
        { locationId, name: "available", quantity: p.stock[s] },
      ],
    })),
  };
}

async function run() {
  console.log(`\nDEVEN → Shopify catalogue builder`);
  console.log(`Store : ${DOMAIN}`);
  console.log(`Images: ${IMAGE_BASE}`);
  console.log(`Mode  : ${DRY_RUN ? "DRY RUN (no writes)" : "LIVE — creating"}\n`);

  const loc = await admin(LOCATIONS);
  const locationId = loc.locations.nodes[0]?.id;
  if (!locationId) throw new Error("No location found on the store.");
  console.log(`Location: ${loc.locations.nodes[0].name} (${locationId})\n`);

  for (const p of CATALOG) {
    const title = `${p.name} — ${STYLE_LABEL[p.style]}`;
    const skus = Object.keys(p.stock).map((s) => `${p.slug}-${s}`.toLowerCase());
    if (DRY_RUN) {
      console.log(`• ${title}\n    ${skus.join(", ")}`);
      continue;
    }

    const input = buildProductInput(p, locationId);
    const data = await admin(PRODUCT_SET, { input });
    bail(`productSet ${title}`, data.productSet.userErrors);
    const product = data.productSet.product;

    // Attach the photo.
    await admin(CREATE_MEDIA, {
      productId: product.id,
      media: [
        {
          originalSource: `${IMAGE_BASE}${p.image}`,
          alt: title,
          mediaContentType: "IMAGE",
        },
      ],
    });

    // Best-effort: ensure available quantities are exactly the stock list. (The
    // inventoryQuantities in productSet seeds them; this reconciles if the API
    // version ignored them.)
    const quantities = product.variants.nodes
      .map((v) => {
        const size = v.sku.split("-").pop().toUpperCase();
        const qty = p.stock[size];
        return qty == null
          ? null
          : { inventoryItemId: v.inventoryItem.id, locationId, quantity: qty };
      })
      .filter(Boolean);
    try {
      const inv = await admin(SET_INVENTORY, {
        input: {
          name: "available",
          reason: "correction",
          ignoreCompareQuantity: true,
          quantities,
        },
      });
      bail("inventorySetQuantities", inv.inventorySetQuantities.userErrors);
    } catch (e) {
      console.log(`    (inventory note: ${e.message})`);
    }

    console.log(`✓ ${title}  →  ${skus.length} variants`);
  }

  if (DRY_RUN) {
    console.log(`\nDry run complete — ${CATALOG.length} products would be created.`);
    return;
  }

  // Mint the Storefront token the website uses.
  const tok = await admin(STOREFRONT_TOKEN, {
    input: { title: "Deven Website" },
  });
  bail("storefrontAccessTokenCreate", tok.storefrontAccessTokenCreate.userErrors);
  const storefrontToken =
    tok.storefrontAccessTokenCreate.storefrontAccessToken.accessToken;

  console.log(`\n──────────────────────────────────────────────`);
  console.log(`DONE. ${CATALOG.length} products / 23 variants created.`);
  console.log(`\nStorefront token (for the website env):`);
  console.log(`  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=${DOMAIN}`);
  console.log(`  NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=${storefrontToken}`);
  console.log(`──────────────────────────────────────────────\n`);
}

run().catch((e) => {
  console.error(`\n✗ ${e.message}\n`);
  process.exit(1);
});
