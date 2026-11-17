"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Project card that sticks and stacks as you scroll.
 *
 * Stacking: every card is `position: sticky`. A card that fits the viewport pins near the top
 * (offset per index so the stack fans out). A card taller than the viewport (mobile) pins by
 * its bottom edge instead, so the whole card scrolls past before the next one slides over it:
 * `top = min(normal offset, 100svh - card height - gap)`. The height is measured into `--h`.
 *
 * Animation: on hover-capable desktops the visual animates on hover (group-hover). On touch
 * devices and below `lg`, the card is marked `data-active` while its visual panel sits in the
 * middle band of the viewport, and the same animation plays via `group-data-active:`.
 */
export function WorkCard({
  children,
  index,
  className = "",
  style,
}: {
  children: ReactNode;
  index: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState<number>();

  // Measure the card so tall cards can pin by their bottom edge.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0]?.blockSize ?? el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll-driven stand-in for hover.
  useEffect(() => {
    // Watch the visual panel itself: on small screens the card is taller than the viewport,
    // so watching the whole card would fire while only the text is on screen.
    const el = ref.current?.querySelector("[data-visual]");
    const mq = window.matchMedia("(hover: none), (max-width: 1023px)");
    if (!el) return;
    let io: IntersectionObserver | undefined;
    const sync = () => {
      io?.disconnect();
      io = undefined;
      setActive(false);
      if (!mq.matches) return;
      io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
        rootMargin: "-30% 0px -30% 0px",
      });
      io.observe(el);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, []);

  const offset = `calc(6.5rem + ${index * 1.25}rem)`;
  const top = height ? `min(${offset}, calc(100svh - ${height}px - 1rem))` : offset;

  return (
    <article
      ref={ref}
      data-active={active || undefined}
      style={{ ...style, top }}
      className={`sticky ${className}`}
    >
      {children}
    </article>
  );
}
