import { marquee } from "@/lib/site";
import { Reveal, ScrollSkew } from "./ui";

/** Tilted, glowing band of scrolling words. Decorative, so hidden from screen readers. */
export function Marquee() {
  return (
    <div className="overflow-x-clip md:-my-12" aria-hidden>
      <Reveal variant="left" duration={1.3}>
        <div className="-mx-[4vw] -rotate-2 bg-lime py-3.5 shadow-[0_0_70px_rgba(198,255,58,0.45)] md:py-5">
          <ScrollSkew>
            <div className="flex w-max animate-marquee">
              {[0, 1, 2, 3].map((dup) => (
                <ul key={dup} className="flex shrink-0 items-center">
                  {marquee.map((word) => (
                    <li
                      key={word}
                      className="pr-8 text-2xl font-bold tracking-[-0.03em] whitespace-nowrap text-ink uppercase md:pr-12 md:text-4xl"
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </ScrollSkew>
        </div>
      </Reveal>
    </div>
  );
}
