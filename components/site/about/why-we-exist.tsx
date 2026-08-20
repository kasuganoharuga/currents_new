"use client";

import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";
import { cn } from "@/lib/utils";

function WhyWeExist() {
  const [headRef, headVisible] = useReveal<HTMLDivElement>();
  const [bodyRef, bodyVisible] = useReveal<HTMLDivElement>();
  const [statementRef, statementVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="why-we-exist"
      className="pt-[clamp(34px,5vw,60px)] pb-[clamp(72px,11vw,140px)]"
    >
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={headRef}
          className={cn(
            "mb-[clamp(34px,5vw,64px)]",
            REVEAL,
            revealState(headVisible),
          )}
        >
          <Eyebrow>Why we exist</Eyebrow>
        </div>

        <div
          ref={bodyRef}
          className={cn(
            "grid grid-cols-[1.05fr_0.95fr] items-start gap-[clamp(28px,5vw,72px)] border-t border-ink pt-[clamp(26px,4vw,44px)] max-[820px]:grid-cols-1 max-[820px]:gap-[22px]",
            REVEAL,
            revealState(bodyVisible),
          )}
        >
          <h2 className="text-[clamp(30px,4.4vw,58px)] font-black leading-[1.02] tracking-[-0.025em]">
            Australia has more to offer than just{" "}
            <em className="bg-lime px-[0.12em] not-italic">
              natural resources.
            </em>
          </h2>
          <p className="max-w-[46ch] self-end text-[clamp(16px,1.6vw,19px)] leading-[1.62] text-ink/60">
            There&apos;s a whole economy of people here bringing new ideas to
            the table, challenging old ones and breaking into new ground. No
            home was ever built to hold them together.
          </p>
        </div>

        <div
          ref={statementRef}
          className={cn(
            "mt-[clamp(44px,7vw,96px)] border-t-2 border-ink pt-[clamp(28px,4vw,52px)]",
            REVEAL,
            revealState(statementVisible),
          )}
        >
          <p className="max-w-[16ch] font-display text-[clamp(40px,6.6vw,92px)] font-black uppercase leading-[0.9] tracking-[-0.045em]">
            Currents is that home.
          </p>
          <p className="mt-[clamp(18px,2.4vw,30px)] max-w-[28ch] font-display text-[clamp(21px,2.7vw,36px)] font-bold leading-[1.16] tracking-[-0.025em] text-ink/75">
            A hub at the meeting point of innovation, arts and entrepreneurship.
          </p>
          <p className="mt-[clamp(24px,3.4vw,44px)] max-w-[54ch] text-[clamp(16px,1.6vw,19px)] leading-[1.62] text-ink/60">
            We lift the Gold Coast&apos;s new identity first, then carry the
            same current to the rest of the country. Small place. Global
            leaders.
          </p>
        </div>
      </div>
    </section>
  );
}

export { WhyWeExist };
