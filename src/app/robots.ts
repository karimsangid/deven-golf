import type { MetadataRoute } from "next";

// Emit as a static file for `output: export` (GoDaddy static hosting).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://devenbrand.shop/sitemap.xml",
    host: "https://devenbrand.shop",
  };
}
