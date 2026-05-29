// ─────────────────────────────────────────────────────────────────────────
// DEVEN — product catalogue (single source of truth)
//
// Six pieces for the launch. More arrive in the fall.
//
// NOTE FOR DEVEN: names + copy below are placeholders and the photography for
// Meridian / Sundown is interim. Send the real six names + clean studio shots
// and they drop straight in here — nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────

export type Product = {
  slug: string;
  name: string;
  color: string; // colourway name
  swatch: string; // hex for the swatch dot
  price: number | null;
  image: string; // primary catalogue / hero image
  gallery?: string[]; // optional extra angles on the PDP
  badge?: string; // e.g. "Coming Soon"
  available: boolean;
  blurb: string; // one-line, shown on the card + PDP intro
};

export const PRODUCTS: Product[] = [
  {
    slug: "the-madison",
    name: "The Madison",
    color: "Royal Blue",
    swatch: "#2f4fa0",
    price: 128,
    image: "/images/product-blue.jpg",
    available: true,
    blurb:
      "The signature piece. A lightweight performance hoodie cut clean and worn easy — front and back.",
  },
  {
    slug: "the-augusta",
    name: "The Augusta",
    color: "Stone Grey",
    swatch: "#9a9a9a",
    price: 128,
    image: "/images/product-gray.jpg",
    available: true,
    blurb:
      "Quiet, considered grey with the Rottweiler mark set proud across the chest.",
  },
  {
    slug: "the-legacy",
    name: "The Legacy",
    color: "Midnight Navy",
    swatch: "#1c2540",
    price: 128,
    image: "/images/product-yellow.jpg", // file is mislabelled — this is the navy composite
    available: true,
    blurb:
      "Deep navy with a tonal swing mark. The one you reach for on every round.",
  },
  {
    slug: "the-meridian",
    name: "The Meridian",
    color: "Sky Blue",
    swatch: "#5b7fc4",
    price: 128,
    image: "/images/color-blue-a.jpg",
    available: true,
    blurb: "An easy mid-blue for warm mornings and long afternoons on the course.",
  },
  {
    slug: "the-sundown",
    name: "The Sundown",
    color: "Butter Yellow",
    swatch: "#f2e9b8",
    price: 128,
    image: "/images/studio-hanger-yellow.jpg",
    available: true,
    blurb: "Soft butter yellow. Light on the shoulders, easy on the eye.",
  },
  {
    slug: "the-onyx",
    name: "The Onyx",
    color: "Black",
    swatch: "#111111",
    price: 128,
    image: "/images/rott-poster.png",
    badge: "Coming Soon",
    available: false,
    blurb: "The mark, in its purest form. Arriving this fall.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// Shared copy used across every PDP. Kept deliberately generic until Deven
// confirms final fabric / fit specs — no invented numbers.
export const PRODUCT_DETAIL = {
  description:
    "A lightweight performance hoodie built for the course and everywhere after it. The signature Rottweiler mark sits at the chest, with DEVEN scripted at the back hem. Designed to move the way you do.",
  fit: "Tailored athletic fit — true to size. Premium performance fabric with natural four-way stretch and a soft, broken-in hand. Size up for a relaxed drape.",
  shipping:
    "Ships within 5–7 business days. Complimentary returns within 30 days, unworn with tags.",
};

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
