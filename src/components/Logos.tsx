/* eslint-disable @next/next/no-img-element */
import {
  AsteriskIcon,
  IntersectIcon,
  MountainsIcon,
  PlantIcon,
  RecordIcon,
  TriangleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { clients } from "@/lib/site";
import { Reveal } from "./ui";

// Simple geometric marks so each placeholder reads as a logo until a real file is supplied.
const glyphs: Icon[] = [TriangleIcon, RecordIcon, AsteriskIcon, MountainsIcon, PlantIcon, IntersectIcon];

function Glyph({ index }: { index: number }) {
  const Mark = glyphs[index % glyphs.length];
  return <Mark weight="bold" aria-hidden className="size-5" />;
}

/** "Trusted by" logo carousel. Pauses on hover. */
export function Logos() {
  return (
    <Reveal delay={0.85} className="pt-12 pb-8 md:pt-14 md:pb-10">
      <p className="text-center font-mono text-[11px] tracking-[0.2em] text-fog uppercase">Trusted by teams at</p>
      <div className="group mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee [animation-duration:36s] group-hover:[animation-play-state:paused]">
          {[0, 1, 2, 3].map((dup) => (
            <ul key={dup} aria-hidden={dup > 0} className="flex shrink-0 items-center">
              {[...clients, ...clients].map((c, i) => (
                <li key={`${c.name}-${i}`} className="flex h-12 items-center pr-14 text-zinc-500 md:pr-20">
                  {c.logo ? (
                    // The supplied files are dark artwork, so they are inverted to read on the dark page.
                    <img src={c.logo} alt={c.name} className="max-h-9 max-w-32 opacity-70 brightness-90 grayscale invert" />
                  ) : (
                    <span className="flex items-center gap-2.5 text-xl font-semibold tracking-[-0.03em] whitespace-nowrap">
                      <Glyph index={i} />
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
