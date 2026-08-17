"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function Hero() {
  const heroPathRef = useRef<SVGPathElement>(null);
  const [eyebrowRef, eyebrowVisible] = useReveal<HTMLDivElement>();
  const [h1Ref, h1Visible] = useReveal<HTMLHeadingElement>();
  const [tagRef, tagVisible] = useReveal<HTMLDivElement>();
  const [statementRef, statementVisible] = useReveal<HTMLDivElement>();
  const [storyRef, storyVisible] = useReveal<HTMLDivElement>();

  useEffect(() => {
    const path = heroPathRef.current;
    if (!path) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    try {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = reduce ? "0" : String(len);
      if (!reduce) {
        path.style.transition =
          "stroke-dashoffset 2.4s cubic-bezier(.4,0,.1,1)";
      }
    } catch {
      // ignore
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    });
  }, []);

  return (
    <section className="relative overflow-hidden pt-[clamp(60px,11vw,132px)] pb-[clamp(30px,4vw,52px)]">
      <svg
        className="pointer-events-none absolute inset-0 z-[1]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          ref={heroPathRef}
          id="heroPath"
          d="M-40,150 C260,60 420,320 720,260 C1020,200 1180,470 1500,380"
          fill="none"
          stroke="#E4FC54"
          strokeWidth="2.5"
          opacity="0.5"
        />
        <path
          d="M-40,300 C300,220 520,520 860,430 C1160,352 1320,600 1520,520"
          fill="none"
          stroke="#0B0B0B"
          strokeWidth="1.5"
          opacity="0.09"
        />
        <circle r="6" fill="#E4FC54">
          <animateMotion dur="9s" repeatCount="indefinite" calcMode="linear">
            <mpath xlinkHref="#heroPath" href="#heroPath" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#E4FC54" opacity="0.55">
          <animateMotion
            dur="9s"
            begin="-4.5s"
            repeatCount="indefinite"
            calcMode="linear"
          >
            <mpath xlinkHref="#heroPath" href="#heroPath" />
          </animateMotion>
        </circle>
      </svg>

      <div className="relative z-[2] mx-auto max-w-[1140px] px-8">
        <Image
          src="/brand/currents-mark.png"
          alt=""
          width={77}
          height={49}
          className="mb-[30px] w-[clamp(64px,9vw,104px)] h-auto"
        />
        <div
          ref={eyebrowRef}
          className={cn(
            "inline-flex items-center gap-2.5 font-space text-xs font-bold tracking-[0.22em] uppercase before:block before:h-0.5 before:w-[26px] before:flex-none before:bg-lime",
            REVEAL,
            revealState(eyebrowVisible),
          )}
        >
          Gold Coast · Australia
        </div>
        <h1
          ref={h1Ref}
          className={cn(
            "mt-1.5 mb-[26px] font-display text-[clamp(52px,11vw,152px)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-ink",
            REVEAL,
            revealState(h1Visible),
          )}
        >
          Currents
        </h1>
        <div
          ref={tagRef}
          className={cn(
            "mb-[34px] font-space text-[clamp(15px,2vw,20px)] font-bold tracking-[0.02em]",
            REVEAL,
            revealState(tagVisible),
          )}
        >
          Rising tides lift{" "}
          <b className="bg-lime px-2 py-0.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            all boats.
          </b>
        </div>
        <div
          ref={statementRef}
          className={cn(
            "max-w-[24ch] text-[clamp(28px,4.2vw,54px)] font-extrabold leading-[1.14] tracking-[-0.02em]",
            REVEAL,
            revealState(statementVisible),
          )}
        >
          Innovators{" "}
          <span className="border-b-[3px] border-lime pb-0.5">
            making waves
          </span>
          , a counter-cultural movement here to{" "}
          <span className="bg-lime px-[0.06em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            break new ground
          </span>
          , build new systems, and inspire the next generation.
        </div>
        <div
          ref={storyRef}
          className={cn(
            "mt-[clamp(44px,6vw,70px)]",
            REVEAL,
            revealState(storyVisible),
          )}
        >
          <div className="relative inline-block pb-[18px] font-display text-[clamp(56px,9.5vw,124px)] font-black uppercase leading-[0.92] tracking-[-0.04em]">
            Our Story
            <svg
              className="absolute -bottom-0.5 -left-[2%] -z-10 h-[0.34em] w-[104%] fill-lime"
              viewBox="0 0 320 26"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M3,17 C28,10.5 52,20.5 79,14 C104,8 128,19.5 155,13.5 C182,7.5 206,18 233,12.5 C258,7.5 284,16 315,9.5 C300,20 272,15.5 246,20 C219,24.5 196,16.5 170,21.5 C143,26.5 118,17.5 92,22 C66,26.5 40,19 14,23 C9,23.5 4,21 3,17 Z" />
            </svg>
          </div>
          <div className="mt-[22px] flex">
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-3 border-b-2 border-lime pb-1.5 font-space text-[13px] font-bold tracking-[0.14em] uppercase text-ink transition-[gap] duration-200 hover:gap-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4"
            >
              Read the manifesto <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
