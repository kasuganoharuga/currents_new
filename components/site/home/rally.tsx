"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function Rally() {
  const [eyebrowRef, eyebrowVisible] = useReveal<HTMLDivElement>();
  const [bigRef, bigVisible] = useReveal<HTMLDivElement>();
  const [pRef, pVisible] = useReveal<HTMLParagraphElement>();

  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(72px,10vw,124px)] text-center text-cream">
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={eyebrowRef}
          className={cn(
            "mb-[26px] justify-center",
            REVEAL,
            revealState(eyebrowVisible),
          )}
        >
          <Eyebrow className="justify-center">
            The one you say when you&apos;re stuck
          </Eyebrow>
        </div>
        <div
          ref={bigRef}
          className={cn(
            "font-display text-[clamp(46px,9vw,124px)] font-black uppercase leading-[0.9] tracking-[-0.04em]",
            REVEAL,
            revealState(bigVisible),
          )}
        >
          Think bigger
          <br />
          than <span className="text-lime">big.</span>
        </div>
        <p
          ref={pRef}
          className={cn(
            "mx-auto mt-[30px] max-w-[54ch] text-[17px] leading-[1.55] text-cream/60",
            REVEAL,
            revealState(pVisible),
          )}
        >
          When the path runs out, we build one. Stuck is just the moment before
          the breakthrough.{" "}
          <b className="text-cream">
            We&apos;re innovators, we keep breaking new ground
          </b>
          , and there&apos;s always a bigger swing.
        </p>
      </div>
    </section>
  );
}

export { Rally };
