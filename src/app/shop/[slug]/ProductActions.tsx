"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SIZES, type Size } from "@/lib/products";

// ─────────────────────────────────────────────────────────────────────────
// Size guide — standard athletic-fit hoodie measurements (inches).
// NOTE FOR DEVEN: these are industry-standard tailored-fit numbers used as a
// sensible default. Send the real garment specs and they drop straight in
// here — chest is measured flat, doubled for full circumference.
// ─────────────────────────────────────────────────────────────────────────
const SIZE_GUIDE: { size: string; chest: string; length: string; sleeve: string }[] = [
  { size: "S", chest: "36–38", length: "27", sleeve: "33.5" },
  { size: "M", chest: "38–40", length: "28", sleeve: "34" },
  { size: "L", chest: "42–44", length: "29", sleeve: "34.5" },
  { size: "XL", chest: "46–48", length: "30", sleeve: "35" },
];

export default function ProductActions({
  stock,
  size,
  onSizeChange,
  checkoutUrl,
}: {
  stock: Partial<Record<Size, number>>;
  size: Size | null;
  onSizeChange: (s: Size) => void;
  checkoutUrl: string;
}) {
  const [guideOpen, setGuideOpen] = useState(false);

  const stockOf = (s: Size) => stock[s] ?? 0;
  const available = SIZES.some((s) => stockOf(s) > 0);

  // Close the guide on Escape; lock body scroll while it's open.
  useEffect(() => {
    if (!guideOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGuideOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [guideOpen]);

  if (!available) {
    return (
      <div className="mt-10">
        <button
          disabled
          className="w-full cursor-not-allowed border border-deven-light-gray bg-transparent py-4 text-xs font-semibold tracking-[0.25em] text-deven-gray uppercase"
        >
          Sold Out
        </button>
        <p className="mt-4 text-center text-sm font-light text-deven-gray">
          Out of stock in this style.{" "}
          <Link href="/#contact" className="gold-link text-deven-black">
            Join the list
          </Link>{" "}
          to hear when it&rsquo;s back.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold tracking-[0.2em] text-deven-black uppercase">
          Select Size
        </span>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="gold-link text-xs font-light text-deven-gray underline-offset-4 transition-colors hover:text-deven-black"
        >
          Size guide
        </button>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {SIZES.map((s) => {
          const soldOut = stockOf(s) === 0;
          return (
            <button
              key={s}
              type="button"
              disabled={soldOut}
              aria-disabled={soldOut}
              title={soldOut ? `${s} — sold out` : undefined}
              onClick={() => {
                if (soldOut) return;
                onSizeChange(s);
              }}
              className={`size-pill ${size === s ? "is-selected" : ""} ${
                soldOut ? "is-disabled" : ""
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <a
        href={checkoutUrl}
        className="mt-6 flex w-full items-center justify-center bg-deven-black py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
      >
        Add to Bag
      </a>

      <p className="mt-4 text-center text-xs font-light text-deven-gray">
        Choose your quantity and check out securely · Ships in 5–7 business days
        · Free shipping on all orders
      </p>

      {/* ── SIZE GUIDE MODAL ── */}
      {guideOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Size guide"
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close size guide"
            onClick={() => setGuideOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* panel */}
          <div className="relative z-10 max-h-full w-full max-w-lg overflow-y-auto bg-deven-cream shadow-2xl">
            <div className="flex items-start justify-between border-b border-deven-black/10 px-7 py-5">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.4em] text-deven-gold uppercase">
                  DEVEN
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-light text-deven-black">
                  Size Guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                aria-label="Close"
                className="-mr-1 -mt-1 p-2 text-2xl leading-none text-deven-gray transition-colors hover:text-deven-black"
              >
                &times;
              </button>
            </div>

            <div className="px-7 py-6">
              <p className="text-sm font-light leading-relaxed text-deven-gray">
                Tailored athletic fit — true to size. Measurements in inches.
                Between sizes? Size up for a relaxed drape.
              </p>

              {/* chart */}
              <div className="mt-6 overflow-hidden border border-deven-black/10">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-deven-black text-white">
                      <th className="px-3 py-3 text-left text-[11px] font-semibold tracking-[0.15em] uppercase">
                        Size
                      </th>
                      <th className="px-3 py-3 text-left text-[11px] font-semibold tracking-[0.15em] uppercase">
                        Chest
                      </th>
                      <th className="px-3 py-3 text-left text-[11px] font-semibold tracking-[0.15em] uppercase">
                        Length
                      </th>
                      <th className="px-3 py-3 text-left text-[11px] font-semibold tracking-[0.15em] uppercase">
                        Sleeve
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE.map((row, i) => (
                      <tr
                        key={row.size}
                        className={i % 2 === 1 ? "bg-deven-linen/60" : "bg-white/40"}
                      >
                        <td className="px-3 py-3 font-semibold text-deven-black">
                          {row.size}
                        </td>
                        <td className="px-3 py-3 font-light text-deven-gray">
                          {row.chest}
                        </td>
                        <td className="px-3 py-3 font-light text-deven-gray">
                          {row.length}
                        </td>
                        <td className="px-3 py-3 font-light text-deven-gray">
                          {row.sleeve}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* how to measure */}
              <div className="mt-7">
                <span className="text-[11px] font-semibold tracking-[0.25em] text-deven-black uppercase">
                  How to measure
                </span>
                <div className="my-4 h-px w-12 bg-deven-gold/50" />
                <dl className="space-y-3 text-sm font-light text-deven-gray">
                  <div>
                    <dt className="inline font-medium text-deven-black">
                      Chest —{" "}
                    </dt>
                    <dd className="inline">
                      measure around the fullest part of your chest, under the
                      arms, keeping the tape level.
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-deven-black">
                      Length —{" "}
                    </dt>
                    <dd className="inline">
                      from the highest point of the shoulder straight down to the
                      hem.
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-deven-black">
                      Sleeve —{" "}
                    </dt>
                    <dd className="inline">
                      from the center back of the neck, across the shoulder, to
                      the cuff.
                    </dd>
                  </div>
                </dl>
              </div>

              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                className="mt-8 w-full bg-deven-black py-3.5 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-green"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
