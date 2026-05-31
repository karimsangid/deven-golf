"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Product, isAvailable } from "@/lib/products";

// ─────────────────────────────────────────────────────────────────────────
// Premium PDP gallery — editorial, never gimmicky.
//   • Large main image, garment never cropped (object-contain).
//   • Desktop hover-zoom: the image magnifies toward the cursor.
//   • Click → full-screen lightbox with prev/next, arrow keys, swipe, Esc.
//   • Thumbnail rail auto-appears the moment a product has >1 real angle —
//     so when Deven sends a true multi-angle shoot, set `gallery: [...]` on the
//     product and the rail lights up with zero layout work.
//
// Only CLEAN studio imagery is ever shown here. Raw QC flat-lays (shoe / floor
// in frame) and CAD tech-sketches are deliberately kept out of the catalogue.
// ─────────────────────────────────────────────────────────────────────────
export default function ProductGallery({ product }: { product: Product }) {
  const images =
    product.cleanImage && product.image
      ? [product.image, ...(product.gallery ?? [])]
      : [];

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightbox, setLightbox] = useState(false);
  const touchX = useRef<number | null>(null);

  const hasImages = images.length > 0;
  const multi = images.length > 1;
  const current = images[active];
  const soldOut = !isAvailable(product);

  // Lightbox: lock scroll + wire keyboard nav.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight" && multi) setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft" && multi)
        setActive((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, multi, images.length]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || !multi) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  // No clean photo yet → quiet branded placeholder (keeps the grid premium).
  if (!hasImages) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-deven-cream">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-deven-gold/40">
            <Image
              src="/images/logo-icon.png"
              alt=""
              width={80}
              height={80}
              className="h-full w-full scale-110 object-cover opacity-90"
            />
          </div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-deven-gray/70 uppercase">
            {soldOut ? "Sold Out" : "Studio Photo Soon"}
          </span>
        </div>
        {soldOut && (
          <span className="absolute top-4 left-4 bg-deven-black px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-deven-gold uppercase">
            Sold Out
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-5">
      {/* Thumbnail rail — only when there's more than one real angle */}
      {multi && (
        <div className="flex gap-3 lg:flex-col">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View angle ${i + 1}`}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden bg-deven-cream transition-all lg:w-20 ${
                i === active
                  ? "ring-2 ring-deven-black ring-offset-2 ring-offset-deven-linen"
                  : "opacity-70 ring-1 ring-deven-light-gray hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image — hover to magnify, click to expand */}
      <div className="flex-1">
        <div
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={onMove}
          onClick={() => setLightbox(true)}
          className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden bg-deven-cream"
        >
          <Image
            src={current}
            alt={`${product.name} — ${product.color}`}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            style={{
              transform: zoom ? "scale(2)" : "scale(1)",
              transformOrigin: origin,
            }}
            className="object-cover transition-transform duration-200 ease-out will-change-transform"
          />

          {soldOut && (
            <span className="absolute top-4 left-4 z-10 bg-deven-black px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-deven-gold uppercase">
              Sold Out
            </span>
          )}

          {/* expand affordance */}
          <span className="pointer-events-none absolute right-4 bottom-4 z-10 flex items-center gap-1.5 bg-white/80 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-deven-black uppercase opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            Expand
          </span>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image viewer`}
          onClick={() => setLightbox(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute top-5 right-6 z-10 p-2 text-3xl leading-none text-white/70 transition-colors hover:text-white"
          >
            &times;
          </button>

          {multi && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous"
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center text-white/60 transition-colors hover:text-white"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next"
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center text-white/60 transition-colors hover:text-white"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </>
          )}

          <div
            className="relative h-[82vh] w-[92vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current}
              alt={`${product.name} — ${product.color}`}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>

          {multi && (
            <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs font-light tracking-[0.2em] text-white/70">
              {active + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
