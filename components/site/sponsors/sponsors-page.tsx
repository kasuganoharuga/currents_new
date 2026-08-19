"use client";

import Image from "next/image";
import { useState } from "react";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JoinButton } from "@/components/site/join-button";
import { JoinDialog } from "@/components/site/join-dialog";
import { Eyebrow } from "@/components/site/eyebrow";
import { cn } from "@/lib/utils";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

// TODO(partnerships): confirm the inbox before launch — nothing else in the
// repo commits to a public address yet.
const CONTACT_EMAIL = "hello@currentscommunity.com";

type Sponsor = {
  name: string;
  role: string;
  /** Omit to show the card without an outbound link. */
  href?: string;
  domain: string;
  logo: string;
  /** Tailwind background for the logo plate — each mark has its own lockup colour. */
  logoBg: string;
  /** Screenshot-style marks fill the plate; wordmarks sit inside it. */
  logoFill?: boolean;
  description: string;
};

const SPONSORS: Sponsor[] = [
  {
    name: "Rally",
    role: "Founder cohort",
    href: "https://rallyroadmap.com/",
    domain: "rallyroadmap.com",
    logo: "/sponsors/rally.png",
    // Matches the mark's own baked-in background so the padded plate has no seam.
    logoBg: "bg-[#073127]",
    description:
      "A 12-week cohort for founders raising in the real world. Positioning, round structure, and investor conversations — done properly rather than fast.",
  },
  {
    name: "AI Catalyst",
    role: "Incubator",
    // Outbound link paused for now — card stays visible without navigation.
    domain: "aicatalyst.au",
    logo: "/sponsors/ai-catalyst.png",
    logoBg: "bg-[#171717]",
    logoFill: true,
    description:
      "Turning early conviction into an investable company, on three pillars run together: investment readiness, AI MVP building, and early-stage capital.",
  },
  {
    name: "Rolling Mic Studio",
    role: "Narrative direction",
    href: "https://rollingmic.com/",
    domain: "rollingmic.com",
    logo: "/sponsors/rolling-mic-studio.png",
    logoBg: "bg-ink",
    description:
      "Narrative direction for companies in motion. Documentary-style interviews and continuous story capture, embedded rather than one-off.",
  },
];

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative h-[92px] w-[136px] shrink-0 overflow-hidden max-[520px]:w-full",
        sponsor.logoBg,
      )}
    >
      {failed ? (
        <span className="flex size-full items-center justify-center px-3 text-center font-display text-[13px] font-black uppercase leading-tight tracking-[-0.01em] text-cream/70">
          {sponsor.name}
        </span>
      ) : (
        <Image
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          fill
          sizes="136px"
          className={cn(
            sponsor.logoFill ? "object-cover" : "object-contain p-3",
          )}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function SponsorCardBody({
  sponsor,
  linked,
}: {
  sponsor: Sponsor;
  linked: boolean;
}) {
  return (
    <>
      <SponsorLogo sponsor={sponsor} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <h3 className="font-display text-[clamp(20px,2.2vw,25px)] font-black uppercase leading-none tracking-[-0.025em]">
            {sponsor.name}
          </h3>
          <span className="font-space text-[10px] tracking-[0.16em] text-ink/45 uppercase">
            {sponsor.role}
          </span>
        </div>
        <p className="mt-3.5 text-[15px] leading-[1.6] text-ink/65">
          {sponsor.description}
        </p>
        <span
          className={cn(
            "mt-5 inline-flex items-center gap-2 border-b border-ink/25 pb-1 font-space text-[11px] font-bold tracking-[0.14em] uppercase",
            linked && "transition-colors group-hover:border-ink",
          )}
        >
          {sponsor.domain}
          {linked ? <span aria-hidden="true">↗</span> : null}
        </span>
      </div>
    </>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const linked = Boolean(sponsor.href);
  const className = cn(
    "group flex gap-[clamp(18px,2.4vw,28px)] border border-ink/12 bg-cream-2/45 p-[clamp(20px,2.6vw,30px)] max-[520px]:flex-col",
    linked && "transition-colors hover:border-ink hover:bg-cream-2",
    REVEAL,
  );

  if (sponsor.href) {
    return (
      <SponsorLinkCard
        href={sponsor.href}
        className={className}
        sponsor={sponsor}
      />
    );
  }

  return <SponsorStaticCard className={className} sponsor={sponsor} />;
}

function SponsorLinkCard({
  href,
  className,
  sponsor,
}: {
  href: string;
  className: string;
  sponsor: Sponsor;
}) {
  const [ref, visible] = useReveal<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(className, revealState(visible))}
    >
      <SponsorCardBody sponsor={sponsor} linked />
    </a>
  );
}

function SponsorStaticCard({
  className,
  sponsor,
}: {
  className: string;
  sponsor: Sponsor;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn(className, revealState(visible))}>
      <SponsorCardBody sponsor={sponsor} linked={false} />
    </div>
  );
}
function PartnershipInvite() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-center gap-4 bg-ink p-[clamp(24px,3vw,34px)] text-cream",
        REVEAL,
        revealState(visible),
      )}
    >
      <h3 className="font-display text-[clamp(24px,3vw,34px)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
        Your logo, next <span className="text-lime">in the row.</span>
      </h3>
      <p className="max-w-[38ch] text-[15px] leading-[1.6] text-cream/60">
        Partnership details are still being written. Until then, reach out
        directly if you want to back the movement.
      </p>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-space text-xs font-bold tracking-[0.12em] text-ink uppercase transition-transform hover:-translate-y-0.5"
      >
        Get in touch
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function SponsorsPage() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [heroRef, heroVisible] = useReveal<HTMLDivElement>();
  const [leadRef, leadVisible] = useReveal<HTMLParagraphElement>();
  const [indexRef, indexVisible] = useReveal<HTMLDivElement>();

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader cta={<JoinButton onClick={() => setJoinOpen(true)} />} />

      <section className="px-6 pt-[clamp(56px,8vw,104px)] pb-[clamp(40px,5vw,64px)] sm:px-8">
        <div className="mx-auto grid max-w-[1140px] grid-cols-[1.15fr_0.85fr] items-end gap-[clamp(28px,6vw,80px)] max-[820px]:grid-cols-1 max-[820px]:gap-6">
          <div ref={heroRef} className={cn(REVEAL, revealState(heroVisible))}>
            <Eyebrow className="mb-[22px]">Sponsors</Eyebrow>
            <h1 className="font-display text-[clamp(46px,8.4vw,110px)] font-black uppercase leading-[0.88] tracking-[-0.045em]">
              Backing <span className="text-lime">the tide.</span>
            </h1>
          </div>
          <p
            ref={leadRef}
            className={cn(
              "max-w-[46ch] pb-2 text-[clamp(17px,1.8vw,21px)] leading-[1.52] text-ink/60",
              REVEAL,
              revealState(leadVisible),
            )}
          >
            Not logo slots. Partners already making noise in their own industry,
            running on the same current.
          </p>
        </div>
      </section>

      <section className="px-6 pb-[clamp(64px,9vw,112px)] sm:px-8">
        <div className="mx-auto max-w-[1140px]">
          <div
            ref={indexRef}
            className={cn(
              "mb-[clamp(20px,3vw,34px)] flex flex-wrap justify-between gap-3 border-b-2 border-ink pb-3.5 font-space text-[11px] font-bold tracking-[0.16em] uppercase",
              REVEAL,
              revealState(indexVisible),
            )}
          >
            <span>Partners</span>
            <span className="text-ink/45">Three · and counting</span>
          </div>

          {/* Stacks below 1000px: a two-up card gets too narrow for the
              plate-plus-copy row before the hero's own breakpoint hits. */}
          <div className="grid grid-cols-2 gap-[clamp(14px,2vw,24px)] max-[1000px]:grid-cols-1">
            {SPONSORS.map((sponsor) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
            <PartnershipInvite />
          </div>
        </div>
      </section>

      <SiteFooter />
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}

export { SponsorsPage };
