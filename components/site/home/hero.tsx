"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

type HeroSlide = {
  src: string;
  objectPosition: string;
};

function HeroImage({
  side,
  images,
  className,
}: {
  side: "left" | "right";
  images: readonly [HeroSlide, HeroSlide, HeroSlide];
  className?: string;
}) {
  const sequence =
    side === "left"
      ? [...images, images[0]]
      : [images[0], images[2], images[1], images[0]];

  return (
    <div
      role="img"
      aria-label="Gold Coast and Currents community moments"
      className={cn(
        "relative aspect-[3/4] overflow-hidden border border-ink/15 bg-cream-2",
        side === "left"
          ? "rounded-[8rem_1rem_1rem_1rem]"
          : "rounded-[1rem_8rem_1rem_1rem]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-0 flex w-[400%] will-change-transform",
          side === "left" ? "hero-carousel-left" : "hero-carousel-right",
        )}
      >
        {sequence.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="relative h-full w-1/4 shrink-0"
          >
            <Image
              src={image.src}
              alt=""
              fill
              loading="eager"
              sizes="(max-width: 860px) 360px, 22vw"
              className="object-cover saturate-[0.82] contrast-[1.04]"
              style={{ objectPosition: image.objectPosition }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-lime/12 mix-blend-color" />
    </div>
  );
}

function Hero({ onJoin }: { onJoin: () => void }) {
  const [contentRef, contentVisible] = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden border-b border-ink/10 px-6 py-[clamp(46px,7vw,90px)] sm:px-8">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          id="hero-current-path"
          d="M-40,150 C260,60 420,320 720,260 C1020,200 1180,470 1500,380"
          fill="none"
          stroke="#E4FC54"
          strokeWidth="2.5"
          opacity="0.55"
        />
        <path
          d="M-40,300 C300,220 520,520 860,430 C1160,352 1320,600 1520,520"
          fill="none"
          stroke="#0B0B0B"
          strokeWidth="1.5"
          opacity="0.09"
        />
        <circle r="6" fill="#E4FC54" className="motion-reduce:hidden">
          <animateMotion dur="9s" repeatCount="indefinite" calcMode="linear">
            <mpath href="#hero-current-path" />
          </animateMotion>
        </circle>
        <circle
          r="4"
          fill="#E4FC54"
          opacity="0.55"
          className="motion-reduce:hidden"
        >
          <animateMotion
            dur="9s"
            begin="-4.5s"
            repeatCount="indefinite"
            calcMode="linear"
          >
            <mpath href="#hero-current-path" />
          </animateMotion>
        </circle>
      </svg>
      <div className="relative z-10 mx-auto grid max-w-[1220px] grid-cols-[minmax(170px,0.72fr)_minmax(430px,1.5fr)_minmax(170px,0.72fr)] items-center gap-[clamp(24px,4vw,56px)] max-[860px]:grid-cols-1">
        <HeroImage
          side="left"
          images={[
            {
              src: "/api/homepage-assets/hero-coast",
              objectPosition: "44% center",
            },
            {
              src: "/api/homepage-assets/hero-left-community",
              objectPosition: "50% center",
            },
            {
              src: "/api/homepage-assets/persona-investors",
              objectPosition: "52% center",
            },
          ]}
          className="max-[860px]:hidden"
        />

        <div
          ref={contentRef}
          className={cn(
            "flex flex-col items-center text-center",
            REVEAL,
            revealState(contentVisible),
          )}
        >
          <Image
            src="/brand/currents-mark.png"
            alt=""
            width={77}
            height={49}
            className="mb-8 h-auto w-[72px]"
            priority
          />
          <div className="font-space text-[10px] font-bold tracking-[0.24em] text-ink/55 uppercase">
            Gold Coast · Australia
          </div>
          <h1 className="mt-5 max-w-[10ch] text-balance font-display text-[clamp(54px,7.6vw,104px)] font-black uppercase leading-[0.88] tracking-[-0.055em]">
            Rising tides lift all boats.
          </h1>
          <p className="mt-7 max-w-[55ch] text-balance text-[clamp(17px,1.7vw,21px)] leading-[1.5] text-ink/62">
            Innovators making waves, here to break new ground, build new
            systems, and inspire the next generation.
          </p>
          <Button
            variant="brand"
            size="lg"
            className="mt-9 h-auto px-8 py-4 font-space text-[12px] font-bold tracking-[0.14em] uppercase"
            onClick={onJoin}
          >
            Become a member
          </Button>
        </div>

        <HeroImage
          side="right"
          images={[
            {
              src: "/api/homepage-assets/hero-shoreline",
              objectPosition: "center",
            },
            {
              src: "/api/homepage-assets/hero-right-community",
              objectPosition: "50% center",
            },
            {
              src: "/api/homepage-assets/persona-innovators",
              objectPosition: "50% center",
            },
          ]}
          className="max-[860px]:mx-auto max-[860px]:mt-3 max-[860px]:w-full max-[860px]:max-w-[360px]"
        />
      </div>
    </section>
  );
}

export { Hero };
