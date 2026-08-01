import { images, packages } from "@/data/siteData";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${absoluteUrl("/")}#person` },
      },
      {
        "@type": "Person",
        "@id": `${absoluteUrl("/")}#person`,
        name: siteConfig.name,
        jobTitle: "Online Personal Trainer & Fitness Coach",
        url: absoluteUrl("/"),
        image: images.hero,
        sameAs: [siteConfig.instagramUrl],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${absoluteUrl("/")}#service`,
        name: `${siteConfig.name} Online Coaching`,
        url: absoluteUrl("/"),
        image: images.hero,
        provider: { "@id": `${absoluteUrl("/")}#person` },
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
