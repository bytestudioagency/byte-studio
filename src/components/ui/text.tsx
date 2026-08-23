import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("font-heading", {
  variants: {
    variant: {
      body: "text-white text-body",
      bodyStrong: "text-white font-medium text-body-sm",
      muted:
        "text-white/60 text-body-sm transition-opacity duration-200 hover:opacity-100",
      gray: "text-muted-gray text-body-sm",
      caption: "text-white text-caption",
      link: "text-white text-link",
      lavender: "text-lavender text-body",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: ElementType;
}

export function Text({
  as: Comp = "p",
  variant,
  className,
  ...props
}: TextProps) {
  return (
    <Comp className={cn(textVariants({ variant }), className)} {...props} />
  );
}
