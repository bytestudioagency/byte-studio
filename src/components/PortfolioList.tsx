"use client";

import { AnimatePresence, m, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { projects } from "@/lib/site";
import { Arrow, Reveal } from "./ui";

const SPRING = { stiffness: 250, damping: 30, mass: 0.5 };

/** Desktop, fine pointer, motion allowed: the only sessions that get the cursor-following preview. */
function usePreviewSupported() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return ok;
}

const mono = "font-mono text-[10px] tracking-[0.2em] uppercase";
// No. | project | type | industry | arrow
const cols = "md:grid md:grid-cols-[4rem_1fr_9rem_9rem_3.5rem] md:items-center lg:grid-cols-[5rem_1fr_11rem_11rem_3.5rem]";

/**
 * Index of case studies as a ruled table. Hovering a row sweeps its accent across it, and on
 * desktop a screenshot of the hovered project follows the cursor, tilting with its speed.
 */
export function PortfolioList({ studies }: { studies: typeof projects }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const previewSupported = usePreviewSupported();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  // Lean into the direction of travel, settling back to level when the cursor stops.
  const rotate = useSpring(useTransform(useVelocity(x), [-2500, 0, 2500], [-9, 0, 9]), SPRING);

  const active = hovered === null ? null : studies[hovered];

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      {/* Column headers (tablet and up) */}
      <div className={`hidden gap-5 border-b border-white/10 pb-4 text-zinc-600 ${cols} ${mono}`}>
        <span>No.</span>
        <span>Project</span>
        <span>Type</span>
        <span>Industry</span>
        <span />
      </div>

      <ul>
        {studies.map((study, index) => (
          <Reveal as="li" key={study.id} variant="right" delay={index * 0.06}>
            <Link
              href={`/portfolio/${study.id}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(null)}
              style={{ "--accent": study.accent } as CSSProperties}
              className={`group relative flex items-center gap-5 overflow-hidden border-b border-white/10 py-6 md:py-9 ${cols}`}
            >
              {/* Accent wash and rule that sweep in from the left on hover. */}
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_80%)] transition-transform duration-700 ease-spring group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-1000 ease-spring group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />

              <span className="relative hidden font-serif text-3xl leading-none text-white/25 italic transition-colors duration-500 ease-spring group-hover:text-accent md:block">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="relative min-w-0 flex-1">
                <span className={`mb-3 flex items-center gap-3 text-fog md:hidden ${mono}`}>
                  <span className="font-serif text-base tracking-normal text-accent normal-case italic">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {study.kind} · {study.industry}
                </span>
                <span className="block text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] font-medium tracking-[-0.04em] transition-[color,transform] duration-700 ease-spring group-hover:translate-x-2 group-hover:text-accent md:group-hover:translate-x-4">
                  {study.name}
                </span>
                <span className="mt-3 block max-w-lg text-sm leading-relaxed text-pretty text-fog transition-transform duration-700 ease-spring md:text-base md:group-hover:translate-x-4">
                  {study.summary}
                </span>
              </span>

              <span className="relative hidden md:block">
                <span className={`rounded-full bg-accent/10 px-2.5 py-1 text-accent ring-1 ring-accent/25 ${mono}`}>
                  {study.kind}
                </span>
              </span>
              <span className={`relative hidden text-zinc-400 md:block ${mono}`}>{study.industry}</span>

              {/* Phones get the screenshot inline, since there is no hover to reveal it. */}
              <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10 sm:w-32 md:hidden">
                <Image src={study.image} alt="" fill sizes="8rem" className="object-cover object-top" />
              </span>

              <span className="relative hidden size-12 items-center justify-center justify-self-end rounded-full bg-white/5 ring-1 ring-white/10 transition-[transform,background-color,color] duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-ink md:flex">
                <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      {previewSupported && (
        <AnimatePresence>
          {active && (
            <m.div
              key={active.id}
              aria-hidden
              className="pointer-events-none fixed z-50 aspect-[16/10] w-80 lg:w-96"
              style={{
                left: springX,
                top: springY,
                translateX: "-50%",
                translateY: "-115%",
                rotate,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{ "--accent": active.accent } as CSSProperties}
                className="relative size-full overflow-hidden rounded-2xl bg-coal shadow-[0_30px_90px_-25px_var(--accent)] ring-1 ring-accent/40"
              >
                <Image src={active.image} alt="" fill sizes="24rem" className="object-cover object-top" />
                <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white uppercase backdrop-blur">
                  <span className="size-1.5 rounded-full bg-accent" />
                  View case study
                </span>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
