"use client";

import Link from "next/link";
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
import { authClient } from "@/lib/auth-client";
import { LocationPicker } from "@/components/site/join-dialog/location-picker";
import {
  claimPendingApplication,
  clearPendingApplication,
  writePendingApplication,
  type PendingApplication,
} from "@/lib/member-applications/pending-application";

const ROLE_OPTIONS = [
  { value: "founder", label: "Founder" },
  { value: "investor", label: "Investor" },
  { value: "operator", label: "Operator" },
  { value: "ecosystem", label: "Eco-System" },
] as const;

const LOOKING_FOR = [
  "Connecting with other founders",
  "Meeting investors",
  "Finding collaborators",
  "Learning from the community",
  "Speaking or hosting an event",
] as const;

const HEARD_ABOUT = [
  "Instagram",
  "LinkedIn",
  "A friend or referral",
  "An event",
  "Podcast",
] as const;

type Step = "questionnaire" | "signin" | "otp-code" | "success";
type SubmissionState = "idle" | "submitting" | "success" | "error";

const fieldLabelClass =
  "mb-1.5 block font-space text-[10px] tracking-[0.14em] text-cream/50 uppercase";

function Field({
  id,
  label,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
        {required && <span className="ml-0.5 text-lime/70">*</span>}
        {hint && (
          <span className="ml-1.5 normal-case tracking-normal text-cream/30">
            ({hint})
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const controlClass =
  "w-full rounded-md border border-cream/20 bg-cream/[0.06] px-3.5 py-3 font-display text-[15px] text-cream transition-colors placeholder:text-cream/30 focus:border-lime focus:bg-cream/[0.09] focus:outline-none";

type SelectOption = string | { label: string; value: string };

function optionValue(option: SelectOption): string {
  return typeof option === "string" ? option : option.value;
}

function optionLabel(option: SelectOption): string {
  return typeof option === "string" ? option : option.label;
}

function Select({
  id,
  name,
  onValueChange,
  options,
  required,
  value,
}: {
  id: string;
  name: string;
  onValueChange?: (value: string) => void;
  options: readonly SelectOption[];
  required?: boolean;
  value?: string;
}) {
  return (
    <SelectRoot
      name={name}
      required={required}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        id={id}
        className={cn(
          controlClass,
          "text-left data-[placeholder]:text-cream/30 data-[state=open]:border-lime [&>svg]:text-cream/40",
        )}
      >
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="overflow-hidden rounded-md border-cream/15 bg-[#161616] p-0 font-display text-cream shadow-xl">
        {options.map((option) => (
          <SelectItem
            key={optionValue(option)}
            value={optionValue(option)}
            className="rounded-none border-b border-cream/10 px-3.5 py-2.5 text-[14px] text-cream/75 last:border-b-0 focus:bg-lime focus:text-ink data-[state=checked]:font-bold data-[state=checked]:text-lime [&>svg]:text-lime"
          >
            {optionLabel(option)}
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
  const [step, setStep] = useState<Step>("questionnaire");
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  const [pending, setPending] = useState<PendingApplication | null>(null);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [signinPending, setSigninPending] = useState(false);
  const [signinError, setSigninError] = useState("");

  function handleOpenChange(next: boolean) {
    if (next) {
      setStep("questionnaire");
      setSubmissionState("idle");
      setMessage("");
      setSigninError("");
      setOtpCode("");
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

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        applicationId?: string;
        claimToken?: string;
      } | null;

      if (!response.ok || !result?.applicationId || !result?.claimToken) {
        throw new Error(result?.error ?? "We couldn't save your application.");
      }

      const email = typeof values.email === "string" ? values.email : "";
      const nextPending: PendingApplication = {
        applicationId: result.applicationId,
        claimToken: result.claimToken,
        email,
      };

      writePendingApplication(nextPending);
      setPending(nextPending);
      setOtpEmail(email);
      setSubmissionState("success");
      // V1 has no Google sign-in / member login — the signin/otp-code steps
      // below are kept for a future phase but aren't part of this flow yet.
      setStep("success");
    } catch (error) {
      setSubmissionState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn't save your application. Please try again.",
      );
    }
  }

  async function handleGoogleSignIn() {
    setSigninError("");
    setSigninPending(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/join/complete",
      });
    } catch {
      setSigninPending(false);
      setSigninError("Couldn't start Google sign-in. Please try again.");
    }
  }

  async function handleSendCode() {
    setSigninError("");
    const email = otpEmail.trim();

    if (!email) {
      setSigninError("Enter an email address.");
      return;
    }

    setSigninPending(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });

      if (error) {
        setSigninError(
          error.message ?? "Couldn't send the code. Please try again.",
        );
        return;
      }

      setStep("otp-code");
    } catch {
      setSigninError("Couldn't send the code. Please try again.");
    } finally {
      setSigninPending(false);
    }
  }

  async function handleVerifyCode() {
    setSigninError("");
    const otp = otpCode.trim();

    if (!otp) {
      setSigninError("Enter the code from your email.");
      return;
    }

    setSigninPending(true);
    try {
      const { error } = await authClient.signIn.emailOtp({
        email: otpEmail.trim(),
        otp,
      });

      if (error) {
        setSigninError(
          error.message ?? "That code didn't work. Please try again.",
        );
        return;
      }

      if (pending) {
        await claimPendingApplication(pending);
        clearPendingApplication();
      }
      setStep("success");
    } catch {
      setSigninError("That code didn't work. Please try again.");
    } finally {
      setSigninPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="themed-scrollbar-dark max-h-[90vh] max-w-[720px] overflow-y-auto rounded-lg border border-cream/10 bg-ink p-[clamp(28px,5vw,52px)] font-display text-cream sm:max-w-[720px] [&_[data-slot=dialog-close]]:text-cream/50 [&_[data-slot=dialog-close]]:hover:text-cream">
        <DialogTitle className="sr-only">Join the community</DialogTitle>

        {step === "questionnaire" && (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-lime uppercase">
              Join the community
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              We&apos;d love for you to apply.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.5] text-cream/55">
              Fill out the application below to join the Currents community.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-9 border-t border-cream/12 pt-8"
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

                <LocationPicker />

                <Field id="member-linkedin" label="LinkedIn URL" required>
                  <input
                    id="member-linkedin"
                    type="url"
                    name="linkedin"
                    placeholder="linkedin.com/in/..."
                    required
                    maxLength={500}
                    className={controlClass}
                  />
                </Field>

                <div className="col-span-2 max-[560px]:col-span-1">
                  <Field
                    id="member-category"
                    label="What best describes you?"
                    required
                  >
                    <Select
                      id="member-category"
                      name="category"
                      options={ROLE_OPTIONS}
                      required
                    />
                  </Field>
                </div>

                <div className="col-span-2 max-[560px]:col-span-1">
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
                </div>

                <div className="col-span-2 max-[560px]:col-span-1">
                  <Field
                    id="member-whatsapp"
                    label="WhatsApp"
                    hint="our main communication channel"
                  >
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
                </div>

                <div className="col-span-2 max-[560px]:col-span-1">
                  <Field
                    id="member-heard-about"
                    label="How did you hear about us?"
                  >
                    <Select
                      id="member-heard-about"
                      name="heardAbout"
                      options={HEARD_ABOUT}
                    />
                  </Field>
                </div>
              </div>

              <p
                aria-live="polite"
                className={cn(
                  "mt-6 min-h-4 font-space text-[11px] tracking-[0.03em]",
                  submissionState === "error"
                    ? "text-red-400"
                    : "text-cream/45",
                )}
              >
                {message}
              </p>

              <div className="mt-6 flex justify-end border-t border-cream/12 pt-6">
                <Button
                  type="submit"
                  variant="brand"
                  className="h-auto px-9 py-3.5 font-space text-[12px] font-bold tracking-[0.14em] uppercase max-[560px]:w-full"
                  disabled={submissionState === "submitting"}
                >
                  {submissionState === "submitting"
                    ? "Sending…"
                    : "Join the community"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === "signin" && (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-cream/45 uppercase">
              Almost there
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              Sign in to finish joining.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.5] text-cream/55">
              We&apos;ll link your account to the application you just sent.
            </p>

            <div className="mt-9 border-t border-cream/12 pt-8">
              <Button
                type="button"
                variant="brand"
                className="h-auto w-full px-9 py-3.5 font-space text-[12px] font-bold tracking-[0.14em] uppercase"
                disabled={signinPending}
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </Button>

              <div className="mt-6 flex items-center gap-4 text-cream/30">
                <span className="h-px flex-1 bg-cream/12" />
                <span className="font-space text-[10px] tracking-[0.14em] uppercase">
                  or
                </span>
                <span className="h-px flex-1 bg-cream/12" />
              </div>

              <div className="mt-6">
                <Field id="signin-email" label="Email">
                  <input
                    id="signin-email"
                    type="email"
                    autoComplete="email"
                    value={otpEmail}
                    onChange={(event) => setOtpEmail(event.target.value)}
                    className={controlClass}
                  />
                </Field>
              </div>

              <p
                aria-live="polite"
                className={cn(
                  "mt-4 min-h-4 font-space text-[11px] tracking-[0.03em]",
                  signinError ? "text-red-400" : "text-cream/45",
                )}
              >
                {signinError}
              </p>

              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="brand-outline"
                  className="h-auto px-9 py-3.5 font-space text-[12px] font-bold tracking-[0.14em] uppercase max-[560px]:w-full"
                  disabled={signinPending}
                  onClick={handleSendCode}
                >
                  Continue with email
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "otp-code" && (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-cream/45 uppercase">
              Check your inbox
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              Enter your code.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.5] text-cream/55">
              We sent a sign-in code to {otpEmail}.
            </p>

            <div className="mt-9 border-t border-cream/12 pt-8">
              <Field id="signin-otp" label="Code">
                <input
                  id="signin-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otpCode}
                  onChange={(event) => setOtpCode(event.target.value)}
                  className={controlClass}
                />
              </Field>

              <p
                aria-live="polite"
                className={cn(
                  "mt-4 min-h-4 font-space text-[11px] tracking-[0.03em]",
                  signinError ? "text-red-400" : "text-cream/45",
                )}
              >
                {signinError}
              </p>

              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="brand"
                  className="h-auto px-9 py-3.5 font-space text-[12px] font-bold tracking-[0.14em] uppercase max-[560px]:w-full"
                  disabled={signinPending}
                  onClick={handleVerifyCode}
                >
                  Verify
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-lime uppercase">
              Join the community
            </div>
            <h3 className="mt-3 text-[clamp(32px,5vw,52px)] font-black uppercase leading-[1.02] tracking-[-0.03em]">
              You&apos;re in the <span className="text-lime">current.</span>
            </h3>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-cream/60">
              Thanks for joining the Currents community. We&apos;ll keep you
              posted on upcoming events, connections and opportunities.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-cream/12 pt-6">
              <Link
                href="/calendar"
                className="font-space text-[12px] font-bold tracking-[0.14em] text-lime uppercase underline decoration-lime/40 decoration-2 underline-offset-4 hover:decoration-lime"
              >
                View upcoming events
              </Link>
              <span className="text-cream/20">/</span>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="font-space text-[12px] font-bold tracking-[0.14em] text-cream/55 uppercase transition-colors hover:text-cream"
              >
                Back to home
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { JoinDialog };
