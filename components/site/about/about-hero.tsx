"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function AboutHero() {
  const [eyebrowRef, eyebrowVisible] = useReveal<HTMLDivElement>();
  const [h1Ref, h1Visible] = useReveal<HTMLHeadingElement>();
  const [subRef, subVisible] = useReveal<HTMLParagraphElement>();
  const [braveRef, braveVisible] = useReveal<HTMLDivElement>();

  return (
    <section className="pt-[clamp(64px,11vw,128px)] pb-[clamp(44px,7vw,80px)]">
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={eyebrowRef}
          className={cn("mb-[26px]", REVEAL, revealState(eyebrowVisible))}
        >
          <Eyebrow>The Model</Eyebrow>
        </div>
        <h1
          ref={h1Ref}
          className={cn(
            "font-display text-[clamp(52px,10.5vw,140px)] font-black uppercase leading-[0.9] tracking-[-0.03em]",
            REVEAL,
            revealState(h1Visible),
          )}
        >
          A community
          <br />
          of leaders.
        </h1>
        <p
          ref={subRef}
          className={cn(
            "mt-6 max-w-[34ch] text-[clamp(17px,2vw,22px)] leading-[1.4] font-medium text-ink/60",
            REVEAL,
            revealState(subVisible),
          )}
        >
          Innovators, each leading in their own direction, toward the same goal.
        </p>
        <div
          ref={braveRef}
          className={cn(
            "mt-9 max-w-[40ch] border-l-[3px] border-lime py-[5px] pl-[18px] font-space text-[clamp(13px,1.5vw,15px)] leading-[1.6] tracking-[0.02em]",
            REVEAL,
            revealState(braveVisible),
          )}
        >
          A radically changing world requires a radically brave mind.
        </div>
      </div>
    </section>
  );
}

export { AboutHero };
