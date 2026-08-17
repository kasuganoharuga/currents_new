"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JoinButton } from "@/components/site/join-button";
import { JoinDialog } from "@/components/site/join-dialog";
import { BetSection } from "./bet-section";
import { Constitution } from "./constitution";
import { Hero } from "./hero";
import { Invite } from "./invite";
import { Pillars } from "./pillars";
import { Rally } from "./rally";
import { Voice } from "./voice";
import { WhoPlugsIn } from "./who-plugs-in";

function HomePage() {
  const router = useRouter();
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#manifesto") router.replace("/manifesto");
  }, [router]);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader cta={<JoinButton onClick={() => setJoinOpen(true)} />} />
      <Hero />
      <BetSection />
      <Pillars />
      <WhoPlugsIn />
      <Rally />
      <Constitution />
      <Voice />
      <Invite />
      <SiteFooter />
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}

export { HomePage };
