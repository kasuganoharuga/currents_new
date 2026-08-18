"use client";

import Image from "next/image";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const PERSONAS = [
  {
    id: "founders",
    number: "01",
    title: "Founders",
    image: "/api/homepage-assets/persona-founders",
    imageAlt: "Currents members connecting at an event",
    imagePosition: "54% center",
    description:
      "You're building something that doesn't exist yet. Time-poor, decision-rich, and done with rooms that are all pitch and no substance.",
  },
  {
    id: "investors",
    number: "02",
    title: "Investors",
    image: "/api/homepage-assets/persona-investors",
    imageAlt: "A lively Currents gathering on the Gold Coast",
    imagePosition: "center",
    description:
      "Currents is where you meet the people a step ahead of you, and hand back what you've already cracked.",
  },
  {
    id: "innovators",
    number: "03",
    title: "Innovators",
    image: "/api/homepage-assets/persona-innovators",
    imageAlt: "Currents guests gathering inside a creative venue",
    imagePosition: "center",
    description:
      "You are a pioneer! Making a change, and creating value in a brand new way.",
  },
] as const;

function PersonaVisual({
  persona,
  compact = false,
}: {
  persona: (typeof PERSONAS)[number];
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-ink text-white",
        compact ? "aspect-[4/3]" : "aspect-[4/5]",
      )}
    >
      <Image
        src={persona.image}
        alt={persona.imageAlt}
        fill
        sizes={compact ? "(max-width: 700px) 100vw, 0px" : "33vw"}
        className="object-cover saturate-[0.86] transition-transform duration-500 group-hover:scale-[1.025]"
        style={{ objectPosition: persona.imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/8 to-ink/15" />
      <div className="absolute -top-[18%] -right-[35%] size-[78%] rounded-full bg-lime/45 mix-blend-color" />
      <span className="absolute top-4 left-4 font-space text-[10px] tracking-[0.18em] text-lime">
        {persona.number}
      </span>
      <span className="absolute right-4 bottom-4 left-4 text-left font-display text-[clamp(24px,2.8vw,38px)] font-black uppercase leading-none tracking-[-0.03em]">
        {persona.title}
      </span>
    </div>
  );
}

function WhoPlugsIn() {
  const [active, setActive] = useState<(typeof PERSONAS)[number]["id"]>(
    PERSONAS[0].id,
  );
  const [headRef, headVisible] = useReveal<HTMLDivElement>();
  const [bodyRef, bodyVisible] = useReveal<HTMLDivElement>();

  return (
    <section id="who" className="px-6 py-[clamp(64px,9vw,108px)] sm:px-8">
      <div className="mx-auto max-w-[1140px]">
        <div
          ref={headRef}
          className={cn(
            "mb-[clamp(28px,4vw,48px)]",
            REVEAL,
            revealState(headVisible),
          )}
        >
          <h2 className="font-display text-[clamp(44px,6.4vw,82px)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
            Who plugs in
          </h2>
        </div>

        <Tabs
          value={active}
          onValueChange={(value) =>
            setActive(value as (typeof PERSONAS)[number]["id"])
          }
          ref={bodyRef}
          className={cn(REVEAL, revealState(bodyVisible))}
        >
          <TabsList
            className="grid h-auto w-full grid-cols-3 gap-3 bg-transparent p-0 max-[700px]:gap-1.5"
            style={{ height: "auto" }}
          >
            {PERSONAS.map((persona) => (
              <TabsTrigger
                key={persona.id}
                value={persona.id}
                className="group h-auto overflow-hidden rounded-none border border-ink/12 bg-transparent p-0 text-ink after:hidden hover:text-ink data-[state=active]:border-ink data-[state=active]:bg-transparent data-[state=active]:ring-4 data-[state=active]:ring-lime max-[700px]:rounded-full max-[700px]:px-2 max-[700px]:py-3 max-[700px]:font-space max-[700px]:text-[10px] max-[700px]:tracking-[0.08em] max-[700px]:uppercase max-[700px]:data-[state=active]:bg-lime max-[700px]:data-[state=active]:ring-0"
              >
                <span className="w-full max-[700px]:hidden">
                  <PersonaVisual persona={persona} />
                </span>
                <span className="hidden max-[700px]:block">
                  {persona.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {PERSONAS.map((persona) => (
            <TabsContent key={persona.id} value={persona.id} className="mt-3">
              <div className="grid grid-cols-[0.55fr_1px_1.45fr] items-center gap-[clamp(24px,4vw,52px)] bg-ink px-[clamp(26px,4vw,52px)] py-[clamp(28px,4vw,50px)] text-cream max-[700px]:grid-cols-1 max-[700px]:gap-5">
                <div>
                  <span className="font-space text-[10px] tracking-[0.18em] text-lime">
                    {persona.number}
                  </span>
                  <h3 className="mt-2 font-display text-[clamp(32px,4.2vw,54px)] font-black uppercase leading-none tracking-[-0.03em]">
                    {persona.title}
                  </h3>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-full bg-cream/18 max-[700px]:hidden"
                />
                <p className="max-w-[56ch] text-[clamp(17px,1.8vw,21px)] leading-[1.52] text-cream/72">
                  {persona.description}
                </p>
                <div className="hidden max-[700px]:block">
                  <PersonaVisual persona={persona} compact />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export { WhoPlugsIn };
