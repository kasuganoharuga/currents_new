"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import {
  claimPendingApplication,
  clearPendingApplication,
  readPendingApplication,
} from "@/lib/member-applications/pending-application";

export default function JoinCompletePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending || !session) return;

    let cancelled = false;

    (async () => {
      const pending = readPendingApplication();

      if (pending) {
        await claimPendingApplication(pending);
        clearPendingApplication();
      }

      if (!cancelled) router.replace("/?joined=1");
    })();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream font-display text-ink">
      <p className="font-space text-[12px] tracking-[0.14em] text-ink/45 uppercase">
        Finishing sign-in…
      </p>
    </main>
  );
}
