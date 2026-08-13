"use client";

import { useEffect, useState } from "react";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { BetSection } from "./bet-section";
import { Constitution } from "./constitution";
import { Hero } from "./hero";
import { Invite } from "./invite";
import { ManifestoDialog } from "./manifesto-dialog";
import { Pillars } from "./pillars";
import { Rally } from "./rally";
import { SiteHeader } from "./site-header";
import { Voice } from "./voice";
import { WhoPlugsIn } from "./who-plugs-in";

function HomePage() {
  const [maniOpen, setManiOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (window.location.hash === "#manifesto") setManiOpen(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader onOpenManifesto={() => setManiOpen(true)} />
      <Hero onOpenManifesto={() => setManiOpen(true)} />
      <BetSection />
      <Pillars />
      <WhoPlugsIn />
      <Rally />
      <Constitution />
      <Voice />
      <Invite />
      <ManifestoDialog open={maniOpen} onOpenChange={setManiOpen} />
      <SiteFooter />
    </div>
  );
}

export { HomePage };
