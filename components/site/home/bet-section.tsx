"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function BetSection() {
  const [headRef, headVisible] = useReveal<HTMLDivElement>();
  const [itemRef, itemVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="bet"
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

        <AccordionPrimitive.Root
          type="single"
          collapsible
          className={cn(
            "border-t border-b border-ink",
            REVEAL,
            revealState(itemVisible),
          )}
          ref={itemRef}
        >
          <AccordionPrimitive.Item value="bet" className="group">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex w-full items-center gap-5 py-[26px] text-left transition-[padding-left] duration-250 hover:pl-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-[3px]">
                <span className="flex-1 text-[clamp(30px,4.4vw,58px)] font-black leading-[1.02] tracking-[-0.02em]">
                  Australia has more to offer than just{" "}
                  <em className="bg-lime px-[0.12em] not-italic">
                    natural resources.
                  </em>
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-9 flex-none items-center justify-center rounded-full border-[1.5px] border-ink text-[22px] transition-[background-color,color,transform] duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-ink group-data-[state=open]:text-lime"
                >
                  +
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="max-w-[64ch] py-0.5 pb-8 pl-[52px] max-[640px]:pl-[34px]">
                <p className="text-base leading-[1.6] text-ink/60">
                  There&apos;s a whole economy of people here bringing new ideas
                  to the table, challenging old ones and breaking into new
                  ground. No home was ever built to hold them together.
                </p>
                <p className="mt-[18px] text-base leading-[1.6] text-ink/60">
                  Currents is that home: a hub at the meeting point of
                  innovation, arts and entrepreneurship. We lift the Gold
                  Coast&apos;s new identity first, then carry the same current
                  to the rest of the country. Small place. Global leaders.
                </p>
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}

export { BetSection };
