"use client";

import Image from "next/image";

import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";
import { cn } from "@/lib/utils";

const FUNCTIONS = [
  {
    number: "01",
    title: "Connect",
    value:
      "Real connection between the right people. The room, the rhythm, and the relationships a founder cannot get anywhere else.",
  },
  {
    number: "02",
    title: "Amplify",
    value:
      "The brand and marketing engine. Put our people and the scene on the map.",
  },
  {
    number: "03",
    title: "Capability",
    value: "The growth layer. Give founders what they actually need to grow.",
  },
] as const;

const IMAGES = [
  {
    src: "/about-assets/kenji-reserve/mondrian-41.webp",
    alt: "Currents members sharing a conversation at an event",
  },
  {
    src: "/about-assets/kenji-reserve/mondrian-120.webp",
    alt: "Two Currents members connecting over a drink",
  },
  {
    src: "/about-assets/kenji-reserve/mondrian-73.webp",
    alt: "Currents members gathered together in conversation",
  },
] as const;

function WhatWeDoForThem() {
  const [headingRef, headingVisible] = useReveal<HTMLDivElement>();
  const [gridRef, gridVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="what-we-do-for-them"
      className="border-t border-cream/12 bg-ink py-[clamp(72px,10vw,124px)] text-cream"
    >
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={headingRef}
          className={cn(REVEAL, revealState(headingVisible))}
        >
          <Eyebrow className="mb-8">What we do</Eyebrow>
          <h2 className="font-display text-[clamp(30px,7vw,40px)] font-black uppercase leading-[1.04] tracking-[-0.03em] min-[781px]:whitespace-nowrap min-[781px]:text-[min(calc(3.68vw_-_3px),39px)]">
            Connect first. Then amplify. Then capability.
          </h2>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.6] text-cream/60">
            Three functions. The order carries the weight.
          </p>

          <div className="mt-[clamp(30px,4vw,52px)] grid grid-cols-3 gap-3 max-[780px]:grid-cols-1">
            {IMAGES.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/3] overflow-hidden rounded-[6px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 780px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className={cn(
            "mt-[clamp(48px,7vw,82px)] grid grid-cols-3 overflow-hidden rounded-[8px] border border-cream/20 max-[780px]:grid-cols-1",
            REVEAL,
            revealState(gridVisible),
          )}
        >
          {FUNCTIONS.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "group flex min-h-[360px] flex-col",
                index > 0 &&
                  "border-l border-cream/20 max-[780px]:border-t max-[780px]:border-l-0",
              )}
            >
              <div className="relative border-b border-cream/20 bg-[#151515] px-[clamp(24px,3vw,36px)] py-7">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100" />
                <span className="font-space text-[10px] font-bold tracking-[0.16em] text-lime">
                  {item.number}
                </span>
                <h3 className="mt-4 text-[clamp(30px,3vw,42px)] font-black uppercase leading-none tracking-[-0.02em]">
                  {item.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col px-[clamp(24px,3vw,36px)] py-7">
                <span className="font-space text-[11px] font-bold tracking-[0.16em] text-cream/45 uppercase">
                  The value
                </span>
                <p className="mt-6 max-w-[30ch] text-[clamp(18px,1.7vw,22px)] leading-[1.5] text-cream/82">
                  {item.value}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhatWeDoForThem };
