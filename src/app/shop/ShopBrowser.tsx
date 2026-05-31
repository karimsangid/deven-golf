"use client";

import Link from "next/link";
import {
  PRODUCTS,
  isAvailable,
  inStockSizes,
  type Product,
} from "@/lib/products";
import ProductMedia from "./ProductMedia";

// Card — shared between the two collections. `dark` flips it for the Madison
// section so the two lines read as visually distinct.
function ProductCard({ product, dark }: { product: Product; dark?: boolean }) {
  const available = isAvailable(product);
  const sizes = inStockSizes(product);
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div
        className={`relative aspect-[4/5] overflow-hidden ${
          dark ? "bg-deven-charcoal" : "bg-deven-cream"
        }`}
      >
        <ProductMedia
          product={product}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          imgClassName={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            available ? "" : "opacity-60"
          }`}
        />
        {!available && (
          <span className="absolute top-4 left-4 bg-deven-black px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-deven-gold uppercase">
            Sold Out
          </span>
        )}
      </div>

      <div className="mt-4 text-center">
        <h3
          className={`font-[family-name:var(--font-heading)] text-xl font-medium ${
            dark ? "text-deven-cream" : "text-deven-black"
          }`}
        >
          {product.name}
        </h3>
        <p
          className={`mt-0.5 text-xs font-light tracking-wide ${
            dark ? "text-deven-gold" : "text-deven-gray"
          }`}
        >
          {product.styleLabel}
        </p>
        {product.price != null && (
          <p
            className={`mt-1.5 text-sm font-light ${
              dark ? "text-deven-cream" : "text-deven-black"
            }`}
          >
            ${product.price}
          </p>
        )}
        <p
          className={`mt-1.5 text-xs font-light tracking-wide ${
            dark ? "text-deven-cream/60" : "text-deven-gray"
          }`}
        >
          {available ? `Sizes ${sizes.join(", ")}` : "Sold out"}
        </p>
      </div>
    </Link>
  );
}

export default function ShopBrowser() {
  // Two distinct lines: the bold front crest vs the understated shoulder mark.
  const signature = PRODUCTS.filter((p) => p.style === "chest");
  const madison = PRODUCTS.filter((p) => p.style === "shoulder");

  return (
    <>
      {/* ── The Signature Line — bold front crest, light ── */}
      <section className="bg-deven-linen pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              The Signature Line
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black">
              Big Chest Logo
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-deven-gray">
              The Rottweiler crest, front and centre. Four colourways.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {signature.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Madison Collection — understated shoulder mark, dark & elevated ── */}
      <section className="madison-section bg-deven-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold tracking-[0.35em] text-deven-gold uppercase">
              Madison Collection
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-cream">
              The Quiet Signature
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm font-light leading-relaxed text-deven-cream/70">
              A small mark on the shoulder and a golfer&rsquo;s silhouette on the
              chest &mdash; understated, for the player who lets the game speak.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {madison.map((p) => (
              <ProductCard key={p.slug} product={p} dark />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
