"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  motionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";
import { useSmoothScrollY } from "@/components/ui/smooth-scroll";

// Framer's useReducedMotion() resolves synchronously on the client, which
// mismatches the server's render (it has no matchMedia) and forces a full
// re-render on hydration. Defer to an effect instead, same pattern as
// useSmoothScrollSupported in smooth-scroll.tsx: assume false for the first
// paint on both sides, then correct after mount.
const useSafeReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
};

type WorkMedia =
  | { kind: "photo"; src: string }
  | { kind: "brandmark"; src: string }
  | { kind: "placeholder"; monogram: string };

interface Work {
  title: string;
  slug: string;
  hook: string;
  problem: string;
  build: string;
  outcome: string;
  media: WorkMedia;
}

const works: Work[] = [
  {
    title: "Apna Store",
    slug: "apna-store",
    hook: "Replaced spreadsheet-run store ops with one connected system.",
    problem: "Manual, disconnected operations across stock, suppliers, and billing",
    build: "A customer storefront plus a full admin back office",
    outcome: "One connected system with real-time stock and sales reporting",
    media: { kind: "photo", src: "/portfolio/apna-store/1.png" },
  },
  {
    title: "Turant News",
    slug: "turant",
    hook: "An end-to-end news platform, from posting to ad-driven monetization.",
    problem: "Needed real social mechanics and moderation, not just a passive feed",
    build: "A mobile app paired with an admin and moderation dashboard",
    outcome: "Content, moderation, and ad monetization running in one loop",
    media: { kind: "photo", src: "/portfolio/turant/1.png" },
  },
  {
    title: "StayFinder",
    slug: "stayfinder",
    hook: "A full booking lifecycle that keeps availability honest automatically.",
    problem: "Unpaid holds could lock up villa inventory indefinitely",
    build: "A booking site where unpaid holds expire automatically",
    outcome: "Accurate availability with zero manual cleanup required",
    media: { kind: "photo", src: "/portfolio/stay-finder/1.png" },
  },
  {
    title: "Keanas Skin Clinic",
    slug: "keanas-skin-clinic",
    hook: "A fast landing page built to convert paid social traffic.",
    problem: "No ad-ready web presence to convert paid social traffic",
    build: "A single-page site with Facebook Pixel tracking built in",
    outcome: "Measurable ad spend instead of running campaigns blind",
    media: { kind: "photo", src: "/portfolio/keanas/1.png" },
  },
];

const stages: { label: string; key: keyof Pick<Work, "problem" | "build" | "outcome"> }[] = [
  { label: "Problem", key: "problem" },
  { label: "Build", key: "build" },
  { label: "Outcome", key: "outcome" },
];

// Each card's section (`h-[…]` on the wrapper below) is sized as that
// card's nominal min-height (600 / 460 / 500, matching the card's
// breakpoints) plus a ~260px buffer, so there's real scroll room for it
// to pin and settle before the next card's turn begins. This has to be a
// fixed pixel amount, not vh-based: vh scales with the viewport, but the
// card's height doesn't, so on a short mobile viewport a vh-sized
// section ended up shorter than the (fixed-height) card it holds, which
// broke the last card's release point and let the CTA underneath bleed
// through it. The card itself uses `min-h-` rather than `h-` so long
// wrapped copy (mobile stacks image + text in one column) can grow past
// the nominal size instead of getting clipped by `overflow-hidden` - the
// pin math below re-measures the card's real height live, so it still
// tracks correctly even when a card grows taller than this nominal
// number. The container's total height below is `works.length` times
// these same per-breakpoint numbers - if the card heights or
// `works.length` change, update both together.

// Distance from the viewport top where each card pins - keep in sync with
// the `top-60` fallback class used when the smooth-scroll wrapper is off.
// Needs enough clearance below the fixed navbar (80px) that even the most
// receded peeking card (pinned here too, then nudged up by fanOffset)
// never rises above it.
const PIN_OFFSET = 240;

