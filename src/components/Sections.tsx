import { CheckIcon, GlobeIcon, InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type CSSProperties } from "react";
import { container, pricing, pricingIncludes, projects, site } from "@/lib/site";
import { Arrow, Button, Reveal, Rise, SectionHead, Shell } from "./ui";
import { ProcessTimeline } from "./ProcessTimeline";
import { WorkCard } from "./WorkCard";

/* ------------------------------------ Work ------------------------------------ */

/** A project's main screenshot, tilted in its frame; straightens on hover (or scroll, on touch). */
export function ProjectVisual({ project, sizes, preload = false }: { project: { name: string; image: string }; sizes: string; preload?: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full max-w-xl -rotate-2 overflow-hidden rounded-[1.5rem] bg-coal shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-transform duration-700 ease-spring group-hover:scale-[1.03] group-hover:rotate-0 group-data-active:scale-[1.03] group-data-active:rotate-0">
      <Image
        src={project.image}
        alt={`${project.name} screenshot`}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover object-top"
      />
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
            body="Systems we designed, built and put in real users' hands, from store back offices to villa booking platforms."
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
              {/* minmax(0,1fr) tracks + min-w-0: the w-max title must not widen the column past the card on mobile. */}
              <div className="grid grid-cols-1 lg:min-h-[35rem] lg:grid-cols-2">
                <div className={`flex min-w-0 flex-col justify-between gap-10 p-6 sm:p-9 md:gap-12 md:p-12 lg:p-10 xl:p-12 ${i % 2 ? "lg:order-2" : ""}`}>
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
                          href={`/portfolio/${p.id}`}
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
                    <ProjectVisual project={p} sizes="(min-width: 1024px) 36rem, 100vw" />
                  </Reveal>
                </div>
              </div>
            </WorkCard>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-3 md:mt-20">
          <Button href="#contact">Start a project</Button>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full bg-white/5 py-2 pr-2 pl-6 text-sm font-medium text-white ring-1 ring-white/10 transition-[transform,background-color] duration-500 ease-spring hover:bg-white/10 active:scale-[0.97]"
          >
            See all case studies
            <span className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <Arrow />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- Process ---------------------------------- */

export function Process() {
  return (
    <section id="process" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40 motion-safe:lg:py-0">
      <ProcessTimeline />
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
          body="No mystery. No magic. A flat fee for the scope, no hourly billing, no surprise invoices."
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
                  f ? "md:order-first md:col-span-2 lg:order-2 lg:col-span-1 lg:-my-7" : i === 0 ? "lg:order-1" : "lg:order-3"
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
                      {p.prefix && <span className={`text-sm ${f ? "text-ink/60" : "text-fog"}`}>{p.prefix}</span>}
                      <span className={`leading-none font-medium tracking-[-0.05em] whitespace-nowrap ${f ? "text-6xl xl:text-7xl" : "text-5xl xl:text-6xl"}`}>{p.price}</span>
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

                    <Button
                      href={p.book && site.bookingUrl ? site.bookingUrl : "#contact"}
                      variant={f ? "dark" : "ghost"}
                      className="mt-10 justify-between"
                    >
                      {p.cta}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 md:mt-20">
          <p className="font-mono text-[11px] tracking-[0.2em] text-fog uppercase">Every plan includes</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-zinc-300 md:flex md:items-center md:gap-x-10">
            {pricingIncludes.map((x, i) => (
              <Reveal as="li" variant="pop" delay={0.1 + i * 0.06} key={x} className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-lime" />
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
              {site.email && (
                <Button href={`mailto:${site.email}?subject=${encodeURIComponent("New project")}`}>{site.email}</Button>
              )}
              {site.bookingUrl && (
                <Button href={site.bookingUrl} variant={site.email ? "ghost" : undefined}>
                  Book a call
                </Button>
              )}
            </div>
          </div>
        </Shell>
      </Reveal>
    </section>
  );
}

/** Icon per social label in `site.socials`; unknown labels fall back to a globe. */
const socialIcons: Record<string, Icon> = {
  X: XLogoIcon,
  LinkedIn: LinkedinLogoIcon,
  Instagram: InstagramLogoIcon,
};

export function Footer() {
  return (
    <Reveal>
      <footer className={`${container} grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-5 border-t border-white/10 py-10 text-sm text-fog lg:flex lg:justify-between`}>
        {/* Below lg the list dissolves into the footer grid: logo | socials, email, legal | copyright. */}
        <p className="flex items-center gap-3 text-white">
          <Image src="/brand/logo.png" alt={site.name} width={1191} height={215} className="h-5 w-auto" />
        </p>
        <ul role="list" className="contents lg:flex lg:flex-wrap lg:items-center lg:gap-x-6 lg:gap-y-1 [&_a]:inline-block [&_a]:py-2">
          {site.socials.length > 0 && (
            <li className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end">
              {site.socials.map((s) => {
                const SocialIcon = socialIcons[s.label] ?? GlobeIcon;
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="!flex size-10 items-center justify-center rounded-full bg-white/5 text-fog ring-1 ring-white/10 transition-[color,background-color,transform] duration-300 ease-spring !py-0 hover:-translate-y-0.5 hover:bg-white/10 hover:text-lime active:scale-95"
                  >
                    <SocialIcon weight="fill" className="size-[18px]" aria-hidden />
                  </a>
                );
              })}
            </li>
          )}
          {site.email && (
            <li className="col-span-2">
              <a href={`mailto:${site.email}`} className="transition-colors duration-300 ease-spring hover:text-white">
                {site.email}
              </a>
            </li>
          )}
          <li className="col-start-1 flex items-baseline gap-6 self-baseline lg:self-auto">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors duration-300 ease-spring hover:text-white">
                {l.label}
              </Link>
            ))}
          </li>
        </ul>
        <p className="col-start-2 self-baseline justify-self-end font-mono text-xs lg:self-auto">© {site.year} {site.name}</p>
      </footer>
    </Reveal>
  );
}
