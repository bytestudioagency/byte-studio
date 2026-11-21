import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { container, site, whyUs } from "@/lib/site";
import { Button, Reveal, SectionHead, Shell } from "./ui";

function Cross() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-flare text-white shadow-[0_0_14px_rgba(255,77,77,0.35)]">
      <XIcon weight="bold" className="size-2.5" aria-hidden />
    </span>
  );
}

function Tick() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink shadow-[0_0_14px_rgba(198,255,58,0.3)]">
      <CheckIcon weight="bold" className="size-3" aria-hidden />
    </span>
  );
}

const cols = "lg:grid lg:grid-cols-[0.6fr_1fr_1fr]";
const mono = "font-mono text-[10px] tracking-[0.2em] uppercase";
// Desktop only: our column gets a lime tint and a hairline on its left edge.
const usCol = "lg:border-l lg:border-lime/20 lg:bg-lime/[0.05]";

export function WhyUs() {
  return (
    <section id="compare" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40">
      <div className={container}>
        <SectionHead
          title="The agency model,"
          accent="rebuilt from scratch."
          body="Blown budgets, missed dates, vanishing seniors. Projects break in the same few places. We engineered every one of them out."
        />

        <Reveal variant="clip" className="mt-16">
          <Shell inner="overflow-hidden">
            {/* Column headers (desktop) */}
            <div className={`hidden ${cols} border-b border-white/10 ${mono}`}>
              <span className="px-8 py-5 text-zinc-600">Compare</span>
              <span className="flex items-center gap-2 border-l border-white/[0.06] px-8 py-5 text-flare">
                <span className="size-1.5 rounded-full bg-flare" />
                {whyUs.them}
              </span>
              <span className={`flex items-center gap-2 px-8 py-5 text-lime ${usCol}`}>
                <span className="size-1.5 rounded-full bg-lime shadow-[0_0_8px_rgba(198,255,58,0.8)]" />
                {site.name}
              </span>
            </div>

            <ul>
              {whyUs.rows.map((r, i) => (
                <Reveal
                  as="li"
                  variant="right"
                  delay={0.2 + i * 0.07}
                  key={r.topic}
                  className={`group border-b border-white/[0.06] transition-colors duration-500 ease-spring last:border-b-0 hover:bg-white/[0.015] max-lg:px-5 max-lg:py-6 sm:max-lg:px-7 ${cols}`}
                >
                  <h3 className="flex items-baseline gap-3 lg:px-8 lg:py-6">
                    <span className={`text-zinc-600 ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-medium tracking-[-0.02em]">{r.topic}</span>
                  </h3>
                  <p className="mt-4 flex gap-3 leading-relaxed text-pretty text-zinc-500 lg:mt-0 lg:border-l lg:border-white/[0.06] lg:px-8 lg:py-6 lg:text-zinc-400">
                    <Cross />
                    <span>
                      <span className="sr-only">{whyUs.them}: </span>
                      {r.them}
                    </span>
                  </p>
                  <p className={`mt-3 flex gap-3 leading-relaxed text-pretty text-white transition-colors duration-500 ease-spring lg:mt-0 lg:px-8 lg:py-6 lg:group-hover:bg-lime/[0.09] ${usCol}`}>
                    <Reveal as="span" variant="pop" delay={0.5 + i * 0.07} className="flex shrink-0">
                      <Tick />
                    </Reveal>
                    <span>
                      <span className="sr-only">{site.name}: </span>
                      {r.us}
                    </span>
                  </p>
                </Reveal>
              ))}
            </ul>
          </Shell>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-14">
          <Button href={site.bookingUrl || "#contact"}>Book a Call</Button>
        </Reveal>
      </div>
    </section>
  );
}
