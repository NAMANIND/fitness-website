import type { Metadata } from "next";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} online fitness coaching services.`,
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
          When you request a free workout, contact Sara, or enroll in a coaching
          program through {siteConfig.name}&apos;s website, we may collect your
          name, email address, phone number if provided, and any information you
          voluntarily share in forms or coaching applications.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>
          We use your information to deliver requested content, respond to
          inquiries, communicate about coaching services, and improve our
          website. We do not sell your personal data to third parties.
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
