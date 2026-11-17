"use client";

import { CursorIcon } from "@phosphor-icons/react";
import { m, useReducedMotion } from "motion/react";

const cursors = [
  { label: "Design", color: "#8fa2ff", left: "58%", top: "2%", x: [0, 130, 40, 170, 0], y: [0, 34, -18, 56, 0], duration: 15 },
  { label: "Dev", color: "#ff9d5c", left: "70%", top: "80%", x: [0, -120, 30, -60, 0], y: [0, -46, 22, -84, 0], duration: 19 },
];

/** Two "teammate" cursors that drift around the headline, as if the team is working on the page. Desktop only. */
export function HeroCursors() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {cursors.map((c, i) => (
        <m.div
          key={c.label}
          className="absolute"
          style={{ left: c.left, top: c.top, color: c.color }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, x: c.x, y: c.y }}
          transition={{
            opacity: { duration: 0.6, delay: 1.3 + i * 0.25 },
            scale: { duration: 0.6, delay: 1.3 + i * 0.25 },
            x: { duration: c.duration, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
            y: { duration: c.duration, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
          }}
        >
          <CursorIcon weight="fill" aria-hidden className="size-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          <span
            className="mt-0.5 ml-4 block w-max rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink"
            style={{ backgroundColor: c.color }}
          >
            {c.label}
          </span>
        </m.div>
      ))}
    </div>
  );
}
