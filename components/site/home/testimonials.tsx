"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Sarah Hill",
    role: "Founder at Chunky Duck",
    quote:
      "Currents helped me meet the right people faster. I found my first hire and two early customers through a single event.",
    image: "/homepage-assets/testimonial-sarah.webp",
    imagePosition: "50% 42%",
  },
  {
    name: "Eden Shirley",
    role: "Founder & CEO at FleetGuru.ai",
    quote:
      "The innovation vibe is unreal. Real conversations, real relationships, real momentum.",
    image: "/homepage-assets/testimonial-eden.webp",
    imagePosition: "50% 38%",
  },
  {
    name: "John Servinis",
    role: "Co Founder at HotDoc",
    quote:
      "I've met more high-quality founders in three months through Currents events than in the last two years of events.",
    image: "/homepage-assets/testimonial-john.webp",
    imagePosition: "45% 34%",
  },
] as const;

function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % TESTIMONIALS.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[active];

  function move(direction: -1 | 1) {
    setActive(
      (current) =>
        (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }

  return (
    <section className="border-y border-ink/10 bg-cream-2 px-6 py-[clamp(64px,9vw,108px)] sm:px-8">
      <div className="mx-auto max-w-[1140px]">
        <div className="mb-[clamp(34px,5vw,54px)] grid grid-cols-[0.9fr_1.1fr] gap-[clamp(26px,6vw,90px)] max-[760px]:grid-cols-1">
          <div>
            <Eyebrow className="mb-5">Testimonials</Eyebrow>
            <h2 className="font-display text-[clamp(42px,5.8vw,76px)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
              What our community says
            </h2>
          </div>
          <p className="max-w-[54ch] self-end text-[clamp(16px,1.7vw,20px)] leading-[1.58] text-ink/62">
            Founders, investors and operators share how Currents has helped them
            connect, collaborate, and move their ideas forward.
          </p>
        </div>

        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          aria-label="Community testimonials"
          className={cn(
            "grid h-[580px] grid-cols-[41%_59%] overflow-hidden border border-ink bg-ink text-cream max-[760px]:h-auto max-[760px]:grid-cols-1",
            REVEAL,
            revealState(visible),
          )}
        >
          <div className="relative min-h-[320px] overflow-hidden">
            <Image
              key={testimonial.image}
              src={testimonial.image}
              alt={`${testimonial.name} in the Currents community`}
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
              className="object-cover"
              style={{ objectPosition: testimonial.imagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          </div>

          <div
            className="flex flex-col justify-between px-[clamp(28px,5vw,68px)] py-[clamp(36px,6vw,68px)]"
            aria-live="polite"
          >
            <div>
              <Quote
                className="size-10 text-lime"
                fill="currentColor"
                aria-hidden="true"
              />
              <blockquote className="mt-8 max-w-[26ch] text-[clamp(25px,3.2vw,42px)] font-bold leading-[1.18] tracking-[-0.025em]">
                “{testimonial.quote}”
              </blockquote>
            </div>

            <div className="mt-12 flex items-end justify-between gap-5">
              <div>
                <div className="text-[19px] font-black uppercase">
                  {testimonial.name}
                </div>
                <div className="mt-1 text-[14px] text-cream/55">
                  {testimonial.role}
                </div>
                <div
                  className="mt-5 flex gap-2"
                  aria-label="Choose testimonial"
                >
                  {TESTIMONIALS.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-current={index === active}
                      onClick={() => setActive(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-[width,background-color]",
                        index === active ? "w-8 bg-lime" : "w-3 bg-cream/25",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="brand-outline"
                  size="icon"
                  className="rounded-full border-cream/45 text-cream hover:bg-cream/10"
                  aria-label="Previous testimonial"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="brand"
                  size="icon"
                  className="rounded-full"
                  aria-label="Next testimonial"
                  onClick={() => move(1)}
                >
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Testimonials };
