import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GoDaddy (cPanel/Apache) hosting — emits an `out/`
  // folder of plain HTML/CSS/JS that runs without a Node server. The site is
  // fully client-side (catalog + localStorage cart + external GoDaddy Pay Link
  // checkout + mailto contact forms), so nothing is lost in the export.
  output: "export",
  // Emit folder/index.html for every route (e.g. /shop/index.html) so generic
  // Apache hosting (GoDaddy cPanel) serves each URL via DirectoryIndex with no
  // rewrite rules needed. URLs gain a trailing slash; the visual site is identical.
  trailingSlash: true,
  images: {
    // Required for `output: export` (no Image Optimization server). Catalogue/
    // lookbook images are already small (<260KB) and pre-sized, so serving them
    // directly is fine and also avoids the optimizer cold-start blank-tile bug.
    unoptimized: true,
  },
  // NOTE: next.config redirects() are SERVER-side and do NOT work with
  // `output: export`. The 7 legacy-URL redirects now live in `public/.htaccess`
  // (Apache), which GoDaddy hosting serves. Kept here for reference only:
  //   /shop/navy-shoulder -> /shop/navy-chest   (Georgia Blue Madison sold out)
  //   /about -> /#collection
  //   /lookbook -> /shop
  //   /madison -> /shop
  //   /collection -> /#collection
  //   /collections -> /shop
  //   /contact -> /#contact
};

export default nextConfig;
