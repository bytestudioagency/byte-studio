import { heroBadge } from "@/lib/site";
import { Arrow } from "./ui";

const R = 74;
const CIRCUMFERENCE = Math.round(2 * Math.PI * R);

/** Spinning ring of text around an arrow button. Links to the contact section. Wide screens only. */
export function HeroBadge() {
  const text = heroBadge.map((w) => `${w} • `).join("");

  return (
    <a
      href="#contact"
      aria-label="Start building"
      className="group absolute top-1/2 right-0 hidden size-44 -translate-y-1/2 items-center justify-center rounded-full xl:flex"
    >
      <svg
        viewBox="0 0 180 180"
        aria-hidden
        className="absolute inset-0 size-full animate-[spin_22s_linear_infinite] text-zinc-300 group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path id="hero-badge-ring" d={`M90 90 m-${R} 0 a${R} ${R} 0 1 1 ${R * 2} 0 a${R} ${R} 0 1 1 -${R * 2} 0`} />
        </defs>
        <text className="fill-current font-mono text-[10.5px] tracking-[0.12em] uppercase">
          <textPath href="#hero-badge-ring" textLength={CIRCUMFERENCE - 4} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="flex size-20 items-center justify-center rounded-full bg-lime text-ink shadow-[0_0_50px_rgba(198,255,58,0.45)] transition-transform duration-700 ease-spring group-hover:scale-110 group-active:scale-95">
        <Arrow className="!size-6 transition-transform duration-700 ease-spring group-hover:rotate-45" />
      </span>
    </a>
  );
}
