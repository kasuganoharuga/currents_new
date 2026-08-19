"use client";

import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";
import { cn } from "@/lib/utils";

const CAPABILITIES = [
  {
    number: "01",
    title: "Connect",
    copy: "More connections, more networking. Meet and connect with founders, talk, and grow your business exponentially through the connection.",
  },
  {
    number: "02",
    title: "Amplify",
    copy: "Boost the brand and the marketing. A rising tide lifts all boats — we all get more exposure together.",
  },
  {
    number: "03",
    title: "Capability",
    copy: "Do what we can to support founders on that journey.",
  },
] as const;

function WhatWeDo() {
  const [headingRef, headingVisible] = useReveal<HTMLDivElement>();
  const [cardsRef, cardsVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="what-we-do"
      className="border-t border-ink/12 bg-cream py-[clamp(72px,10vw,124px)] text-ink"
    >
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={headingRef}
          className={cn(
            "grid grid-cols-[0.7fr_1.3fr] items-end gap-[clamp(28px,6vw,76px)] max-[780px]:grid-cols-1",
            REVEAL,
            revealState(headingVisible),
          )}
        >
          <Eyebrow>What we do</Eyebrow>
          <h2 className="max-w-[12ch] font-display text-[clamp(42px,7vw,92px)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
            Connect.
            <br />
            Amplify.
            <br />
            Capability.
          </h2>
        </div>

        <div
          ref={cardsRef}
          className={cn(
            "mt-[clamp(48px,7vw,82px)] grid grid-cols-3 border-y border-ink max-[780px]:grid-cols-1",
            REVEAL,
            revealState(cardsVisible),
          )}
        >
          {CAPABILITIES.map((capability, index) => (
            <article
              key={capability.title}
              className={cn(
                "group relative min-h-[330px] p-[clamp(24px,3vw,38px)]",
                index > 0 &&
                  "border-l border-ink max-[780px]:border-t max-[780px]:border-l-0",
              )}
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100" />
              <span className="font-space text-[11px] font-bold tracking-[0.16em] text-ink/50">
                {capability.number}
              </span>
              <h3 className="mt-10 text-[clamp(28px,3.2vw,44px)] font-black uppercase leading-none tracking-[-0.02em]">
                {capability.title}
              </h3>
              <p className="mt-6 max-w-[32ch] text-[17px] leading-[1.6] text-ink/60">
                {capability.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhatWeDo };
