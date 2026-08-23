"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

// Thin client-only wrapper around framer-motion. Lets section components stay
// server components by rendering their server-rendered content as `children`
// through this boundary instead of importing `motion` themselves.

export function Reveal(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />;
}

export function RevealArticle(props: HTMLMotionProps<"article">) {
  return <motion.article {...props} />;
}
