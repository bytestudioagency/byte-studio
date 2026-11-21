"use client";

import Image from "next/image";
import { useEffect, useState, ViewTransition } from "react";
import { nav, site } from "@/lib/site";
import { Arrow } from "./ui";

/** `home` is false on sub-pages, where section links have to point back at the home page. */
export function Nav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const base = home ? "" : "/";
  const active = useActiveSection(home);

  // Firm up the pill once the page moves, so it reads clearly over busy sections.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // The menu only exists below desktop; close it if the window grows past that.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Shared name across pages: the nav holds still while the page content transitions. */}
      <ViewTransition name="site-nav">
        <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4 md:top-6">
          <nav
            aria-label="Main"
            className={`flex w-full max-w-3xl items-center justify-between rounded-full py-1.5 pr-1.5 pl-4 ring-1 backdrop-blur-xl transition-[background-color,box-shadow] duration-500 ease-spring sm:py-2 sm:pr-2 sm:pl-5 lg:w-max lg:max-w-none lg:gap-8 ${
              scrolled || open
                ? "bg-coal/85 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)] ring-white/12"
                : "bg-ink/60 ring-white/10"
            }`}
          >
            <a
              href={home ? "#top" : "/"}
              onClick={close}
              className="flex items-center py-2"
            >
              <Image src="/brand/logo.png" alt={site.name} width={1191} height={215} preload className="h-5 w-auto sm:h-[22px]" />
            </a>

            <ul className="hidden items-center gap-6 text-sm whitespace-nowrap text-fog lg:flex">
              {nav.map((item) => {
                const current = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={base + item.href}
                      aria-current={current ? "location" : undefined}
                      className={`transition-colors duration-300 ease-spring hover:text-white ${
                        current ? "text-white" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Compact on phones, full pill with arrow from `sm`. Steps aside while the menu (which has its own CTA) is open. */}
              <a
                href={`${base}#contact`}
                tabIndex={open ? -1 : 0}
                className={`group hidden h-11 items-center gap-2 rounded-full bg-lime px-4 text-sm font-medium whitespace-nowrap text-ink transition-[transform,opacity] duration-500 ease-spring active:scale-[0.97] min-[360px]:inline-flex sm:h-auto sm:py-1.5 sm:pr-1.5 ${
                  open ? "pointer-events-none scale-95 opacity-0" : ""
                }`}
              >
                Start building
                <span className="hidden size-7 items-center justify-center rounded-full bg-ink/10 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-px sm:flex">
                  <Arrow />
                </span>
              </a>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className={`relative flex size-11 items-center justify-center rounded-full ring-1 transition-colors duration-500 ease-spring active:scale-95 lg:hidden ${
                  open ? "bg-white text-ink ring-white" : "bg-white/5 text-white ring-white/10"
                }`}
              >
                <span
                  className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-spring ${
                    open ? "rotate-45" : "-translate-y-[4px]"
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] rounded-full bg-current transition-[transform,width] duration-500 ease-spring ${
                    open ? "w-[18px] -rotate-45" : "w-[10px] translate-x-[4px] translate-y-[4px]"
                  }`}
                />
              </button>
            </div>
          </nav>
        </header>
      </ViewTransition>

      <div
        id="mobile-menu"
        data-lenis-prevent
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-ink/92 px-5 pt-24 pb-8 backdrop-blur-2xl transition-opacity duration-500 ease-spring sm:px-8 sm:pt-28 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(198,255,58,0.12),transparent)]" />

        <p
          className={`relative font-mono text-[10px] tracking-[0.2em] text-fog uppercase transition-opacity duration-700 ease-spring ${
            open ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          Menu
        </p>

        <ul className="relative mt-4 border-t border-white/10">
          {nav.map((item, i) => (
            <li key={item.href} className="overflow-hidden border-b border-white/10">
              <a
                href={base + item.href}
                onClick={close}
                aria-current={active === item.href ? "location" : undefined}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                className={`group flex items-center gap-4 py-3.5 transition-[transform,opacity] duration-700 ease-spring sm:py-4 [@media(max-height:700px)]:py-2.5 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="w-6 font-mono text-[11px] text-fog tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[1.75rem] leading-none font-medium tracking-[-0.03em] transition-colors duration-300 ease-spring group-active:text-lime sm:text-4xl">
                  {item.label}
                </span>
                <Arrow className="ml-auto text-fog transition-[transform,color] duration-500 ease-spring group-hover:text-lime group-active:translate-x-0.5 group-active:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>

        {/* Thumb zone: the main action sits at the bottom of the sheet. */}
        <div
          style={{ transitionDelay: open ? `${80 + nav.length * 40}ms` : "0ms" }}
          className={`relative mt-auto pt-10 transition-[transform,opacity] [@media(max-height:700px)]:pt-6 duration-700 ease-spring ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <a
            href={`${base}#contact`}
            onClick={close}
            className="group flex items-center justify-between rounded-full bg-lime py-2 pr-2 pl-6 text-base font-medium text-ink transition-transform duration-500 ease-spring active:scale-[0.98]"
          >
            Start building
            <span className="flex size-11 items-center justify-center rounded-full bg-ink/10">
              <Arrow />
            </span>
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
            {site.email && (
              <a href={`mailto:${site.email}`} className="py-2 text-zinc-300">
                {site.email}
              </a>
            )}
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-fog uppercase">
              <span className="size-1.5 rounded-full bg-lime" />
              Reply within a day
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * The nav link (`#work`, `#faq`...) for the section currently under the top third of the screen, or null in the hero,
 * the contact block and on sub-pages. Contact is tracked so the FAQ link lets go once you scroll past it.
 */
function useActiveSection(home: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!home) return;
    const ids = [...nav.map((n) => n.href.slice(1)), "contact"];
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let best: { id: string; top: number } | null = null;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && (!best || top > best.top)) best = { id, top };
      }
      setActive(best && best.id !== "contact" ? `#${best.id}` : null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [home]);

  return active;
}
