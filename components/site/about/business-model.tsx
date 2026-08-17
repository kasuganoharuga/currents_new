"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const ROWS: { l: string; r: string }[] = [
  { l: "Keeping events open & cheap", r: "Funded" },
  { l: "Education & the media arm", r: "Funded" },
  { l: "Paying the people who run it", r: "Funded" },
  { l: "Infrastructure & new cities", r: "Funded" },
  { l: "Your data, sold without you knowing", r: "Never" },
];

function BusinessModel() {
  const [leftRef, leftVisible] = useReveal<HTMLDivElement>();
  const [cardRef, cardVisible] = useReveal<HTMLDivElement>();

  return (
    <section className="bg-ink py-[clamp(72px,11vw,132px)] text-cream">
      <div className="mx-auto max-w-[1140px] px-8">
        <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(30px,5vw,64px)] max-[820px]:grid-cols-1 max-[820px]:gap-[26px]">
          <div ref={leftRef} className={cn(REVEAL, revealState(leftVisible))}>
            <Eyebrow className="mb-[22px]">The business model</Eyebrow>
            <h2 className="font-display text-[clamp(34px,5.6vw,72px)] font-black uppercase leading-[0.98] tracking-[-0.02em]">
              Data funds
              <br />
              the community.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-cream/60">
              You&apos;ll always know exactly where the value goes. Transparent
              from day one. That&apos;s how we earn the trust.
            </p>
          </div>
          <div
            ref={cardRef}
            className={cn(
              "overflow-hidden rounded-lg border border-cream/14",
              REVEAL,
              revealState(cardVisible),
            )}
          >
            <div className="flex justify-between gap-4 bg-[#151510] p-[16px_22px] text-[15px]">
              <span className="font-bold text-cream">Where the value goes</span>
              <span className="font-space text-xs text-lime">
                Openly stated
              </span>
            </div>
            {ROWS.map((row) => (
              <div
                key={row.l}
                className="flex justify-between gap-4 border-b border-cream/14 p-[16px_22px] text-[15px] last:border-b-0"
              >
                <span className="font-bold text-cream">{row.l}</span>
                <span className="font-space text-xs text-cream/60">
                  {row.r}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { BusinessModel };