// Fraction of the section's total scroll progress after which a given
// card starts shrinking - matches how far you have to scroll before a
// card starts getting covered by newer ones arriving after it.
const RANGE_STEP = 0.2;

// Scale lost per card still to come. A card near the start of the list
// ends up under more later cards, so it ends up shrinking the most.
const SHRINK_PER_DEPTH = 0.05;

const WorkMediaPanel = ({
  media,
  title,
  parallaxY,
}: {
  media: WorkMedia;
  title: string;
  parallaxY: MotionValue<number>;
}) => {
  if (media.kind === "photo") {
    return (
      <motion.div className="absolute inset-[-10%]" style={{ y: parallaxY }}>
        <Image
          src={media.src}
          alt={title}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-contain rounded-lg"
          unoptimized
        />
      </motion.div>
    );
  }

  if (media.kind === "brandmark") {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#08186D] to-black flex items-center justify-center p-10 md:p-12">
        <motion.div className="relative w-full h-full" style={{ y: parallaxY }}>
          <Image
            src={media.src}
            alt={title}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-contain"
            unoptimized
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#08186D] to-black flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(161,174,247,0.18),transparent_55%)]" />
      <motion.span
        className="relative font-accent italic font-normal leading-none text-[clamp(3rem,10vw,6rem)] text-[color-mix(in_srgb,var(--color-lavender),white_10%)] select-none"
        style={{ y: parallaxY }}
      >
        {media.monogram}
      </motion.span>
    </div>
  );
};

