import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const brandButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-space text-xs font-bold tracking-[0.1em] uppercase transition-[transform,background-color,color] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border border-lime bg-lime text-ink hover:-translate-y-0.5",
        dark: "border-0 bg-ink text-cream hover:bg-black",
        ghost:
          "border border-cream bg-transparent text-cream hover:bg-cream hover:text-ink",
      },
      size: {
        default: "px-[26px] py-[15px] text-[13px]",
        sm: "px-5 py-[11px] text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function BrandButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof brandButtonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="brand-button"
      className={cn(brandButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { BrandButton, brandButtonVariants };
