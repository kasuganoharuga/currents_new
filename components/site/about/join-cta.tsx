"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function JoinCta({ onOpenJoin }: { onOpenJoin: () => void }) {
  const [eyebrowRef, eyebrowVisible] = useReveal<HTMLDivElement>();
  const [h2Ref, h2Visible] = useReveal<HTMLHeadingElement>();
  const [pRef, pVisible] = useReveal<HTMLParagraphElement>();
  const [btnRef, btnVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="join"
      className="bg-ink py-[clamp(76px,11vw,136px)] text-center text-cream"
    >
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={eyebrowRef}
          className={cn(
            "mb-6 justify-center",
            REVEAL,
            revealState(eyebrowVisible),
          )}
        >
          <Eyebrow className="justify-center">Come in</Eyebrow>
        </div>
        <h2
          ref={h2Ref}
          className={cn(
            "font-display text-[clamp(46px,9vw,120px)] font-black uppercase leading-[0.98] tracking-[-0.02em] text-cream",
            REVEAL,
            revealState(h2Visible),
          )}
        >
          Join the <span className="text-lime">current.</span>
        </h2>
        <p
          ref={pRef}
          className={cn(
            "mx-auto mt-[22px] mb-10 max-w-[40ch] text-[19px] leading-[1.4] text-cream/60",
            REVEAL,
            revealState(pVisible),
          )}
        >
          If you&apos;re building, challenging, creating, you&apos;re already a
          node.
        </p>
        <div ref={btnRef} className={cn(REVEAL, revealState(btnVisible))}>
          <button
            className="rounded-full bg-ink px-[30px] py-4 font-space text-sm font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-black"
            onClick={onOpenJoin}
          >
            Become part of Currents
          </button>
        </div>
      </div>
    </section>
  );
}

export { JoinCta };
