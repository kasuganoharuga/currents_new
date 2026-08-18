"use client";

import { useEffect, useState } from "react";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JoinButton } from "@/components/site/join-button";
import { JoinDialog } from "@/components/site/join-dialog";
import { cn } from "@/lib/utils";

const MANIFESTO_PARAGRAPHS = [
  {
    text: "Innovation isn't for its own sake. It's how we leave this place better than we found it, for the next generation.",
    tone: "body",
  },
  {
    text: "Carving a new way doesn’t come without it’s pain.",
    tone: "highlight",
  },
  {
    text: "To build something new is to go against the grain. You break new ground, and the world pushes back. Old systems, old hierarchies, old ways of doing things that would rather you sat down and waited your turn.",
    tone: "body",
  },
  {
    text: "Every innovator knows the feeling. Fighting the current. Being told our ideas are too grandiose.",
    tone: "body",
  },
  {
    text: "We’re here to be the change, not just speak about it. We're here to MAKE bigger than big. Shout it off the rooftops. Live free, create vibrantly, and empower others as we do for ourselves.",
    tone: "lime",
  },
  {
    text: "We believe Australia is more than its natural resources. Our small country can produce global leaders, and market leading innovations. Real players, real change, shifting the landscape and moving the markets, for the right reasons.",
    tone: "body",
  },
  {
    text: "We give first. We fight for win-win. We fight the problem, not each other. We put people before business.",
    tone: "lime",
  },
  {
    text: "Rising tides lift all boats. So we build the tide, event by event, node by node, city by city, until the current is strong enough to carry the next generation further than we've come.",
    tone: "body",
  },
  {
    text: "This isn't just a networking group. It's a countercultural movement, to change the way we think, live, and be.",
    tone: "closing",
  },
] as const;

function ManifestoPage() {
  const [show, setShow] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setShow(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader cta={<JoinButton onClick={() => setJoinOpen(true)} />} />

      <div className="relative overflow-hidden bg-[#070707] text-cream">
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[56vh] w-full opacity-45"
          viewBox="0 0 2880 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="motion-safe:animate-[wave-flow_20s_linear_infinite]"
            fill="none"
            stroke="#E4FC54"
            strokeWidth="2"
            d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200 C1680,120 1920,280 2160,200 C2400,120 2640,280 2880,200"
          />
          <path
            className="opacity-60 motion-safe:animate-[wave-flow_30s_linear_infinite]"
            fill="none"
            stroke="#E4FC54"
            strokeWidth="1.5"
            d="M0,260 C240,320 480,180 720,260 C960,340 1200,180 1440,260 C1680,340 1920,180 2160,260 C2400,340 2640,180 2880,260"
          />
        </svg>

        <article className="relative z-[3] mx-auto max-w-[880px] p-[clamp(48px,9vw,96px)_clamp(24px,6vw,40px)_clamp(90px,16vw,180px)]">
          <header>
            <div className="mb-[26px] font-space text-xs tracking-[0.24em] text-lime uppercase">
              The movement
            </div>
            <h1 className="mb-[46px] font-display text-[clamp(56px,13vw,150px)] font-black uppercase leading-[0.86] tracking-[-0.045em]">
              Come{" "}
              <span className="text-lime">
                make
                <br />
                waves.
              </span>
            </h1>
          </header>

          {MANIFESTO_PARAGRAPHS.map((paragraph, i) => (
            <p
              key={i}
              className={cn(
                "mb-6 text-[clamp(19px,2.3vw,27px)] leading-[1.46] font-medium text-cream transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:!translate-y-0 motion-reduce:!opacity-100",
                paragraph.tone === "highlight" &&
                  "text-[clamp(22px,3vw,34px)] font-extrabold tracking-[-0.01em] text-lime",
                paragraph.tone === "lime" && "text-lime",
                paragraph.tone === "closing" &&
                  "text-[clamp(22px,3vw,34px)] font-extrabold tracking-[-0.01em]",
                show
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[28px] opacity-0",
              )}
              style={{ transitionDelay: show ? `${0.04 + i * 0.07}s` : "0s" }}
            >
              {paragraph.text}
            </p>
          ))}
        </article>
      </div>

      <SiteFooter />
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}

export { ManifestoPage };
