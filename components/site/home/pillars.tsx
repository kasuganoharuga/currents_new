"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const PILLARS = [
  { n: "01", w: "Friendship" },
  { n: "02", w: "Fun" },
  { n: "03", w: "Innovation" },
];

function PillarItem({ n, w }: { n: string; w: string }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2.5 border-t-2 border-ink pt-4",
        REVEAL,
        revealState(visible),
      )}
    >
      <span className="font-space text-xs tracking-[0.14em] text-ink/50">
        {n}
      </span>
      <span className="font-display text-[clamp(34px,5.4vw,64px)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
        {w}
      </span>
    </div>
  );
}

function Pillars() {
  const [eyebrowRef, eyebrowVisible] = useReveal<HTMLDivElement>();

  return (
    <section className="bg-lime py-[clamp(56px,8vw,96px)] text-ink">
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={eyebrowRef}
          className={cn("mb-[34px]", REVEAL, revealState(eyebrowVisible))}
        >
          <Eyebrow className="before:bg-ink">What we&apos;re built on</Eyebrow>
        </div>
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[clamp(16px,3vw,40px)] max-[760px]:grid-cols-[1fr] max-[760px]:gap-[22px]">
          {PILLARS.map((p) => (
            <PillarItem key={p.n} n={p.n} w={p.w} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { Pillars };
