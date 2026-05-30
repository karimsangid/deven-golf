import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, PRODUCT_DETAIL } from "@/lib/products";
import ProductActions from "./ProductActions";
import ProductGallery from "./ProductGallery";
import ProductMedia from "../ProductMedia";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — ${product.color}`,
    description: product.blurb,
    openGraph: {
      title: `${product.name} — ${product.color} | DEVEN`,
      description: product.blurb,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <>
      <div className="h-20" />

      <article className="bg-deven-linen pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav className="py-6 text-xs font-light tracking-wide text-deven-gray">
            <Link href="/" className="transition-colors hover:text-deven-black">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/shop"
              className="transition-colors hover:text-deven-black"
            >
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-deven-black">{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ── Gallery — full garment, never cropped; hover-zoom + lightbox ── */}
            <div>
              <ProductGallery product={product} />
            </div>

            {/* ── Detail ── */}
            <div className="lg:py-4">
              <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
                {product.color}
              </span>
              <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-4">
                {product.price ? (
                  <span className="text-xl font-light text-deven-black">
                    ${product.price}
                  </span>
                ) : (
                  <span className="text-sm font-medium tracking-wider text-deven-gold uppercase">
                    Price TBA
                  </span>
                )}
              </div>

              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-deven-gray">
                {product.blurb}
              </p>

              {/* Colourways */}
              <div className="mt-8">
                <span className="text-xs font-semibold tracking-[0.2em] text-deven-black uppercase">
                  Colour — {product.color}
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className="h-9 w-9 rounded-full ring-2 ring-deven-black ring-offset-2 ring-offset-deven-linen"
                    style={{ backgroundColor: product.swatch }}
                    aria-label={product.color}
                  />
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      href={`/shop/${o.slug}`}
                      title={`${o.name} — ${o.color}`}
                      className="h-9 w-9 rounded-full ring-1 ring-deven-light-gray ring-offset-2 ring-offset-deven-linen transition-all hover:ring-deven-gold"
                      style={{ backgroundColor: o.swatch }}
                      aria-label={`${o.name} — ${o.color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size + pre-order (client) */}
              <ProductActions available={product.available} />

              {/* Accordions */}
              <div className="mt-12 divide-y divide-deven-light-gray border-t border-b border-deven-light-gray">
                <details className="pdp-acc group" open>
                  <summary>Description</summary>
                  <p className="pb-5 text-sm font-light leading-relaxed text-deven-gray">
                    {PRODUCT_DETAIL.description}
                  </p>
                </details>
                <details className="pdp-acc group">
                  <summary>Fit &amp; Fabric</summary>
                  <p className="pb-5 text-sm font-light leading-relaxed text-deven-gray">
                    {PRODUCT_DETAIL.fit}
                  </p>
                </details>
                <details className="pdp-acc group">
                  <summary>Shipping &amp; Returns</summary>
                  <p className="pb-5 text-sm font-light leading-relaxed text-deven-gray">
                    {PRODUCT_DETAIL.shipping}
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* ── More from the collection ── */}
          <div className="mt-24">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-light text-deven-black">
              More from the Collection
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
              {others.slice(0, 5).map((o) => (
                <Link key={o.slug} href={`/shop/${o.slug}`} className="group">
                  <div className="relative aspect-square overflow-hidden bg-deven-cream">
                    <ProductMedia
                      product={o}
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      imgClassName="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-deven-black">
                    {o.name}
                  </p>
                  <p className="text-xs font-light text-deven-gray">{o.color}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
