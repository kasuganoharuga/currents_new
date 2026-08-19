"use client";

import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const STORY = [
  "Innovation isn't for its own sake. It's how we leave this place better than we found it, for the next generation. Carving a new way doesn't come without it's pain. To build something new is to go against the grain. You break new ground, and the world pushes back.",
  "Rising tides lift all boats. So we build the tide, event by event, node by node, city by city, until the current is strong enough to carry the next generation further than we've come.",
];

const STORY_IMAGES = [
  {
    src: "/homepage-assets/story-community-new.webp",
    position: "58% center",
  },
  {
    src: "/api/homepage-assets/community-mixer",
    position: "52% center",
  },
  {
    src: "/api/homepage-assets/story-connection",
    position: "52% center",
  },
] as const;

function OurStory() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-ink px-6 py-[clamp(80px,10vw,132px)] text-cream sm:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 grid grid-cols-[1.05fr_0.95fr_1fr] max-[760px]:block"
      >
        {STORY_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={cn(
              "relative h-full border-r border-cream/10 last:border-r-0",
              index > 0 && "max-[760px]:hidden",
              index === 0 && "max-[760px]:absolute max-[760px]:inset-0",
            )}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes={index === 0 ? "(max-width: 760px) 100vw, 35vw" : "33vw"}
              className="object-cover opacity-90 saturate-[0.74] contrast-[1.04]"
              style={{ objectPosition: image.position }}
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-current-blue/30 mix-blend-color"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/12 via-transparent to-ink/28"
      />
      <div
        ref={ref}
        className={cn(
          "mx-auto grid max-w-[1140px] grid-cols-[0.72fr_1.28fr] gap-[clamp(36px,7vw,100px)] max-[760px]:grid-cols-1 max-[760px]:gap-8",
          REVEAL,
          revealState(visible),
        )}
      >
        <div>
          <h2 className="max-w-[7ch] font-display text-[clamp(46px,6.4vw,86px)] font-black uppercase leading-[0.9] tracking-[-0.045em]">
            Our Story
          </h2>
        </div>
        <div className="pt-1">
          <Separator className="mb-7 bg-cream/28" />
          <div className="space-y-5 text-[clamp(17px,1.7vw,21px)] leading-[1.58] text-cream/82">
            {STORY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/manifesto"
            className="mt-8 inline-flex items-center gap-3 border-b-2 border-lime pb-1.5 font-space text-[11px] font-bold tracking-[0.14em] uppercase text-cream transition-[gap] hover:gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-4"
          >
            Read the manifesto <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export { OurStory };
