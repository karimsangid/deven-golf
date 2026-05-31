"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PRODUCTS,
  CATEGORIES,
  type Category,
  isAvailable,
  inStockSizes,
} from "@/lib/products";
import ProductMedia from "./ProductMedia";

type Filter = Category | "All";

export default function ShopBrowser() {
  const [active, setActive] = useState<Filter>("All");
  const multiCategory = CATEGORIES.length > 1;

  const products = useMemo(
    () =>
      active === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active]
  );

  return (
    <>
      {/* Category tabs — only shown once the brand spans more than one vertical */}
      {multiCategory && (
        <div className="mb-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {(["All", ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`cat-tab ${active === c ? "is-active" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const available = isAvailable(product);
          const sizes = inStockSizes(product);
          return (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group block"
            >
              {/* Full garment, contained — never cropped. */}
              <div className="relative aspect-[4/5] overflow-hidden bg-deven-cream">
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
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-deven-black">
                  {product.name}
                </h3>
                <p className="mt-0.5 text-xs font-light tracking-wide text-deven-gray">
                  {product.styleLabel}
                </p>
                {product.price != null && (
                  <p className="mt-1.5 text-sm font-light text-deven-black">
                    ${product.price}
                  </p>
                )}
                <p className="mt-1.5 text-xs font-light tracking-wide text-deven-gray">
                  {available ? `Sizes ${sizes.join(", ")}` : "Sold out"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
