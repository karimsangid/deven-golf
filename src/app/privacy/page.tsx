import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How DEVEN collects, uses, and protects your information when you shop with us.",
};

const UPDATED = "May 2026";

export default function PrivacyPage() {
  return (
    <>
      <div className="h-28" />
      <article className="bg-deven-linen pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <header className="border-b border-deven-light-gray pb-8 pt-8 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-deven-gold uppercase">
              DEVEN
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-light text-deven-black sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs font-light tracking-wide text-deven-gray">
              Last updated {UPDATED}
            </p>
          </header>

          <div className="legal mt-10 space-y-8 text-sm font-light leading-relaxed text-deven-gray">
            <p>
              DEVEN (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              respects your privacy. This policy explains what information we
              collect when you visit{" "}
              <span className="text-deven-black">devenbrand.shop</span> or place
              an order, how we use it, and the choices you have.
            </p>

            <section>
              <h2 className="legal-h">Information We Collect</h2>
              <p>
                When you place an order or contact us, we collect the
                information you provide — your name, email address, phone
                number, shipping and billing address, and order details.
                Payment card details are processed by our payment provider and
                are never stored on our servers. We also collect basic technical
                data (such as device and browsing information) to operate and
                improve the site.
              </p>
            </section>

            <section>
              <h2 className="legal-h">How We Use Your Information</h2>
              <p>
                We use your information to process and fulfill orders, arrange
                shipping and exchanges, respond to your messages, prevent fraud,
                and — only if you opt in — send you news about drops and
                early access. You can unsubscribe from marketing emails at any
                time.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Sharing</h2>
              <p>
                We share information only with the service providers who help us
                run the store — our payment processor, shipping carriers, and
                email provider — and only as needed to serve you. We do not sell
                your personal information.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Cookies</h2>
              <p>
                We use cookies and similar technologies to keep your cart,
                remember preferences, and understand how the site is used. You
                can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Your Choices</h2>
              <p>
                You may request access to, correction of, or deletion of your
                personal information by emailing us. We will respond in
                accordance with applicable law.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Contact</h2>
              <p>
                Questions about this policy? Reach us at{" "}
                <a
                  href="mailto:info@devenbrand.shop"
                  className="gold-link text-deven-black"
                >
                  info@devenbrand.shop
                </a>{" "}
                or (301) 701-6226, or write to 1101 Wootton Parkway, Suite 400,
                Rockville, MD 20852.
              </p>
            </section>

            <p className="pt-4">
              <Link href="/" className="gold-link text-deven-black">
                Return home
              </Link>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
