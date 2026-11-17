import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ViewTransition, type CSSProperties } from "react";
import { container, pricing, pricingIncludes, process, projects, site } from "@/lib/site";
import { DashboardMock, PhoneMock, StoreMock } from "./Mocks";
import { Arrow, Button, Reveal, Rise, SectionHead, Shell } from "./ui";
import { WorkCard } from "./WorkCard";

/* ------------------------------------ Work ------------------------------------ */

export function ProjectVisual({ id }: { id: string }) {
  if (id === "pulse")
    return (
      <div className="flex items-end justify-center gap-5">
        <div className="hidden translate-y-10 -rotate-6 opacity-60 transition-transform duration-700 ease-spring group-hover:-rotate-3 group-data-active:-rotate-3 lg:block">
          <PhoneMock />
        </div>
        <div className="rotate-3 transition-transform duration-700 ease-spring group-hover:rotate-0 group-data-active:rotate-0">
          <PhoneMock />
        </div>
      </div>
    );
  return (
    <div className="w-full max-w-xl -rotate-2 overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-transform duration-700 ease-spring group-hover:scale-[1.03] group-hover:rotate-0 group-data-active:scale-[1.03] group-data-active:rotate-0">
      {id === "crate" ? <StoreMock /> : <DashboardMock />}
    </div>
  );
}

