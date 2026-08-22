import type { Metadata } from "next";
import LegalPageLayout, {
  LEGAL_CONTACT_EMAIL,
  LegalSection,
} from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for this website and its online programs.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="June 10, 2026"
      current="terms"
    >
      <LegalSection title="Services">
        <p>
          By enrolling in any program offered through this website, you agree to
          participate in good faith and provide accurate health information.
          These services are not a substitute for medical advice, diagnosis, or
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
          We are not liable for any injury, loss, or damage arising from
          participation in programs offered through this website. You assume full
          responsibility for your health and fitness decisions.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="font-semibold text-charcoal underline-offset-2 hover:underline"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
