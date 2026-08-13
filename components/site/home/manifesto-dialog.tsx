"use client";

import { useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const LINES = [
  <>
    The old systems are failing in plain sight. The markets, the media, the
    machinery of politics, the things we were told to trust, are cracking, and
    everyone can feel it. Trust is draining out of the room.
  </>,
  <span
    key="emph"
    className="text-[clamp(22px,3vw,34px)] font-extrabold tracking-[-0.01em] text-lime"
  >
    We&apos;re not here to mourn that. We&apos;re here to build what comes after
    it.
  </span>,
  <>
    Currents is for the people who look at a collapsing system and see the
    ground floor of the next one. Innovators. Rule-breakers, the legal kind. The
    ones who make waves instead of waiting for the tide.
  </>,
  <>
    We believe Australia is more than mining, real estate and tourism. We
    believe a small place can produce global leaders. We believe the answer to
    falling trust isn&apos;t louder talk. It&apos;s visible action. Build the
    thing. Ship the proof. Lift the person next to you.
  </>,
  <span key="lime" className="text-lime">
    We give first. We fight for win–win. We fight the problem, not each other.
    We put people before business, because a system that forgets that is exactly
    the one now falling apart.
  </span>,
  <>
    Rising tides lift all boats. So we build the tide, event by event, node by
    node, city by city, until the current is strong enough to carry the next
    generation further than we got.
  </>,
  <span
    key="emph2"
    className="text-[clamp(22px,3vw,34px)] font-extrabold tracking-[-0.01em]"
  >
    This isn&apos;t a networking group. It&apos;s a movement with a room.
  </span>,
];

function ManifestoDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!open) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setShow(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      setShow(false);
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          aria-describedby={undefined}
          className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-[#070707] text-cream outline-none"
        >
          <DialogPrimitive.Title className="sr-only">
            Currents Manifesto
          </DialogPrimitive.Title>
          <div
            className="pointer-events-none fixed inset-0 z-[1] opacity-5"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <svg
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-[56vh] w-full opacity-45"
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

          <div className="sticky top-0 z-[5] flex items-center justify-between bg-[linear-gradient(180deg,#070707_55%,rgba(7,7,7,0))] p-[22px_clamp(20px,5vw,40px)]">
            <span className="font-space text-xs tracking-[0.24em] text-lime uppercase">
              Currents · Manifesto
            </span>
            <DialogPrimitive.Close className="flex size-[46px] items-center justify-center rounded-full border-[1.5px] border-cream/14 text-cream transition-colors hover:border-lime hover:bg-lime hover:text-ink">
              <XIcon className="size-5" />
              <span className="sr-only">Close manifesto</span>
            </DialogPrimitive.Close>
          </div>

          <div className="relative z-[3] mx-auto max-w-[880px] p-[clamp(16px,5vw,52px)_clamp(24px,6vw,40px)_clamp(90px,16vw,180px)]">
            <div className="mb-[26px] font-space text-xs tracking-[0.24em] text-lime uppercase">
              The movement
            </div>
            <div className="mb-[46px] font-display text-[clamp(56px,13vw,150px)] font-black uppercase leading-[0.86] tracking-[-0.045em]">
              Come{" "}
              <span className="text-lime">
                make
                <br />
                waves.
              </span>
            </div>
            {LINES.map((line, i) => (
              <p
                key={i}
                className={cn(
                  "mb-6 text-[clamp(19px,2.3vw,27px)] leading-[1.46] font-medium text-cream transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:!opacity-100 motion-reduce:!translate-y-0",
                  show
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[28px] opacity-0",
                )}
                style={{ transitionDelay: show ? `${0.04 + i * 0.07}s` : "0s" }}
              >
                {line}
              </p>
            ))}
            <span className="mt-[34px] block font-space text-[10px] tracking-[0.18em] text-cream/60 uppercase">
              Temporary story · V1, to refine
            </span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { ManifestoDialog };
