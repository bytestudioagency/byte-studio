"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { container, faqs } from "@/lib/site";
import { Reveal, SectionHead } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40">
      <div className={`${container} grid gap-10 md:gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20`}>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead title="No fluff." accent="Just answers." />
        </div>
        <div>
          <ul className="border-t border-white/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" variant="left" delay={i * 0.06} key={f.q} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-5 py-6 text-left sm:gap-6 md:py-7"
                    >
                      <span className="text-lg font-medium tracking-[-0.01em] text-pretty md:text-xl">{f.q}</span>
                      <span
                        className={`relative flex size-10 shrink-0 items-center justify-center rounded-full ring-1 transition-[background-color,transform] duration-500 ease-spring ${
                          isOpen ? "rotate-45 bg-lime text-ink ring-lime" : "bg-white/5 ring-white/10 group-hover:bg-white/10"
                        }`}
                      >
                        <PlusIcon weight="bold" aria-hidden className="size-3.5" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-spring ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-8 leading-relaxed text-pretty text-fog">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
