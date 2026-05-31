import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────
// Branded 404. Renders inside the root layout (Nav + Footer present), so a
// dead / mistyped / bookmarked URL never dead-ends on the bare Next.js page —
// the visitor gets an on-brand screen with a clear way back to Home / Shop.
// ─────────────────────────────────────────────────────────────────────────
export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-deven-black px-6 py-32 text-center">
      <div className="mb-8 h-20 w-20 overflow-hidden rounded-full ring-1 ring-deven-gold/50">
        <Image
          src="/images/logo-icon.png"
          alt="DEVEN"
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="text-xs font-semibold tracking-[0.4em] text-deven-gold uppercase">
        404
      </span>
      <h1 className="mt-4 max-w-xl font-[family-name:var(--font-heading)] text-4xl font-light text-white sm:text-5xl">
        This page is off the fairway.
      </h1>
      <p className="mt-5 max-w-md text-base font-light leading-relaxed text-white/60">
        The page you&rsquo;re looking for has moved or no longer exists. Let&rsquo;s
        get you back to the collection.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="bg-deven-gold px-8 py-4 text-xs font-semibold tracking-[0.25em] text-deven-black uppercase transition-colors hover:bg-white"
        >
          Shop the Collection
        </Link>
        <Link
          href="/"
          className="border border-white/30 px-8 py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:border-white"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
