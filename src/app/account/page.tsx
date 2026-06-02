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

          <div className="mt-10 border border-deven-light-gray bg-white/60 p-8 text-center">
            <a
              href={ACCOUNT_URL}
              className="flex w-full items-center justify-center bg-deven-black py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
            >
              Sign In to Your Account
            </a>
            <p className="mt-4 text-xs font-light text-deven-gray">
              Sign-in is handled securely through the DEVEN store.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-center text-sm font-light text-deven-gray">
            <p>
              New to DEVEN?{" "}
              <Link href="/account/create" className="gold-link text-deven-black">
                Create an account
              </Link>
            </p>
            <p>
              <a href={ORDERS_URL} className="gold-link text-deven-black">
                Track an order
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
