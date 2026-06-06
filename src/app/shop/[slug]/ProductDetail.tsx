"use client";

import { useState } from "react";
import {
  PRODUCTS,
  getVariant,
  COLORS,
  COLOR_LABELS,
  STYLE_LABELS,
  PRODUCT_DETAIL,
  PRICE,
  isAvailable,
  inStockSizes,
  type Color,
  type LogoStyle,
  type Size,
} from "@/lib/products";
import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";
import { payLinkFor } from "@/lib/store";
import { useCart } from "@/lib/cart";

// ─────────────────────────────────────────────────────────────────────────
// Interactive PDP. Selecting a colourway swaps ONLY the colour in place — the
// gallery, price and stock update without a full page/variation reload, and the
// chosen logo style + size carry over (size is kept when the new colour still
// stocks it). The URL is quietly synced so refresh / share lands on the right
// SKU, but no navigation flash happens on a swatch tap.
// ─────────────────────────────────────────────────────────────────────────
export default function ProductDetail({ slug }: { slug: string }) {
  const initial = PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS[0];

  const { addItem } = useCart();

  const [color, setColor] = useState<Color>(initial.color);
  const [style, setStyle] = useState<LogoStyle>(initial.style);
  const [size, setSize] = useState<Size | null>(null);

  const product = getVariant(color, style) ?? initial;

  // Add the configured piece to the branded bag, then the drawer opens and
  // "Checkout" hands off to this SKU's GoDaddy Pay Link.
  const addToBag = () => {
    if (!size) return;
    addItem({
      slug: product.slug,
      name: product.name,
      styleLabel: product.styleLabel,
      colorLabel: COLOR_LABELS[product.color],
      size,
      price: product.price ?? PRICE,
      image: product.image,
      payLink: payLinkFor(product.slug),
    });
  };

  // Reflect the current SKU in the URL without a navigation (keeps refresh /
  // share / back-button honest while avoiding the full-variation reload).
  const syncUrl = (next: typeof product) => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/shop/${next.slug}`);
    }
  };

  const pickColor = (c: Color) => {
    const next = getVariant(c, style);
    if (!next) return;
    setColor(c);
    // Keep the chosen size only if the new colour still has it in stock.
    if (size && (next.stock[size] ?? 0) === 0) setSize(null);
    syncUrl(next);
  };

  const pickStyle = (st: LogoStyle) => {
    const next = getVariant(color, st);
    if (!next) return;
    setStyle(st);
    if (size && (next.stock[size] ?? 0) === 0) setSize(null);
    syncUrl(next);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* ── Gallery — remounts per SKU so zoom / active angle reset cleanly ── */}
      <div>
        <ProductGallery key={product.slug} product={product} />
      </div>

      {/* ── Detail ── */}
      <div className="lg:py-4">
        <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
          {product.styleLabel}
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
              Price coming soon
            </span>
          )}
        </div>

        <p className="mt-6 max-w-md text-base font-light leading-relaxed text-deven-gray">
          {product.blurb}
        </p>

        {/* Logo style — switch between the two marks, same colour */}
        <div className="mt-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-deven-black uppercase">
            Style
          </span>
          <div className="mt-3 grid max-w-xs grid-cols-2 gap-2">
            {(["shoulder", "chest", "smalldog"] as LogoStyle[]).map((st) => {
              const v = getVariant(color, st);
              if (!v) return null;
              const isCurrent = st === style;
              const soldOut = !isAvailable(v);
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => pickStyle(st)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`border px-3 py-3 text-center text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                    isCurrent
                      ? "border-deven-black bg-deven-black text-white"
                      : "border-deven-light-gray text-deven-black hover:border-deven-black"
                  }`}
                >
                  {STYLE_LABELS[st]}
                  {soldOut && (
                    <span className="mt-0.5 block text-[9px] font-light tracking-wide opacity-70 normal-case">
                      Sold out
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Colourways — switch ONLY the colour, keep the chosen logo style */}
        <div className="mt-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-deven-black uppercase">
            Colour — {COLOR_LABELS[color]}
          </span>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {COLORS.map((c) => {
              const v = getVariant(c, style);
              if (!v) return null;
              const isCurrent = c === color;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => pickColor(c)}
                  title={`${COLOR_LABELS[c]} — ${STYLE_LABELS[style]}`}
                  aria-label={`${COLOR_LABELS[c]} — ${STYLE_LABELS[style]}`}
                  aria-pressed={isCurrent}
                  className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-deven-linen transition-all ${
                    isCurrent
                      ? "ring-2 ring-deven-black"
                      : "ring-1 ring-deven-light-gray hover:ring-deven-gold"
                  }`}
                  style={{ backgroundColor: v.swatch }}
                />
              );
            })}
          </div>
        </div>

        {/* Size + checkout (client) — size persists across colour swaps */}
        <ProductActions
          stock={product.stock}
          size={size}
          onSizeChange={setSize}
          onAddToBag={addToBag}
        />

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

        {/* In-stock sizes hint */}
        {isAvailable(product) && (
          <p className="mt-5 text-xs font-light tracking-wide text-deven-gray">
            In stock: {inStockSizes(product).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
