import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyNav({
  prev,
  next,
}: {
  prev?: CaseStudy;
  next?: CaseStudy;
}) {
  if (!prev || !next) return null;

  return (
    <div className="border-t border-white/10 pt-8 md:pt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
      <Link href={`/portfolio/${prev.slug}`} className="group">
        <Text
          variant="lavender"
          className="inline-flex items-center gap-1.5 text-caption uppercase tracking-[0.14em] mb-2 opacity-70 group-hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
          Previous
        </Text>
        <Heading
          as="h3"
          variant="subtitle"
          className="text-white/70 transition-colors group-hover:text-white"
        >
          {prev.title}
        </Heading>
      </Link>
      <Link href={`/portfolio/${next.slug}`} className="group text-left sm:text-right">
        <Text
          variant="lavender"
          className="inline-flex items-center gap-1.5 sm:flex-row-reverse text-caption uppercase tracking-[0.14em] mb-2"
        >
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          Next case study
        </Text>
        <Heading
          as="h3"
          variant="title"
          className="transition-colors group-hover:text-lavender"
        >
          {next.title}
        </Heading>
      </Link>
    </div>
  );
}
