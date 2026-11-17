"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { heroWords } from "@/lib/site";
import { EASE } from "./ui";

// Each line rises out of its clip via the CSS .hero-rise keyframe (globals.css), staggered by 0.12s,
// so the headline animates from first paint instead of waiting for hydration.
const line = (i: number) => ({ className: "block hero-rise", style: { animationDelay: `${0.1 + i * 0.12}s` } });

// Lines are clipped for the slide-up reveal; the padding keeps descenders and the italic swash visible.
const clip = "block overflow-hidden pt-[0.06em] pb-[0.16em] -mb-[0.16em] pl-[0.06em] -ml-[0.06em]";

export function HeroTitle() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % heroWords.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <h1
      aria-label={`Your ${heroWords[0]}, shipped in six weeks.`}
      className="max-w-5xl text-[clamp(2.9rem,9vw,7.25rem)] leading-[0.92] font-medium tracking-[-0.045em]"
    >
      <span aria-hidden className={clip}>
        <span {...line(0)}>
          Your{" "}
          {/* Rotating product type */}
          <span className="relative block overflow-hidden pb-[0.16em] -mb-[0.16em] sm:inline-block sm:align-bottom">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={heroWords[i]}
                className="inline-block whitespace-nowrap"
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-105%", opacity: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                {heroWords[i]},
              </m.span>
            </AnimatePresence>
          </span>
        </span>
      </span>

      <span aria-hidden className={clip}>
        <span {...line(1)}>shipped in</span>
      </span>

      <span aria-hidden className={clip}>
        <span {...line(2)}>
          <span className="relative inline-block font-serif font-normal tracking-[-0.02em] whitespace-nowrap text-lime italic">
            six weeks.
            {/* Hand-drawn underline that draws itself in */}
            <svg
              viewBox="0 0 300 14"
              preserveAspectRatio="none"
              fill="none"
              className="absolute -bottom-[0.1em] left-0 h-[0.14em] w-full overflow-visible"
            >
              <m.path
                d="M3 9 C 60 2, 150 2, 297 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
              />
            </svg>
          </span>
        </span>
      </span>
    </h1>
  );
}
