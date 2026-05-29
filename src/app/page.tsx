"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { PRODUCTS } from "@/lib/products";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "DEVEN",
  slogan: "More Than a Game",
  description:
    "Premium golf apparel featuring the signature Rottweiler logo. The Madison Collection — performance hoodies designed for the course and beyond.",
  url: "https://deveneapen.com",
  image: "https://deven-golf.vercel.app/images/logo.png",
  sameAs: ["https://instagram.com/shopdeven"],
  brand: {
    "@type": "Brand",
    name: "DEVEN",
    logo: "https://deven-golf.vercel.app/images/logo.png",
  },
};

const featured = PRODUCTS.filter((p) => p.available).slice(0, 3);

export default function Home() {
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO — More Than a Game ── */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/maryland-foursome.jpg"
            alt="DEVEN golfers on a Maryland course at sunset"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          {/* The mark — Rottweiler, green eyes — framed so it reads on the dark hero */}
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-deven-gold/50 sm:h-28 sm:w-28">
            <Image
              src="/images/logo-icon.png"
              alt="DEVEN Rottweiler mark"
              width={112}
              height={112}
              priority
              className="h-full w-full scale-110 object-cover"
            />
          </div>

          <span className="mt-7 text-[11px] font-semibold tracking-[0.45em] text-deven-gold uppercase">
            Premium Athletic Apparel
          </span>

          <h1 className="mt-5 font-[family-name:var(--font-heading)] text-6xl font-medium uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            More Than
            <br />
            a Game
          </h1>

          <div className="mt-8 h-px w-16 bg-deven-gold/70" />

          <p className="mt-7 max-w-md text-sm font-light leading-relaxed tracking-wide text-white/70 sm:text-base">
            Performance apparel for athletes who think beyond the scorecard.
          </p>

          <Link
            href="/shop"
            className="mt-10 border border-white/40 px-12 py-4 text-xs font-semibold tracking-[0.3em] text-white uppercase transition-all hover:border-deven-gold hover:bg-deven-gold hover:text-deven-black"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* ── BRAND — a lifestyle, a legacy ── */}
      <section
        id="about"
        className="bg-deven-linen py-28 lg:py-36"
      >
        <div className="reveal mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
          <span className="text-[10px] font-semibold tracking-[0.5em] text-deven-gold uppercase">
            The Brand
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-light leading-snug text-deven-black sm:text-4xl lg:text-5xl">
            A lifestyle. A legacy.
          </h2>
          <div className="my-8 h-px w-12 bg-deven-gold/60" />
          <p className="max-w-xl text-base font-light leading-relaxed text-deven-gray">
            DEVEN was built for athletes driven to be their best — on the course
            and off it. Clean lines, premium fabric, and the signature
            Rottweiler mark. For those who chase greatness and think beyond the
            scorecard.
          </p>
          <div className="mt-10 w-full max-w-xs">
            <Image
              src="/images/db-monogram.png"
              alt="DB monogram"
              width={963}
              height={127}
              className="h-auto w-full opacity-90"
            />
          </div>
        </div>
      </section>

      {/* ── THE MADISON COLLECTION ── */}
      <section
        id="collection"
        className="bg-deven-cream py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="reveal overflow-hidden">
            <Image
              src="/images/madison-collection.jpg"
              alt="The Madison Collection — models in DEVEN hoodies"
              width={1200}
              height={760}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="reveal flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              The Madison Collection
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light leading-snug text-deven-black sm:text-5xl">
              Timeless style.
              <br />
              Made for every swing.
            </h2>
            <div className="my-6 h-px w-16 bg-deven-gold" />
            <p className="max-w-md text-base font-light leading-relaxed text-deven-gray">
              A modern take on golf apparel — clean lines, premium performance
              fabric, and the signature mark. Six pieces for the season, with
              more arriving this fall.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block w-fit border border-deven-black px-10 py-3.5 text-xs font-semibold tracking-[0.25em] text-deven-black uppercase transition-all hover:bg-deven-black hover:text-white"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PIECES ── */}
      <section className="bg-deven-linen py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              The Hoodies
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
              Featured Pieces
            </h2>
          </div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {featured.map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="reveal group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-deven-cream">
                  <Image
                    src={product.image}
                    alt={`${product.name} — ${product.color}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-deven-black">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-light tracking-wide text-deven-gray">
                    {product.color}
                  </p>
                  <p className="mt-2 text-sm font-light text-deven-black">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ── */}
      <section className="bg-deven-linen pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { src: "/images/mens-lookbook.jpg", alt: "Men's hoodie on the course" },
              { src: "/images/women-putting.jpg", alt: "Putting with the Rottweiler flag" },
              { src: "/images/women-lifestyle.jpg", alt: "On the course in DEVEN hoodies" },
            ].map((img, i) => (
              <div
                key={i}
                className="reveal relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-deven-black py-24">
        <div className="reveal mx-auto flex max-w-xl flex-col items-center px-6 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-light text-white sm:text-4xl">
            Join the Club
          </h3>
          <p className="mt-3 text-sm font-light text-white/50">
            Be first to the drops. Ten percent off your first piece.
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 border border-white/15 bg-transparent px-5 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-deven-gold"
            />
            <button className="bg-deven-gold px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-deven-black uppercase transition-colors hover:bg-deven-gold-light">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-deven-linen py-24 lg:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <div className="reveal mb-10 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              Get in Touch
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
              Contact
            </h2>
          </div>
          <form
            className="reveal space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="float-field">
                <input type="text" id="name" placeholder=" " required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="float-field">
                <input type="email" id="email" placeholder=" " required />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="float-field">
              <textarea id="message" rows={4} placeholder=" " required />
              <label htmlFor="message">Message</label>
            </div>
            <button
              type="submit"
              className="w-full bg-deven-black py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-green sm:w-auto sm:px-12"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-deven-black py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-icon.png"
                  alt="DEVEN"
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <span className="font-[family-name:var(--font-heading)] text-xl tracking-[0.3em] text-white">
                  DEVEN
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/40">
                Premium performance apparel with the signature Rottweiler mark.
                More than a game.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] text-deven-gold uppercase">
                Explore
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "Shop", href: "/shop" },
                  { label: "Collection", href: "/#collection" },
                  { label: "Contact", href: "/#contact" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="gold-link w-fit text-sm font-light text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] text-deven-gold uppercase">
                Follow
              </h4>
              <a
                href="https://instagram.com/shopdeven"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm font-light text-white/50 transition-colors hover:text-white"
              >
                <svg
                  className="h-5 w-5 transition-colors group-hover:text-deven-gold"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @shopdeven
              </a>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs font-light text-white/30">
                &copy; {new Date().getFullYear()} DEVEN. All Rights Reserved.
              </p>
              <p className="text-xs font-light text-white/20">
                Created by Hummus Development &middot; 2026
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
