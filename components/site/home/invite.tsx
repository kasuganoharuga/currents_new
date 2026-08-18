"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function Invite({ onJoin }: { onJoin: () => void }) {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="invite"
      className="overflow-hidden bg-ink px-6 py-[clamp(72px,10vw,124px)] text-cream sm:px-8"
    >
      <div
        ref={ref}
        className={cn(
          "relative mx-auto grid max-w-[1140px] grid-cols-[1.05fr_0.95fr] items-end gap-[clamp(38px,8vw,110px)] max-[760px]:grid-cols-1",
          REVEAL,
          revealState(visible),
        )}
      >
        <div>
          <Eyebrow className="mb-6">Join the current</Eyebrow>
          <h2 className="font-display text-[clamp(58px,9.5vw,128px)] font-black uppercase leading-[0.84] tracking-[-0.055em]">
            Join the <span className="text-lime">current.</span>
          </h2>
        </div>
        <div>
          {/* TODO(Q2): Keep the corrected two-path sentence until the source doc is updated. */}
          <p className="max-w-[44ch] text-[clamp(18px,2vw,24px)] leading-[1.48] text-cream/68">
            Be a member. Bring a partnership. However you plug in, the tide
            rises for everyone in it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="brand"
              size="lg"
              className="h-auto px-7 py-4 font-space text-[12px] font-bold tracking-[0.12em] uppercase"
              onClick={onJoin}
            >
              Become a member
            </Button>
            <Button
              asChild
              variant="brand-outline"
              size="lg"
              className="h-auto border-cream/60 px-7 py-4 font-space text-[12px] font-bold tracking-[0.12em] text-cream uppercase hover:bg-cream/10"
            >
              <Link href="/sponsors">Partner with us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Invite };
