"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DESCRIBES_YOU = [
  "I'm a Founder",
  "I'm an Investor",
  "I'm an Operator",
  "I'm an Advisor / Mentor",
];

const LOOKING_FOR = [
  "Connecting with other founders",
  "Meeting investors",
  "Finding collaborators",
  "Learning from the community",
  "Speaking or hosting an event",
  "Something else",
];

const HEARD_ABOUT = [
  "Instagram",
  "LinkedIn",
  "A friend or referral",
  "An event",
  "Podcast",
  "Something else",
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
    <div>
      <label className="mb-1.5 block font-space text-[10px] tracking-[0.14em] text-ink/45 uppercase">
        {label}
        {required && <span className="ml-0.5 text-ink/30">*</span>}
      </label>
      {children}
    </div>
  );
}

const controlClass =
  "w-full rounded-md border border-ink/15 bg-white px-3.5 py-3 font-display text-[15px] text-ink transition-colors placeholder:text-ink/30 focus:border-ink focus:outline-none";

/** Brand-styled dropdown: cream panel, lime marker on the active row. */
function Select({
  name,
  options,
}: {
  name: string;
  options: readonly string[];
}) {
  return (
    <SelectRoot name={name}>
      <SelectTrigger
        className={cn(
          controlClass,
          "text-left data-[placeholder]:text-ink/30 data-[state=open]:border-ink [&>svg]:text-ink/40",
        )}
      >
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="overflow-hidden rounded-md border-ink/12 bg-cream p-0 font-display text-ink shadow-[0_18px_40px_-12px_rgba(11,11,11,0.28)]">
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className="rounded-none border-b border-ink/8 px-3.5 py-2.5 text-[14px] text-ink/75 last:border-b-0 focus:bg-lime focus:text-ink data-[state=checked]:font-bold data-[state=checked]:text-ink [&>svg]:text-ink"
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

function JoinDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function handleOpenChange(next: boolean) {
    if (next) {
      setSubmitted(false);
      setNameErr(false);
    }
    onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    if (!name || !email) {
      setNameErr(true);
      (name ? emailRef : nameRef).current?.focus();
      return;
    }
    setNameErr(false);
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="themed-scrollbar max-h-[90vh] max-w-[720px] overflow-y-auto rounded-lg border-0 bg-cream p-[clamp(28px,5vw,52px)] font-display text-ink sm:max-w-[720px]">
        <DialogTitle className="sr-only">Join Currents</DialogTitle>
        {!submitted ? (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              Join Currents
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              We&apos;d love for you to apply.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.5] text-ink/55">
              Fill out the application below. Someone from our team will be in
              touch shortly.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-9 border-t border-ink/10 pt-8"
            >
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 max-[560px]:grid-cols-1">
                <Field label="Name" required>
                  <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    placeholder="Wade"
                    autoComplete="name"
                    className={cn(controlClass, nameErr && "border-red-700")}
                    onChange={(e) => {
                      if (e.target.value.trim()) setNameErr(false);
                    }}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    placeholder="wade@email.com"
                    autoComplete="email"
                    className={cn(controlClass, nameErr && "border-red-700")}
                  />
                </Field>

                <Field label="City & Country">
                  <input
                    type="text"
                    name="location"
                    placeholder="Gold Coast, Australia"
                    autoComplete="address-level2"
                    className={controlClass}
                  />
                </Field>
                <Field label="WhatsApp (requested to join)">
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="+61 405 222 888"
                    autoComplete="tel"
                    className={controlClass}
                  />
                </Field>

                <Field label="LinkedIn URL">
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="linkedin.com/in/..."
                    className={controlClass}
                  />
                </Field>
                <Field label="What best describes you?">
                  <Select name="describes" options={DESCRIBES_YOU} />
                </Field>

                <Field label="What are you looking for?">
                  <Select name="lookingFor" options={LOOKING_FOR} />
                </Field>
                <Field label="How did you hear about Currents?">
                  <Select name="heardAbout" options={HEARD_ABOUT} />
                </Field>
              </div>

              {nameErr && (
                <div className="mt-6 font-space text-[11px] tracking-[0.04em] text-red-700">
                  Name and email are required
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
                <span className="font-space text-[10px] tracking-[0.08em] text-ink/35">
                  Placeholder · connect a form service to capture submissions
                </span>
                <button
                  type="submit"
                  className="rounded-full bg-ink px-9 py-3.5 font-space text-[12px] font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-black max-[560px]:w-full"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              Application received
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              You&apos;re in.
            </h3>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.5] text-ink/55">
              Two doors from here. Jump into the chat, and add the calendar so
              you never miss what&apos;s on.
            </p>

            <div className="mt-9 border-t border-ink/10">
              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between gap-4 border-b border-ink/10 py-5 transition-colors hover:bg-ink/[0.03]"
              >
                <span className="text-[17px] font-bold">
                  Join the WhatsApp community
                </span>
                <span className="font-space text-ink/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink">
                  &rarr;
                </span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between gap-4 border-b border-ink/10 py-5 transition-colors hover:bg-ink/[0.03]"
              >
                <span className="text-[17px] font-bold">
                  Add the Currents calendar
                </span>
                <span className="font-space text-ink/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink">
                  &rarr;
                </span>
              </a>
            </div>

            <div className="mt-6 font-space text-[10px] tracking-[0.08em] text-ink/35">
              Placeholder links · drop in your WhatsApp invite &amp; Luma URL
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { JoinDialog };
