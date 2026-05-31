import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import ProductDetail from "./ProductDetail";
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
    title: `${product.name} — ${product.styleLabel}`,
    description: product.blurb,
    openGraph: {
      title: `${product.name} — ${product.styleLabel} | DEVEN`,
      description: product.blurb,
      images: product.cleanImage && product.image ? [product.image] : [],
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
      <div className="h-28" />

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
            <span className="text-deven-black">
              {product.name} · {product.styleLabel}
            </span>
          </nav>

          <ProductDetail slug={product.slug} />

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
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-deven-black">
                    {o.name}
                  </p>
                  <p className="text-xs font-light text-deven-gray">
                    {o.styleLabel}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
