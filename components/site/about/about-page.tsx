"use client";

import { useState } from "react";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JoinButton } from "@/components/site/join-button";
import { JoinDialog } from "@/components/site/join-dialog";
import { BusinessModel } from "./business-model";
import { CreateSection } from "./create-section";
import { FractalSection } from "./fractal-section";
import { JoinCta } from "./join-cta";
import { AboutHero } from "./about-hero";
import { RailsDiagram } from "./rails-diagram";

function AboutPage() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader cta={<JoinButton onClick={() => setJoinOpen(true)} />} />
      <AboutHero />
      <FractalSection />
      <RailsDiagram />
      <BusinessModel />
      <CreateSection />
      <JoinCta onOpenJoin={() => setJoinOpen(true)} />
      <SiteFooter />
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}

export { AboutPage };
