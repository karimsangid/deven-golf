import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern purchases and use of the DEVEN online store.",
};

const UPDATED = "May 2026";

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-xs font-light tracking-wide text-deven-gray">
              Last updated {UPDATED}
            </p>
          </header>

          <div className="legal mt-10 space-y-8 text-sm font-light leading-relaxed text-deven-gray">
            <p>
              These Terms &amp; Conditions govern your use of{" "}
              <span className="text-deven-black">devenbrand.shop</span> and any
              purchase you make from DEVEN. By placing an order, you agree to
              these terms.
            </p>

            <section>
              <h2 className="legal-h">Orders &amp; Pricing</h2>
              <p>
                All prices are listed in U.S. dollars. Each piece is $119 unless
                otherwise stated. We may correct pricing errors and update
                pricing at any time. Orders are subject to acceptance and
                availability; we may cancel and refund an order if an item is
                out of stock.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Sales Tax</h2>
              <p>
                Applicable sales tax is calculated at checkout based on the
                shipping destination and the rate for that state.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Shipping</h2>
              <p>
                Orders ship within 5&ndash;7 business days. Shipping is free on
                all orders. Title and risk of loss pass to you on delivery to
                the carrier.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Returns &amp; Exchanges</h2>
              <p>
                <span className="font-medium text-deven-black">
                  All sales are final — we do not offer refunds.
                </span>{" "}
                We are happy to arrange an exchange for a different size or
                colour within 30 days of delivery, subject to availability.
                Items must be unworn, unwashed, and in original condition with
                tags attached. To start an exchange, email{" "}
                <a
                  href="mailto:info@devenbrand.shop"
                  className="gold-link text-deven-black"
                >
                  info@devenbrand.shop
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="legal-h">Intellectual Property</h2>
              <p>
                The DEVEN name, the Rottweiler mark, logos, designs, and site
                content are the property of DEVEN and may not be used without
                written permission.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Limitation of Liability</h2>
              <p>
                The store and products are provided &ldquo;as is.&rdquo; To the
                fullest extent permitted by law, DEVEN is not liable for
                indirect or incidental damages arising from your use of the site
                or products.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Governing Law</h2>
              <p>
                These terms are governed by the laws of the State of Maryland,
                without regard to conflict-of-law principles.
              </p>
            </section>

            <section>
              <h2 className="legal-h">Contact</h2>
              <p>
                DEVEN · 1101 Wootton Parkway, Suite 400, Rockville, MD 20852 ·{" "}
                <a
                  href="mailto:info@devenbrand.shop"
                  className="gold-link text-deven-black"
                >
                  info@devenbrand.shop
                </a>{" "}
                · (301) 701-6226
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
