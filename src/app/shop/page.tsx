"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const products = [
  {
    name: "Classic Polo",
    subtitle: "Signature Rottweiler Logo",
    image: "/images/hero-bg.png",
    price: null,
    tag: "Pre-Order",
    colors: ["Cream", "Sage", "Navy"],
  },
  {
    name: "Madison Hoodie",
    subtitle: "The Madison Collection",
    image: "/images/product-shot.png",
    price: null,
    tag: "Coming Soon",
    colors: ["Butter", "Stone"],
  },
  {
    name: "Performance Hoodie",
    subtitle: "Women's Long Sleeve",
    image: "/images/preorder-bg.png",
    price: null,
    tag: "Pre-Order",
    colors: ["Cream", "Light Gray"],
  },
  {
    name: "Golf Skort",
    subtitle: "Women's Athletic Fit",
    image: "/images/collection.png",
    price: null,
    tag: "Coming Soon",
    colors: ["Navy"],
  },
];

export default function ShopPage() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Nav spacer */}
      <div className="h-20" />

      {/* Header */}
      <section className="bg-deven-linen py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-4 flex items-center gap-3">
            <div className="h-px w-12 bg-deven-gold" />
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              Shop Premium Golf Wear
            </span>
            <div className="h-px w-12 bg-deven-gold" />
          </div>
          <h1 className="reveal font-[family-name:var(--font-heading)] text-5xl font-light text-deven-black sm:text-6xl lg:text-7xl">
            The{" "}
            <span className="font-medium italic text-deven-green">
              Collection
            </span>
          </h1>
          <p className="reveal mt-4 max-w-lg text-base font-light text-deven-gray">
            Modern golf apparel blending style and comfort. Each piece carries
            the signature Rottweiler logo — a mark of strength, loyalty, and
            confidence.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-deven-linen pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="stagger grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {products.map((product, i) => (
              <div
                key={i}
                className="reveal card-lift group cursor-pointer overflow-hidden bg-white"
              >
                <div className="img-zoom relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Tag badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-deven-black px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-deven-gold uppercase">
                      {product.tag}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="w-full p-6">
                      <span className="inline-block border border-white px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-all hover:bg-white hover:text-deven-black">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-deven-black">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-light text-deven-gray">
                    {product.subtitle}
                  </p>
                  {product.colors.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-light text-deven-gray">
                        Colors:
                      </span>
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="text-xs font-medium text-deven-black"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4">
                    {product.price ? (
                      <span className="text-lg font-medium text-deven-black">
                        ${product.price}
                      </span>
                    ) : (
                      <span className="text-sm font-medium tracking-wider text-deven-gold uppercase">
                        Price TBA
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-deven-black py-20">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,160,84,0.3) 30px, rgba(201,160,84,0.3) 31px)",
            }}
          />
        </div>
        <div className="reveal relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-light text-white sm:text-4xl">
            More Styles Coming Soon
          </h2>
          <p className="mt-4 text-sm font-light text-white/50">
            Join our newsletter to be the first to know when new pieces drop.
          </p>
          <Link
            href="/#contact"
            className="btn-gold mt-8 inline-block bg-deven-gold px-10 py-4 text-xs font-semibold tracking-[0.25em] text-deven-black uppercase transition-all hover:bg-deven-gold-light"
          >
            Get Notified
          </Link>
        </div>
      </section>
    </>
  );
}
