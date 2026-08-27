import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { MEETING_LINK, SITE_URL, SITE_NAME } from "@/lib/config";
import { caseStudies, getCaseStudy, getAdjacentCaseStudies, type CaseStudy } from "@/lib/case-studies";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyHeroMedia";
import {
  CaseStudyStageStrip,
  CaseStudySection,
  CaseStudyFeatureGroups,
  CaseStudyStatGrid,
  CaseStudyCallout,
} from "@/components/case-study/CaseStudySections";
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";

// Real screenshots make a better social-share preview than the site
// default; brandmark/placeholder hero media falls back to it instead.
function ogImageFor(study: CaseStudy): string {
  return study.heroMedia.kind === "photo" ? study.heroMedia.src : "/og.png";
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const url = `/portfolio/${study.slug}`;
  const image = ogImageFor(study);

  return {
    title: study.title,
    description: study.tagline,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: study.title,
      description: study.tagline,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "article",
      images: [{ url: image, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.tagline,
      images: [image],
      site: "@bytestudiohq",
      creator: "@bytestudiohq",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { prev, next } = getAdjacentCaseStudies(slug);
  const index = caseStudies.findIndex((item) => item.slug === slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: `${SITE_URL}/portfolio`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: study.title,
            item: `${SITE_URL}/portfolio/${study.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: study.title,
        description: study.tagline,
        url: `${SITE_URL}/portfolio/${study.slug}`,
        creator: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    ],
  };

  return (
    <article className="text-white py-10 px-6 md:px-12 lg:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto mb-10 md:mb-14 flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Portfolio
        </Link>
        <Text variant="gray" className="text-caption tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
        </Text>
      </div>

      <div className="max-w-6xl mx-auto mb-10 md:mb-14">
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h1" variant="display" className="mb-5 max-w-3xl">
            {study.title}
          </Heading>
          <Text variant="gray" className="max-w-2xl leading-relaxed mb-6">
            {study.tagline}
          </Text>

          <Text variant="gray" className="pt-6 border-t border-white/10">
            <Text as="span" variant="lavender">
              {study.meta.role}
            </Text>
            {"  —  "}
            {study.meta.stack.join(" · ")}
          </Text>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto mb-16 md:mb-24">
        <CaseStudyHeroMedia media={study.heroMedia} title={study.title} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24">
          <CaseStudyStageStrip summary={study.summary} />
        </div>

        <div className="mb-16 md:mb-24">
          <CaseStudySection
            eyebrow="The Challenge"
            heading="What we walked into"
            paragraphs={[study.challenge]}
          />
        </div>

        <div className="mb-16 md:mb-24">
          <CaseStudySection eyebrow="What We Built" heading="Key features">
            <CaseStudyFeatureGroups groups={study.keyFeatures} />
          </CaseStudySection>
        </div>

        <div className="mb-16 md:mb-24">
          <CaseStudySection eyebrow="At a Glance" heading="The numbers">
            <CaseStudyStatGrid stats={study.stats} />
          </CaseStudySection>
        </div>

        {study.highlight && (
          <div className="mb-16 md:mb-24">
            <CaseStudyCallout>{study.highlight}</CaseStudyCallout>
          </div>
        )}

        <Reveal
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-5 py-10 md:py-14 border-t border-white/10 mb-12 md:mb-16"
        >
          <Heading as="h2" variant="sectionCompact" className="max-w-lg">
            Want something built like this?
          </Heading>
          <Text variant="gray" className="max-w-md">
            Tell us what you&apos;re trying to run, and we&apos;ll tell you
            what it takes to build it.
          </Text>
          <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
            <button className="pushable mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front"> Book a Call </span>
            </button>
          </a>
        </Reveal>

        <CaseStudyNav prev={prev} next={next} />
      </div>
    </article>
  );
}
