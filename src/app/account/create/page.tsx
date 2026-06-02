import type { Metadata } from "next";
import Link from "next/link";
import { CREATE_ACCOUNT_URL } from "@/lib/store";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your DEVEN account for faster checkout, order tracking, and early access to new drops.",
};

// Branded create-account entry. The secure step (password) is completed in the
// DEVEN store, where customer accounts live — we never collect a password here.
export default function CreateAccountPage() {
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
              Create Account
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-deven-gray">
              Join DEVEN for faster checkout, order tracking, and early access to
              new drops.
            </p>
          </header>

          <div className="mt-10 border border-deven-light-gray bg-white/60 p-8 text-center">
            <a
              href={CREATE_ACCOUNT_URL}
              className="flex w-full items-center justify-center bg-deven-black py-4 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
            >
              Create Your Account
            </a>
            <p className="mt-4 text-xs font-light text-deven-gray">
              Your account is created securely through the DEVEN store.
            </p>
          </div>

          <p className="mt-8 text-center text-sm font-light text-deven-gray">
            Already have an account?{" "}
            <Link href="/account" className="gold-link text-deven-black">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
