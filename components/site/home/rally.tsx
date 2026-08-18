"use client";

import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function Rally() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section className="px-6 pb-[clamp(64px,9vw,108px)] sm:px-8">
      <div
        ref={ref}
        className={cn(
          "relative mx-auto grid max-w-[1140px] grid-cols-[0.72fr_1.28fr] items-end gap-[clamp(32px,7vw,96px)] overflow-hidden bg-ink px-[clamp(28px,5vw,64px)] py-[clamp(42px,6vw,72px)] text-cream max-[760px]:grid-cols-1 max-[760px]:gap-7",
          REVEAL,
          revealState(visible),
        )}
      >
        <div className="absolute -top-24 -right-20 size-72 rounded-full border-[52px] border-lime/16" />
        <div className="relative">
          <div className="font-space text-[10px] font-bold tracking-[0.19em] text-lime uppercase">
            The one you say when you&apos;re stuck
          </div>
          <h2 className="mt-5 font-display text-[clamp(48px,7.2vw,94px)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
            Make bigger than <span className="text-lime">big.</span>
          </h2>
        </div>
        <p className="relative max-w-[54ch] text-[clamp(17px,1.8vw,21px)] leading-[1.55] text-cream/68">
          When the path runs out, we build one. Stuck is just the moment before
          the breakthrough. We&apos;re innovators, we keep breaking new ground,
          and there&apos;s always a bigger swing.
        </p>
      </div>
    </section>
  );
}

export { Rally };
