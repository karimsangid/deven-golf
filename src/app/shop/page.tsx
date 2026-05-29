import type { Metadata } from "next";
import ShopBrowser from "./ShopBrowser";

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

      {/* Grid + category filter */}
      <section className="bg-deven-linen pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <ShopBrowser />
        </div>
      </section>
    </>
  );
}
