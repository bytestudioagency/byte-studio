"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { container, services } from "@/lib/site";
import { Reveal, SectionHead } from "./ui";

type Service = (typeof services)[number];

/* ------------------------------------------------------------------ */
/* Loop helpers                                                        */
/* ------------------------------------------------------------------ */

/** Whether a stage's demo loop should run: on screen and motion allowed. */
function usePlay() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  return { ref, play: inView && !reduce, still: !!reduce };
}

/**
 * Keyframes for something that appears at `at` (0-1 of the loop) and stays until the loop resets.
 * When the loop isn't playing it rests in its "shown" state so the frame still reads.
 */
function cue(play: boolean, at: number, duration: number, from: Record<string, number> = { y: 8 }) {
  if (!play) return { animate: { opacity: 1, x: 0, y: 0, scale: 1 }, transition: { duration: 0.4 } };
  const keys = Object.fromEntries(Object.entries(from).map(([k, v]) => [k, [v, v, k === "scale" ? 1 : 0, k === "scale" ? 1 : 0, k === "scale" ? 1 : 0]]));
  return {
    animate: { opacity: [0, 0, 1, 1, 0], ...keys },
    transition: { duration, times: [0, at, Math.min(at + 0.05, 0.9), 0.92, 1], repeat: Infinity, ease: "easeOut" as const },
  };
}

/* ------------------------------------------------------------------ */
/* Stage 1 - Web: a landing page builds itself and a lead comes in     */
/* ------------------------------------------------------------------ */

