"use client";

import { useMemo, useState } from "react";
import { container, estimator as cfg, site } from "@/lib/site";
import { Button, Reveal, SectionHead, Shell, Tween } from "./ui";

const round = (n: number) => Math.round(n / 5000) * 5000;
const money = (n: number) => `${cfg.currency}${n.toLocaleString("en-IN")}`;
// Mid-glide values round to the nearest thousand so the digits roll instead of flicker.
const glide = (n: number) => money(Math.round(n / 1000) * 1000);
const weeksOf = (n: number) => `${Math.round(n)} weeks`;

function Chip({
  active,
  onClick,
  children,
  i = 0,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  i?: number;
}) {
  return (
    <Reveal as="span" variant="pop" delay={0.3 + i * 0.04} className="inline-flex">
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={`min-h-11 rounded-full px-4 py-2.5 text-sm transition-[background-color,color,transform] duration-500 ease-spring active:scale-[0.97] ${
          active ? "bg-lime text-ink" : "bg-white/5 text-zinc-300 ring-1 ring-white/10 hover:bg-white/10"
        }`}
      >
        {children}
      </button>
    </Reveal>
  );
}

function Group({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="flex items-baseline gap-3">
        <span className="text-base font-medium tracking-tight">{label}</span>
        {hint && <span className="font-mono text-[10px] tracking-[0.15em] text-fog uppercase">{hint}</span>}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function Estimator() {
  const [type, setType] = useState(cfg.types[1].id);
  const [features, setFeatures] = useState<string[]>(["auth"]);
  const [pace, setPace] = useState(cfg.pace[0].id);

  const result = useMemo(() => {
    const t = cfg.types.find((x) => x.id === type)!;
    const fs = cfg.features.filter((f) => features.includes(f.id));
    const p = cfg.pace.find((x) => x.id === pace)!;
    const sum = (k: "min" | "max" | "weeks") => t[k] + fs.reduce((a, f) => a + f[k], 0);
    return {
      min: round(sum("min") * p.cost),
      max: round(sum("max") * p.cost),
      weeks: Math.max(1, Math.ceil(sum("weeks") * p.time)),
      summary: [
        `Project: ${t.label}`,
        `Features: ${fs.map((f) => f.label).join(", ") || "None selected"}`,
        `Pace: ${p.label}`,
      ],
    };
  }, [type, features, pace]);

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Project estimate")}&body=${encodeURIComponent(
    `Hi ${site.name},\n\nI used the estimator on your site:\n\n${result.summary.join("\n")}\nEstimate: ${money(result.min)}–${money(
      result.max,
    )}, about ${result.weeks} weeks\n\nA bit more about the project:\n`,
  )}`;

  const toggle = (id: string) => setFeatures((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <section id="estimate" className="lg:-scroll-mt-14 py-20 md:py-32 lg:py-40">
      <div className={container}>
        <SectionHead
          title="Your number,"
          accent="in 30 seconds."
          body="Pick what you need and get an honest range. No email wall, no sales call."
        />
        <Reveal variant="scale" className="mt-16">
          <Shell inner="grid lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-10 p-6 sm:p-7 md:p-10">
              <Group label="What are you building?">
                {cfg.types.map((t, i) => (
                  <Chip key={t.id} i={i} active={type === t.id} onClick={() => setType(t.id)}>
                    {t.label}
                  </Chip>
                ))}
              </Group>
              <Group label="What does it need?" hint="Pick any">
                {cfg.features.map((f, i) => (
                  <Chip key={f.id} i={i} active={features.includes(f.id)} onClick={() => toggle(f.id)}>
                    {f.label}
                  </Chip>
                ))}
              </Group>
              <Group label="How fast?">
                {cfg.pace.map((p, i) => (
                  <Chip key={p.id} i={i} active={pace === p.id} onClick={() => setPace(p.id)}>
                    {p.label}
                  </Chip>
                ))}
              </Group>
            </div>

            {/* Tablet: range on the left, call to action on the right. */}
            <div className="flex flex-col justify-between gap-10 rounded-b-[calc(2rem-0.375rem)] border-t border-white/10 bg-white/[0.02] p-6 sm:p-7 md:p-10 md:max-lg:grid md:max-lg:grid-cols-[1.2fr_1fr] md:max-lg:items-end lg:rounded-r-[calc(2rem-0.375rem)] lg:rounded-bl-none lg:border-t-0 lg:border-l">
              <div aria-live="polite">
                <p className="font-mono text-[10px] tracking-[0.2em] text-fog uppercase">Estimated range</p>
                {/* The animated figures are hidden from screen readers so the live region announces once. */}
                <p className="mt-4 text-[clamp(1.875rem,9vw,2.25rem)] leading-[1.05] font-medium tracking-[-0.04em] text-lime tabular-nums md:text-5xl">
                  <span aria-hidden>
                    <Tween value={result.min} format={glide} />
                    <span className="text-white/30"> – </span>
                    <Tween value={result.max} format={glide} />
                  </span>
                  <span className="sr-only">
                    {money(result.min)} to {money(result.max)}
                  </span>
                </p>
                <p className="mt-4 text-fog">
                  About{" "}
                  <span className="text-white tabular-nums">
                    <span aria-hidden>
                      <Tween value={result.weeks} format={weeksOf} />
                    </span>
                    <span className="sr-only">{result.weeks} weeks</span>
                  </span>{" "}
                  from kickoff to launch.
                </p>
                <ul className="mt-8 space-y-2 border-t border-white/10 pt-6 font-mono text-[11px] leading-relaxed text-zinc-400">
                  {result.summary.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Button href={mailto} className="w-full justify-between">
                  Send me a fixed quote
                </Button>
                <p className="mt-4 text-xs leading-relaxed text-fog">
                  A rough guide, not a quote. The final price is fixed after a short scoping call.
                </p>
              </div>
            </div>
          </Shell>
        </Reveal>
      </div>
    </section>
  );
}
