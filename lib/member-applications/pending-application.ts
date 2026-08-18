const STORAGE_KEY = "currents:pendingApplication";

export interface PendingApplication {
  applicationId: string;
  claimToken: string;
  email: string;
}

export function writePendingApplication(pending: PendingApplication): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
}

export function readPendingApplication(): PendingApplication | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<PendingApplication>;
    if (
      typeof parsed.applicationId === "string" &&
      typeof parsed.claimToken === "string" &&
      typeof parsed.email === "string"
    ) {
      return parsed as PendingApplication;
    }
  } catch {
    // fall through to null
  }

  return null;
}

export function clearPendingApplication(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export async function claimPendingApplication(
  pending: PendingApplication,
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/member-applications/${pending.applicationId}/claim`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimToken: pending.claimToken }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}
