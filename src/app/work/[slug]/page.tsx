import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition, type CSSProperties } from "react";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Contact, Footer, ProjectVisual } from "@/components/Sections";
import { Arrow, Reveal } from "@/components/ui";
import { container, projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  const title = `${project.name}: ${project.industry.toLowerCase()} ${project.kind.toLowerCase()} case study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: { title, description: project.summary, type: "article" },
  };
}

const label = "font-mono text-[11px] tracking-[0.2em] text-fog uppercase";

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { k: "Industry", v: project.industry },
    { k: "Product", v: project.kind },
    { k: "Timeline", v: project.timeline },
    { k: "Stack", v: project.tags.join(", ") },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(project.name, `/work/${project.id}`)} />
      <Nav home={false} />
      <main style={{ "--accent": project.accent } as CSSProperties}>
        <article>
          <header className={`${container} pt-36 md:pt-48`}>
            <Reveal>
              <Link
                href="/#work"
                className={`${label} group inline-flex items-center gap-2 transition-colors duration-300 ease-spring hover:text-white`}
              >
                <Arrow className="-rotate-[135deg] transition-transform duration-500 ease-spring group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />{" "}
                All work
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <p className={`${label} mt-10 flex items-center gap-3`}>
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent ring-1 ring-accent/25">{project.kind}</span>
                {project.industry}
              </p>
            </Reveal>
            {/* Not wrapped in Reveal: it is the landing spot for the name morphing in from its work card. */}
            <ViewTransition name={`project-${project.id}`} share="morph" default="none">
              <h1 className="mt-6 w-max max-w-full text-6xl leading-[0.9] font-medium tracking-[-0.04em] md:text-9xl">
                {project.name}
              </h1>
            </ViewTransition>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-pretty text-zinc-300 md:text-2xl">{project.summary}</p>
            </Reveal>
          </header>

          <div className={`${container} mt-14 md:mt-20`}>
            <Reveal>
              <div
                className="group relative flex min-h-80 items-center justify-center overflow-hidden rounded-[2rem] bg-coal p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] ring-1 ring-white/10 md:min-h-[38rem] md:p-16"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 68%), var(--color-coal)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_75%)] [background-size:44px_44px]"
                />
                <div className="relative flex w-full justify-center md:scale-125">
                  <ProjectVisual id={project.id} />
                </div>
              </div>
            </Reveal>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-b border-white/10 pb-10 md:grid-cols-4">
              {facts.map((f, i) => (
                <Reveal key={f.k} delay={i * 0.06}>
                  <dt className={label}>{f.k}</dt>
                  <dd className="mt-2 text-zinc-200">{f.v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <div className={`${container} py-8 md:py-16`}>
            {[
              { n: "01", title: "The problem", text: project.challenge },
              { n: "02", title: "What we built", text: project.solution, list: project.highlights },
            ].map((s) => (
              <Reveal key={s.n}>
                <section className="grid gap-x-20 gap-y-6 border-b border-white/10 py-12 md:grid-cols-[1fr_1.4fr] md:py-20">
                  <h2 className="flex items-baseline gap-5 text-3xl font-medium tracking-[-0.03em] md:text-5xl">
                    <span className="font-serif text-2xl font-normal text-accent italic md:text-3xl">{s.n}</span>
                    {s.title}
                  </h2>
                  <div>
                    <p className="max-w-xl text-lg leading-relaxed text-pretty text-fog">{s.text}</p>
                    {s.list && (
                      <ul className="mt-8 max-w-xl border-t border-white/10">
                        {s.list.map((h) => (
                          <li key={h} className="flex items-center gap-3 border-b border-white/10 py-3 text-sm text-zinc-200">
                            <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <section className="py-12 md:py-20">
                <h2 className="flex items-baseline gap-5 text-3xl font-medium tracking-[-0.03em] md:text-5xl">
                  <span className="font-serif text-2xl font-normal text-accent italic md:text-3xl">03</span>
                  The outcome
                </h2>
                <dl className="mt-10 grid gap-4 md:grid-cols-3">
                  {project.results.map((r, i) => (
                    <Reveal
                      key={r.label}
                      delay={0.1 + i * 0.08}
                      className="flex flex-col-reverse gap-3 rounded-[1.5rem] bg-coal p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] ring-1 ring-white/10 transition-[box-shadow] duration-700 ease-spring hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_60px_-20px_var(--accent)]"
                    >
                      <dt className="text-sm text-fog">{r.label}</dt>
                      <dd className="font-serif text-6xl leading-none text-accent italic">{r.value}</dd>
                    </Reveal>
                  ))}
                </dl>
              </section>
            </Reveal>
          </div>
        </article>

        <div className={container}>
          <Link
            href={`/work/${next.id}`}
            style={{ "--accent": next.accent } as CSSProperties}
            className="group flex items-end justify-between gap-6 border-y border-white/10 py-10 md:py-14"
          >
            <span>
              <span className={label}>Next project</span>
              <span className="mt-3 block text-5xl leading-none font-medium tracking-[-0.04em] transition-colors duration-500 ease-spring group-hover:text-accent md:text-8xl">
                {next.name}
              </span>
            </span>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-[transform,background-color,color] duration-500 ease-spring group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-accent group-hover:text-ink md:size-20">
              <Arrow className="md:size-5" />
            </span>
          </Link>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
