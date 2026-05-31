// ─────────────────────────────────────────────────────────────────────────
// DEVEN — product catalogue (single source of truth)
//
// REALITY (per Deven's inventory list, 2026-05-30):
//   One hoodie. Four colours (Yellow, Gray, Light Blue, Navy) × two logo
//   styles (small mark on the shoulder, big mark on the chest) = 8 SKUs.
//   Stock is tracked per size below; sold-out sizes grey out automatically and
//   a SKU with zero total stock shows "Sold Out" everywhere.
//
// PHOTO STATUS — only four SKUs have a clean studio shot today:
//   Yellow·Shoulder (hanger), Gray·Chest, Light Blue·Shoulder, Navy·Shoulder.
//   The four big-chest-for-yellow/blue/navy + gray·shoulder fall back to the
//   quiet branded placeholder until Deven shoots them. To light one up: drop the
//   photo in /public/images, point `image:` at it, set `cleanImage: true`.
//
// PRICE — every piece is $119 (see PRICE constant). The number surfaces across
//   the card + PDP automatically; set price: null on a SKU to hide it.
// ─────────────────────────────────────────────────────────────────────────

// Categories are the spine of the catalogue. DEVEN launches in Golf, but the
// brand vision is a full athlete apparel house — adding "Training", "Tennis",
// "Lifestyle", etc. later is purely a matter of tagging products with a new
// category here. The shop + nav read categories dynamically.
export type Category = "Golf" | "Training" | "Tennis" | "Lifestyle";

export type Color = "Yellow" | "Gray" | "Light Blue" | "Navy";
export type LogoStyle = "shoulder" | "chest";

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

// ── Commerce constants ──────────────────────────────────────────────────────
// Every piece is the same price for now. Change here to reprice the catalogue.
export const PRICE = 119;
// Free shipping on every order, no minimum (0 threshold). Reflected in the
// announcement bar + policy copy; enforced in the GoDaddy store settings.
export const FREE_SHIPPING_THRESHOLD = 0;

export type Product = {
  slug: string;
  name: string; // e.g. "Yellow Hoodie"
  color: Color;
  swatch: string; // hex for the swatch dot — matches the real garment
  style: LogoStyle;
  styleLabel: string; // "Madison Collection" (shoulder) | "Big Chest Logo" (chest)
  category: Category;
  price: number | null; // null → price hidden
  image: string; // primary catalogue / hero image
  gallery?: string[]; // optional extra angles on the PDP
  cleanImage?: boolean; // true once we have a clean studio shot; else placeholder
  stock: Partial<Record<Size, number>>; // units on hand per size
  blurb: string; // one-line, shown on the card + PDP intro
};

// ── Style copy (shared) ────────────────────────────────────────────────────
export const STYLE_LABELS: Record<LogoStyle, string> = {
  shoulder: "Madison Collection",
  chest: "Big Chest Logo",
};

const STYLE_BLURB: Record<LogoStyle, string> = {
  shoulder:
    "The small Rottweiler mark at the shoulder with the golfer silhouette across the chest — clean and quiet.",
  chest: "The Rottweiler mark set bold and centred across the chest.",
};

// ── Colour swatches (sampled from the real garments) ────────────────────────
const SWATCH: Record<Color, string> = {
  Yellow: "#efe6c4", // butter cream
  Gray: "#b7babf", // soft cool gray
  "Light Blue": "#8fa1c2", // steel / periwinkle
  Navy: "#2a3450", // deep slate navy
};

// ── Colourway display names (branding) ──────────────────────────────────────
// Internal Color keys stay stable (used for swatches, slugs, variant lookup);
// these are the customer-facing names shown everywhere on the site.
export const COLOR_LABELS: Record<Color, string> = {
  Yellow: "Peanut Cream",
  Gray: "Silver Oak",
  "Light Blue": "Diesel Sky",
  Navy: "Georgia Blue",
};

