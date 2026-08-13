"use client";

import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function CreateSection() {
  const [bigRef, bigVisible] = useReveal<HTMLDivElement>();
  const [pRef, pVisible] = useReveal<HTMLParagraphElement>();

  return (
    <section className="bg-lime py-[clamp(70px,10vw,116px)] text-center text-ink">
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={bigRef}
          className={cn(
            "mx-auto max-w-[17ch] text-[clamp(32px,5.6vw,76px)] font-black leading-[0.98] tracking-[-0.03em]",
            REVEAL,
            revealState(bigVisible),
          )}
        >
          Creation is the only force strong enough to fight destruction.
        </div>
        <p
          ref={pRef}
          className={cn(
            "mx-auto mt-6 max-w-[48ch] font-space text-sm",
            REVEAL,
            revealState(pVisible),
          )}
        >
          So we create, more than we consume. We build the proof in public.
        </p>
      </div>
    </section>
  );
}

export { CreateSection };
