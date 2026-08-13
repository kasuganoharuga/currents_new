import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "rounded-full border-[1.5px] px-4 py-[9px] font-display text-sm font-bold transition-colors",
  {
    variants: {
      on: {
        true: "border-lime bg-lime text-ink",
        false: "border-ink/12 bg-transparent text-ink/60 hover:border-ink",
      },
    },
    defaultVariants: {
      on: false,
    },
  },
);

function Chip({
  className,
  on,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof chipVariants>) {
  return (
    <button
      type="button"
      data-slot="chip"
      aria-pressed={!!on}
      className={cn(chipVariants({ on, className }))}
      {...props}
    />
  );
}

export { Chip, chipVariants };
