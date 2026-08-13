"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const VALUES: {
  num: string;
  name: React.ReactNode;
  why: string;
  wide?: boolean;
}[] = [
  {
    num: "P/01",
    name: (
      <>
        People first,
        <br />
        <span className="bg-lime px-[0.1em] box-decoration-clone">
          business second
        </span>
      </>
    ),
    why: "Relationships come before the sale. When we get that order right, the business takes care of itself.",
  },
  {
    num: "P/02",
    name: (
      <>
        We are experts at{" "}
        <span className="bg-lime px-[0.1em] box-decoration-clone">
          conflict resolution
        </span>
      </>
    ),
    why: "We will disagree, and we hope we do. What sets us apart is that we resolve it. Seek first to understand, then to be understood.",
  },
  {
    num: "P/03",
    name: (
      <>
        No one is above{" "}
        <span className="bg-lime px-[0.1em] box-decoration-clone">
          feedback
        </span>
      </>
    ),
    why: "Net worth doesn't buy an exemption. Everyone gives honest feedback and everyone can take it.",
  },
  {
    num: "P/04",
    name: (
      <>
        Be transparent.
        <br />
        <span className="bg-lime px-[0.1em] box-decoration-clone">
          If you believe it, speak it
        </span>
      </>
    ),
    why: "Silence is where resentment grows. Name the uncomfortable truth early, kindly, out loud.",
  },
  {
    num: "P/05",
    name: (
      <>
        We will disagree,
        <br />
        <span className="bg-lime px-[0.1em] box-decoration-clone">be kind</span>
      </>
    ),
    why: "Individuals and a collective at the same time. Hold your view firmly; hold the person gently.",
  },
  {
    num: "P/06",
    name: (
      <>
        We fight the problem,
        <br />
        <span className="bg-lime px-[0.1em] box-decoration-clone">
          not each other
        </span>
      </>
    ),
    why: "A standing reminder in the room: are we fighting each other right now, or the thing in front of us?",
  },
  {
    num: "P/07",
    name: (
      <>
        Think{" "}
        <span className="bg-lime px-[0.1em] box-decoration-clone">
          inclusive
        </span>
        ,
        <br />
        not exclusive
      </>
    ),
    why: "We invite people into the framework rather than gatekeeping it. The door is the point.",
  },
  {
    num: "P/08",
    name: (
      <>
        We fight for{" "}
        <span className="bg-lime px-[0.1em] box-decoration-clone">win–win</span>
      </>
    ),
    why: "If you win, I win. What's made by the community gets used by the community.",
  },
  {
    num: "P/09",
    name: (
      <>
        Think bigger{" "}
        <span className="bg-lime px-[0.1em] box-decoration-clone">
          than big
        </span>
      </>
    ),
    why: "When the path runs out, we build one. Stuck is just the moment before the breakthrough. The one you say when you think you've hit the end.",
    wide: true,
  },
];

function ValueCard({ v }: { v: (typeof VALUES)[number] }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 bg-cream p-[30px_28px] transition-colors hover:bg-cream-2",
        v.wide && "col-span-full",
        REVEAL,
        revealState(visible),
      )}
    >
      <span className="font-space text-xs tracking-[0.1em] text-ink/40">
        {v.num}
      </span>
      <span
        className={cn(
          "font-display font-black uppercase leading-[1.06] tracking-[-0.01em]",
          v.wide ? "text-[clamp(26px,3.4vw,38px)]" : "text-[23px]",
        )}
      >
        {v.name}
      </span>
      <span
        className={cn(
          "text-[15px] leading-[1.55] text-ink/60",
          v.wide && "max-w-[62ch]",
        )}
      >
        {v.why}
      </span>
    </div>
  );
}

function Constitution() {
  const [introRef, introVisible] = useReveal<HTMLDivElement>();
  const [gridRef, gridVisible] = useReveal<HTMLDivElement>();
  const [noteRef, noteVisible] = useReveal<HTMLDivElement>();

  return (
    <section id="constitution" className="py-[clamp(72px,11vw,140px)]">
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={introRef}
          className={cn(
            "mb-[52px] grid grid-cols-[repeat(2,1fr)] items-end gap-10 max-[820px]:grid-cols-1 max-[820px]:gap-[22px]",
            REVEAL,
            revealState(introVisible),
          )}
        >
          <div>
            <Eyebrow className="mb-[22px]">What we stand for</Eyebrow>
            <h2 className="font-display text-[clamp(34px,5.4vw,68px)] font-black uppercase leading-[0.98] tracking-[-0.02em]">
              The things we hold
              <br />
              each other to.
            </h2>
          </div>
          <p className="max-w-[56ch] text-[17px] leading-[1.6] text-ink/60">
            Not slogans. The operating principles every node runs on. Some are
            paradoxes on purpose. They don&apos;t box you in, they frame how we
            move. We say them as if we already live them, because if we do,
            we&apos;re unstoppable.
          </p>
        </div>

        <div
          ref={gridRef}
          className={cn(
            "grid grid-cols-[repeat(2,1fr)] gap-px border border-ink bg-ink max-[640px]:grid-cols-1",
            REVEAL,
            revealState(gridVisible),
          )}
        >
          {VALUES.map((v) => (
            <ValueCard key={v.num} v={v} />
          ))}
        </div>

        <div
          ref={noteRef}
          className={cn(
            "mt-[30px] flex flex-wrap items-start justify-between gap-4 rounded-md border-[1.5px] border-dashed border-ink/40 p-[22px_26px]",
            REVEAL,
            revealState(noteVisible),
          )}
        >
          <p className="max-w-[60ch] text-[15px] text-ink/60">
            <b className="text-ink">These are ours to shape.</b> This is a
            working constitution, not a finished one, sent to partners on
            purpose. Tell us where it&apos;s wrong. (That&apos;s principle 03 in
            action.)
          </p>
        </div>
      </div>
    </section>
  );
}

export { Constitution };