const ParallaxCard = ({
  work,
  index,
  total,
  containerNaturalTop,
  smoothScrollY,
  scrollYProgress,
  isActive,
}: {
  work: Work;
  index: number;
  total: number;
  containerNaturalTop: MotionValue<number>;
  smoothScrollY: MotionValue<number> | null;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Shrinks a little further, anchored at the top, for every card that
  // arrives after it - driven off the shared scroll progress (not this
  // card's own local scroll), so it keeps receding for as long as the
  // section keeps scrolling, the way a real stack of cards would settle.
  const targetScale = 1 - (total - index) * SHRINK_PER_DEPTH;
  const scale = useTransform(scrollYProgress, [index * RANGE_STEP, 1], [1, targetScale]);
  const imageY = useTransform(scrollYProgress, [index * RANGE_STEP, 1], [0, 26]);

  // The site's SmoothScroll wrapper (desktop, fine pointer, motion allowed)
  // fakes scrolling with `position: fixed` + a spring transform, so native
  // `position: sticky` never engages inside it. When that wrapper is
  // active, pin this card manually instead, replicating the same rule the
  // browser uses for real sticky: pinned from when this card's own
  // section reaches PIN_OFFSET, until the shared container (its
  // containing block) runs out of room to hold it there.
  //
  // The geometry below (this card's offset within the container, the
  // container's height, this card's own height) is measured once - not on
  // every scroll tick - and cached in refs. Reading layout properties
  // (getBoundingClientRect/offsetHeight) inside a motion value callback
  // that fires on every spring tick forces a synchronous reflow right
  // after the previous tick's style write, which is what caused the
  // stutter; only `containerNaturalTop` (which genuinely changes every
  // tick) is still read live, and only once for the whole stack, in the
  // parent.
  const zeroMotionValue = useMotionValue(0);
  const geometryRef = useRef({ sectionOffset: 0, containerHeight: 0, frameHeight: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const section = sectionRef.current;
      const frame = frameRef.current;
      const container = section?.offsetParent as HTMLElement | null;
      if (!section || !frame || !container) return;
      geometryRef.current = {
        sectionOffset: section.offsetTop,
        containerHeight: container.offsetHeight,
        frameHeight: frame.offsetHeight,
      };
    };
    measure();

    const observer = new ResizeObserver(measure);
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (frameRef.current) observer.observe(frameRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const manualPinY = useTransform(
    [smoothScrollY ?? zeroMotionValue, containerNaturalTop],
    ([v, cTop]: number[]) => {
      if (!smoothScrollY) return 0;
      const { sectionOffset, containerHeight, frameHeight } = geometryRef.current;
      const sectionNaturalTop = cTop + sectionOffset;
      const start = sectionNaturalTop - PIN_OFFSET;
      const distance = Math.max(0, cTop + containerHeight - sectionNaturalTop - frameHeight);
      return Math.min(Math.max(v - start, 0), distance);
    }
  );

  // An offset per card (percentage of its own height, so it scales with
  // the responsive card size) so an earlier card stays visible as a
  // peeking edge above the next one instead of sitting exactly behind it -
  // this, not the scale shrink, is what actually keeps most of a covered
  // card out of view; the shrink alone is too gradual to do that on its
  // own. Later cards recede less (smaller offset), matching the
  // reference's `top: -25% + i * nudge`, and it's tied to the same
  // scroll-progress range as `scale` - 0 until this card's own turn
  // starts, so a card sitting in its normal, not-yet-active resting
  // position (e.g. the first card, right below the section heading) isn't
  // nudged upward before it needs to be.
  const targetFanOffset = -12 + index * 3;
  const fanOffset = useTransform(scrollYProgress, [index * RANGE_STEP, 1], ["0%", `${targetFanOffset}%`]);

  return (
    <div ref={sectionRef} className="relative h-[860px] md:h-[720px] lg:h-[760px]">
      <motion.div
        ref={frameRef}
        className={smoothScrollY ? "relative" : "sticky top-60"}
        style={smoothScrollY ? { y: manualPinY, willChange: "transform" } : undefined}
      >
        <motion.div
          style={{ scale, y: fanOffset, willChange: "transform" }}
          aria-hidden={!isActive}
          className={`relative min-h-[600px] md:min-h-[460px] lg:min-h-[500px] grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] origin-top ${
            isActive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Content */}
          <div
            className={`relative flex flex-col justify-between p-6 md:p-8 lg:p-10 order-2 ${
              index % 2 === 0 ? "md:order-1" : "md:order-2"
            }`}
          >
            <div className="relative z-10">
              <Heading as="h3" variant="title">
                {work.title}
              </Heading>
              <Text variant="gray" className="mt-3 md:mt-4 max-w-sm">
                {work.hook}
              </Text>
            </div>

            <div className="relative z-10 flex flex-col gap-2.5 md:gap-3 pt-6 md:pt-8 mt-6 border-t border-white/10">
              {stages.map(({ label, key }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <Text
                    variant="lavender"
                    className="text-caption uppercase tracking-[0.14em] w-16 md:w-[4.5rem] shrink-0"
                  >
                    {label}
                  </Text>
                  <Text variant="gray" className="leading-snug">
                    {work[key]}
                  </Text>
                </div>
              ))}
            </div>

            <Link
              href={`/portfolio/${work.slug}`}
              className="relative z-10 mt-5 md:mt-6 inline-flex items-center gap-1.5 text-sm text-lavender hover:text-white transition-colors w-fit"
            >
              View case study
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>

          {/* Media */}
          <div
            className={`relative m-4 md:m-5 rounded-xl overflow-hidden order-1 min-h-[180px] ${
              index % 2 === 0 ? "md:order-2" : "md:order-1"
            }`}
          >
            <WorkMediaPanel media={work.media} title={`${work.title} — ${work.hook}`} parallaxY={imageY} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Inert MotionValue shared by every card in the reduced-motion fallback
// below - WorkMediaPanel requires one for its (unused, here) parallax
// transform, but nothing ever writes to it.
const staticParallaxY = motionValue(0);

// Simple, motion-free fallback for prefers-reduced-motion: every card in
// normal document flow, no scroll pinning, no parallax.
const StaticStack = () => (
  <div className="max-w-6xl mx-auto mt-10 md:mt-14 space-y-8">
    {works.map((work, index) => (
      <div
        key={work.title}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 grid grid-cols-1 md:grid-cols-2"
      >
        <div
          className={`relative flex flex-col justify-between p-6 md:p-8 lg:p-10 order-2 ${
            index % 2 === 0 ? "md:order-1" : "md:order-2"
          }`}
        >
          <div className="relative z-10">
            <Heading as="h3" variant="title">
              {work.title}
            </Heading>
            <Text variant="gray" className="mt-3 md:mt-4 max-w-sm">
              {work.hook}
            </Text>
          </div>
          <div className="relative z-10 flex flex-col gap-2.5 md:gap-3 pt-6 md:pt-8 mt-6 border-t border-white/10">
            {stages.map(({ label, key }) => (
              <div key={label} className="flex items-baseline gap-3">
                <Text
                  variant="lavender"
                  className="text-caption uppercase tracking-[0.14em] w-16 md:w-[4.5rem] shrink-0"
                >
                  {label}
                </Text>
                <Text variant="gray" className="leading-snug">
                  {work[key]}
                </Text>
              </div>
            ))}
          </div>
          <Link
            href={`/portfolio/${work.slug}`}
            className="relative z-10 mt-5 md:mt-6 inline-flex items-center gap-1.5 text-sm text-lavender hover:text-white transition-colors w-fit"
          >
            View case study
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
        <div
          className={`relative m-4 md:m-5 rounded-xl overflow-hidden order-1 min-h-[220px] ${
            index % 2 === 0 ? "md:order-2" : "md:order-1"
          }`}
        >
          <WorkMediaPanel media={work.media} title={`${work.title} — ${work.hook}`} parallaxY={staticParallaxY} />
        </div>
      </div>
    ))}
  </div>
);

const Portfolio = () => {
  const reduceMotion = useSafeReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // This container is the shared containing block every card pins
  // against - like `<main>` wrapping every `.cardContainer` in the
  // reference implementation. Each card is its own normal-flow section
  // inside it (see ParallaxCard), so once a card's turn is reached it
  // stays pinned for the rest of this container's scroll range, not just
  // its own section - exactly how a real `position: sticky` card would
  // behave here.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(works.length - 1, Math.max(0, Math.floor(v * works.length)));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  // Read once per frame, shared by every card, instead of each card
  // re-reading the container's own position independently.
  const smoothScrollY = useSmoothScrollY();
  const zeroMotionValue = useMotionValue(0);
  const containerNaturalTop = useTransform(smoothScrollY ?? zeroMotionValue, (v) => {
    if (!smoothScrollY || !containerRef.current) return 0;
    // getBoundingClientRect() reflects the current on-screen (already
    // spring-transformed) position, so add back the spring's current value
    // to recover the untransformed document position.
    return containerRef.current.getBoundingClientRect().top + v;
  });

  return (
    <section
      className="relative text-white py-12 px-6 md:py-16 md:px-12 lg:py-20 lg:px-24"
      id="portfolio"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.01 }}
      >
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24 lg:mb-28">
          <Heading className="text-center mb-2 md:mb-3">Portfolio</Heading>
          <Text
            variant="gray"
            className="text-center max-w-prose md:max-w-xl mx-auto"
          >
            Real builds, at a glance.
          </Text>
        </div>

        {reduceMotion ? (
          <StaticStack />
        ) : (
          <div
            ref={containerRef}
            className="relative max-w-6xl mx-auto h-[3440px] md:h-[2880px] lg:h-[3040px]"
          >
            {works.map((work, index) => (
              <ParallaxCard
                key={work.title}
                work={work}
                index={index}
                total={works.length}
                containerNaturalTop={containerNaturalTop}
                smoothScrollY={smoothScrollY}
                scrollYProgress={scrollYProgress}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <Reveal
          className="mt-16 md:mt-20 lg:mt-24 flex flex-col sm:flex-row items-center justify-center text-center gap-4 sm:gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
            <button className="pushable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front"> Book a Call </span>
            </button>
          </a>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-base font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            See full portfolio
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </Link>
        </Reveal>
      </motion.div>
    </section>
  );
};

export default Portfolio;
