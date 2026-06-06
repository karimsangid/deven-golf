"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

function BagButton({ className = "" }: { className?: string }) {
  const { item, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={item ? "Open bag (1 item)" : "Open bag"}
      className={`relative text-white/80 transition-colors hover:text-white ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      {item && (
        <span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full bg-deven-gold ring-2 ring-deven-black" />
      )}
    </button>
  );
}

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
      className={`nav-glass fixed top-9 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}
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
            href="/account"
            className="gold-link text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <BagButton />
          <Link
            href="/shop"
            className="bg-deven-gold px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-deven-black uppercase transition-colors hover:bg-deven-gold-light"
          >
            Shop Now
          </Link>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <BagButton />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5"
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
          href="/account"
          onClick={() => setMenuOpen(false)}
          className="font-[family-name:var(--font-heading)] text-3xl font-light tracking-[0.2em] text-white uppercase"
        >
          Sign In
        </Link>
        <Link
          href="/shop"
          onClick={() => setMenuOpen(false)}
          className="mt-4 bg-deven-gold px-10 py-3 text-sm font-semibold tracking-[0.2em] text-deven-black uppercase"
        >
          Shop Now
        </Link>
      </div>
    </nav>
  );
}
