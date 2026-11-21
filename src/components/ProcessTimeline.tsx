"use client";

import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { container, process, site } from "@/lib/site";
import { Button, Reveal, SectionHead } from "./ui";

/**
 * Process steps on a timeline that fills as you scroll.
 *
 * Desktop (lg+): the section pins for a stretch of scroll and a lime line sweeps left to right
 * across four nodes; each step lights up as the line reaches its node.
 * Below lg: the same idea runs vertically down the list, with the line's tip tracking a point
 * 65% down the viewport, so each step lights as it scrolls past that point.
 * Reduced motion: no pinning, everything shown at once.
 */
export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [isLg, setIsLg] = useState(false);
  const [stops, setStops] = useState<number[]>(() => process.map((_, i) => i / process.length));
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Where each node sits along the line (0–1), so a step lights exactly when the fill reaches it.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const box = list.getBoundingClientRect();
      const nodes = list.querySelectorAll<HTMLElement>("[data-node]");
      setStops(
        Array.from(nodes, (n) => {
          const r = n.getBoundingClientRect();
          return isLg
            ? (r.left + r.width / 2 - box.left) / box.width
            : (r.top + r.height / 2 - box.top) / box.height;
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [isLg]);

  // Desktop: progress through the pinned track. Mobile: progress of the list past 65% of the viewport.
  const { scrollYProgress: pinned } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const { scrollYProgress: flowing } = useScroll({ target: listRef, offset: ["start 65%", "end 65%"] });
  const pinnedFill = useTransform(pinned, [0.08, 0.92], [0, 1], { clamp: true });

  // Play once: the fill only ever moves forward, so scrolling back up leaves the timeline complete.
  const highWater = useMotionValue(0);
  useMotionValueEvent(pinnedFill, "change", (v) => {
    if (isLg && v > highWater.get()) highWater.set(v);
  });
  useMotionValueEvent(flowing, "change", (v) => {
    if (!isLg && v > highWater.get()) highWater.set(v);
  });
  const fill = useSpring(highWater, { stiffness: 160, damping: 32, restDelta: 0.001 });

  useMotionValueEvent(fill, "change", (v) => {
    const n = stops.filter((s) => v >= s - 0.005).length;
    setReached((prev) => Math.max(prev, n));
  });

  const done = reduce ? process.length : reached;

  return (
    <div ref={trackRef} className="motion-safe:lg:h-[260vh]">
      <div className="motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:flex motion-safe:lg:h-svh motion-safe:lg:flex-col motion-safe:lg:justify-center motion-safe:lg:pt-20">
        <div className={container}>
          {/* CTA sits beside the heading on desktop so the pinned section doesn't grow taller. */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              title="No surprises."
              accent="No scope creep."
              body="Just clear milestones. You always know what is being built, what it costs and when you will see it."
            />
            <Reveal delay={0.2} className="flex shrink-0 flex-wrap gap-3">
              {site.bookingUrl && (
                <Button href={site.bookingUrl}>Book a Call</Button>
              )}
            </Reveal>
          </div>

          <ol ref={listRef} className="relative mt-14 grid lg:mt-20 lg:grid-cols-4">
            {/* Base rail + lime fill: vertical on mobile, horizontal on desktop. */}
            <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-white/10 lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
            <m.span
              aria-hidden
              style={reduce ? undefined : isLg ? { scaleX: fill } : { scaleY: fill }}
              className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-lime shadow-[0_0_12px_rgba(198,255,58,0.6)] lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left"
            />

            {process.map((p, i) => {
              const active = i < done;
              return (
                <li
                  key={p.step}
                  data-active={active || undefined}
                  className="group relative pb-12 pl-10 last:pb-0 lg:pt-12 lg:pr-8 lg:pb-0 lg:pl-0"
                >
                  {/* Node: hollow until the line reaches it, then fills lime with a soft pulse ring. */}
                  <span
                    data-node
                    aria-hidden
                    className="absolute top-0 left-0 flex size-[15px] items-center justify-center rounded-full bg-ink ring-1 ring-white/20 transition-[box-shadow,background-color] duration-500 ease-spring group-data-active:bg-lime group-data-active:ring-lime group-data-active:shadow-[0_0_0_6px_rgba(198,255,58,0.12),0_0_18px_rgba(198,255,58,0.5)]"
                  >
                    <span className="size-[5px] rounded-full bg-white/30 transition-colors duration-500 group-data-active:bg-ink" />
                  </span>

                  <div className="-mt-1 translate-y-3 opacity-35 transition-[opacity,translate] duration-700 ease-spring group-data-active:translate-y-0 group-data-active:opacity-100 lg:mt-0">
                    <span className="block font-serif text-4xl leading-none text-white/25 italic transition-colors duration-700 ease-spring group-data-active:text-lime md:text-5xl">
                      {p.step}
                    </span>
                    <h3 className="mt-5 text-xl font-medium tracking-[-0.02em] md:text-2xl">{p.title}</h3>
                    <p className="mt-3 max-w-sm leading-relaxed text-pretty text-fog">{p.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
