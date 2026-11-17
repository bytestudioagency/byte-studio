import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Reveal } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[520px] w-[820px] -translate-x-1/2 animate-breathe rounded-full bg-[radial-gradient(closest-side,rgba(198,255,58,0.18),transparent)]"
      />
      <Link href="/" className="absolute top-8 flex items-center gap-2 text-[15px] font-medium tracking-tight">
        <span className="size-2 rounded-full bg-lime" />
        {site.name}
      </Link>

      <div className="relative">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-fog uppercase">Error 404</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 text-5xl leading-[0.95] font-medium tracking-[-0.04em] text-balance md:text-8xl">
            This page{" "}
            <span className="font-serif font-normal tracking-[-0.02em] text-lime italic">never shipped.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-md text-lg text-pretty text-fog">
            Dead link, or it moved. Everything we did ship is one click away.
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-full bg-lime py-2 pr-2 pl-6 text-sm font-medium text-ink transition-[transform,background-color] duration-500 ease-spring hover:bg-[#d4ff66] active:scale-[0.97]"
            >
              Back to home
              <span className="flex size-9 items-center justify-center rounded-full bg-ink/10 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <Arrow />
              </span>
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center rounded-full bg-white/5 px-6 py-[1.0625rem] text-sm leading-none font-medium text-white ring-1 ring-white/10 transition-colors duration-500 ease-spring hover:bg-white/10"
            >
              See our work
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
