import type { Metadata } from "next";
import { caseStudies, getOgImage } from "@/lib/case-studies";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PortfolioList } from "@/components/case-study/PortfolioList";

const description =
  "Client and product work from Byte Studio - the problem, the build, and the outcome behind every project.";

export const metadata: Metadata = {
  title: "Portfolio",
  description,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio",
    description,
    url: "/portfolio",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description,
    images: ["/og.png"],
    site: "@bytestudiohq",
    creator: "@bytestudiohq",
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Portfolio",
  description,
  url: `${SITE_URL}/portfolio`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: caseStudies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: study.title,
      url: `${SITE_URL}/portfolio/${study.slug}`,
      image: `${SITE_URL}${getOgImage(study)}`,
    })),
  },
};

export default function PortfolioIndexPage() {
  return (
    <section className="text-white py-10 px-6 md:px-12 lg:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-10 md:mb-14">
          <Heading as="h1" className="mb-3">
            Portfolio
          </Heading>
          <Text variant="gray">
            Every project we&apos;ve shipped, in one place - the problem
            each client had, what we built, and what it changed.
          </Text>
        </div>

        <PortfolioList studies={caseStudies} />
      </div>
    </section>
  );
}
