import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Catalogue/lookbook images are already small (<260KB) and pre-sized.
    // Serving them directly avoids the optimizer cold-start that left product
    // tiles blank on first load. Revisit if image weight grows.
    unoptimized: true,
  },
};

export default nextConfig;
