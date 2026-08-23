import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("text-white", {
  variants: {
    variant: {
      display: "font-heading font-normal text-display",
      accent: "font-accent italic font-normal text-display-accent",
      section: "font-heading font-medium text-heading",
      sectionCompact: "font-heading font-medium text-section",
      lg: "font-heading font-medium text-heading-lg",
      title: "font-heading font-normal text-title",
      subtitle: "font-heading font-normal text-subtitle",
      price: "font-heading font-medium text-heading-price",
    },
  },
  defaultVariants: {
    variant: "section",
  },
});

interface HeadingProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof headingVariants> {
  as?: ElementType;
}

export function Heading({
  as: Comp = "h2",
  variant,
  className,
  ...props
}: HeadingProps) {
  return (
    <Comp className={cn(headingVariants({ variant }), className)} {...props} />
  );
}
