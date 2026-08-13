"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const LINES = [
  "Change happens in rooms, not comment sections. So we fill rooms.",
  "Your win gets carried further than you could carry it alone.",
  "Every industry here is fighting the same fight against the way it's always been done.",
  "Other community groups plug in. Their workshops, their people, the same current.",
  "Many industries, many voices, one sound.",
];

function Voice() {
  const [leftRef, leftVisible] = useReveal<HTMLDivElement>();
  const [listRef, listVisible] = useReveal<HTMLUListElement>();

  return (
    <section id="voice" className="py-[clamp(72px,11vw,140px)]">
      <div className="mx-auto max-w-[1140px] px-8">
        <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-[clamp(30px,5vw,72px)] max-[820px]:grid-cols-1 max-[820px]:gap-[26px]">
          <div ref={leftRef} className={cn(REVEAL, revealState(leftVisible))}>
            <Eyebrow className="mb-6">The voice</Eyebrow>
            <div className="font-display text-[clamp(44px,8vw,104px)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
              Be the{" "}
              <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]">
                noise.
              </span>
            </div>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.6] text-ink/60">
              You&apos;re already making noise in your industry. Challenging how
              it&apos;s always been done, building the thing nobody asked for
              yet. The problem was never the signal. It&apos;s that one voice
              alone is easy to ignore. So we make the sound together, and it
              gets too loud to ignore.
            </p>
          </div>
          <ul
            ref={listRef}
            className={cn(
              "flex flex-col gap-0.5",
              REVEAL,
              revealState(listVisible),
            )}
          >
            {LINES.map((line, i) => (
              <li
                key={i}
                className={cn(
                  "flex gap-3.5 border-t border-ink/12 py-4 text-base",
                  i === LINES.length - 1 && "border-b",
                )}
              >
                <span className="flex-none font-space font-bold text-ink">
                  &rarr;
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export { Voice };
