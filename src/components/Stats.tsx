import { container, promises } from "@/lib/site";
import { DrawLine, Reveal, Rise } from "./ui";

/** Four headline promises, shown as a ruled strip between sections. */
export function Stats() {
  return (
    <div className={container}>
      <DrawLine />
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 md:grid-cols-4 md:py-14">
        {promises.map((p, i) => (
          <div key={p.label}>
            <p className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-[2.5rem] lg:text-6xl">
              <Rise delay={i * 0.09}>{p.value}</Rise>
            </p>
            <Reveal as="p" delay={0.25 + i * 0.09} className="mt-2 text-sm text-fog">
              {p.label}
            </Reveal>
          </div>
        ))}
      </div>
      <DrawLine delay={0.15} />
    </div>
  );
}