export const PRODUCTS: Product[] = [
  // ── YELLOW ────────────────────────────────────────────────────────────────
  {
    slug: "yellow-shoulder",
    name: "Peanut Cream",
    color: "Yellow",
    swatch: SWATCH.Yellow,
    style: "shoulder",
    styleLabel: STYLE_LABELS.shoulder,
    category: "Golf",
    price: PRICE,
    // RULE: no flat-lay / laid-out hoodie shots — on-model or 3D render only.
    // The yellow Madison has neither yet, so it shows the branded placeholder
    // (cleanImage:false) until the 3D render lands. Do NOT point this back at
    // a flat-lay. (madison-yellow-shoulder-dark.jpg was a flat-lay — retired.)
    image: "",
    gallery: [],
    cleanImage: false,
    stock: { M: 8, L: 13 },
    blurb: STYLE_BLURB.shoulder,
  },
  {
    slug: "yellow-chest",
    name: "Peanut Cream",
    color: "Yellow",
    swatch: SWATCH.Yellow,
    style: "chest",
    styleLabel: STYLE_LABELS.chest,
    category: "Golf",
    price: PRICE,
    image: "/images/model-yellow-chest-woman.jpg",
    gallery: [],
    cleanImage: true,
    stock: { M: 2, L: 4, XL: 3, XXL: 3 },
    blurb: STYLE_BLURB.chest,
  },

  // ── GRAY ──────────────────────────────────────────────────────────────────
  {
    slug: "gray-shoulder",
    name: "Silver Oak",
    color: "Gray",
    swatch: SWATCH.Gray,
    style: "shoulder",
    styleLabel: STYLE_LABELS.shoulder,
    category: "Golf",
    price: PRICE,
    image: "/images/model-gray-madison-man.jpg",
    gallery: [
      "/images/model-gray-madison-woman.jpg",
      "/images/model-gray-madison-man2.jpg",
      "/images/model-gray-madison-woman2.jpg",
    ],
    cleanImage: true,
    stock: { L: 3 },
    blurb: STYLE_BLURB.shoulder,
  },
  {
    slug: "gray-chest",
    name: "Silver Oak",
    color: "Gray",
    swatch: SWATCH.Gray,
    style: "chest",
    styleLabel: STYLE_LABELS.chest,
    category: "Golf",
    price: PRICE,
    image: "/images/hero-onmodel-gray.jpg",
    gallery: [],
    cleanImage: true,
    stock: { S: 5, M: 16, L: 6, XL: 4, XXL: 5 },
    blurb: STYLE_BLURB.chest,
  },

  // ── LIGHT BLUE ──────────────────────────────────────────────────────────
  {
    slug: "light-blue-shoulder",
    name: "Diesel Sky",
    color: "Light Blue",
    swatch: SWATCH["Light Blue"],
    style: "shoulder",
    styleLabel: STYLE_LABELS.shoulder,
    category: "Golf",
    price: PRICE,
    image: "/images/model-lblue-madison-woman.jpg",
    gallery: [],
    cleanImage: true,
    stock: { M: 1, L: 1 },
    blurb: STYLE_BLURB.shoulder,
  },
  {
    slug: "light-blue-chest",
    name: "Diesel Sky",
    color: "Light Blue",
    swatch: SWATCH["Light Blue"],
    style: "chest",
    styleLabel: STYLE_LABELS.chest,
    category: "Golf",
    price: PRICE,
    image: "/images/model-lblue-chest-man.jpg",
    gallery: [],
    cleanImage: true,
    stock: { XS: 3, S: 2, M: 6, L: 10, XL: 5, XXL: 3 },
    blurb: STYLE_BLURB.chest,
  },

  // ── NAVY ──────────────────────────────────────────────────────────────────
  // Georgia Blue MADISON (navy·shoulder) pulled from the collection per Deven
  // (2026-05-31): it was sold out and only had a flat-lay. Re-add this block
  // once the new Georgia Blue small-dog render lands.
  // {
  //   slug: "navy-shoulder",
  //   name: "Georgia Blue",
  //   color: "Navy",
  //   swatch: SWATCH.Navy,
  //   style: "shoulder",
  //   styleLabel: STYLE_LABELS.shoulder,
  //   category: "Golf",
  //   price: PRICE,
  //   image: "/images/madison-navy-shoulder-dark.jpg",
  //   gallery: [],
  //   cleanImage: true,
  //   stock: {}, // ZERO on hand — sold out
  //   blurb: STYLE_BLURB.shoulder,
  // },
  {
    slug: "navy-chest",
    name: "Georgia Blue",
    color: "Navy",
    swatch: SWATCH.Navy,
    style: "chest",
    styleLabel: STYLE_LABELS.chest,
    category: "Golf",
    price: PRICE,
    image: "/images/lookbook-navy-woman.jpg",
    gallery: ["/images/model-navy-madison-woman.jpg"],
    cleanImage: true,
    stock: { L: 2, XL: 2 },
    blurb: STYLE_BLURB.chest,
  },
];

// ── Derived helpers ─────────────────────────────────────────────────────────
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function totalStock(p: Product): number {
  return SIZES.reduce((sum, s) => sum + (p.stock[s] ?? 0), 0);
}

export function isAvailable(p: Product): boolean {
  return totalStock(p) > 0;
}

export function inStockSizes(p: Product): Size[] {
  return SIZES.filter((s) => (p.stock[s] ?? 0) > 0);
}

// Display order of colours (matches Deven's list).
const COLOR_ORDER: Color[] = ["Yellow", "Gray", "Light Blue", "Navy"];

export const COLORS: Color[] = COLOR_ORDER.filter((c) =>
  PRODUCTS.some((p) => p.color === c)
);

// The variant of a given colour in a given style (every combo exists today).
export function getVariant(
  color: Color,
  style: LogoStyle
): Product | undefined {
  return PRODUCTS.find((p) => p.color === color && p.style === style);
}

// Shared copy used across every PDP. Kept deliberately generic until Deven
// confirms final fabric / fit specs — no invented numbers.
export const PRODUCT_DETAIL = {
  description:
    "A lightweight performance hoodie built for the course and everywhere after it, carrying the signature Rottweiler mark with DEVEN scripted down the back. Designed to move the way you do.",
  fit: "Tailored athletic fit — true to size. Premium performance fabric with natural four-way stretch and a soft, broken-in hand. Size up for a relaxed drape.",
  shipping:
    "Ships within 5–7 business days. Free shipping on all orders. No refunds — exchanges only. Reach out within 30 days of delivery and we'll arrange an exchange.",
};

// Preferred display order for categories as the brand expands beyond golf.
const CATEGORY_ORDER: Category[] = ["Golf", "Training", "Tennis", "Lifestyle"];

// Only the categories that actually have products, in display order.
export const CATEGORIES: Category[] = CATEGORY_ORDER.filter((c) =>
  PRODUCTS.some((p) => p.category === c)
);

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
