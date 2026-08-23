"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 250, damping: 30, mass: 0.5 };

// Momentum-scroll only reads as an improvement with a mouse/trackpad. Touch
// scrolling is already smooth natively, and layering a fixed-position spring
// transform on top of it tends to fight the browser's own momentum and
// address-bar-collapse behavior. Respect prefers-reduced-motion too.
export function useSmoothScrollSupported() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setSupported(pointerQuery.matches && !motionQuery.matches);
    update();

    pointerQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      pointerQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return supported;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const supported = useSmoothScrollSupported();

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, SPRING);
  const y = useTransform(smoothY, (v) => -v);

  useLayoutEffect(() => {
    if (!supported || !contentRef.current) return;
    const el = contentRef.current;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [supported]);

  if (!supported) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full will-change-transform"
      >
        {children}
      </motion.div>
      {/* Preserves native scroll range now that content is taken out of flow */}
      <div style={{ height }} aria-hidden="true" />
    </>
  );
}
