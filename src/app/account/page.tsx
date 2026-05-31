import type { Metadata } from "next";
import Link from "next/link";
import { ACCOUNT_URL, ORDERS_URL } from "@/lib/store";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your DEVEN account to view orders, track shipments, and check out faster.",
};

// Branded sign-in. Customer accounts are held in the secure DEVEN store, so the
// final password step is completed there — this page is the on-brand entry to
// it (email-first; we never collect a password on this domain).
export default function SignInPage() {
  return (
    <>
      <div className="h-28" />
      <section className="bg-deven-linen pb-28">
        <div className="mx-auto max-w-md px-6 pt-10">
          <header className="text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              DEVEN
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
              Sign In
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-deven-gray">
              Welcome back. Access your orders, track shipments, and check out
              faster.
            </p>
          </header>

          <form
            action={ACCOUNT_URL}
            method="get"
            className="mt-10 border border-deven-light-gray bg-white/60 p-8"
          >
            <label
              htmlFor="email"
              className="block text-xs font-semibold tracking-[0.2em] text-deven-black uppercase"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className="mt-3 w-full border border-deven-light-gray bg-white px-4 py-3 text-sm text-deven-black outline-none transition-colors placeholder:text-deven-gray/60 focus:border-deven-gold"
            />
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center bg-deven-black py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
            >
              Continue to Sign In
            </button>
            <p className="mt-4 text-center text-xs font-light text-deven-gray">
              Sign-in is completed securely through the DEVEN store.
            </p>
          </form>

          <div className="mt-8 space-y-3 text-center text-sm font-light text-deven-gray">
            <p>
              New to DEVEN?{" "}
              <Link href="/account/create" className="gold-link text-deven-black">
                Create an account
              </Link>
            </p>
            <p>
              <a
                href={ORDERS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-link text-deven-black"
              >
                Track an order
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
