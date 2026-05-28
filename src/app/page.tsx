"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { GolferSwingSVG, FairwayDivider, FlagPinSVG, GolfBallSVG } from "./svgs";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "DEVEN",
  description:
    "Premium golf apparel brand featuring the signature Rottweiler logo. Modern polos, hoodies, and the Madison Collection.",
  url: "https://deveneapen.com",
  image: "https://deven-golf.vercel.app/images/logo.png",
  sameAs: ["https://instagram.com/shopdeven"],
  brand: {
    "@type": "Brand",
    name: "DEVEN",
    logo: "https://deven-golf.vercel.app/images/logo.png",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
    description: "Spring 2026 Collection — Pre-Order Now",
  },
};

export default function Home() {
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let queued = false;
    const update = () => {
      queued = false;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? window.scrollY / h : 0;
      if (scrollBarRef.current) {
        scrollBarRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
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

      <div ref={scrollBarRef} className="scroll-bar" />

      {/* ── HERO ── */}
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <Image
            src="/images/maryland-foursome.jpg"
            alt="Deven Brand golfers on a Maryland course at sunset"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-deven-gold" />
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              Premium Golf Apparel
            </span>
            <div className="h-px w-12 bg-deven-gold" />
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-6xl font-light leading-tight tracking-wide text-white sm:text-7xl lg:text-8xl">
            Elevate Your
            <br />
            <span className="font-medium italic text-deven-gold">Style</span>
          </h1>

          <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-white/70 sm:text-lg">
            Modern golf apparel blending style and comfort.
            <br className="hidden sm:block" />
            Sleek designs. Signature Rottweiler logo.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="/shop"
              className="btn-gold bg-deven-gold px-10 py-4 text-sm font-semibold tracking-[0.25em] text-deven-black uppercase transition-all hover:bg-deven-gold-light"
            >
              Shop Latest Styles
            </a>
            <a
              href="#collection"
              className="border border-white/30 px-10 py-4 text-sm font-medium tracking-[0.2em] text-white uppercase transition-all hover:border-deven-gold hover:text-deven-gold"
            >
              View Collection
            </a>
          </div>

          <div className="mt-16 opacity-70 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <GolferSwingSVG />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#about" className="group flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.4em] text-deven-gold/60 uppercase transition-colors group-hover:text-deven-gold">
              Tee Off
            </span>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="animate-bounce">
              <circle cx="10" cy="6" r="5" stroke="rgba(201,160,84,0.5)" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="5" r="0.8" fill="rgba(201,160,84,0.3)" />
              <circle cx="11" cy="5" r="0.8" fill="rgba(201,160,84,0.3)" />
              <circle cx="10" cy="7" r="0.8" fill="rgba(201,160,84,0.3)" />
              <line x1="10" y1="12" x2="10" y2="26" stroke="rgba(201,160,84,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </section>

      <FairwayDivider from="deven-black" to="deven-linen" />

      {/* ── PRE-ORDER ── */}
      <section id="about" className="relative overflow-hidden bg-deven-linen py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="reveal from-left flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <GolfBallSVG size={16} />
              <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
                Spring 2026
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light leading-snug text-deven-black sm:text-5xl lg:text-6xl">
              Pre-Order
              <br />
              <span className="font-medium italic text-deven-green">Spring Collection</span>
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-deven-gray">
              Discover Deven: Modern golf apparel blending style and comfort.
              Elevate your game with our sleek designs and signature Rottweiler
              logo.
            </p>
            <a
              href="/shop"
              className="btn-gold mt-8 inline-block w-fit bg-deven-gold px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-deven-black uppercase transition-all hover:bg-deven-gold-light"
            >
              Shop Now
            </a>
          </div>
          <div className="reveal from-right img-zoom overflow-hidden rounded-sm shadow-2xl">
            <Image
              src="/images/women-lifestyle.jpg"
              alt="Two women in Deven hoodies on a golf course"
              width={1000}
              height={750}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT — Deven's mission ── */}
      <section id="manifesto" className="relative overflow-hidden bg-deven-black py-28 lg:py-36">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201,160,84,0.18) 20px, rgba(201,160,84,0.18) 21px)",
            }}
          />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <div className="reveal from-scale">
            <Image
              src="/images/rott-shield-dark.jpg"
              alt="DEVEN Rottweiler shield"
              width={160}
              height={160}
              className="mx-auto h-32 w-32 rounded-sm object-contain"
            />
          </div>

          <div className="reveal mt-6 flex items-center gap-3">
            <div className="h-px w-12 bg-deven-gold" />
            <span className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-[0.4em] text-white">
              DEVEN
            </span>
            <div className="h-px w-12 bg-deven-gold" />
          </div>
          <span className="reveal mt-2 text-[10px] font-semibold tracking-[0.5em] text-deven-gold uppercase">
            Brand
          </span>

          <h2 className="reveal mt-10 font-[family-name:var(--font-heading)] text-3xl font-light leading-tight text-deven-gold-light sm:text-4xl lg:text-5xl">
            More than a game.
            <br />
            A lifestyle. A legacy.
          </h2>

          <div className="reveal my-8 h-px w-16 bg-deven-gold/40" />

          <div className="reveal space-y-5 text-base font-light leading-relaxed text-white/70 sm:text-lg">
            <p>
              I&rsquo;m Deven. A golfer. A dreamer. A future business leader.
            </p>
            <p>
              I created Deven Brand to build luxury golf apparel for athletes
              who are driven to be the best&mdash;on and off the course.
            </p>
            <p>
              This is for those who chase greatness and think beyond the
              scorecard.
            </p>
          </div>

          <div className="reveal mt-10 flex items-center gap-6">
            <div className="h-px w-16 bg-deven-gold/30" />
            <FlagPinSVG />
            <div className="h-px w-16 bg-deven-gold/30" />
          </div>
        </div>
      </section>

      {/* ── MADISON COLLECTION ── */}
      <section id="collection" className="relative overflow-hidden bg-deven-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="reveal from-left img-zoom order-2 overflow-hidden rounded-sm shadow-2xl lg:order-1">
            <Image
              src="/images/madison-collection.jpg"
              alt="The Madison Collection — three models in Deven hoodies"
              width={1200}
              height={760}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="reveal from-right order-1 flex flex-col justify-center lg:order-2">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              Upcoming Collection
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light leading-snug text-deven-black sm:text-5xl lg:text-6xl">
              The{" "}
              <span className="font-medium italic text-deven-green">Madison</span>
              <br />
              Collection
            </h2>
            <div className="my-6 h-px w-16 bg-deven-gold" />
            <p className="text-lg font-light italic text-deven-gray">
              Timeless Style. Made for Every Swing.
            </p>
            <p className="mt-4 max-w-md text-base font-light leading-relaxed text-deven-gray">
              The Madison Collection brings a fresh take on modern golf fashion.
              Clean lines, premium fabrics, and the signature golfer silhouette —
              built for players who move with purpose.
            </p>
            <div className="mt-8">
              <a
                href="/shop"
                className="inline-block rounded-full border border-deven-gold/40 px-6 py-2 text-xs font-semibold tracking-[0.2em] text-deven-gold uppercase transition-all hover:bg-deven-gold hover:text-deven-black"
              >
                Coming Soon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE GALLERY ── */}
      <section className="bg-deven-linen py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-16 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              On the Course
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
              Lifestyle
            </h2>
          </div>
          <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/mens-lookbook.jpg", alt: "Men's hoodie lookbook on the course" },
              { src: "/images/women-putting.jpg", alt: "Women putting with Rottweiler flag" },
              { src: "/images/man-back-course.jpg", alt: "Solo on the course in gray Deven hoodie" },
            ].map((img, i) => (
              <div
                key={i}
                className="reveal card-lift img-zoom overflow-hidden rounded-sm shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLOR MARQUEE — every colorway ── */}
      <section className="overflow-hidden bg-deven-black py-20 lg:py-24">
        <div className="reveal mx-auto mb-10 max-w-7xl px-6 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
            Every Colorway
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-white sm:text-5xl">
            Pick Your <span className="font-medium italic text-deven-gold">Mood</span>
          </h2>
        </div>
        <div className="color-marquee-mask relative overflow-hidden">
          <div className="color-marquee gap-4 px-2">
            {[
              "/images/color-yellow-a.jpg",
              "/images/color-navy-a.jpg",
              "/images/color-gray-a.jpg",
              "/images/color-blue-a.jpg",
              "/images/color-royal-a.jpg",
              "/images/color-yellow-b.jpg",
              "/images/color-gray-b.jpg",
              "/images/color-yellow-c.jpg",
              "/images/studio-hanger-yellow.jpg",
              // duplicate set for seamless loop
              "/images/color-yellow-a.jpg",
              "/images/color-navy-a.jpg",
              "/images/color-gray-a.jpg",
              "/images/color-blue-a.jpg",
              "/images/color-royal-a.jpg",
              "/images/color-yellow-b.jpg",
              "/images/color-gray-b.jpg",
              "/images/color-yellow-c.jpg",
              "/images/studio-hanger-yellow.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative h-72 w-52 flex-none overflow-hidden rounded-sm bg-deven-charcoal"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="bg-deven-black py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-12 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              Follow Us
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-white sm:text-5xl">
              @shopdeven
            </h2>
            <p className="mt-4 text-sm font-light text-white/50">
              Follow us for style on and off the course
            </p>
          </div>
          <div className="stagger grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <a
                key={i}
                href="https://instagram.com/shopdeven"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group relative aspect-square overflow-hidden rounded-sm bg-deven-charcoal"
              >
                <Image
                  src={
                    [
                      "/images/polo-lookbook.jpg",
                      "/images/product-yellow.jpg",
                      "/images/brand-poster.jpg",
                      "/images/product-gray.jpg",
                      "/images/deven-lockup-tan.jpg",
                      "/images/product-blue.jpg",
                    ][i]
                  }
                  alt={`Instagram post ${i + 1}`}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-deven-linen py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="reveal mb-12 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              Get In Touch
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
              Contact Us
            </h2>
            <p className="mt-4 text-sm font-light text-deven-gray">
              Drop us a line!
            </p>
          </div>
          <form className="reveal space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 sm:grid-cols-2">
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
              <input type="tel" id="phone" placeholder=" " />
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="float-field">
              <textarea id="message" rows={5} placeholder=" " required />
              <label htmlFor="message">Message</label>
            </div>
            <button
              type="submit"
              className="btn-gold w-full bg-deven-gold py-4 text-sm font-semibold tracking-[0.25em] text-deven-black uppercase transition-all hover:bg-deven-gold-light sm:w-auto sm:px-12"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ── DESIGNED WITH INTENTION — tech sketches ── */}
      <section className="bg-deven-linen py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              The Process
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
              Designed With{" "}
              <span className="font-medium italic text-deven-green">Intention</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-light text-deven-gray">
              From Pantone swatch to finished garment. Every print placement,
              every fabric weight — specified, sampled, and tuned.
            </p>
          </div>
          <div className="stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/tech-sketch-navy.jpg", label: "Navy Blue · 534 C", sub: "Black print · Approved green eyes" },
              { src: "/images/tech-sketch-babyblue.jpg", label: "Baby Blue · 278 C", sub: "Cool grey 10 · Approved green eyes" },
              { src: "/images/tech-sketch-navy2.jpg", label: "Navy Spec Detail", sub: "4\" from neck seam · Bottom left print" },
            ].map((s, i) => (
              <div
                key={i}
                className="reveal card-lift overflow-hidden rounded-sm bg-white shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-deven-linen">
                  <Image
                    src={s.src}
                    alt={s.label}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="border-t border-deven-light-gray p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-deven-gold uppercase">
                    {s.label}
                  </p>
                  <p className="mt-2 text-sm font-light text-deven-gray">
                    {s.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM PACKAGING ── */}
      <section className="relative overflow-hidden bg-deven-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:gap-20">
          <div className="reveal from-left order-2 flex flex-col justify-center lg:order-1 lg:col-span-2">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              Every Detail
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light leading-snug text-deven-black sm:text-5xl">
              Built to{" "}
              <span className="font-medium italic text-deven-green">Unbox</span>
            </h2>
            <div className="my-6 h-px w-16 bg-deven-gold" />
            <p className="max-w-md text-base font-light leading-relaxed text-deven-gray">
              Premium garment bag, branded gift sleeve, signature hangtag. The
              Madison Collection arrives the way it should &mdash; like
              something worth waiting for.
            </p>
            <p className="mt-4 max-w-md text-sm font-light italic text-deven-gray/80">
              Timeless style. Made for every swing.
            </p>
          </div>
          <div className="reveal from-right img-zoom order-1 overflow-hidden rounded-sm shadow-2xl lg:order-2 lg:col-span-3">
            <Image
              src="/images/premium-packaging.jpg"
              alt="The Madison Collection — premium packaging"
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="relative overflow-hidden bg-deven-dark py-20">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,160,84,0.3) 30px, rgba(201,160,84,0.3) 31px)",
            }}
          />
        </div>
        <div className="reveal relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-light text-white sm:text-4xl">
            Join the Club
          </h3>
          <p className="mt-3 text-sm font-light text-white/50">
            Enjoy 10% off your first look. Join us!
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-white/15 bg-transparent px-5 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-deven-gold"
            />
            <button className="btn-gold bg-deven-gold px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-deven-black uppercase transition-all hover:bg-deven-gold-light">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative bg-deven-black py-16">
        <div className="absolute top-0 left-0 right-0 -translate-y-full">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 60V30C120 20 240 40 360 35C480 30 600 15 720 20C840 25 960 40 1080 35C1200 30 1320 15 1440 25V60H0Z"
              fill="#0a0a0a"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-icon.png"
                  alt="DEVEN"
                  width={36}
                  height={36}
                  className="rounded-sm object-contain"
                />
                <span className="font-[family-name:var(--font-heading)] text-xl tracking-[0.3em] text-white">
                  DEVEN
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/40">
                Premium golf apparel with the signature Rottweiler logo.
                Blending style, comfort, and confidence.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] text-deven-gold uppercase">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Shop", href: "/shop" },
                  { label: "Collection", href: "#collection" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="gold-link w-fit text-sm font-light text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
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
                <svg className="h-5 w-5 transition-colors group-hover:text-deven-gold" fill="currentColor" viewBox="0 0 24 24">
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
              <div className="flex gap-6">
                <a href="#" className="text-xs font-light text-white/30 transition-colors hover:text-white/60">
                  Privacy Policy
                </a>
                <a href="#" className="text-xs font-light text-white/30 transition-colors hover:text-white/60">
                  Terms &amp; Conditions
                </a>
              </div>
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
