import * as React from "react";

import { cn } from "@/lib/utils";

function Eyebrow({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="eyebrow"
      className={cn(
        "inline-flex items-center gap-2.5 font-space text-xs font-bold tracking-[0.22em] uppercase before:block before:h-0.5 before:w-[26px] before:flex-none before:bg-lime",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Eyebrow };
