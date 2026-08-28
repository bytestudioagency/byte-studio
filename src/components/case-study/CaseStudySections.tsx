import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";
import type { CaseStudy } from "@/lib/case-studies";

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function CaseStudyStageStrip({ summary }: { summary: CaseStudy["summary"] }) {
  const stages: { label: string; value: string }[] = [
    { label: "Problem", value: summary.problem },
    { label: "Build", value: summary.build },
    { label: "Outcome", value: summary.outcome },
  ];

  return (
    <Reveal {...revealProps} className="border-t border-white/10">
      {stages.map(({ label, value }) => (
        <div
          key={label}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,220px)_1fr] gap-3 lg:gap-10 py-8 md:py-10 border-b border-white/10"
        >
          <Text
            variant="lavender"
            className="text-caption uppercase tracking-[0.14em] lg:pt-2"
          >
            {label}
          </Text>
          <Text variant="gray" className="max-w-2xl leading-relaxed">
            {value}
          </Text>
        </div>
      ))}
    </Reveal>
  );
}

export function CaseStudySection({
  eyebrow,
  heading,
  paragraphs,
  children,
}: {
  eyebrow: string;
  heading: string;
  paragraphs?: string[];
  children?: ReactNode;
}) {
  return (
    <Reveal {...revealProps}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,220px)_1fr] gap-3 lg:gap-10">
        <Text
          variant="lavender"
          className="text-caption uppercase tracking-[0.14em] lg:pt-2"
        >
          {eyebrow}
        </Text>
        <div>
          <Heading as="h2" variant="sectionCompact" className="mb-5 md:mb-6 max-w-xl">
            {heading}
          </Heading>
          {paragraphs && (
            <div className="space-y-4 max-w-2xl">
              {paragraphs.map((paragraph, index) => (
                <Text key={index} variant="gray" className="leading-relaxed">
                  {paragraph}
                </Text>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function FeatureItem({ item, index }: { item: string; index: number }) {
  const separator = " — ";
  const separatorIndex = item.indexOf(separator);
  const number = String(index + 1).padStart(2, "0");

  const body =
    separatorIndex === -1 ? (
      <Text variant="gray" as="span" className="leading-relaxed">
        {item}
      </Text>
    ) : (
      <>
        <Text variant="bodyStrong" as="span">
          {item.slice(0, separatorIndex)}
        </Text>
        <Text variant="gray" as="span" className="leading-relaxed">
          {" "}
          — {item.slice(separatorIndex + separator.length)}
        </Text>
      </>
    );

  return (
    <li className="flex gap-4 py-3.5 border-b border-white/10 first:border-t">
      <span className="font-heading text-caption tabular-nums text-white/30 pt-0.5 shrink-0">
        {number}
      </span>
      <div>{body}</div>
    </li>
  );
}

export function CaseStudyFeatureGroups({
  groups,
}: {
  groups: CaseStudy["keyFeatures"];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10">
      {groups.map((group, index) => (
        <Reveal
          key={group.group ?? index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
          className={groups.length === 1 ? "md:col-span-2 md:max-w-2xl" : ""}
        >
          {group.group && (
            <Heading as="h3" variant="subtitle" className="mb-1 text-white/80">
              {group.group}
            </Heading>
          )}
          <ul>
            {group.items.map((item, itemIndex) => (
              <FeatureItem key={itemIndex} item={item} index={itemIndex} />
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function CaseStudyStackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {stack.map((item) => (
        <li
          key={item}
          className="text-body-sm text-white/70 border border-white/10 rounded-full px-4 py-1.5"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyCallout({ children }: { children: ReactNode }) {
  return (
    <Reveal
      {...revealProps}
      className="border-t border-white/10 pt-8 md:pt-10"
    >
      <Text
        variant="lavender"
        className="text-caption uppercase tracking-[0.14em] mb-4"
      >
        Worth knowing
      </Text>
      <Heading as="p" variant="accent" className="max-w-3xl text-white/90">
        {children}
      </Heading>
    </Reveal>
  );
}
