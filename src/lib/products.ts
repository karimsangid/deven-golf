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
// Three logo styles: the Madison shoulder crest, the big chest logo, and the
// small shoulder mark (just the dog at the top, blank otherwise).
export type LogoStyle = "shoulder" | "chest" | "smalldog";

// Final inventory carries S–XL only (no XS / XXL).
export const SIZES = ["S", "M", "L", "XL"] as const;
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
  smalldog: "Small Shoulder Logo",
};

const STYLE_BLURB: Record<LogoStyle, string> = {
  shoulder:
    "The small Rottweiler mark at the shoulder with the golfer silhouette across the chest — clean and quiet.",
  chest: "The Rottweiler mark set bold and centred across the chest.",
  smalldog:
    "Just the Rottweiler mark, small at the top of the shoulder — blank everywhere else. The quietest way to wear it.",
};

// ── Colour swatches (sampled from the real garments) ────────────────────────
const SWATCH: Record<Color, string> = {
  Yellow: "#efe6c4", // butter cream
  Gray: "#b7babf", // soft cool gray
  "Light Blue": "#8fa1c2", // steel / periwinkle
  Navy: "#6c7a98", // Georgia Blue — dusty cornflower (real garment)
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
    image: "/images/model-yellow-madison-woman.jpg",
    gallery: [
      "/images/ghost-yellow-madison-front.jpg",
      "/images/ghost-yellow-madison-back.jpg",
    ],
    cleanImage: true,
    stock: { M: 1, L: 7, XL: 1 }, // final inventory 2026-06-03
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
    gallery: ["/images/ghost-yellow-chest-front.jpg", "/images/ghost-yellow-chest-back.jpg"],
    cleanImage: true,
    stock: { M: 2, L: 4 }, // final inventory 2026-06-03
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
    image: "/images/model-gray-madison-woman.jpg",
    gallery: [
      "/images/ghost-gray-madison-front.jpg",
      "/images/ghost-gray-madison-back.jpg",
      "/images/model-gray-madison-woman2.jpg",
    ],
    cleanImage: true,
    stock: { M: 3, L: 4, XL: 2 }, // final inventory 2026-06-03
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
    image: "/images/model-gray-chest-woman.jpg",
    gallery: [
      "/images/model-gray-chest-woman2.jpg",
      "/images/ghost-gray-chest-front.jpg",
      "/images/ghost-gray-chest-back.jpg",
    ],
    cleanImage: true,
    stock: { S: 3, M: 8, L: 6 }, // final inventory 2026-06-03
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
    gallery: ["/images/ghost-lightblue-madison-front.jpg", "/images/ghost-lightblue-madison-back.jpg"],
    cleanImage: true,
    stock: { M: 10, L: 10 }, // final inventory 2026-06-03
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
    gallery: ["/images/ghost-lightblue-chest-front.jpg", "/images/ghost-lightblue-chest-back.jpg"],
    cleanImage: true,
    stock: { S: 2, M: 5, L: 5 }, // final inventory 2026-06-03
    blurb: STYLE_BLURB.chest,
  },

  // ── NAVY ──────────────────────────────────────────────────────────────────
  // Georgia Blue MADISON re-added 2026-06-02: GoDaddy export shows it back in
  // stock (XS:5, M:1) and we now have a clean on-model shot + ghost renders.
  {
    slug: "navy-madison",
    name: "Georgia Blue",
    color: "Navy",
    swatch: SWATCH.Navy,
    style: "shoulder",
    styleLabel: STYLE_LABELS.shoulder,
    category: "Golf",
    price: PRICE,
    // Ghost render shows the real Madison design (shoulder dog + golfer); it's the hero
    // since no on-model navy Madison photo exists yet.
    image: "/images/ghost-navy-madison-front.jpg",
    gallery: ["/images/ghost-navy-madison-back.jpg"],
    cleanImage: true,
    stock: { M: 2, L: 3 }, // final inventory 2026-06-03
    blurb: STYLE_BLURB.shoulder,
  },
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
    gallery: ["/images/ghost-navy-chest-front.jpg", "/images/ghost-navy-chest-back.jpg"],
    cleanImage: true,
    stock: { M: 3, L: 3 }, // final inventory 2026-06-03
    blurb: STYLE_BLURB.chest,
  },

  // ── SMALL SHOULDER LOGO ─────────────────────────────────────────────────
  // NEW third style (2026-06-03): just the small Rottweiler mark at the top of
  // the shoulder, the hoodie blank otherwise. Per the final inventory only
  // Yellow + Gray are stocked — Light Blue + Navy are zero, so they're omitted
  // (we don't list a SKU the store can't fulfil).
  {
    slug: "yellow-smalldog",
    name: "Peanut Cream",
    color: "Yellow",
    swatch: SWATCH.Yellow,
    style: "smalldog",
    styleLabel: STYLE_LABELS.smalldog,
    category: "Golf",
    price: PRICE,
    image: "/images/ghost-yellow-smalldog-front.jpg",
    gallery: ["/images/ghost-yellow-smalldog-back.jpg"],
    cleanImage: true,
    stock: { M: 7, L: 13 }, // final inventory 2026-06-03
    blurb: STYLE_BLURB.smalldog,
  },
  {
    slug: "gray-smalldog",
    name: "Silver Oak",
    color: "Gray",
    swatch: SWATCH.Gray,
    style: "smalldog",
    styleLabel: STYLE_LABELS.smalldog,
    category: "Golf",
    price: PRICE,
    image: "/images/ghost-gray-smalldog-front.jpg",
    gallery: ["/images/ghost-gray-smalldog-back.jpg"],
    cleanImage: true,
    stock: { S: 3 }, // final inventory 2026-06-03
    blurb: STYLE_BLURB.smalldog,
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
