import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} online fitness coaching services.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
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
        <h1 className="font-display text-4xl font-bold uppercase text-charcoal">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-charcoal/60">
          Last updated: June 10, 2026
        </p>

        <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-charcoal/80">
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Information We Collect
            </h2>
            <p className="mt-3 leading-relaxed">
              When you sign up for a free workout, newsletter, or coaching
              program through {siteConfig.name}&apos;s website, we may collect
              your name, email address, and any information you voluntarily
              provide in forms or coaching applications.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              How We Use Your Information
            </h2>
            <p className="mt-3 leading-relaxed">
              We use your information to deliver requested content (such as
              free workouts), communicate about coaching services, send
              newsletters you&apos;ve opted into, and improve our services. We
              do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Cookies & Analytics
            </h2>
            <p className="mt-3 leading-relaxed">
              This website may use cookies and similar technologies to analyze
              traffic and improve user experience. You can control cookie
              preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Data Security
            </h2>
            <p className="mt-3 leading-relaxed">
              We implement reasonable security measures to protect your
              information. However, no method of transmission over the internet
              is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal">
              Contact
            </h2>
            <p className="mt-3 leading-relaxed">
              For privacy-related questions, contact us at{" "}
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
