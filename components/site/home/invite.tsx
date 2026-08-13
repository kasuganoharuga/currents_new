"use client";

import { cn } from "@/lib/utils";
import { BrandButton } from "@/components/site/brand-button";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function Invite() {
  const [eyebrowRef, eyebrowVisible] = useReveal<HTMLDivElement>();
  const [h2Ref, h2Visible] = useReveal<HTMLHeadingElement>();
  const [pRef, pVisible] = useReveal<HTMLParagraphElement>();
  const [ctaRef, ctaVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="invite"
      className="bg-ink py-[clamp(80px,12vw,150px)] text-center text-cream"
    >
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={eyebrowRef}
          className={cn(
            "mb-[26px] justify-center",
            REVEAL,
            revealState(eyebrowVisible),
          )}
        >
          <Eyebrow className="justify-center">Come in</Eyebrow>
        </div>
        <h2
          ref={h2Ref}
          className={cn(
            "font-display text-[clamp(52px,11vw,152px)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-cream",
            REVEAL,
            revealState(h2Visible),
          )}
        >
          Join the <span className="text-lime">current.</span>
        </h2>
        <p
          ref={pRef}
          className={cn(
            "mx-auto mt-6 mb-11 max-w-[44ch] text-[clamp(19px,2.3vw,26px)] leading-[1.34] font-medium text-cream/60",
            REVEAL,
            revealState(pVisible),
          )}
        >
          Be a member. Bring a partnership. Host a node in your city. However
          you plug in, the tide rises for everyone in it.
        </p>
        <div
          ref={ctaRef}
          className={cn(
            "flex flex-wrap justify-center gap-3.5",
            REVEAL,
            revealState(ctaVisible),
          )}
        >
          <BrandButton asChild variant="primary">
            <a href="#">Become a member</a>
          </BrandButton>
          <BrandButton asChild variant="ghost">
            <a href="#">Partner with us</a>
          </BrandButton>
          <BrandButton asChild variant="ghost">
            <a href="#">Host a node</a>
          </BrandButton>
        </div>
      </div>
    </section>
  );
}

export { Invite };
