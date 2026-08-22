"use client";

import { absoluteUrl } from "@/lib/seo";
import { profileAbsoluteUrl } from "@/lib/profileSeo";
import { useSiteProfile } from "@/components/SiteProfileProvider";

export default function JsonLd() {
  const { profile, username } = useSiteProfile();
  const { brand, seo, images, packages } = profile;
  const pageUrl = username ? profileAbsoluteUrl(username) : absoluteUrl("/");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        url: pageUrl,
        name: brand.name,
        description: seo.description,
        publisher: { "@id": `${pageUrl}#person` },
      },
      {
        "@type": "Person",
        "@id": `${pageUrl}#person`,
        name: brand.name,
        jobTitle: "Online Personal Trainer & Fitness Coach",
        url: pageUrl,
        image: images.hero,
        sameAs: [seo.instagramUrl],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${pageUrl}#service`,
        name: `${brand.name} Online Coaching`,
        url: pageUrl,
        image: images.hero,
        provider: { "@id": `${pageUrl}#person` },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        serviceType: "Online Personal Training",
        offers: packages.map((pkg) => ({
          "@type": "Offer",
          name: pkg.name,
          description: pkg.description,
          price: pkg.price.replace(/[^\d.]/g, "") || "10",
          priceCurrency: "USD",
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
