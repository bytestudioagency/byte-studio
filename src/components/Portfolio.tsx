import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";

type WorkMedia =
  | { kind: "photo"; src: string }
  | { kind: "brandmark"; src: string };

interface Work {
  title: string;
  hook: string;
  problem: string;
  build: string;
  outcome: string;
  media: WorkMedia;
}

const works: Work[] = [
  {
    title: "Apna Store",
    hook: "Replaced spreadsheet-run store ops with one connected system.",
    problem: "Manual, disconnected operations",
    build: "Storefront + admin back office",
    outcome: "One system, real-time reporting",
    media: { kind: "brandmark", src: "/works/apna-store-icon.png" },
  },
  {
    title: "Elevate Developers",
    hook: "Turned project browsing into a structured buyer-lead pipeline.",
    problem: "No credible lead-gen presence",
    build: "Projects, floor plans & lead forms",
    outcome: "Structured inquiries, not cold calls",
    media: { kind: "photo", src: "/works/elevate.png" },
  },
  {
    title: "Turant News",
    hook: "An end-to-end news platform, from posting to ad-driven monetization.",
    problem: "Needed social mechanics, not just a feed",
    build: "Mobile app + admin & moderation dashboard",
    outcome: "Content, moderation & ads in one loop",
    media: { kind: "photo", src: "/works/turant.png" },
  },
  {
    title: "StayFinder",
    hook: "A full booking lifecycle that keeps availability honest automatically.",
    problem: "Unpaid holds locking up inventory",
    build: "Booking site + auto-expiring holds",
    outcome: "Accurate availability, zero manual cleanup",
    media: { kind: "photo", src: "/works/stayfinder.png" },
  },
  {
    title: "Keanas Skin Clinic",
    hook: "A fast landing page built to convert paid social traffic.",
    problem: "No ad-ready web presence",
    build: "Single-page site + Pixel tracking",
    outcome: "Measurable ad spend, not blind spend",
    media: { kind: "photo", src: "/works/keanas.webp" },
  },
];

const stages: { label: string; key: keyof Pick<Work, "problem" | "build" | "outcome"> }[] = [
  { label: "Problem", key: "problem" },
  { label: "Build", key: "build" },
  { label: "Outcome", key: "outcome" },
];

const WorkMediaPanel = ({ media, title }: { media: WorkMedia; title: string }) => {
  if (media.kind === "photo") {
    return (
      <Image
        src={media.src}
        alt={title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#08186D] to-black flex items-center justify-center p-14 md:p-16">
      <div className="relative w-full h-full">
        <Image
          src={media.src}
          alt={title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <section
      className="relative text-white py-12 px-6 md:py-16 md:px-12 lg:py-20 lg:px-24"
      id="portfolio"
    >
      <Reveal
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.01 }}
      >
        {/* Title */}
        <Heading className="text-center mb-2 md:mb-3">Portfolio</Heading>
        <Text
          variant="muted"
          className="text-center max-w-prose md:max-w-xl mx-auto my-5 md:my-6"
        >
          Real builds, at a glance.
        </Text>

        {/* Works Grid */}
        <Reveal
          className="mt-10 md:mt-14 lg:mt-16 max-w-6xl mx-auto space-y-10 md:space-y-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.01 }}
        >
          {works.map((work, index) => {
            const isImageFirst = index % 2 === 0;

            return (
              <Reveal
                key={work.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
              >
                {/* Image */}
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-lg h-[280px] md:h-[360px] lg:h-[400px] ${
                    isImageFirst ? "order-2 md:order-1" : "order-2 md:order-2"
                  }`}
                >
                  <WorkMediaPanel media={work.media} title={work.title} />
                </div>

                {/* Card */}
                <div
                  className={`relative overflow-hidden bg-white/[0.02] border border-white/10 text-left p-6 md:p-7 lg:p-8 rounded-3xl flex flex-col justify-between min-h-[280px] md:min-h-[360px] lg:min-h-[400px] ${
                    isImageFirst ? "order-1 md:order-2" : "order-1 md:order-1"
                  }`}
                >
                  <div className="absolute top-0 left-0 w-2/3 h-[1px] bg-gradient-to-r from-[#A1AEF7] to-transparent pointer-events-none" />
                  <span className="absolute top-6 right-6 md:top-7 md:right-7 font-heading text-[64px] md:text-[80px] leading-none text-white/[0.05] select-none pointer-events-none tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10">
                    <Heading as="h3" variant="title">
                      {work.title}
                    </Heading>
                    <Text variant="gray" className="mt-3 md:mt-4 max-w-sm">
                      {work.hook}
                    </Text>
                  </div>

                  <div className="relative z-10 flex flex-col gap-2.5 md:gap-3 pt-6 md:pt-8 mt-6 border-t border-white/10">
                    {stages.map(({ label, key }) => (
                      <div key={label} className="flex items-baseline gap-3">
                        <Text
                          variant="lavender"
                          className="text-caption uppercase tracking-[0.14em] w-16 md:w-[4.5rem] shrink-0"
                        >
                          {label}
                        </Text>
                        <Text variant="gray" className="leading-snug">
                          {work[key]}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </Reveal>
      </Reveal>
    </section>
  );
};

export default Portfolio;
