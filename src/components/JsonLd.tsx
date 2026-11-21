import { faqs, seo, services, site } from "@/lib/site";

type Data = Record<string, unknown>;

/** Structured data for search engines. `<` is escaped so page copy can never close the script tag. */
export function JsonLd({ data }: { data: Data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const orgId = `${site.url}/#organization`;

/** The studio, the website and the FAQ, for the home page. */
export function homeJsonLd(): Data {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.png`,
        image: `${site.url}/opengraph-image.jpg`,
        ...(site.email && { email: site.email }),
        description: seo.description,
        areaServed: { "@type": "Country", name: "India" },
        ...(site.city && { address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" } }),
        knowsAbout: services.map((s) => s.title),
        ...(site.socials.length > 0 && { sameAs: site.socials.map((s) => s.href) }),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** Home > Portfolio > project, for a case study page. */
export function breadcrumbJsonLd(name: string, path: string): Data {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: site.url },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${site.url}/portfolio` },
      { "@type": "ListItem", position: 3, name, item: `${site.url}${path}` },
    ],
  };
}
