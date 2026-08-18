import { createHmac, timingSafeEqual } from "node:crypto";

function claimSecret(): string {
  const secret =
    process.env.MEMBER_APPLICATION_CLAIM_SECRET ??
    process.env.BETTER_AUTH_SECRET;

  if (!secret) {
    throw new Error(
      "MEMBER_APPLICATION_CLAIM_SECRET or BETTER_AUTH_SECRET is required",
    );
  }

  return secret;
}

function computeClaimToken(applicationId: string, email: string): string {
  return createHmac("sha256", claimSecret())
    .update(`${applicationId}.${email}`)
    .digest("hex");
}

export function createClaimToken(applicationId: string, email: string): string {
  return computeClaimToken(applicationId, email);
}

export function verifyClaimToken(
  applicationId: string,
  email: string,
  token: string,
): boolean {
  const expected = computeClaimToken(applicationId, email);
  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(token, "hex");

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}
