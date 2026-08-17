"use client";

import { useState } from "react";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JoinButton } from "@/components/site/join-button";
import { JoinDialog } from "@/components/site/join-dialog";
import { Eyebrow } from "@/components/site/eyebrow";

function SponsorsPage() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader cta={<JoinButton onClick={() => setJoinOpen(true)} />} />

      <section className="py-[clamp(56px,8vw,96px)]">
        <div className="mx-auto max-w-[1140px] px-8">
          <Eyebrow className="mb-[22px]">Sponsors</Eyebrow>
          <h1 className="mb-4 max-w-[16ch] font-display text-[clamp(34px,5.4vw,64px)] font-black uppercase leading-[0.98] tracking-[-0.02em]">
            Backing the tide.
          </h1>
          <p className="max-w-[56ch] text-[17px] leading-[1.6] text-ink/60">
            Details on partnering with Currents are coming soon. In the
            meantime, reach out directly if you want to back the movement.
          </p>
        </div>
      </section>

      <SiteFooter />
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}

export { SponsorsPage };
