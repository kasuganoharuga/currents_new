"use client";

import { useState } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Chip } from "@/components/site/chip";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const TABS = [
  {
    id: "1",
    n: "01",
    t: "Founders",
    who: "You're building something that doesn't exist yet. Time-poor, decision-rich, and done with rooms that are all pitch and no substance.",
    bring:
      "Currents is where you meet the people a step ahead of you, and hand back what you've already cracked.",
  },
  {
    id: "2",
    n: "02",
    t: "Operators",
    who: "You're the one who makes it actually run. The systems, the delivery, the unglamorous engine behind someone's big idea.",
    bring:
      "Here you find the other operators, the shortcuts they've earned the hard way, and the recognition the work rarely gets.",
  },
  {
    id: "3",
    n: "03",
    t: "Investors",
    who: "You're looking for signal before it's obvious. Real people building real things, not a pitch-deck parade.",
    bring:
      "Currents puts you in the room early, close to the founders and the momentum, on the same level as everyone else.",
  },
];

const ECO_CHIPS: { label: string; who: string; bring: string }[] = [
  {
    label: "Media",
    who: "You tell the stories that make things real and put the work in front of the people who need to see it.",
    bring:
      "Currents is your beat and your amplifier. Placeholder, persona to refine.",
  },
  {
    label: "Health professionals",
    who: "You keep the builders standing, mind and body, when the pace tries to break them.",
    bring:
      "A community that treats wellbeing as infrastructure, not an afterthought. Placeholder, persona to refine.",
  },
  {
    label: "Artists",
    who: "You build bodies of work, not startups. That's building too.",
    bring:
      "A room that values the craft as much as the cap table. Placeholder, persona to refine.",
  },
  {
    label: "Venues",
    who: "You hold the space where things actually happen.",
    bring:
      "Currents fills your room and your calendar, and makes you part of the network. Placeholder, persona to refine.",
  },
  {
    label: "Professional services",
    who: "You're the scaffolding. Legal, finance, the work that keeps a build standing.",
    bring:
      "Give first here and the work follows the relationship. Placeholder, persona to refine.",
  },
];

function TabTriggerButton({ id, n, t }: { id: string; n: string; t: string }) {
  return (
    <TabsPrimitive.Trigger
      value={id}
      className={cn(
        "flex items-baseline gap-4 border-l-[3px] border-ink/12 py-[18px] pl-5 text-left font-display text-ink/40 transition-[border-color,color,padding-left] duration-250",
        "hover:pl-[26px] hover:text-ink/60",
        "data-[state=active]:border-l-lime data-[state=active]:text-ink data-[state=active]:hover:pl-5",
      )}
    >
      <span className="flex-none font-space text-xs tracking-[0.1em] opacity-60">
        {n}
      </span>
      <span className="text-[clamp(22px,2.8vw,34px)] font-black uppercase leading-none tracking-[-0.02em]">
        {t}
      </span>
    </TabsPrimitive.Trigger>
  );
}

function PersonaCopy({ who, bring }: { who: string; bring: string }) {
  return (
    <>
      <p className="mb-2.5 max-w-[56ch] text-[19px] font-semibold leading-[1.42]">
        {who}
      </p>
      <p className="max-w-[56ch] text-base leading-[1.55] text-ink/60">
        {bring}
      </p>
    </>
  );
}

function EcosystemPanel() {
  const [chip, setChip] = useState(0);
  const active = ECO_CHIPS[chip];
  return (
    <div>
      <p className="mb-2.5 max-w-[56ch] text-[19px] font-semibold leading-[1.42]">
        Not the sideline. The environment innovation grows in. You might not be
        a founder today; you might be one tomorrow. This community is for all of
        us.
      </p>
      <div className="my-[22px] mb-5 flex flex-wrap gap-2.5">
        {ECO_CHIPS.map((c, i) => (
          <Chip key={c.label} on={chip === i} onClick={() => setChip(i)}>
            {c.label}
          </Chip>
        ))}
      </div>
      <div className="border-l-[3px] border-lime pl-[18px]">
        <PersonaCopy who={active.who} bring={active.bring} />
      </div>
    </div>
  );
}

function WhoPlugsIn() {
  const [headRef, headVisible] = useReveal<HTMLDivElement>();
  const [bodyRef, bodyVisible] = useReveal<HTMLDivElement>();

  return (
    <section id="who" className="py-[clamp(72px,11vw,140px)]">
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={headRef}
          className={cn(
            "mb-[clamp(34px,5vw,64px)]",
            REVEAL,
            revealState(headVisible),
          )}
        >
          <Eyebrow>Who plugs in</Eyebrow>
        </div>

        <TabsPrimitive.Root
          defaultValue="1"
          ref={bodyRef}
          className={cn(
            "grid grid-cols-[0.85fr_1.15fr] gap-[clamp(24px,4vw,56px)] max-[820px]:grid-cols-1 max-[820px]:gap-6",
            REVEAL,
            revealState(bodyVisible),
          )}
        >
          <TabsPrimitive.List className="flex flex-col">
            {TABS.map((tab) => (
              <TabTriggerButton key={tab.id} id={tab.id} n={tab.n} t={tab.t} />
            ))}
            <TabsPrimitive.Trigger
              value="4"
              className={cn(
                "flex items-baseline gap-4 border-l-[3px] border-ink/12 py-[18px] pl-5 text-left font-display text-ink/40 transition-[border-color,color,padding-left] duration-250",
                "hover:pl-[26px] hover:text-ink/60",
                "data-[state=active]:border-l-lime data-[state=active]:text-ink data-[state=active]:hover:pl-5",
              )}
            >
              <span className="flex-none font-space text-xs tracking-[0.1em] opacity-60">
                04
              </span>
              <span className="text-[clamp(22px,2.8vw,34px)] font-black uppercase leading-none tracking-[-0.02em]">
                The Ecosystem
              </span>
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>

          <div className="relative min-h-[210px] border-t border-ink/12 pt-[26px] max-[820px]:min-h-0">
            {TABS.map((tab) => (
              <TabsPrimitive.Content key={tab.id} value={tab.id}>
                <PersonaCopy who={tab.who} bring={tab.bring} />
                <span className="mt-3.5 block font-space text-[10px] tracking-[0.18em] text-ink/40 uppercase">
                  Placeholder, persona to refine
                </span>
              </TabsPrimitive.Content>
            ))}
            <TabsPrimitive.Content value="4">
              <EcosystemPanel />
            </TabsPrimitive.Content>
          </div>
        </TabsPrimitive.Root>
      </div>
    </section>
  );
}

export { WhoPlugsIn };
