"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

// ─────────────────────────────────────────────────────────────────────────
// Branded slide-in bag + checkout handoff. Shows the one configured piece,
// lets the shopper adjust quantity, then "Checkout" opens that SKU's GoDaddy
// Pay Link — the whole flow stays on the DEVEN brand until payment.
// ─────────────────────────────────────────────────────────────────────────
export default function CartDrawer() {
  const { item, isOpen, checkoutHref, setQty, clear, close } = useCart();

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

  const lineTotal = item ? item.price * item.qty : 0;

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

        {item ? (
          <>
            {/* line item */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex gap-4">
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
                  <p className="mt-1 text-sm font-light text-deven-gray">
                    Colour: {item.colorLabel}
                  </p>
                  <p className="text-sm font-light text-deven-gray">
                    Size: <span className="text-deven-black">{item.size}</span>
                  </p>

                  {/* qty stepper */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-deven-black/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(item.qty - 1)}
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
                        onClick={() => setQty(item.qty + 1)}
                        className="px-3 py-1.5 text-deven-gray transition-colors hover:text-deven-black"
                      >
                        +
                      </button>
                    </div>
                    <span className="ml-auto text-base font-light text-deven-black">
                      ${lineTotal}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={clear}
                    className="mt-3 self-start text-xs font-light tracking-wide text-deven-gray underline underline-offset-4 transition-colors hover:text-deven-black"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="mt-8 border-t border-deven-black/10 pt-5 text-xs font-light leading-relaxed text-deven-gray">
                Payment is processed securely by GoDaddy. Your size and quantity
                are carried through to checkout — please confirm them on the
                payment page before you pay.
              </p>
            </div>

            {/* footer / checkout */}
            <div className="border-t border-deven-black/10 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-deven-black uppercase">
                  Subtotal
                </span>
                <span className="font-[family-name:var(--font-heading)] text-2xl font-light text-deven-black">
                  ${lineTotal}
                </span>
              </div>
              <p className="mt-1 text-xs font-light text-deven-gray">
                Free shipping on all orders · Taxes calculated at checkout
              </p>

              <a
                href={checkoutHref ?? "#"}
                className="mt-4 flex w-full items-center justify-center bg-deven-black py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
              >
                Checkout Securely
              </a>
              <button
                type="button"
                onClick={close}
                className="mt-3 w-full py-2 text-center text-xs font-light tracking-wide text-deven-gray transition-colors hover:text-deven-black"
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
