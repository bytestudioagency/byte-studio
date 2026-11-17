"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { m, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect, type CSSProperties, type ReactNode } from "react";

export const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Entrance styles. Each section picks one so the page doesn't move the same way twice in a row.
 * - up:    fade, lift and unblur (the default, used by headings)
 * - left / right: slide in from the side
 * - scale: grow in from slightly small
 * - tilt:  rise while tipping back from a 3D lean
 * - clip:  unfold from an inset rounded window
 * - pop:   springy scale, for small badges and chips
 */
const variants = {
  up: { hidden: { opacity: 0, y: 36, filter: "blur(10px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } },
  left: { hidden: { opacity: 0, x: -48, filter: "blur(6px)" }, show: { opacity: 1, x: 0, filter: "blur(0px)" } },
  right: { hidden: { opacity: 0, x: 48, filter: "blur(6px)" }, show: { opacity: 1, x: 0, filter: "blur(0px)" } },
  scale: { hidden: { opacity: 0, scale: 0.94, y: 24 }, show: { opacity: 1, scale: 1, y: 0 } },
  tilt: {
    hidden: { opacity: 0, y: 90, rotateX: 22, transformPerspective: 1200 },
    show: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1200 },
  },
  clip: {
    hidden: { opacity: 0.3, clipPath: "inset(10% 8% 10% 8% round 2rem)" },
    // Clear the clip once open so rings and glows outside the box aren't cut off.
    show: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)", transitionEnd: { clipPath: "none" } },
  },
  pop: { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } },
} as const;

export type RevealVariant = keyof typeof variants;

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
  duration,
  as = "div",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  /** Render as a list item or inline span where a div would be invalid markup. */
  as?: "div" | "li" | "span" | "p";
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const v = variants[variant];
  const transition = reduce
    ? { duration: 0 }
    : variant === "pop"
      ? { type: "spring" as const, stiffness: 380, damping: 22, delay }
      : { duration: duration ?? (variant === "clip" || variant === "tilt" ? 1.2 : 0.9), delay, ease: EASE };
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={className}
      style={style}
      // Same initial state on server and client; reduced motion just makes the reveal instant.
      initial={v.hidden}
      whileInView={v.show}
      viewport={{ once: true, margin: "-60px" }}
      transition={transition}
    >
      {children}
    </Tag>
  );
}

/** Text that rises out of its own line, like a mask. Good for big numbers and titles. */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    // Clip only vertically so italic overhangs survive; the padding gives descenders room
    // inside the mask and the negative margin cancels it out.
    <span className={`block overflow-y-clip pb-[0.12em] -mb-[0.12em] ${className}`}>
      <m.span
        className="block"
        initial={{ y: "110%", rotate: 3 }}
        whileInView={{ y: "0%", rotate: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={reduce ? { duration: 0 } : { duration: 1, delay, ease: EASE }}
      >
        {children}
      </m.span>
    </span>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRightIcon weight="bold" aria-hidden className={`size-3.5 ${className}`} />
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const primary = variant === "primary";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6 text-sm font-medium transition-[transform,background-color] duration-500 ease-spring active:scale-[0.97] ${
        primary
          ? "bg-lime text-ink hover:bg-[#d4ff66]"
          : variant === "dark"
            ? "bg-ink text-white hover:bg-black"
            : "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10"
      } ${className}`}
    >
      {children}
      <span
        className={`flex size-9 items-center justify-center rounded-full transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${
          primary ? "bg-ink/10" : "bg-white/10"
        }`}
      >
        <Arrow />
      </span>
    </a>
  );
}

/** Double-bezel card: an outer tray with a hairline, and an inner core with a top highlight. */
export function Shell({
  children,
  className = "",
  inner = "",
}: {
  children: ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <div className={`rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/10 ${className}`}>
      <div
        className={`h-full rounded-[calc(2rem-0.375rem)] bg-coal shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] ${inner}`}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionHead({
  title,
  accent,
  body,
}: {
  title: string;
  accent?: string;
  body?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="max-w-3xl">
      <Reveal>
        <h2 className="text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
          {title}{" "}
          {accent && (
            // Inline (not inline-block) so text-balance still wraps it with the title; opacity and
            // filter work on inline boxes, so the accent can trail the title without a layout shift.
            <m.span
              className="font-serif font-normal tracking-[-0.01em] text-lime italic"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, delay: 0.3, ease: EASE }}
            >
              {accent}
            </m.span>
          )}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-fog md:text-lg">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

/** A hairline that draws itself left to right when it scrolls into view. */
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <m.span
      aria-hidden
      className={`block h-px origin-left bg-white/10 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reduce ? { duration: 0 } : { duration: 1.4, delay, ease: EASE }}
    />
  );
}

/** Number that glides to its new value instead of snapping. Pair with a screen-reader copy. */
export function Tween({ value, format }: { value: number; format: (n: number) => string }) {
  const reduce = useReducedMotion();
  const mv = useSpring(value, { stiffness: 90, damping: 22, mass: 0.8 });
  const text = useTransform(mv, format);
  useEffect(() => {
    if (reduce) mv.jump(value);
    else mv.set(value);
  }, [value, reduce, mv]);
  return <m.span>{text}</m.span>;
}

/** Thin lime bar along the top edge that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-lime shadow-[0_0_12px_rgba(198,255,58,0.6)]"
    />
  );
}

/** Skews its children with scroll speed, settling back when scrolling stops. */
export function ScrollSkew({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 220, damping: 40 });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true });
  return (
    <m.div className={className} style={reduce ? undefined : { skewX }}>
      {children}
    </m.div>
  );
}
