import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} online fitness coaching programs.`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-charcoal/10 bg-charcoal py-6">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Link
            href="/"
            className="font-display text-2xl font-bold uppercase text-white"
          >
            Sara<span className="text-coral">.</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <h1 className="section-heading text-charcoal">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-charcoal/60">
          Last updated: June 10, 2026
        </p>

        <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-charcoal/80">
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Coaching Services
            </h2>
            <p className="mt-3 leading-relaxed">
              By enrolling in any coaching program with {siteConfig.name}, you
              agree to participate in good faith and provide accurate health
              information. Coaching is not a substitute for medical advice,
              diagnosis, or treatment. Consult your physician before starting
              any exercise program.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Payment & Refunds
            </h2>
            <p className="mt-3 leading-relaxed">
              Program fees are billed according to the package selected at
              enrollment. Refund policies vary by program and will be
              communicated before purchase. No refunds are issued for partial
              months of service unless otherwise stated in writing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Client Responsibilities
            </h2>
            <p className="mt-3 leading-relaxed">
              You are responsible for exercising within your physical
              capabilities, following program guidelines, and communicating
              injuries or health changes promptly. Results vary based on
              individual effort, consistency, and adherence.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Limitation of Liability
            </h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} is not liable for any injury, loss, or damage
              arising from participation in coaching programs. You assume full
              responsibility for your health and fitness decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Contact
            </h2>
            <p className="mt-3 leading-relaxed">
              Questions about these terms? Email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-coral hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>

        <Link href="/" className="btn-primary mt-12 inline-flex">
          Back to Home
        </Link>
      </main>
    </div>
  );
}
