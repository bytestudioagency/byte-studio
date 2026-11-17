"use client";

import { useEffect, useRef } from "react";

const GAP = 30; // px between dots
const RADIUS = 240; // px reach of the spotlight
const LIME = "198,255,58";

/**
 * Interactive dot grid behind the hero. A lime spotlight follows the pointer and
 * pushes nearby dots outward; with no pointer (touch, idle) it drifts on its own.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let lastMove = -Infinity;
    const spot = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      spot.tx = e.clientX - rect.left;
      spot.ty = e.clientY - rect.top;
      lastMove = performance.now();
    };

    function draw(t: number) {
      if (!ctx) return;
      // Idle: let the spotlight wander so the hero is alive without a mouse.
      if (t - lastMove > 2500) {
        spot.tx = w * (0.5 + 0.34 * Math.cos(t / 2600));
        spot.ty = Math.min(h, 760) * (0.42 + 0.26 * Math.sin(t / 1900));
      }
      spot.x += (spot.tx - spot.x) * 0.07;
      spot.y += (spot.ty - spot.y) * 0.07;

      ctx.clearRect(0, 0, w, h);
      const offsetX = ((w % GAP) + GAP) / 2;

      for (let x = offsetX; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const dx = x - spot.x;
          const dy = y - spot.y;
          const dist = Math.hypot(dx, dy);
          if (reduce || dist > RADIUS) {
            ctx.fillStyle = "rgba(255,255,255,0.075)";
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
            continue;
          }
          const k = (1 - dist / RADIUS) ** 2;
          const push = k * 10;
          const px = x + (dx / (dist || 1)) * push;
          const py = y + (dy / (dist || 1)) * push;
          const size = 1.5 + k * 2.2;
          ctx.fillStyle = `rgba(${LIME},${0.1 + k * 0.85})`;
          ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }
      }
    }

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    spot.x = spot.tx = w / 2;
    spot.y = spot.ty = h * 0.35;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    if (reduce) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_75%_70%_at_50%_38%,black_30%,transparent)]"
    />
  );
}
