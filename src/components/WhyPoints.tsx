"use client";

import { m, useReducedMotion } from "motion/react";
import { container, whyPoints } from "@/lib/site";
import { SectionHead } from "./ui";

/** Six reasons to work with us: a big gradient numeral beside each, sliding in from the left one after another. */
export function WhyPoints() {
  const reduce = useReducedMotion();
  return (
    <section id="why" aria-labelledby="why-points" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40">
      <div className={container}>
        <div id="why-points">
          <SectionHead title={whyPoints.title} accent={whyPoints.accent} body={whyPoints.body} />
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:mt-20 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-16">
          {whyPoints.points.map((p, i) => (
            <m.li
              key={p.title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              // Plays once, the first time the row scrolls into view.
              viewport={{ once: true, amount: 0.1 }}
              transition={reduce ? { duration: 0 } : { duration: 1, delay: i * 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <span
                aria-hidden
                className="shrink-0 bg-linear-to-l from-lime to-lime/25 bg-clip-text text-[88px] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent tabular-nums"
              >
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{p.title}</h3>
                <p className="mt-1 max-w-sm leading-relaxed text-pretty text-fog">{p.body}</p>
              </div>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
