"use client";

import Link from "next/link";
import { useState } from "react";
import { SIZES } from "@/lib/products";

export default function ProductActions({ available }: { available: boolean }) {
  const [size, setSize] = useState<string | null>(null);
  const [reserved, setReserved] = useState(false);
  const [error, setError] = useState(false);

  const onReserve = () => {
    if (!size) {
      setError(true);
      return;
    }
    setReserved(true);
  };

  if (!available) {
    return (
      <div className="mt-10">
        <button
          disabled
          className="w-full cursor-not-allowed border border-deven-light-gray bg-transparent py-4 text-xs font-semibold tracking-[0.25em] text-deven-gray uppercase"
        >
          Coming This Fall
        </button>
        <p className="mt-4 text-center text-sm font-light text-deven-gray">
          <Link href="/#contact" className="gold-link text-deven-black">
            Join the list
          </Link>{" "}
          to hear the moment it drops.
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
        <span className="text-xs font-light text-deven-gray">Size guide</span>
      </div>

      <div className="mt-3 grid grid-cols-6 gap-2">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSize(s);
              setError(false);
            }}
            className={`size-pill ${size === s ? "is-selected" : ""}`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-3 text-xs font-medium text-deven-green">
          Please select a size.
        </p>
      )}

      {!reserved ? (
        <button
          onClick={onReserve}
          className="mt-6 w-full bg-deven-black py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-green"
        >
          Pre-Order — {size ? `Size ${size}` : "Select a Size"}
        </button>
      ) : (
        <div className="mt-6 border border-deven-green/30 bg-deven-cream px-5 py-4 text-center">
          <p className="text-sm font-medium text-deven-green">
            Reserved — {size}.
          </p>
          <p className="mt-1 text-sm font-light text-deven-gray">
            We&rsquo;ll confirm your pre-order by email. {" "}
            <Link href="/#contact" className="gold-link text-deven-black">
              Leave your details
            </Link>
            .
          </p>
        </div>
      )}

      <p className="mt-4 text-center text-xs font-light text-deven-gray">
        Secure pre-order · Ships in 5–7 business days
      </p>
    </div>
  );
}
