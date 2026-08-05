import type { Metadata } from "next";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} online fitness coaching programs.`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="June 10, 2026"
      current="terms"
    >
      <LegalSection title="Coaching Services">
        <p>
          By enrolling in any coaching program with {siteConfig.name}, you agree
          to participate in good faith and provide accurate health information.
          Coaching is not a substitute for medical advice, diagnosis, or
          treatment. Consult your physician before starting any exercise
          program.
        </p>
      </LegalSection>

      <LegalSection title="Payment & Refunds">
        <p>
          Program fees are billed according to the package selected at
          enrollment. Refund policies vary by program and will be communicated
          before purchase. No refunds are issued for partial months of service
          unless otherwise stated in writing.
        </p>
      </LegalSection>

      <LegalSection title="Client Responsibilities">
        <p>
          You are responsible for exercising within your physical capabilities,
          following program guidelines, and communicating injuries or health
          changes promptly. Results vary based on individual effort,
          consistency, and adherence.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          {siteConfig.name} is not liable for any injury, loss, or damage arising
          from participation in coaching programs. You assume full responsibility
          for your health and fitness decisions.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-coral hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
