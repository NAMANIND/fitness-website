import type { Metadata } from "next";
import LegalPageLayout, {
  LEGAL_CONTACT_EMAIL,
  LegalSection,
} from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for this website and its online services.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="June 10, 2026"
      current="privacy"
    >
      <LegalSection title="Information We Collect">
        <p>
          When you submit a form, request information, or enroll in a program
          through this website, we may collect your name, email address, phone
          number if provided, and any information you voluntarily share.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>
          We use your information to deliver requested content, respond to
          inquiries, communicate about services, and improve this website. We do
          not sell your personal data to third parties.
        </p>
      </LegalSection>

      <LegalSection title="Cookies & Analytics">
        <p>
          This website may use cookies and similar technologies to analyze
          traffic and improve user experience. You can control cookie
          preferences through your browser settings.
        </p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We implement reasonable security measures to protect your information.
          However, no method of transmission over the internet is completely
          secure.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For privacy-related questions, contact us at{" "}
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
