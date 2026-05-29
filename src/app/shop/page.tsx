import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Six pieces for the season. The DEVEN performance hoodie in every colourway — more arriving this fall.",
};

export default function ShopPage() {
  return (
    <>
      <div className="h-20" />

      {/* Header */}
      <section className="bg-deven-linen pt-16 pb-10 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
            The Collection
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-heading)] text-5xl font-light text-deven-black sm:text-6xl">
            Shop
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-deven-gray">
            Six pieces for the season. More arrive this fall.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-deven-linen pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group block"
              >
                {/* Full garment, contained — never cropped */}
                <div className="relative aspect-[4/5] overflow-hidden bg-deven-cream">
                  <Image
                    src={product.image}
                    alt={`${product.name} — ${product.color}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-deven-black px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-deven-gold uppercase">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-deven-black">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-light tracking-wide text-deven-gray">
                    {product.color}
                  </p>
                  <p className="mt-2 text-sm font-light text-deven-black">
                    {product.price ? `$${product.price}` : "Coming Soon"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
