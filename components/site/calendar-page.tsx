"use client";

import Image from "next/image";
import Script from "next/script";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";

import { archivo, spaceMono } from "@/components/site/fonts";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JoinButton } from "@/components/site/join-button";
import { JoinDialog } from "@/components/site/join-dialog";
import { Eyebrow } from "@/components/site/eyebrow";
import type { PublicLumaEvent } from "@/lib/luma";

function EventCard({
  event,
  featured,
}: {
  event: PublicLumaEvent;
  featured: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-ink/12 bg-cream-2 shadow-[0_18px_55px_-42px_rgba(11,11,11,0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_-38px_rgba(11,11,11,0.72)]",
        featured && "min-[860px]:grid min-[860px]:grid-cols-[1.18fr_0.82fr]",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-ink/8",
          featured && "min-[860px]:aspect-auto min-[860px]:min-h-[430px]",
        )}
      >
        {event.coverUrl ? (
          <Image
            src={event.coverUrl}
            alt=""
            fill
            sizes={
              featured
                ? "(max-width: 860px) 100vw, 58vw"
                : "(max-width: 760px) 100vw, 50vw"
            }
            priority={featured}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-ink text-cream">
            <span className="font-space text-xs tracking-[0.2em] uppercase">
              Currents
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4 rounded-full bg-lime px-3 py-1.5 font-space text-[10px] font-bold tracking-[0.1em] text-ink uppercase shadow-sm">
          {event.registrationStatus}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-[clamp(22px,3vw,34px)]">
        <div className="font-space text-[11px] font-bold tracking-[0.12em] text-ink/52 uppercase">
          {event.dateLabel}
        </div>
        <h2
          className={cn(
            "mt-3 font-display text-[clamp(24px,3.2vw,34px)] font-black leading-[1.02] tracking-[-0.02em] text-ink uppercase",
            featured && "min-[860px]:text-[40px]",
          )}
        >
          {event.name}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.55] text-ink/58">
          {event.description}
        </p>

        <dl className="mt-6 space-y-3 border-t border-ink/10 pt-5 text-[14px] text-ink/72">
          <div className="flex gap-3">
            <CalendarDays aria-hidden className="mt-0.5 size-4 shrink-0" />
            <div>
              <dt className="sr-only">Date and time</dt>
              <dd>{event.timeLabel}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
            <div>
              <dt className="sr-only">Location</dt>
              <dd>{event.locationLabel}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-auto pt-7">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            data-luma-action="checkout"
            data-luma-event-id={event.id}
            data-luma-utm-source="currents-calendar"
            className="inline-flex w-full items-center justify-between gap-3 rounded-full bg-ink px-6 py-3.5 font-space text-[11px] font-bold tracking-[0.12em] text-cream uppercase transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {event.ctaLabel}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function CalendarPage({
  events,
  loadFailed = false,
}: {
  events: PublicLumaEvent[];
  loadFailed?: boolean;
}) {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div
      className={`${archivo.variable} ${spaceMono.variable} overflow-x-hidden bg-cream font-display text-ink antialiased selection:bg-lime selection:text-ink`}
    >
      <SiteHeader cta={<JoinButton onClick={() => setJoinOpen(true)} />} />

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

          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={cn(index === 0 && "min-[760px]:col-span-2")}
                >
                  <EventCard event={event} featured={index === 0} />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-[720px] rounded-xl border border-ink/12 bg-cream-2 p-8">
              <h2 className="text-2xl font-black uppercase">
                {loadFailed
                  ? "Calendar temporarily unavailable"
                  : "More events are coming"}
              </h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-ink/60">
                {loadFailed
                  ? "We couldn't load the live event feed just now. You can still see every Currents event on Luma."
                  : "There are no upcoming events listed right now. Follow the Currents calendar on Luma for the next announcement."}
              </p>
              <a
                href="https://luma.com/CurrentsCommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-space text-[11px] font-bold tracking-[0.12em] text-cream uppercase"
              >
                Open Luma calendar
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
      <Script
        id="luma-checkout"
        src="https://embed.lu.ma/checkout-button.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

export { CalendarPage };
