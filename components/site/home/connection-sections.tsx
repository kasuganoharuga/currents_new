"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";
import { cn } from "@/lib/utils";

const CONNECTION_SECTIONS = [
  {
    eyebrow: "How it works",
    title: "How Connections Happen at Currents",
    body: "Currents brings founders, investors, operators and partners together through shared experiences and curated connections. Events are where conversations begin. Our matching layer helps the right people find each other, so connections made in the room carry forward beyond the events.",
    bullets: [
      "The right people, in the same room",
      "Shared experiences that spark conversation",
      "Follow-ups that turn into real outcomes",
    ],
    image: "/api/homepage-assets/community-table",
    imageAlt: "Currents members sharing a conversation around a table",
    imagePosition: "50% center",
  },
  {
    eyebrow: "Why join Currents",
    title: "Connect With People Who Help You Move Forward",
    body: "Currents makes it easier for founders, investors and operators to meet the right people, share insights and access opportunities that accelerate progress.",
    bullets: [
      "Fast access to the right network",
      "A supportive, aligned community",
      "Real connections that help you build",
    ],
    image: "/api/homepage-assets/community-speakers",
    imageAlt: "Currents community leaders speaking at an event",
    imagePosition: "50% center",
  },
] as const;

function ConnectionRow({
  section,
  reverse,
}: {
  section: (typeof CONNECTION_SECTIONS)[number];
  reverse: boolean;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 items-stretch border-x border-b border-ink/12 first:border-t max-[780px]:grid-cols-1",
        REVEAL,
        revealState(visible),
      )}
    >
      <div
        className={cn(
          "relative min-h-[430px] overflow-hidden bg-ink max-[780px]:min-h-[310px]",
          reverse && "order-2 max-[780px]:order-none",
        )}
      >
        <Image
          src={section.image}
          alt={section.imageAlt}
          fill
          sizes="(max-width: 780px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition: section.imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col justify-center px-[clamp(28px,5vw,68px)] py-[clamp(46px,7vw,84px)]">
        <Eyebrow className="mb-5">{section.eyebrow}</Eyebrow>
        <h2 className="max-w-[12ch] font-display text-[clamp(38px,5vw,64px)] font-black uppercase leading-[0.92] tracking-[-0.04em]">
          {section.title}
        </h2>
        <p className="mt-6 max-w-[58ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6] text-ink/62">
          {section.body}
        </p>
        <ul className="mt-7 space-y-3">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-[15px] font-bold leading-[1.45]"
            >
              <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-lime">
                <Check
                  className="size-3.5"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </span>
              <span className="pt-0.5">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConnectionSections() {
  return (
    <section className="bg-cream px-6 pb-[clamp(64px,9vw,108px)] sm:px-8">
      <div className="mx-auto max-w-[1140px]">
        {CONNECTION_SECTIONS.map((section, index) => (
          <ConnectionRow
            key={section.eyebrow}
            section={section}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

export { ConnectionSections };
