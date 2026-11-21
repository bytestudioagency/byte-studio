import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { PortfolioList } from "@/components/PortfolioList";
import { Contact, Footer } from "@/components/Sections";
import { Reveal, Rise } from "@/components/ui";
import { container, projects, site } from "@/lib/site";

const description =
  "Client and product work from Byte Studio - the problem, the build, and the outcome behind every project.";

export const metadata: Metadata = {
  title: "Portfolio",
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: { title: `Portfolio — ${site.name}`, description, type: "website" },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Portfolio",
  description,
  url: `${site.url}/portfolio`,
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${site.url}/portfolio/${p.id}`,
      image: `${site.url}${p.image}`,
    })),
  },
};

const label = "font-mono text-[11px] tracking-[0.2em] text-fog uppercase";

export default function WorkIndex() {
  const industries = [...new Set(projects.map((p) => p.industry))];

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <Nav home={false} />
      <main>
        <header className="relative isolate">
          {/* Ambient glow, as in the home hero */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] overflow-hidden">
            <div className="absolute top-[-260px] left-[10%] h-[520px] w-[min(820px,150vw)] animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(198,255,58,0.13),transparent)]" />
          </div>

          <div className={`${container} pt-36 md:pt-48`}>
            <h1 className="max-w-5xl text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.045em]">
              <Rise delay={0.05}>Work that</Rise>{" "}
              <Rise delay={0.18} className="font-serif font-normal tracking-[-0.02em] text-lime italic">
                runs businesses.
              </Rise>
            </h1>

            <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
              <Reveal delay={0.25} className="max-w-md">
                <p className="text-lg leading-relaxed text-pretty text-fog">
                  Stores, clinics, villas and newsrooms - real businesses that now run on systems we built.
                </p>
              </Reveal>
              <Reveal delay={0.32}>
                <dl className="flex gap-10 md:gap-14">
                  <div>
                    <dt className={label}>Case studies</dt>
                    <dd className="mt-2 text-4xl font-medium tracking-[-0.04em]">{String(projects.length).padStart(2, "0")}</dd>
                  </div>
                  <div>
                    <dt className={label}>Industries</dt>
                    <dd className="mt-2 text-4xl font-medium tracking-[-0.04em]">{String(industries.length).padStart(2, "0")}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </header>

        <div className={`${container} pt-12 md:pt-20`}>
          <PortfolioList studies={projects} />
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
