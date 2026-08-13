"use client";

import { useRouter } from "next/navigation";

import { archivo, spaceMono } from "@/components/site/fonts";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/home/site-header";
import { Eyebrow } from "@/components/site/eyebrow";
import { lumaCalendarEmbedUrl } from "@/lib/links";

function CalendarPage() {
  const router = useRouter();

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader onOpenManifesto={() => router.push("/#manifesto")} />

      <section className="py-[clamp(56px,8vw,96px)]">
        <div className="mx-auto max-w-[1140px] px-8">
          <Eyebrow className="mb-[22px]">Events</Eyebrow>
          <h1 className="mb-4 max-w-[16ch] font-display text-[clamp(34px,5.4vw,64px)] font-black uppercase leading-[0.98] tracking-[-0.02em]">
            Come to the next one.
          </h1>
          <p className="mb-10 max-w-[56ch] text-[17px] leading-[1.6] text-ink/60">
            Every Currents event, live off our calendar. Find one that fits,
            RSVP, and we&apos;ll see you in the room.
          </p>

          <div className="max-w-[640px] rounded-lg border-2 border-lime bg-cream-2 p-3">
            <iframe
              src={lumaCalendarEmbedUrl("light")}
              width="100%"
              height="450"
              loading="lazy"
              allowFullScreen
              title="Currents events calendar"
              style={{ border: "none", borderRadius: 4, display: "block" }}
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export { CalendarPage };
