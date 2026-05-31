import type { Metadata } from "next";
import ShopBrowser from "./ShopBrowser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The DEVEN performance hoodie — four colourways, two signature marks. Shop the collection.",
};

export default function ShopPage() {
  return (
    <>
      <div className="h-28" />

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
            Two distinct lines — the bold Signature crest and the understated
            Madison Collection.
          </p>
        </div>
      </section>

      {/* Two full-bleed collection sections (Signature = light, Madison = dark) */}
      <ShopBrowser />
    </>
  );
}
