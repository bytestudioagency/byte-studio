"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

// Tracks whether `targetRef`'s element is both in the viewport and the tab is
// visible, without ever triggering a React re-render itself. `activeRef` is
// owned by the caller (declared before their rAF tick function, which reads
// it) and mutated in place here; `onActivate` fires when it flips back to
// active so a paused loop can be restarted. `onActivate` is read through a
// ref internally so passing a new closure each render doesn't resubscribe
// the observer.
export function useAnimationActive(
  targetRef: RefObject<Element | null>,
  activeRef: RefObject<boolean>,
  onActivate: () => void
) {
  const onActivateRef = useRef(onActivate);

  useLayoutEffect(() => {
    onActivateRef.current = onActivate;
  });

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    let inViewport = true;

    const update = () => {
      const next = inViewport && document.visibilityState === "visible";
      const wasActive = activeRef.current;
      activeRef.current = next;
      if (next && !wasActive) {
        onActivateRef.current();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    observer.observe(target);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [targetRef, activeRef]);
}
