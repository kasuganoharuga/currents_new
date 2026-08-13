"use client";

import { useState } from "react";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { BusinessModel } from "./business-model";
import { CreateSection } from "./create-section";
import { FractalSection } from "./fractal-section";
import { JoinCta } from "./join-cta";
import { JoinDialog } from "./join-dialog";
import { ModelHeader } from "./model-header";
import { ModelHero } from "./model-hero";
import { RailsDiagram } from "./rails-diagram";

function ModelPage() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <ModelHeader onOpenJoin={() => setJoinOpen(true)} />
      <ModelHero />
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

export { ModelPage };
