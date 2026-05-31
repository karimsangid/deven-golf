"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCTS, isAvailable } from "@/lib/products";
import ProductMedia from "./shop/ProductMedia";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "DEVEN",
  slogan: "More Than a Game",
  description:
    "Premium golf apparel featuring the signature Rottweiler logo. Performance hoodies designed for the course and beyond.",
  url: "https://devenbrand.shop",
  image: "https://devenbrand.shop/images/logo.png",
  sameAs: ["https://instagram.com/shopdeven"],
  brand: {
    "@type": "Brand",
    name: "DEVEN",
    logo: "https://deven-golf.vercel.app/images/logo.png",
  },
};

// Colourway marquee — the scrolling strip of every colour/mood, all on-model
// campaign frames (no laid-out flats). Order is deliberately shuffled so no two
// neighbours share a colour and there's no A-B-A-B / palindrome rhythm; the
// first and last differ too, so the seamless loop seam doesn't repeat a colour.
// Each tile links to the shop variant it depicts (Pick Your Mood → buy).
const COLOR_MARQUEE = [
  { src: "/images/model-yellow-chest-woman.jpg", slug: "yellow-chest" }, //   yellow · woman
  { src: "/images/model-gray-madison-man.jpg", slug: "gray-shoulder" }, //    gray · man
  { src: "/images/marquee-navy-man.jpg", slug: "navy-chest" }, //            navy · man
  { src: "/images/model-lblue-chest-man.jpg", slug: "light-blue-chest" }, //  blue · man
  { src: "/images/hero-onmodel-gray.jpg", slug: "gray-chest" }, //            gray · man
  { src: "/images/marquee-yellow-man.jpg", slug: "yellow-chest" }, //         yellow · man
  { src: "/images/lookbook-navy-woman.jpg", slug: "navy-chest" }, //          navy · woman
  { src: "/images/model-lblue-madison-woman.jpg", slug: "light-blue-shoulder" }, // blue · woman
  { src: "/images/model-gray-madison-woman.jpg", slug: "gray-shoulder" }, //  gray · woman
  { src: "/images/hero-duo-gray-yellow.jpg", slug: "gray-shoulder" }, //      duo
  { src: "/images/marquee-navy-woman.jpg", slug: "navy-chest" }, //           navy · woman
  { src: "/images/model-gray-madison-man2.jpg", slug: "gray-shoulder" }, //   gray · man
  { src: "/images/marquee-lblue-man.jpg", slug: "light-blue-chest" }, //      blue · man
  { src: "/images/model-gray-madison-woman2.jpg", slug: "gray-shoulder" }, // gray · woman
];

// On-model lookbook — real campaign frames of the signature hoodie. Add entries
// here as new full-res on-model shots land (one object per shot).
const LOOKBOOK_SHOTS = [
  {
    src: "/images/model-gray-madison-man.jpg",
    alt: "A golfer on the course in the DEVEN Silver Oak Madison Collection hoodie",
  },
  {
    src: "/images/model-yellow-chest-woman.jpg",
    alt: "A golfer beside the cart in the DEVEN Peanut Cream hoodie",
  },
  {
    src: "/images/lookbook-navy-woman.jpg",
    alt: "A golfer on the fairway in the DEVEN Georgia Blue hoodie",
  },
  {
    src: "/images/model-lblue-chest-man.jpg",
    alt: "A golfer reading the green in the DEVEN Diesel Sky hoodie",
  },
  {
    src: "/images/model-gray-madison-woman.jpg",
    alt: "A golfer at golden hour in the DEVEN Silver Oak Madison Collection hoodie",
  },
  {
    src: "/images/hero-duo-gray-yellow.jpg",
    alt: "Two golfers at golden hour in DEVEN — the Silver Oak Madison hoodie and the Peanut Cream hoodie",
  },
];

// Show in-stock pieces shot on a model (the people frames), so the homepage
// always leads with a real campaign image — never a laid-out studio flat.
const featured = PRODUCTS.filter(
  (p) =>
    isAvailable(p) && /\/(model-|hero-onmodel|lookbook-)/.test(p.image)
).slice(0, 3);

