import Image from "next/image";
import type { CaseStudyHeroMedia as CaseStudyHeroMediaType } from "@/lib/case-studies";

// `compact` drops the outer aspect-video/rounded/border frame and the
// viewport-relative monogram size, so the caller can drop this into an
// already-sized, already-rounded container (e.g. a small cursor-following
// preview) without the text overflowing a box far smaller than the hero.
export function CaseStudyHeroMedia({
  media,
  title,
  compact = false,
}: {
  media: CaseStudyHeroMediaType;
  title: string;
  compact?: boolean;
}) {
  const frame = compact
    ? "relative w-full h-full"
    : "relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10";

  if (media.kind === "photo") {
    return (
      <div className={`${frame} ${compact ? "" : "bg-[#080B21]"}`}>
        <Image
          src={media.src}
          alt={title}
          fill
          sizes={compact ? "260px" : "(min-width: 1024px) 1024px, 100vw"}
          className="object-cover"
          priority={!compact}
          unoptimized
        />
      </div>
    );
  }

  if (media.kind === "brandmark") {
    return (
      <div
        className={`${frame} bg-gradient-to-br from-[#08186D] to-black flex items-center justify-center ${
          compact ? "p-6" : "p-8 sm:p-14 md:p-20"
        }`}
      >
        <div className="relative w-full h-full">
          <Image
            src={media.src}
            alt={title}
            fill
            sizes={compact ? "260px" : "(min-width: 1024px) 1024px, 100vw"}
            className="object-contain"
            priority={!compact}
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${frame} bg-gradient-to-br from-[#08186D] to-black flex items-center justify-center`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(161,174,247,0.18),transparent_55%)]" />
      <span
        className={`relative font-accent italic font-normal leading-none text-[color-mix(in_srgb,var(--color-lavender),white_10%)] select-none ${
          compact ? "text-5xl" : "text-[clamp(4rem,14vw,9rem)]"
        }`}
      >
        {media.monogram}
      </span>
    </div>
  );
}
