"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const PRINCIPLES = [
  {
    number: "P/01",
    title: "Make some noise, make some waves",
    subtext:
      "Good ideas should travel. We speak up, share the work, and create enough momentum for others to move with us.",
  },
  {
    number: "P/02",
    title: "We fight for win win",
    subtext:
      "We don't trade one person's progress for another's loss. We look for the outcome that leaves every side stronger.",
  },
  {
    number: "P/03",
    title: "Front line leadership; We lead, not plead",
    subtext:
      "Leadership starts where the work is. We step forward, take responsibility, and show the way through action.",
  },
  {
    number: "P/04",
    title: "We're all open to feedback",
    subtext:
      "Feedback is how the work gets better and trust stays real. We give it clearly, receive it without ego, and act on what helps.",
  },
  {
    number: "P/05",
    title: "We will disagree, it's how you do it",
    subtext:
      "Different views make the work sharper. We challenge ideas directly, stay curious, and never make disagreement personal.",
  },
  {
    number: "P/06",
    title: "We fight the problem not each other",
    subtext:
      "Pressure points us toward the issue, not at each other. We stay on the same side and put our energy into the solution.",
  },
  {
    number: "P/07",
    title: "If you believe it, speak it; Be transparent",
    subtext:
      "Say the important thing while it can still help. We share context, name concerns early, and make our intentions visible.",
  },
  {
    number: "P/08",
    title: "We are experts at conflict resolution",
    subtext:
      "Conflict is not failure; leaving it unresolved is. We listen to understand, find common ground, and leave the relationship stronger.",
  },
] as const;

function Constitution() {
  const [introRef, introVisible] = useReveal<HTMLDivElement>();
  const [gridRef, gridVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="constitution"
      className="border-y border-ink/10 bg-cream-2 px-6 py-[clamp(64px,9vw,108px)] sm:px-8"
    >
      <div className="mx-auto max-w-[1140px]">
        <div
          ref={introRef}
          className={cn(
            "mb-[clamp(34px,5vw,56px)] grid grid-cols-[0.8fr_1.2fr] gap-[clamp(32px,6vw,88px)] max-[760px]:grid-cols-1",
            REVEAL,
            revealState(introVisible),
          )}
        >
          <div>
            <Eyebrow className="mb-5">What we stand for</Eyebrow>
            <h2 className="font-display text-[clamp(42px,5.8vw,76px)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
              The things we hold each other to.
            </h2>
          </div>
          <p className="max-w-[58ch] self-end text-[clamp(16px,1.7vw,20px)] leading-[1.58] text-ink/62">
            Not slogans. The operating principles every node runs on. Some are
            paradoxes on purpose. They don&apos;t box you in, they frame how we
            move. We say them as if we already live them, because if we do,
            we&apos;re unstoppable.
          </p>
        </div>

        <Accordion
          type="multiple"
          ref={gridRef}
          className={cn(
            "grid grid-cols-2 gap-px border border-ink bg-ink max-[700px]:grid-cols-1",
            REVEAL,
            revealState(gridVisible),
          )}
        >
          {PRINCIPLES.map((principle) => (
            <AccordionItem
              key={principle.number}
              value={principle.number}
              className="border-0 bg-cream px-[clamp(18px,2.4vw,30px)] data-[state=open]:bg-lime"
            >
              <AccordionTrigger className="min-h-[104px] gap-6 py-6 text-left hover:no-underline [&>svg]:mt-1 [&>svg]:text-ink/45">
                <span className="grid grid-cols-[48px_1fr] items-start gap-3">
                  <span className="pt-1 font-space text-[10px] tracking-[0.12em] text-ink/45">
                    {principle.number}
                  </span>
                  <span className="font-display text-[clamp(19px,2.1vw,27px)] font-black uppercase leading-[1.04] tracking-[-0.02em]">
                    {principle.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-[60px]">
                <p className="border-t border-ink/16 pt-4 pr-8 pb-2 text-[15px] leading-[1.55] text-ink/68">
                  {principle.subtext}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export { Constitution };
