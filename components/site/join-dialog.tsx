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
import { authClient } from "@/lib/auth-client";
import {
  claimPendingApplication,
  clearPendingApplication,
  writePendingApplication,
  type PendingApplication,
} from "@/lib/member-applications/pending-application";

const DESCRIBES_YOU = [
  "Founder",
  "Investor",
  "Operator",
  "Eco-System",
] as const;

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

type Step = "questionnaire" | "signin" | "otp-code" | "success";
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
      setStep("signin");
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
      <DialogContent className="themed-scrollbar max-h-[90vh] max-w-[720px] overflow-y-auto rounded-lg border-0 bg-cream p-[clamp(28px,5vw,52px)] font-display text-ink sm:max-w-[720px]">
        <DialogTitle className="sr-only">Join the community</DialogTitle>

        {step === "questionnaire" && (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              Join the community
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              We&apos;d love for you to apply.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.5] text-ink/55">
              Fill out the application below, then sign in to finish joining.
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
                  {submissionState === "submitting" ? "Sending…" : "Continue"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === "signin" && (
          <div>
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              Almost there
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              Sign in to finish joining.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.5] text-ink/55">
              We&apos;ll link your account to the application you just sent.
            </p>

            <div className="mt-9 border-t border-ink/10 pt-8">
              <Button
                type="button"
                variant="brand"
                className="h-auto w-full px-9 py-3.5 font-space text-[12px] font-bold tracking-[0.14em] uppercase"
                disabled={signinPending}
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </Button>

              <div className="mt-6 flex items-center gap-4 text-ink/30">
                <span className="h-px flex-1 bg-ink/10" />
                <span className="font-space text-[10px] tracking-[0.14em] uppercase">
                  or
                </span>
                <span className="h-px flex-1 bg-ink/10" />
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
                  signinError ? "text-red-700" : "text-ink/45",
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
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              Check your inbox
            </div>
            <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-black uppercase leading-[1.02] tracking-[-0.02em]">
              Enter your code.
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.5] text-ink/55">
              We sent a sign-in code to {otpEmail}.
            </p>

            <div className="mt-9 border-t border-ink/10 pt-8">
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
                  signinError ? "text-red-700" : "text-ink/45",
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
            <div className="font-space text-[10px] tracking-[0.24em] text-ink/45 uppercase">
              You&apos;re in
            </div>
            <h3 className="mt-3 text-[clamp(32px,5vw,52px)] font-black uppercase leading-[1.02] tracking-[-0.03em]">
              Thank you.
            </h3>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-ink/60">
              You&apos;re signed in and your application is on its way to the
              Currents team.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { JoinDialog };
