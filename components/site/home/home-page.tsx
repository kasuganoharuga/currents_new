"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JoinButton } from "@/components/site/join-button";
import { JoinDialog } from "@/components/site/join-dialog";
import { Constitution } from "./constitution";
import { Hero } from "./hero";
import { Invite } from "./invite";
import { OurStory } from "./our-story";
import { Pillars } from "./pillars";
import { Rally } from "./rally";
import { WhoPlugsIn } from "./who-plugs-in";

function HomePage() {
  const router = useRouter();
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#manifesto") router.replace("/manifesto");
  }, [router]);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-clip bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader cta={<JoinButton onClick={() => setJoinOpen(true)} />} />
      <main>
        <Hero onJoin={() => setJoinOpen(true)} />
        <OurStory />
        <Pillars />
        <WhoPlugsIn />
        <Rally />
        <Constitution />
        {/* TODO(Q1): Voice remains in ./voice.tsx for a one-line restore, but is intentionally not rendered. */}
        <Invite onJoin={() => setJoinOpen(true)} />
      </main>
      <SiteFooter />
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}

export { HomePage };
