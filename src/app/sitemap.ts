import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

// Emit as a static file for `output: export` (GoDaddy static hosting).
export const dynamic = "force-static";

const BASE = "https://devenbrand.shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/privacy", "/terms"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}/shop/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