export default function Home() {
  const [joined, setJoined] = useState(false);
  const [sent, setSent] = useState(false);

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
        className="relative flex min-h-screen items-end justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/campaign-group.jpg"
            alt="Five golfers at golden hour in DEVEN — the Diesel Sky, Peanut Cream, and Silver Oak hoodies across the Signature and Madison lines"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 text-center lg:pb-28">
          {/* The mark — Rottweiler, green eyes — framed so it reads on the dark hero */}
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-deven-gold/50 sm:h-28 sm:w-28">
            <Image
              src="/images/logo-icon.png"
              alt="DEVEN Rottweiler mark"
              width={112}
              height={112}
              priority
              className="h-full w-full object-cover"
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

      {/* ── EVERY COLORWAY — marquee (Pick Your Mood, near the top) ── */}
      <section className="overflow-hidden bg-deven-black py-20 lg:py-24">
        <div className="reveal mx-auto mb-10 max-w-7xl px-6 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
            Every Colorway
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-white sm:text-5xl">
            Pick Your{" "}
            <span className="font-medium italic text-deven-gold">Mood</span>
          </h2>
        </div>
        <div className="color-marquee-mask relative overflow-hidden">
          <div className="color-marquee gap-4 px-2">
            {[...COLOR_MARQUEE, ...COLOR_MARQUEE].map((tile, i) => (
              <Link
                key={i}
                href={`/shop/${tile.slug}`}
                aria-label="Shop this piece"
                className="group relative h-72 w-52 flex-none overflow-hidden rounded-sm bg-deven-charcoal"
              >
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes="208px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent pb-3 pt-8 text-[10px] font-semibold tracking-[0.3em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Shop
                </span>
              </Link>
            ))}
          </div>
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
          <p className="max-w-xl text-lg font-light leading-relaxed text-deven-black">
            I&rsquo;m Deven. A golfer. A dreamer. A future business leader.
          </p>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-deven-gray">
            I created DEVEN to build luxury golf apparel for athletes who are
            driven to be the best — on and off the course.
          </p>
          <div className="mt-12 h-px w-24 bg-deven-gold/50" />
        </div>
      </section>

      {/* ── THE MADISON COLLECTION — its own signature line, separate from the
            main hoodie lineup; logo / packaging imagery only ── */}
      <section
        id="collection"
        className="bg-deven-cream py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="reveal overflow-hidden">
            <Image
              src="/images/premium-packaging.jpg"
              alt="The Madison Collection — premium packaging with the signature mark"
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="reveal flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              The Madison Collection
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light leading-snug text-deven-black sm:text-5xl">
              The signature line.
              <br />
              Marked, boxed, delivered.
            </h2>
            <div className="my-6 h-px w-16 bg-deven-gold" />
            <p className="max-w-md text-base font-light leading-relaxed text-deven-gray">
              A line apart — the pieces that carry the DEVEN mark, finished and
              packaged to match. Held separate from the everyday lineup for the
              moments that deserve it.
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
                  <ProductMedia
                    product={product}
                    sizes="(min-width: 640px) 33vw, 100vw"
                    imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-deven-black">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-light tracking-wide text-deven-gray">
                    {product.styleLabel}
                  </p>
                  {product.price != null && (
                    <p className="mt-1.5 text-sm font-light text-deven-black">
                      ${product.price}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK — real on-model campaign frames ── */}
      <section className="bg-deven-linen py-24 lg:py-32">
        <div className="reveal mx-auto mb-12 max-w-7xl px-6 text-center">
          <span className="text-[10px] font-semibold tracking-[0.5em] text-deven-gold uppercase">
            On the Course
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-light text-deven-black sm:text-4xl lg:text-5xl">
            The Lookbook
          </h2>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-6">
          {LOOKBOOK_SHOTS.map((shot, i) => (
            <div
              key={i}
              className="reveal relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-deven-black py-24">
        <div className="reveal mx-auto flex max-w-xl flex-col items-center px-6 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-light text-white sm:text-4xl">
            Join the Club
          </h3>
          <p className="mt-3 text-sm font-light text-white/50">
            Be first to every drop. New pieces and early access, straight to
            your inbox.
          </p>
          {!joined ? (
            <form
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setJoined(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="flex-1 border border-white/15 bg-transparent px-5 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-deven-gold"
              />
              <button
                type="submit"
                className="bg-deven-gold px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-deven-black uppercase transition-colors hover:bg-deven-gold-light"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="mt-8 text-sm font-light tracking-wide text-deven-gold">
              You&rsquo;re on the list. Watch your inbox for the next drop.
            </p>
          )}
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

          {/* ── Address / phone / email ── */}
          <div className="reveal mb-12 grid gap-8 border-y border-deven-light-gray py-8 text-center sm:grid-cols-3">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-deven-gold uppercase">
                Visit
              </span>
              <a
                href="https://maps.apple.com/place?address=1101%20Wootton%20Pkwy,%20Ste%20400,%20Rockville,%20MD%20%2020852,%20United%20States&coordinate=39.067724,-77.156966&name=1101%20Wootton%20Pkwy,%20Ste%20400&map=explore"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-light leading-relaxed text-deven-gray transition-colors hover:text-deven-black"
              >
                1101 Wootton Parkway
                <br />
                Suite 400
                <br />
                Rockville, MD 20852
              </a>
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-deven-gold uppercase">
                Call
              </span>
              <a
                href="tel:+13017016226"
                className="mt-2 block text-sm font-light text-deven-gray transition-colors hover:text-deven-black"
              >
                (301) 701-6226
              </a>
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-deven-gold uppercase">
                Email
              </span>
              <a
                href="mailto:info@devenbrand.shop"
                className="mt-2 block text-sm font-light text-deven-gray transition-colors hover:text-deven-black"
              >
                info@devenbrand.shop
              </a>
            </div>
          </div>
          {!sent ? (
            <form
              className="reveal space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
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
          ) : (
            <div className="reveal border border-deven-gold/30 bg-deven-cream px-8 py-10 text-center">
              <p className="font-[family-name:var(--font-heading)] text-2xl font-light text-deven-black">
                Thank you.
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-deven-gray">
                Your message is on its way — we&rsquo;ll be in touch shortly. In
                the meantime, follow{" "}
                <a
                  href="https://instagram.com/shopdeven"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-link text-deven-black"
                >
                  @shopdeven
                </a>{" "}
                for the latest.
              </p>
            </div>
          )}
        </div>
      </section>

    </>
  );
}
