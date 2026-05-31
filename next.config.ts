import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Catalogue/lookbook images are already small (<260KB) and pre-sized.
    // Serving them directly avoids the optimizer cold-start that left product
    // tiles blank on first load. Revisit if image weight grows.
    unoptimized: true,
  },
  // Old / bookmarked / search-indexed URLs that no longer exist as routes land
  // on a useful page instead of a hard 404. navy-shoulder (Georgia Blue Madison)
  // was pulled while sold out — send those buyers to the in-stock Georgia Blue
  // big-chest. Temporary redirects (not 308) so they're easy to undo when the
  // Madison render lands and the SKU returns.
  async redirects() {
    return [
      { source: "/shop/navy-shoulder", destination: "/shop/navy-chest", permanent: false },
      { source: "/about", destination: "/#collection", permanent: false },
      { source: "/lookbook", destination: "/shop", permanent: false },
      { source: "/madison", destination: "/shop", permanent: false },
      { source: "/collection", destination: "/#collection", permanent: false },
      { source: "/collections", destination: "/shop", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
