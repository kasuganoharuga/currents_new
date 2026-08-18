"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DESCRIBES_YOU = ["Founder", "Investor", "Innovator"] as const;

const LOOKING_FOR = [
  "Connecting with other founders",
  "Meeting investors",
  "Finding collaborators",
  "Learning from the community",
  "Speaking or hosting an event",
  "Something else",
] as const;

const HEARD_ABOUT = [
  "Instagram",
  "LinkedIn",
  "A friend or referral",
  "An event",
  "Podcast",
  "Something else",
] as const;

type SubmissionState = "idle" | "submitting" | "success" | "error";

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-space text-[10px] tracking-[0.14em] text-ink/45 uppercase"
      >
        {label}
        {required && <span className="ml-0.5 text-ink/30">*</span>}
      </label>
      {children}
    </div>
  );
}

const controlClass =
  "w-full rounded-md border border-ink/15 bg-white px-3.5 py-3 font-display text-[15px] text-ink transition-colors placeholder:text-ink/30 focus:border-ink focus:outline-none";

function Select({
  id,
  name,
  options,
  required,
}: {
  id: string;
  name: string;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <SelectRoot name={name} required={required}>
      <SelectTrigger
        id={id}
        className={cn(
          controlClass,
          "text-left data-[placeholder]:text-ink/30 data-[state=open]:border-ink [&>svg]:text-ink/40",
        )}
      >
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="overflow-hidden rounded-md border-ink/12 bg-cream p-0 font-display text-ink shadow-lg">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="rounded-none border-b border-ink/8 px-3.5 py-2.5 text-[14px] text-ink/75 last:border-b-0 focus:bg-lime focus:text-ink data-[state=checked]:font-bold data-[state=checked]:text-ink [&>svg]:text-ink"
          >
            {option}
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
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  function handleOpenChange(next: boolean) {
    if (next) {
      setSubmissionState("idle");
      setMessage("");
    }
    onOpenChange(next);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/member-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(result?.error ?? "We couldn't save your application.");
      }

      setSubmissionState("success");
    } catch (error) {
      setSubmissionState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn't save your application. Please try again.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="themed-scrollbar max-h-[90vh] max-w-[720px] overflow-y-auto rounded-lg border-0 bg-cream p-[clamp(28px,5vw,52px)] font-display text-ink sm:max-w-[720px]">
        <DialogTitle className="sr-only">Become a member</DialogTitle>
        {submissionState !== "success" ? (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              Become a member
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
              className="mt-9 border-t border-ink/10 pt-8"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px]"
              />
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 max-[560px]:grid-cols-1">
                <Field id="member-name" label="Name" required>
                  <input
                    id="member-name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    className={controlClass}
                  />
                </Field>
                <Field id="member-email" label="Email" required>
                  <input
                    id="member-email"
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    autoComplete="email"
                    required
                    maxLength={254}
                    className={controlClass}
                  />
                </Field>

                <Field id="member-location" label="City & Country">
                  <input
                    id="member-location"
                    type="text"
                    name="location"
                    placeholder="Gold Coast, Australia"
                    autoComplete="address-level2"
                    maxLength={160}
                    className={controlClass}
                  />
                </Field>
                <Field id="member-whatsapp" label="WhatsApp">
                  <input
                    id="member-whatsapp"
                    type="tel"
                    name="whatsapp"
                    placeholder="+61 400 000 000"
                    autoComplete="tel"
                    maxLength={40}
                    className={controlClass}
                  />
                </Field>

                <Field id="member-linkedin" label="LinkedIn URL">
                  <input
                    id="member-linkedin"
                    type="url"
                    name="linkedin"
                    placeholder="linkedin.com/in/..."
                    maxLength={500}
                    className={controlClass}
                  />
                </Field>
                <Field
                  id="member-category"
                  label="What best describes you?"
                  required
                >
                  <Select
                    id="member-category"
                    name="category"
                    options={DESCRIBES_YOU}
                    required
                  />
                </Field>

                <Field
                  id="member-looking-for"
                  label="What are you looking for?"
                >
                  <Select
                    id="member-looking-for"
                    name="lookingFor"
                    options={LOOKING_FOR}
                  />
                </Field>
                <Field
                  id="member-heard-about"
                  label="How did you hear about Currents?"
                >
                  <Select
                    id="member-heard-about"
                    name="heardAbout"
                    options={HEARD_ABOUT}
                  />
                </Field>
              </div>

              <p
                aria-live="polite"
                className={cn(
                  "mt-6 min-h-4 font-space text-[11px] tracking-[0.03em]",
                  submissionState === "error" ? "text-red-700" : "text-ink/45",
                )}
              >
                {message}
              </p>

              <div className="mt-6 flex justify-end border-t border-ink/10 pt-6">
                <Button
                  type="submit"
                  variant="brand"
                  className="h-auto px-9 py-3.5 font-space text-[12px] font-bold tracking-[0.14em] uppercase max-[560px]:w-full"
                  disabled={submissionState === "submitting"}
                >
                  {submissionState === "submitting" ? "Sending…" : "Apply"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              Application received
            </div>
            <h3 className="mt-3 text-[clamp(32px,5vw,52px)] font-black uppercase leading-[1.02] tracking-[-0.03em]">
              Thank you.
            </h3>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-ink/60">
              Someone from the Currents team will be in touch shortly.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { JoinDialog };
