"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads only the animation features the site uses (animate, exit, whileInView, hover/tap)
 * instead of the full motion bundle. `strict` throws if a full `motion.*` component slips in;
 * use `m.*` everywhere instead.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
