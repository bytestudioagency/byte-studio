"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useSmoothScrollSupported } from "@/components/ui/smooth-scroll";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyHeroMedia";
import type { CaseStudy } from "@/lib/case-studies";

const SPRING = { stiffness: 250, damping: 30, mass: 0.5 };

export function PortfolioList({ studies }: { studies: CaseStudy[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  // Only desktop, fine-pointer, motion-allowed sessions get the cursor-
  // following preview - same capability check the site's smooth scroll
  // uses, since both are "nice to have" desktop-only flourishes.
  const previewSupported = useSmoothScrollSupported();

  // This list sits inside the page's SmoothScroll wrapper, which pins its
  // content with a `position: fixed` + transform - a transformed ancestor
  // becomes the containing block for `position: fixed` descendants, so the
  // preview would otherwise track that wrapper instead of the real
  // viewport/cursor. Portalling straight to <body> sidesteps that. Guarding
  // on `document` (rather than a mount-effect state flag) is safe here
  // because a portal's contents render into a target outside the SSR'd
  // tree, so they're never part of React's hydration diff.
  const canPortal = typeof document !== "undefined";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  return (
    <div
      className="relative"
      onMouseMove={(event) => {
        x.set(event.clientX);
        y.set(event.clientY);
      }}
    >
      {studies.map((study, index) => (
        <Link
          key={study.slug}
          href={`/portfolio/${study.slug}`}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="group relative flex items-center justify-between gap-6 py-6 md:py-8 border-b border-white/10 first:border-t"
        >
          <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
            <span className="font-heading text-caption tabular-nums text-white/30 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <Heading
                as="h2"
                variant="section"
                className="transition-colors group-hover:text-lavender truncate"
              >
                {study.title}
              </Heading>
              <Text variant="gray" className="mt-1.5 max-w-xl hidden sm:block">
                {study.tagline}
              </Text>
            </div>
          </div>
          <ArrowUpRight
            className="w-5 h-5 md:w-6 md:h-6 text-white/30 shrink-0 transition-all duration-300 group-hover:text-lavender group-hover:translate-x-1 group-hover:-translate-y-1"
            strokeWidth={1.5}
          />
        </Link>
      ))}

      {canPortal &&
        previewSupported &&
        createPortal(
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key={studies[hovered].slug}
                aria-hidden="true"
                className="pointer-events-none fixed z-50 w-64 h-40 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
                style={{
                  left: springX,
                  top: springY,
                  translateX: "-50%",
                  translateY: "-120%",
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <CaseStudyHeroMedia
                  media={studies[hovered].heroMedia}
                  title={studies[hovered].title}
                  compact
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
