import { legal, type LegalDoc } from "@/lib/legal";
import { Nav } from "./Nav";
import { Footer } from "./Sections";
import { Reveal } from "./ui";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Nav home={false} />
      <main className="mx-auto w-full max-w-3xl px-4 pt-36 pb-24 md:px-10 md:pt-48 md:pb-40">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-fog uppercase">Last updated {legal.updated}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 text-5xl leading-[0.95] font-medium tracking-[-0.04em] md:text-7xl">
            {doc.title}{" "}
            <span className="font-serif font-normal tracking-[-0.02em] text-lime italic">{doc.accent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 text-lg leading-relaxed text-pretty text-zinc-300">{doc.intro}</p>
        </Reveal>

        <div className="mt-16 border-t border-white/10">
          {doc.sections.map((s, i) => (
            <Reveal key={s.heading}>
              <section className="grid gap-x-8 gap-y-4 border-b border-white/10 py-10 md:grid-cols-[3rem_1fr]">
                <span className="font-serif text-3xl leading-none text-white/25 italic">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-2xl font-medium tracking-[-0.02em]">{s.heading}</h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-pretty text-fog">
                    {s.body.map((block, j) =>
                      typeof block === "string" ? (
                        <p key={j}>{block}</p>
                      ) : (
                        <ul key={j} className="space-y-2">
                          {block.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-zinc-300">
                              <span className="size-1.5 shrink-0 rounded-full bg-lime" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
