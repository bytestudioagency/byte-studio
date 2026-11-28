import { container, hero, site } from "@/lib/site";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroCursors } from "./HeroCursors";
import { HeroBadge } from "./HeroBadge";
import { HeroReel } from "./HeroReel";
import { HeroTitle } from "./HeroTitle";
import { Logos } from "./Logos";
import { Button } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col pt-36 sm:pt-40 md:pt-48">
      <HeroBackdrop />
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
        <div className="absolute top-[-220px] left-1/2 h-[560px] w-[min(900px,160vw)] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(198,255,58,0.16),transparent)]" />
        <div className="absolute top-[280px] right-[-200px] h-[480px] w-[480px] animate-drift rounded-full [animation-delay:-7s] bg-[radial-gradient(closest-side,rgba(120,140,255,0.10),transparent)]" />
      </div>

      <div className={`${container} flex flex-1 flex-col`}>
        <div className="flex flex-1 flex-col justify-center">
          <div className="relative">
            <HeroTitle />
            <HeroCursors />
            <HeroBadge />
          </div>

          <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
            {/* CSS entrance (globals.css), not <Reveal>, so it doesn't wait for hydration. */}
            <div className="hero-up max-w-md" style={{ animationDelay: "0.45s" }}>
              <p className="text-xl leading-snug font-medium tracking-[-0.02em] text-pretty text-zinc-200 sm:text-2xl">
                {hero.sub}
              </p>
            </div>
            <div className="hero-up flex flex-wrap items-center gap-3" style={{ animationDelay: "0.55s" }}>
              {site.bookingUrl ? (
                <Button href={site.bookingUrl}>Book a call</Button>
              ) : (
                <Button href="#contact">Start building</Button>
              )}
              <Button href="#work" variant="ghost">
                See our work
              </Button>
            </div>
          </div>

          <HeroReel />
        </div>

        <Logos />
      </div>
    </section>
  );
}
