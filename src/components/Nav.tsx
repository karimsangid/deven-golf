"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let queued = false;
    let last = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const next = window.scrollY > 40;
        if (next !== last) {
          last = next;
          setScrolled(next);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-icon.png"
            alt="DEVEN"
            width={40}
            height={40}
            className="rounded-sm object-contain"
          />
          <span className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-[0.3em] text-white">
            DEVEN
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "Collection", href: "/#collection" },
            { label: "Contact", href: "/#contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="gold-link text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="btn-gold rounded-none bg-deven-gold px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-deven-black uppercase transition-all hover:bg-deven-gold-light"
          >
            Shop Now
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-deven-black/98 md:hidden ${menuOpen ? "open" : ""}`}
      >
        {[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Collection", href: "/#collection" },
          { label: "Contact", href: "/#contact" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="font-[family-name:var(--font-heading)] text-3xl font-light tracking-[0.2em] text-white uppercase"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/shop"
          onClick={() => setMenuOpen(false)}
          className="btn-gold mt-4 bg-deven-gold px-10 py-3 text-sm font-semibold tracking-[0.2em] text-deven-black uppercase"
        >
          Shop Now
        </Link>
      </div>
    </nav>
  );
}
