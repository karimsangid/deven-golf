// Generates a Shopify-importable product CSV for DEVEN — NO API token needed.
// Mirrors scripts/shopify-create-catalog.mjs CATALOG (2026-06-08). Run:
//   node scripts/shopify-make-csv.mjs > C:/tmp/deven-shopify-products.csv
import { writeFileSync } from "node:fs";

const IMAGE_BASE = "https://deven-golf.vercel.app";
const PRICE = "119.00";

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

const HEADERS = [
  "Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published",
  "Option1 Name", "Option1 Value",
  "Variant SKU", "Variant Inventory Tracker", "Variant Inventory Qty",
  "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price",
  "Variant Requires Shipping", "Variant Taxable",
  "Image Src", "Image Position", "Image Alt Text", "Status",
];

const esc = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const rows = [HEADERS.join(",")];

for (const p of CATALOG) {
  const title = `${p.name} — ${STYLE_LABEL[p.style]}`;
  const body = `<p>${STYLE_BLURB[p.style]}</p><p>${DESCRIPTION}</p>`;
  const tags = `${p.color}, ${STYLE_LABEL[p.style]}, Golf`;
  const sizes = Object.keys(p.stock);
  sizes.forEach((size, i) => {
    const first = i === 0;
    const sku = `${p.slug}-${size}`.toLowerCase();
    rows.push([
      p.slug,
      first ? title : "",
      first ? body : "",
      first ? "DEVEN" : "",
      first ? "Hoodie" : "",
      first ? tags : "",
      first ? "TRUE" : "",
      "Size",
      size,
      sku,
      "shopify",
      String(p.stock[size]),
      "deny",
      "manual",
      PRICE,
      "TRUE",
      "TRUE",
      first ? `${IMAGE_BASE}${p.image}` : "",
      first ? "1" : "",
      first ? title : "",
      first ? "active" : "",
    ].map(esc).join(","));
  });
}

const out = rows.join("\n") + "\n";
writeFileSync("C:/tmp/deven-shopify-products.csv", out, "utf8");
const variantCount = CATALOG.reduce((n, p) => n + Object.keys(p.stock).length, 0);
console.log(`Wrote C:/tmp/deven-shopify-products.csv — ${CATALOG.length} products, ${variantCount} variants`);