export function Work() {
  const total = String(projects.length).padStart(2, "0");
  return (
    <section id="work" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40">
      <div className={container}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            title="Live products,"
            accent="not slide decks."
            body="Products we designed, built and put in real users' hands, from finance dashboards to clinic booking apps."
          />
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-fog uppercase">{total} selected products</p>
          </Reveal>
        </div>

        {/* Cards stick and stack; tall (mobile) cards pin by their bottom edge. See WorkCard. */}
        <div className="mt-16 space-y-6 md:space-y-12">
          {projects.map((p, i) => (
            <WorkCard
              key={p.id}
              index={i}
              style={{ "--accent": p.accent } as CSSProperties}
              className="group overflow-hidden rounded-[2rem] bg-coal shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_-30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
            >
              <div className="grid lg:min-h-[35rem] lg:grid-cols-2">
                <div className={`flex flex-col justify-between gap-10 p-6 sm:p-9 md:gap-12 md:p-12 lg:p-10 xl:p-12 ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                    <p className="font-serif text-4xl leading-none text-accent italic">
                      {String(i + 1).padStart(2, "0")}
                      <span className="ml-2 font-mono text-[11px] tracking-[0.2em] text-fog not-italic">/ {total}</span>
                    </p>
                    <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-fog uppercase">
                      <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent ring-1 ring-accent/25">{p.kind}</span>
                      {p.industry}
                    </p>
                  </div>

                  <div>
                    <ViewTransition name={`project-${p.id}`} share="morph" default="none">
                      <h3 className="w-max max-w-full text-5xl leading-[0.95] font-medium tracking-[-0.04em] sm:text-6xl xl:text-7xl">{p.name}</h3>
                    </ViewTransition>
                    <p className="mt-5 max-w-sm text-lg leading-relaxed text-pretty text-fog md:max-lg:max-w-lg">{p.summary}</p>
                    <ul className="mt-8 border-t border-white/10">
                      {p.highlights.map((h, j) => (
                        <li key={h} className="border-b border-white/10 py-3 text-sm text-zinc-200">
                          <Reveal variant="left" delay={0.1 + j * 0.07} className="flex items-center gap-3">
                            <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                            {h}
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-400">
                        {p.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-5 text-sm">
                        {p.href && (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="py-3 text-fog transition-colors duration-300 ease-spring hover:text-white"
                          >
                            Live product
                          </a>
                        )}
                        <Link
                          href={`/work/${p.id}`}
                          className="inline-flex items-center gap-2 py-3 text-accent transition-opacity duration-300 ease-spring hover:opacity-70"
                        >
                          Case study <Arrow />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  data-visual
                  className="relative flex min-h-80 items-center justify-center overflow-hidden p-5 sm:p-8 md:min-h-[26rem] md:p-12"
                  style={{
                    background:
                      "radial-gradient(circle at 60% 35%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 68%)",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_60%_35%,black,transparent_75%)] [background-size:44px_44px]"
                  />
                  <Reveal variant="tilt" delay={0.1} className="relative flex w-full justify-center">
                    <ProjectVisual id={p.id} />
                  </Reveal>
                </div>
              </div>
            </WorkCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Process ---------------------------------- */

export function Process() {
  return (
    <section id="process" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40">
      <div className={`${container} grid gap-12 md:gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20`}>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            title="Idea to launch."
            accent="Six weeks flat."
            body="No black box. You always know what is being built, what it costs and when you will see it."
          />
        </div>
        <ol className="border-t border-white/10">
          {process.map((p, i) => (
            <Reveal
              as="li"
              key={p.step}
              variant="right"
              delay={i * 0.06}
              className="group relative grid grid-cols-[auto_1fr] gap-x-5 border-b border-white/10 py-8 sm:gap-x-6 md:gap-x-10 md:py-12"
            >
              <Rise delay={0.15 + i * 0.06} className="font-serif text-5xl leading-none text-white/25 italic transition-colors duration-700 ease-spring group-hover:text-lime md:text-6xl">
                {p.step}
              </Rise>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">{p.title}</h3>
                  <span className="font-mono text-[11px] tracking-[0.15em] text-fog uppercase">{p.when}</span>
                </div>
                <p className="mt-3 max-w-md leading-relaxed text-pretty text-fog">{p.body}</p>
              </div>
              {/* Lime rule sweeps across the bottom border on hover. */}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-lime transition-transform duration-1000 ease-spring group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------- Pricing ---------------------------------- */

function Check({ className = "" }: { className?: string }) {
  return (
    <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${className}`}>
      <CheckIcon weight="bold" className="size-3" aria-hidden />
    </span>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40">
      <div className={container}>
        <SectionHead
          title="Real prices,"
          accent="right on the page."
          body="Three ways to work with us. Once the scope is locked, so is the price."
        />

        {/* Featured plan sits in the middle and stands taller on desktop; on tablets it spans the top row. */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-24 lg:grid-cols-[1fr_1.12fr_1fr]">
          {pricing.map((p, i) => {
            const f = p.featured;
            return (
              <Reveal
                key={p.name}
                variant={f ? "scale" : "tilt"}
                delay={f ? 0.25 : i * 0.1}
                className={
                  f ? "md:order-first md:col-span-2 lg:order-2 lg:col-span-1 lg:-my-7" : i === 1 ? "lg:order-1" : "lg:order-3"
                }
              >
                <div
                  className={`group h-full rounded-[2rem] p-1.5 ring-1 transition-[transform,box-shadow] duration-700 ease-spring hover:-translate-y-1.5 ${
                    f
                      ? "bg-lime/15 shadow-[0_0_90px_-25px_rgba(198,255,58,0.55)] ring-lime/40"
                      : "bg-white/[0.03] ring-white/10 hover:ring-white/20"
                  }`}
                >
                  <div
                    className={`relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] p-7 md:p-9 lg:p-7 xl:p-9 ${
                      f ? "bg-lime text-ink" : "bg-coal shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
                    }`}
                  >
                    {!f && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-24 left-1/2 size-56 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] opacity-0 transition-opacity duration-700 ease-spring group-hover:opacity-100"
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <h3 className={`font-mono text-[11px] tracking-[0.2em] uppercase ${f ? "text-ink/70" : "text-fog"}`}>
                        {p.name}
                      </h3>
                      {f && (
                        <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-lime uppercase">
                          Most popular
                        </span>
                      )}
                    </div>

                    <p className={`mt-6 text-xl leading-snug font-medium tracking-[-0.02em] text-pretty ${f ? "" : "text-zinc-200"}`}>
                      {p.bestFor}
                    </p>

                    <p className="mt-10 flex items-baseline gap-2">
                      <span className={`text-sm ${f ? "text-ink/60" : "text-fog"}`}>{p.prefix}</span>
                      <span className={`leading-none font-medium tracking-[-0.05em] ${f ? "text-7xl" : "text-6xl"}`}>{p.price}</span>
                      {p.suffix && <span className={`text-sm ${f ? "text-ink/60" : "text-fog"}`}>{p.suffix}</span>}
                    </p>
                    <p
                      className={`mt-5 w-max max-w-full rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.15em] uppercase ${
                        f ? "bg-ink/10 text-ink" : "bg-white/5 text-zinc-300 ring-1 ring-white/10"
                      }`}
                    >
                      {p.note}
                    </p>

                    <ul
                      className={`mt-9 grid flex-1 content-start gap-3.5 border-t pt-9 text-[15px] ${
                        f ? "border-ink/15 md:max-lg:grid-cols-2 md:max-lg:gap-x-8" : "border-white/10 text-zinc-300"
                      }`}
                    >
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <Check className={f ? "bg-ink text-lime" : "bg-white/10 text-lime"} />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <Button href="#contact" variant={f ? "dark" : "ghost"} className="mt-10 justify-between">
                      {f ? "Start my sprint" : `Talk about ${p.name}`}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 md:mt-20">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-fog">
            <li className="font-mono text-[11px] tracking-[0.2em] uppercase">Every plan includes</li>
            {pricingIncludes.map((x, i) => (
              <Reveal as="li" variant="pop" delay={0.1 + i * 0.06} key={x} className="flex items-center gap-2 text-zinc-300">
                <span className="size-1.5 rounded-full bg-lime" />
                {x}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Contact ---------------------------------- */

export function Contact() {
  return (
    <section id="contact" className="lg:-scroll-mt-14 px-4 py-20 sm:px-8 md:px-10 md:py-32 lg:py-40">
      <Reveal variant="clip" className="mx-auto max-w-[75rem]">
        <Shell inner="relative overflow-hidden px-5 py-16 text-center sm:px-10 sm:py-20 md:px-16 md:py-28 lg:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[520px] w-[820px] -translate-x-1/2 animate-breathe rounded-full bg-[radial-gradient(closest-side,rgba(198,255,58,0.22),transparent)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-[clamp(2.75rem,10vw,6rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance">
              <Rise delay={0.35}>Stop planning.</Rise>{" "}
              <Rise delay={0.5} className="font-serif font-normal tracking-[-0.02em] text-lime italic">
                Start shipping.
              </Rise>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-pretty text-fog">
              Tell us what you&apos;re building. Within one working day you&apos;ll have a reply, clear next steps and a
              ballpark quote.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={`mailto:${site.email}?subject=${encodeURIComponent("New project")}`}>{site.email}</Button>
              {site.bookingUrl && (
                <Button href={site.bookingUrl} variant="ghost">
                  Book a 20-min call
                </Button>
              )}
            </div>
          </div>
        </Shell>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <Reveal>
      <footer className={`${container} flex flex-col gap-6 border-t border-white/10 py-10 text-sm text-fog lg:flex-row lg:items-center lg:justify-between`}>
        <p className="flex items-center gap-2 text-white">
          <span className="size-2 rounded-full bg-lime" />
          {site.name}
          <span className="text-fog">· {site.tagline}</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 [&_a]:inline-block [&_a]:py-2">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors duration-300 ease-spring hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="transition-colors duration-300 ease-spring hover:text-white">
              {site.email}
            </a>
          </li>
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors duration-300 ease-spring hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs">© {site.year} {site.name}</p>
      </footer>
    </Reveal>
  );
}
