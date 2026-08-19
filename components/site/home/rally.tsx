"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/eyebrow";
import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function Rally({ onJoin }: { onJoin: () => void }) {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="invite"
      className="relative overflow-hidden bg-ink px-6 py-[clamp(64px,9vw,108px)] text-cream sm:px-8"
    >
      <div className="absolute -top-36 -right-24 size-[420px] rounded-full border-[72px] border-current-blue/30" />
      <div
        ref={ref}
        className={cn(
          "relative mx-auto max-w-[1140px]",
          REVEAL,
          revealState(visible),
        )}
      >
        <div className="grid grid-cols-[0.72fr_1.28fr] items-end gap-[clamp(32px,7vw,96px)] border-b border-cream/16 pb-[clamp(46px,6vw,70px)] max-[760px]:grid-cols-1 max-[760px]:gap-7">
          <div>
            <div className="font-space text-[10px] font-bold tracking-[0.19em] text-lime uppercase">
              The one you say when you&apos;re stuck
            </div>
            <h2 className="mt-5 font-display text-[clamp(48px,7.2vw,94px)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
              Make bigger than <span className="text-lime">big.</span>
            </h2>
          </div>
          <p className="max-w-[54ch] text-[clamp(17px,1.8vw,21px)] leading-[1.55] text-cream/68">
            When the path runs out, we build one. Stuck is just the moment
            before the breakthrough. We&apos;re innovators, we keep breaking new
            ground, and there&apos;s always a bigger swing.
          </p>
        </div>

        <div className="grid grid-cols-[1.05fr_0.95fr] items-end gap-[clamp(38px,8vw,110px)] pt-[clamp(48px,7vw,82px)] max-[760px]:grid-cols-1">
          <div>
            <Eyebrow className="mb-6">Join the current</Eyebrow>
            <h2 className="font-display text-[clamp(58px,9.5vw,128px)] font-black uppercase leading-[0.84] tracking-[-0.055em]">
              Join the <span className="text-lime">current.</span>
            </h2>
          </div>
          <div>
            <p className="max-w-[44ch] text-[clamp(18px,2vw,24px)] leading-[1.48] text-cream/68">
              Join the community. Bring a partnership. However you plug in, the
              tide rises for everyone in it.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Button
                variant="brand"
                size="lg"
                className="h-auto w-full max-w-[324px] justify-center px-7 py-4 font-space text-[12px] font-bold tracking-[0.12em] uppercase"
                onClick={onJoin}
              >
                Join the community
              </Button>
              <Button
                asChild
                variant="brand-outline"
                size="lg"
                className="h-auto w-full max-w-[324px] justify-center border-cream/60 px-7 py-4 font-space text-[12px] font-bold tracking-[0.12em] text-cream uppercase hover:bg-cream/10"
              >
                <Link href="/sponsors">Partner with us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Rally };
