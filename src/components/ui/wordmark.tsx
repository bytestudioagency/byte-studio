import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Wordmark({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2.5 leading-none select-none",
        className
      )}
      {...props}
    >
      <span className="font-heading font-normal tracking-tight text-white">
        Byte
      </span>
      <span className="font-accent italic font-normal text-[color-mix(in_srgb,var(--color-brand),white_20%)]">
        Studio
      </span>
    </span>
  );
}
