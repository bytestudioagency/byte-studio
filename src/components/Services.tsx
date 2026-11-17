"use client";

import { useState } from "react";
import { container, services } from "@/lib/site";
import { Rise, SectionHead } from "./ui";

function CodeWindow({ file, code }: { file: string; code: string[] }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[1.5rem] bg-[#08080a] ring-1 ring-white/10" aria-hidden>
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[10px] text-fog">{file}</span>
      </div>
      <pre data-lenis-prevent-touch className="overflow-x-auto overscroll-x-contain p-4 font-mono sm:p-5 text-[12px] leading-6 md:text-[13px]">
        {code.map((line, i) => (
          <div key={i} className="flex gap-5">
            <span className="w-4 shrink-0 text-right text-white/20 select-none">{i + 1}</span>
            <span className={line.trimStart().startsWith("//") ? "text-lime/80" : "text-zinc-300"}>{line || " "}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="py-20 lg:-scroll-mt-14 md:py-32 lg:py-40">
      <div className={container}>
        <SectionHead
          title="Four crafts."
          accent="Zero compromises."
          body="We don't do everything. We do four things at full depth, with senior engineers on every project from first sketch to launch."
        />

        <div className="mt-16 md:mt-20">
          <ul className="border-t border-white/10">
            {services.map((s, i) => {
              const isOpen = open === i;
              return (
                <li key={s.id} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`service-${s.id}`}
                      onClick={() => setOpen(i)}
                      className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-3 py-7 text-left sm:gap-x-4 md:py-9 lg:grid-cols-[5rem_1fr_auto] lg:py-10"
                    >
                      <span
                        className={`font-mono text-xs tracking-[0.2em] transition-colors duration-500 ease-spring ${
                          isOpen ? "text-lime" : "text-fog"
                        }`}
                      >
                        <Rise delay={0.1 + i * 0.08}>0{i + 1}</Rise>
                      </span>
                      <span
                        className={`text-[clamp(1.875rem,7.5vw,4.5rem)] leading-none font-medium tracking-[-0.04em] transition-[color,transform] duration-700 ease-spring ${
                          isOpen ? "text-white" : "text-white/35 group-hover:translate-x-2 group-hover:text-white/80"
                        }`}
                      >
                        <Rise delay={i * 0.08}>{s.title}</Rise>
                      </span>
                      <span
                        className={`relative flex size-11 shrink-0 items-center justify-center rounded-full ring-1 transition-[background-color,transform] duration-700 ease-spring md:size-12 ${
                          isOpen ? "rotate-45 bg-lime text-ink ring-lime" : "bg-white/5 ring-white/10 group-hover:bg-white/10"
                        }`}
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <span className="absolute h-3.5 w-px bg-current" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`service-${s.id}`}
                    role="region"
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-spring ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid min-w-0 gap-8 pb-10 md:pb-12 lg:grid-cols-[5rem_1fr_1.15fr] lg:gap-x-4 lg:pb-14">
                        <span className="hidden lg:block" />
                        {/* Tablet: copy and bullet list sit side by side above the code window. */}
                        <div className="flex min-w-0 flex-col justify-between gap-8 md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-start md:max-lg:gap-10 lg:pr-10">
                          <p className="max-w-md text-lg leading-relaxed text-pretty text-fog">{s.body}</p>
                          <ul className="border-t border-white/10">
                            {s.points.map((p, j) => (
                              <li
                                key={p}
                                style={{ transitionDelay: isOpen ? `${180 + j * 60}ms` : "0ms" }}
                                className={`flex items-center gap-3 border-b border-white/10 py-3 text-sm text-zinc-200 transition-[opacity,transform] duration-700 ease-spring ${
                                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                                }`}
                              >
                                <span className="size-1.5 shrink-0 rounded-full bg-lime" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div
                          className={`min-w-0 transition-[opacity,transform,filter] duration-1000 ease-spring ${
                            isOpen ? "translate-y-0 opacity-100 blur-0 delay-150" : "translate-y-4 opacity-0 blur-sm"
                          }`}
                        >
                          <CodeWindow file={s.file} code={s.code} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
