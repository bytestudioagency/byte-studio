"use client";

import { m } from "motion/react";
import { hero } from "@/lib/site";
import { EASE } from "./ui";

// Each line rises out of its clip via the CSS .hero-rise keyframe (globals.css), staggered by 0.12s,
// so the headline animates from first paint instead of waiting for hydration.
const line = (i: number) => ({ className: "block hero-rise", style: { animationDelay: `${0.1 + i * 0.12}s` } });

// Lines are clipped for the slide-up reveal; the padding keeps descenders and the italic swash visible.
const clip = "block overflow-hidden pt-[0.06em] pb-[0.16em] -mb-[0.16em] pl-[0.06em] -ml-[0.06em]";

export function HeroTitle() {
  return (
    <h1
      aria-label={`${hero.lines.join(" ")} ${hero.accent}`}
      className="max-w-5xl text-[clamp(2.6rem,8.4vw,6.75rem)] leading-[0.92] font-medium tracking-[-0.045em]"
    >
      {hero.lines.map((text, i) => (
        <span key={text} aria-hidden className={clip}>
          <span {...line(i)}>{text}</span>
        </span>
      ))}

      <span aria-hidden className={clip}>
        <span {...line(hero.lines.length)}>
          <span className="relative inline-block font-serif font-normal tracking-[-0.02em] text-lime italic sm:whitespace-nowrap">
            {hero.accent}
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
