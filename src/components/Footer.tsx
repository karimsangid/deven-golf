import Image from "next/image";
import Link from "next/link";

// Shared site footer — rendered once in the root layout so it appears on every
// page (home, shop, PDPs, privacy, terms), carrying contact, nav, account
// links and the Hummus Development credit.
export default function Footer() {
  return (
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
            <div className="mt-6 space-y-1 text-sm font-light text-white/40">
              <a
                href="https://maps.apple.com/place?address=1101%20Wootton%20Pkwy,%20Ste%20400,%20Rockville,%20MD%20%2020852,%20United%20States&coordinate=39.067724,-77.156966&name=1101%20Wootton%20Pkwy,%20Ste%20400&map=explore"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-white"
              >
                1101 Wootton Parkway, Suite 400
                <br />
                Rockville, MD 20852
              </a>
              <a
                href="tel:+13017016226"
                className="block transition-colors hover:text-white"
              >
                (301) 701-6226
              </a>
              <a
                href="mailto:info@devenbrand.shop"
                className="block transition-colors hover:text-white"
              >
                info@devenbrand.shop
              </a>
            </div>
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
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
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

            <h4 className="mt-8 mb-4 text-xs font-semibold tracking-[0.2em] text-deven-gold uppercase">
              Account
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/account"
                className="gold-link w-fit text-sm font-light text-white/50 transition-colors hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/account/create"
                className="gold-link w-fit text-sm font-light text-white/50 transition-colors hover:text-white"
              >
                Create Account
              </Link>
            </div>
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
          <p className="mt-6 text-center text-[10px] font-light leading-relaxed tracking-wide text-white/20">
            Exchanges only on unworn items with original tags attached · All
            sales final
          </p>
        </div>
      </div>
    </footer>
  );
}
