"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

// ─────────────────────────────────────────────────────────────────────────
// Branded slide-in bag. Holds several pieces; because payment runs on GoDaddy
// Pay Links (one product per payment), each line checks out separately — every
// piece has its own "Checkout" button that opens that SKU's Pay Link. A note
// makes the per-item payment explicit so it isn't a surprise.
// ─────────────────────────────────────────────────────────────────────────
export default function CartDrawer() {
  const { items, isOpen, subtotal, setQty, removeItem, close, checkoutHref } =
    useCart();

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const multiple = items.length > 1;

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close bag"
        onClick={close}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={isOpen ? 0 : -1}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-deven-cream shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-deven-black/10 px-6 py-5">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.4em] text-deven-gold uppercase">
              DEVEN
            </span>
            <h2 className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-light text-deven-black">
              Your Bag
              {items.length > 0 && (
                <span className="ml-2 align-middle text-base text-deven-gray">
                  ({items.length})
                </span>
              )}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-1 p-2 text-2xl leading-none text-deven-gray transition-colors hover:text-deven-black"
          >
            &times;
          </button>
        </div>

        {items.length > 0 ? (
          <>
            {/* line items */}
            <div className="flex-1 divide-y divide-deven-black/10 overflow-y-auto px-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-6">
                  <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-deven-linen">
                    <Image
                      src={item.image}
                      alt={`${item.name} — ${item.styleLabel}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <span className="text-[10px] font-semibold tracking-[0.25em] text-deven-gold uppercase">
                      {item.styleLabel}
                    </span>
                    <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl font-light text-deven-black">
                      {item.name}
                    </h3>
                    <p className="text-sm font-light text-deven-gray">
                      {item.colorLabel} · Size{" "}
                      <span className="text-deven-black">{item.size}</span>
                    </p>

                    {/* qty stepper + line total */}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-deven-black/15">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="px-3 py-1.5 text-deven-gray transition-colors hover:text-deven-black"
                        >
                          &minus;
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium text-deven-black">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="px-3 py-1.5 text-deven-gray transition-colors hover:text-deven-black"
                        >
                          +
                        </button>
                      </div>
                      <span className="ml-auto text-base font-light text-deven-black">
                        ${item.price * item.qty}
                      </span>
                    </div>

                    {/* per-line checkout (each piece pays through its own Pay Link) */}
                    <a
                      href={checkoutHref(item)}
                      className="mt-3 flex items-center justify-center bg-deven-black py-2.5 text-[11px] font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
                    >
                      Checkout · ${item.price * item.qty}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-2 self-start text-xs font-light tracking-wide text-deven-gray underline underline-offset-4 transition-colors hover:text-deven-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="border-t border-deven-black/10 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-deven-black uppercase">
                  Subtotal
                </span>
                <span className="font-[family-name:var(--font-heading)] text-2xl font-light text-deven-black">
                  ${subtotal}
                </span>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-deven-gray">
                {multiple
                  ? "Each piece checks out securely on its own — tap Checkout on each item to pay for it. "
                  : "Tap Checkout to pay securely. "}
                Free shipping on all orders · taxes calculated at checkout ·
                payment by GoDaddy.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-4 w-full border border-deven-black py-3 text-center text-xs font-semibold tracking-[0.2em] text-deven-black uppercase transition-colors hover:bg-deven-black hover:text-white"
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          /* empty state */
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-[family-name:var(--font-heading)] text-xl font-light text-deven-black">
              Your bag is empty
            </p>
            <p className="mt-2 text-sm font-light text-deven-gray">
              Find your piece in the collection.
            </p>
            <Link
              href="/shop"
              onClick={close}
              className="mt-6 bg-deven-black px-8 py-3.5 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
            >
              Shop the Collection
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