function WebStage() {
  const { ref, play } = usePlay();
  const D = 7;
  const bar = (at: number) =>
    play
      ? { animate: { scaleX: [0, 0, 1, 1, 0] }, transition: { duration: D, times: [0, at, at + 0.08, 0.92, 1], repeat: Infinity, ease: [0.32, 0.72, 0, 1] as const } }
      : { animate: { scaleX: 1 } };

  return (
    <div ref={ref} className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-2xl bg-[#0d0d0f] ring-1 ring-white/10 sm:inset-x-7 sm:top-7">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-fog">
          <svg viewBox="0 0 16 16" className="size-2.5 text-lime" fill="currentColor" aria-hidden>
            <path d="M4 7V5a4 4 0 1 1 8 0v2h1v8H3V7h1Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
          </svg>
          elevatedevelopers.in
        </div>
      </div>

      <div className="relative grid grid-cols-[1.3fr_1fr] gap-5 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="mb-5 flex items-center gap-2">
            <span className="size-4 rounded-md bg-lime" />
            <m.span {...bar(0.02)} className="h-1.5 w-10 origin-left rounded-full bg-white/20" />
            <m.span {...bar(0.04)} className="h-1.5 w-8 origin-left rounded-full bg-white/10" />
            <m.span {...bar(0.06)} className="h-1.5 w-8 origin-left rounded-full bg-white/10" />
          </div>
          <m.div {...bar(0.08)} className="h-3.5 w-[92%] origin-left rounded-full bg-white/85" />
          <m.div {...bar(0.12)} className="h-3.5 w-[64%] origin-left rounded-full bg-white/60" />
          <m.div {...bar(0.16)} className="h-1.5 w-[80%] origin-left rounded-full bg-white/15" />
          <m.div {...bar(0.18)} className="h-1.5 w-[55%] origin-left rounded-full bg-white/15" />
          <div className="relative pt-2">
            <m.div
              animate={play ? { scale: [1, 1, 0.92, 1.04, 1, 1] } : { scale: 1 }}
              transition={{ duration: D, times: [0, 0.44, 0.46, 0.49, 0.52, 1], repeat: Infinity }}
              className="inline-flex h-8 items-center rounded-full bg-lime px-4 text-[11px] font-semibold text-ink shadow-[0_0_30px_-6px_rgba(198,255,58,0.8)]"
            >
              Get a quote
            </m.div>
          </div>
        </div>
        <m.div {...bar(0.2)} className="origin-left rounded-xl bg-[linear-gradient(140deg,rgba(198,255,58,0.25),rgba(255,255,255,0.03)_60%)] ring-1 ring-white/10" />

        {/* Cursor glides to the button and clicks */}
        <m.svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute size-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          aria-hidden
          initial={{ left: "85%", top: "85%" }}
          animate={play ? { left: ["85%", "85%", "18%", "18%", "18%", "85%"], top: ["85%", "85%", "78%", "78%", "78%", "85%"], scale: [1, 1, 1, 0.8, 1, 1] } : { left: "18%", top: "78%" }}
          transition={{ duration: D, times: [0, 0.24, 0.43, 0.46, 0.5, 1], repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
        >
          <path d="M5 3l14 8-6 1.5L10 19 5 3Z" fill="white" stroke="black" strokeWidth="1.2" strokeLinejoin="round" />
        </m.svg>
      </div>

      {/* Lead notification */}
      <m.div
        {...cue(play, 0.52, D, { y: 16, scale: 0.9 })}
        className="absolute right-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3 pr-4 ring-1 ring-white/15 backdrop-blur-md"
      >
        <span className="relative flex size-8 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-ink">
          RK
          <span className="absolute -top-0.5 -right-0.5 size-2.5 animate-ping rounded-full bg-lime" />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-medium text-white">New lead</span>
          <span className="block text-[10px] text-fog">Rahul K. · 3BHK enquiry</span>
        </span>
      </m.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 2 - Mobile: a phone with a live feed and a push notification  */
/* ------------------------------------------------------------------ */

const feed = [
  { tag: "Breaking", tint: "from-lime/40" },
  { tag: "City", tint: "from-sky-400/30" },
  { tag: "Sports", tint: "from-orange-400/30" },
  { tag: "Tech", tint: "from-fuchsia-400/30" },
  { tag: "Local", tint: "from-emerald-400/30" },
];

function MobileStage() {
  const { ref, play } = usePlay();
  const D = 6;
  return (
    <div ref={ref} className="absolute inset-0 flex items-end justify-center overflow-hidden pt-8">
      {/* Halo behind the phone */}
      <div className="absolute bottom-0 left-1/2 size-72 -translate-x-1/2 translate-y-1/3 rounded-full bg-lime/20 blur-[80px]" aria-hidden />

      {/* Floating proof chips around the phone */}
      {[
        { t: "Live on Play Store", d: "v2.4.0", cls: "left-[6%] top-[14%]", at: 0.05 },
        { t: "OTP verified", d: "+91 ••••• 42", cls: "right-[5%] top-[34%]", at: 0.3 },
        { t: "4.8 ★", d: "12k reviews", cls: "left-[8%] top-[58%]", at: 0.55 },
      ].map((c) => (
        <m.div
          key={c.t}
          animate={play ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{ duration: 4 + c.at * 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute z-20 hidden rounded-2xl bg-white/[0.06] px-3.5 py-2.5 ring-1 ring-white/15 backdrop-blur-md sm:block ${c.cls}`}
        >
          <span className="flex items-center gap-2 text-[12px] font-medium text-white">
            <span className="size-1.5 rounded-full bg-lime shadow-[0_0_10px_#c6ff3a]" />
            {c.t}
          </span>
          <span className="mt-0.5 block pl-3.5 font-mono text-[10px] text-fog">{c.d}</span>
        </m.div>
      ))}

      <m.div
        animate={play ? { y: [0, -8, 0] } : { y: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-[1/2.05] h-[min(38rem,calc(100%+1rem))] translate-y-10 rounded-[2.75rem] bg-[#151517] p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.12)]"
      >
        <div className="relative h-full overflow-hidden rounded-[2.25rem] bg-[#09090a]">
          {/* Dynamic island */}
          <div className="absolute top-2.5 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

          <div className="relative z-10 flex items-center justify-between bg-[#09090a] px-4 pt-11 pb-3">
            <span className="text-sm font-semibold tracking-tight">
              Turant<span className="text-lime">.</span>
            </span>
            <span className="flex gap-1">
              {["हिं", "EN"].map((l, i) => (
                <span key={l} className={`rounded-full px-2 py-0.5 text-[9px] ${i ? "bg-lime text-ink" : "bg-white/10 text-fog"}`}>
                  {l}
                </span>
              ))}
            </span>
          </div>

          {/* Infinite feed: the list is doubled and slides up by half */}
          <m.div
            animate={play ? { y: ["0%", "-50%"] } : { y: "0%" }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="space-y-2.5 px-3"
          >
            {[...feed, ...feed].map((f, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/5">
                <div className={`h-20 bg-gradient-to-br ${f.tint} to-transparent`} />
                <div className="space-y-1.5 p-2.5">
                  <span className="text-[8px] font-semibold tracking-[0.15em] text-lime uppercase">{f.tag}</span>
                  <div className="h-1.5 w-[90%] rounded-full bg-white/60" />
                  <div className="h-1.5 w-[60%] rounded-full bg-white/25" />
                </div>
              </div>
            ))}
          </m.div>

          {/* Push notification */}
          <m.div
            {...cue(play, 0.15, D, { y: -70 })}
            className="absolute inset-x-2 top-10 z-30 flex items-center gap-2.5 rounded-2xl bg-white/10 p-2.5 ring-1 ring-white/15 backdrop-blur-xl"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-lime text-[10px] font-bold text-ink">T.</span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[10px] font-semibold text-white">Breaking near you</span>
              <span className="block truncate text-[9px] text-zinc-300">Metro line 3 opens this Friday</span>
            </span>
            <span className="ml-auto self-start text-[8px] text-fog">now</span>
          </m.div>
        </div>
      </m.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 3 - AI: an assistant calls tools and answers with a source    */
/* ------------------------------------------------------------------ */

function AiStage() {
  const { ref, play } = usePlay();
  const D = 8;
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col gap-2.5 p-5 sm:p-7">
      {/* Assistant header: a breathing orb and a live step counter */}
      <div className="mb-auto flex items-center gap-3">
        <span className="relative flex size-9 items-center justify-center rounded-full shadow-[0_0_24px_-2px_rgba(198,255,58,0.65)]">
          {/* Rotating ring: transform only, no filter, so it stays on the compositor. */}
          <m.span
            className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#c6ff3a,#3affd4,transparent_70%,#c6ff3a)]"
            animate={play ? { rotate: 360 } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative size-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,#f4ffd6,#c6ff3a_45%,#1d2a00)] ring-2 ring-coal" />
        </span>
        <span className="leading-tight">
          <span className="block text-[12px] font-medium text-white">Support assistant</span>
          <span className="flex items-center gap-1.5 text-[10px] text-fog">
            <span className="size-1.5 animate-pulse rounded-full bg-lime" /> online · guardrails on
          </span>
        </span>
        <span className="ml-auto rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-fog ring-1 ring-white/10">max 4 steps</span>
      </div>
      <m.div {...cue(play, 0.04, D)} className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-white/10 px-3.5 py-2 text-[12px] text-white">
        Where&apos;s my order #4821?
      </m.div>

      <div className="flex flex-wrap gap-1.5">
        {[
          { t: "searchDocs", at: 0.16 },
          { t: "lookupOrder", at: 0.26 },
        ].map((tool) => (
          <m.span
            key={tool.t}
            {...cue(play, tool.at, D, { x: -8 })}
            className="flex items-center gap-1.5 rounded-full bg-lime/10 px-2.5 py-1 font-mono text-[10px] text-lime ring-1 ring-lime/25"
          >
            <svg viewBox="0 0 16 16" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {tool.t}()
          </m.span>
        ))}
      </div>

      <div className="relative min-h-[4.75rem]">
        {/* Typing dots, then the answer streams in */}
        <m.div
          animate={play ? { opacity: [0, 0, 1, 1, 0, 0] } : { opacity: 0 }}
          transition={{ duration: D, times: [0, 0.34, 0.36, 0.44, 0.46, 1], repeat: Infinity }}
          className="absolute top-0 left-0 flex gap-1 rounded-2xl rounded-bl-md bg-white/[0.04] px-3.5 py-3 ring-1 ring-white/10"
        >
          {[0, 1, 2].map((d) => (
            <m.span
              key={d}
              className="size-1.5 rounded-full bg-fog"
              animate={play ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.12 }}
            />
          ))}
        </m.div>
        <m.div
          animate={
            play
              ? { opacity: [0, 0, 1, 1, 0], clipPath: ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"] }
              : { opacity: 1, clipPath: "inset(0 0% 0 0)" }
          }
          transition={{ duration: D, times: [0, 0.46, 0.62, 0.92, 1], repeat: Infinity, ease: "linear" }}
          className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/[0.04] px-3.5 py-2.5 text-[12px] leading-relaxed text-zinc-200 ring-1 ring-white/10"
        >
          It ships tomorrow via Delhivery. You&apos;ll get a tracking SMS by 6&nbsp;pm.
        </m.div>
      </div>

      <m.span
        {...cue(play, 0.66, D, { y: 6 })}
        className="w-fit rounded-md bg-white/5 px-2 py-1 font-mono text-[9px] tracking-wide text-fog ring-1 ring-white/10"
      >
        ↳ source: orders/4821
      </m.span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 4 - MVP: a build checklist ticks off week by week, then launch */
/* ------------------------------------------------------------------ */

const sprint = [
  { task: "Scope and wireframes", week: 1 },
  { task: "Sign-up and onboarding", week: 1 },
  { task: "Core feature", week: 2 },
  { task: "Payments", week: 3 },
  { task: "Admin dashboard", week: 3 },
];
const LAUNCH = sprint.length;

function MvpStage() {
  const { ref, play, still } = usePlay();
  const [step, setStep] = useState(0);
  const [users, setUsers] = useState(0);

  // Tick one task per beat, hold on "launched" while sign-ups roll in, then start over.
  useEffect(() => {
    if (!play) return;
    let s = 0;
    let hold = 0;
    const id = setInterval(() => {
      if (s < LAUNCH) {
        s += 1;
        setStep(s);
        if (s === LAUNCH) setUsers(23);
      } else if (++hold > 6) {
        s = 0;
        hold = 0;
        setStep(0);
        setUsers(0);
      } else {
        setUsers((u) => u + 17 + Math.round(Math.random() * 40));
      }
    }, 800);
    return () => clearInterval(id);
  }, [play]);

  const done = still ? LAUNCH : step;
  const live = done >= LAUNCH;
  const week = live ? 4 : (sprint[done]?.week ?? 4);
  const signups = still ? 248 : users;

  return (
    <div ref={ref} className="absolute inset-0 grid gap-4 p-5 sm:grid-cols-[1.2fr_1fr] sm:p-7">
      {/* Sprint checklist */}
      <div className="flex flex-col rounded-2xl bg-[#0d0d0f] p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-fog uppercase">
          <span>Build board</span>
          <span className="text-white">
            {done}/{LAUNCH}
          </span>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-lime shadow-[0_0_12px_#c6ff3a] transition-[width] duration-700 ease-spring"
            style={{ width: `${(done / LAUNCH) * 100}%` }}
          />
        </div>
        <ul className="mt-3 flex flex-1 flex-col justify-between">
          {sprint.map((t, i) => {
            const ok = i < done;
            const now = i === done && !live;
            return (
              <li key={t.task} className="flex items-center gap-2.5 py-1">
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-md ring-1 transition-[background-color,box-shadow] duration-500 ${
                    ok ? "bg-lime ring-lime" : now ? "ring-lime/60" : "ring-white/15"
                  }`}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className={`size-2.5 text-ink transition-transform duration-500 ease-spring ${ok ? "scale-100" : "scale-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden
                  >
                    <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={`flex-1 truncate text-[12px] transition-colors duration-500 ${ok ? "text-white/45 line-through decoration-white/25" : now ? "text-white" : "text-fog"}`}>
                  {t.task}
                </span>
                {now && <span className="size-1.5 animate-pulse rounded-full bg-lime" />}
                <span className="font-mono text-[9px] text-fog/60">W{t.week}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Timeline + launch status */}
      <div className="hidden flex-col gap-4 sm:flex">
        <div className="rounded-2xl bg-[#0d0d0f] p-4 ring-1 ring-white/10">
          <span className="font-mono text-[10px] tracking-[0.15em] text-fog uppercase">Timeline</span>
          <div className="mt-4 flex items-center">
            {[1, 2, 3, 4].map((w) => (
              <div key={w} className="flex flex-1 items-center last:flex-none">
                <span
                  className={`flex size-7 items-center justify-center rounded-full font-mono text-[10px] ring-1 transition-[background-color,color,box-shadow] duration-500 ${
                    w < week || live ? "bg-lime text-ink ring-lime" : w === week ? "text-lime ring-lime shadow-[0_0_16px_-2px_#c6ff3a]" : "text-fog ring-white/15"
                  }`}
                >
                  {w === 4 ? "🚀" : `W${w}`}
                </span>
                {w < 4 && (
                  <span className="mx-1 h-px flex-1 bg-white/10">
                    <span className={`block h-full bg-lime transition-[width] duration-700 ease-spring ${w < week || live ? "w-full" : "w-0"}`} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl p-4 ring-1 transition-[background-color,box-shadow] duration-700 ${
            live ? "bg-lime/[0.08] ring-lime/40 shadow-[0_0_40px_-12px_rgba(198,255,58,0.6)]" : "bg-[#0d0d0f] ring-white/10"
          }`}
        >
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase">
            <span className={`size-1.5 rounded-full ${live ? "animate-pulse bg-lime" : "bg-white/25"}`} />
            <span className={live ? "text-lime" : "text-fog"}>{live ? "Live" : "Building"}</span>
          </span>
          <span className="mt-1.5 block text-3xl font-medium tracking-tight tabular-nums">
            {live ? signups.toLocaleString("en-IN") : "—"}
          </span>
          <span className="text-[10px] text-fog">{live ? "sign-ups since launch" : "launching in week 4"}</span>
        </div>
      </div>
    </div>
  );
}

const stages: Record<string, () => ReactNode> = {
  web: WebStage,
  mobile: MobileStage,
  ai: AiStage,
  mvp: MvpStage,
};

/* ------------------------------------------------------------------ */
/* Tile                                                                */
/* ------------------------------------------------------------------ */

/** Card with a lime spotlight that follows the pointer, on both the border and the surface. */
function Tile({ s, i, className = "", stageClass = "", horizontal = false }: { s: Service; i: number; className?: string; stageClass?: string; horizontal?: boolean }) {
  const Stage = stages[s.id];
  const move = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal variant="tilt" delay={i * 0.08} className={className}>
      <article
        onPointerMove={move}
        className="group relative isolate h-full overflow-hidden rounded-[2rem] bg-white/[0.08] p-px transition-transform duration-700 ease-spring hover:-translate-y-1"
      >
        {/* Border spotlight */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--x) var(--y), rgba(198,255,58,0.7), transparent 45%)" }}
        />
        <div className={`relative flex h-full overflow-hidden rounded-[calc(2rem-1px)] bg-coal ${horizontal ? "flex-col lg:flex-row-reverse" : "flex-col"}`}>
          {/* Surface spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(520px circle at var(--x) var(--y), rgba(198,255,58,0.06), transparent 50%)" }}
          />

          <div
            aria-hidden
            className={`relative shrink-0 overflow-hidden border-white/5 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px] ${
              horizontal ? "border-b lg:flex-[1.25] lg:border-b-0 lg:border-l" : "border-b"
            } ${stageClass}`}
          >
            <Stage />
          </div>

          <div className={`relative flex flex-col p-6 sm:p-8 ${horizontal ? "lg:flex-1 lg:justify-center lg:p-12" : "flex-1"}`}>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-fog">
              <span className="text-lime">0{i + 1}</span>
              <span className="h-px w-8 bg-white/15" />
              <span className="truncate normal-case tracking-normal text-fog/70">{s.file}</span>
            </div>
            <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.02] font-medium tracking-[-0.035em]">{s.title}</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-pretty text-fog">{s.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.points.map((p) => (
                <li key={p} className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[13px] text-zinc-300 ring-1 ring-white/10">
                  {p}
                </li>
              ))}
            </ul>
            {s.deliveredFor && (
              <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-fog uppercase lg:mt-auto lg:pt-6">
                Delivered for <span className="text-lime">{s.deliveredFor}</span>
              </p>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Services() {
  const [web, mobile, ai, mvp] = services;

  return (
    <section id="services" className="py-20 md:py-32 lg:-scroll-mt-14 lg:py-40">
      <div className={container}>
        <SectionHead
          title="Four crafts."
          accent="Zero compromises."
          body="Four disciplines, one team - so nothing gets lost between design, code, and launch."
        />

        {/* Bento: web and AI stack on the left, the phone runs tall on the right, MVP spans the base. */}
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <Tile s={web} i={0} className="md:col-span-2 lg:col-span-7" stageClass="h-64 sm:h-72" />
          <Tile s={mobile} i={1} className="lg:col-span-5 lg:row-span-2" stageClass="h-[26rem] lg:h-auto lg:min-h-[30rem] lg:flex-[2]" />
          <Tile s={ai} i={2} className="lg:col-span-7" stageClass="h-64" />
          <Tile s={mvp} i={3} className="md:col-span-2 lg:col-span-12" stageClass="h-[19rem] sm:h-80" horizontal />
        </div>
      </div>
    </section>
  );
}
