"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Eyebrow } from "@/components/site/eyebrow";

const INDUSTRIES = [
  "Technology / Software",
  "Media / Content",
  "Finance / Investment",
  "Health / Wellbeing",
  "Arts / Creative",
  "Hospitality / Venues",
  "Professional services",
  "Property / Construction",
  "Other",
];

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="mb-[7px] block font-space text-[11px] tracking-[0.12em] text-ink/40 uppercase">
        {label} {required && <span>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border-[1.5px] border-ink/12 bg-white px-[15px] py-[13px] font-display text-base text-ink transition-colors focus:border-ink focus:outline-none";

function JoinDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [firstErr, setFirstErr] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  function handleOpenChange(next: boolean) {
    if (next) {
      setSubmitted(false);
      setFirstErr(false);
    }
    onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = firstRef.current?.value.trim();
    if (!value) {
      setFirstErr(true);
      firstRef.current?.focus();
      return;
    }
    setFirstErr(false);
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[520px] rounded-xl bg-cream p-[clamp(28px,5vw,44px)] font-display text-ink sm:max-w-[520px]">
        <DialogTitle className="sr-only">Join Currents</DialogTitle>
        {!submitted ? (
          <div>
            <Eyebrow className="mb-[18px]">Join Currents</Eyebrow>
            <h3 className="mb-2 text-[clamp(26px,4vw,38px)] font-black uppercase tracking-[-0.02em]">
              Get in the current.
            </h3>
            <p className="mb-[26px] text-[15px] text-ink/60">
              First name&apos;s all we need. The rest helps us build the
              community map.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-[repeat(2,1fr)] gap-3.5 max-[460px]:grid-cols-1">
                <Field label="First name" required>
                  <input
                    ref={firstRef}
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    className={cn(inputClass, firstErr && "border-red-700")}
                    onChange={(e) => {
                      if (e.target.value.trim()) setFirstErr(false);
                    }}
                  />
                  {firstErr && (
                    <div className="mt-1.5 font-space text-[11px] text-red-700">
                      First name is required
                    </div>
                  )}
                </Field>
                <Field label="Last name">
                  <input
                    type="text"
                    name="last"
                    autoComplete="family-name"
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="Location">
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Gold Coast"
                  autoComplete="address-level2"
                  className={inputClass}
                />
              </Field>
              <Field label="Company name">
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  className={inputClass}
                />
              </Field>
              <Field label="Industry">
                <input
                  type="text"
                  name="industry"
                  list="industries"
                  className={inputClass}
                />
                <datalist id="industries">
                  {INDUSTRIES.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </datalist>
              </Field>
              <button
                type="submit"
                className="mt-2.5 w-full rounded-full bg-ink py-4 font-space text-[13px] font-bold tracking-[0.12em] text-cream uppercase transition-colors hover:bg-black"
              >
                Join the community
              </button>
              <div className="mt-3.5 text-center font-space text-[10px] tracking-[0.08em] text-ink/40">
                Placeholder · connect a form service (Tally/Formspree) to
                capture submissions
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-[22px] flex size-16 items-center justify-center rounded-full bg-lime text-[30px]">
              &#10003;
            </div>
            <h3 className="mb-2.5 text-[clamp(26px,4vw,38px)] font-black uppercase tracking-[-0.02em]">
              You&apos;re in.
            </h3>
            <p className="mb-[26px] text-[15px] text-ink/60">
              Two doors from here. Jump into the chat, and add the calendar so
              you never miss what&apos;s on.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between gap-3 rounded-[10px] bg-lime px-5 py-4 font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                <span>Join the WhatsApp community</span>
                <span className="font-space">&rarr;</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between gap-3 rounded-[10px] bg-ink px-5 py-4 font-bold text-cream transition-transform hover:-translate-y-0.5"
              >
                <span>Add the Currents calendar</span>
                <span className="font-space">&rarr;</span>
              </a>
            </div>
            <div className="mt-[18px] font-space text-[10px] tracking-[0.08em] text-ink/40">
              Placeholder links · drop in your WhatsApp invite &amp; Luma URL
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { JoinDialog };
