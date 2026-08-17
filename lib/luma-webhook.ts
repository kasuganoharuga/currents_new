import { createHmac, timingSafeEqual } from "node:crypto";

const WEBHOOK_TOLERANCE_SECONDS = 5 * 60;

function signatureParts(signatureHeader: string): Record<string, string> {
  return Object.fromEntries(
    signatureHeader.split(",").flatMap((part) => {
      const separator = part.indexOf("=");
      if (separator === -1) return [];
      return [[part.slice(0, separator).trim(), part.slice(separator + 1)]];
    }),
  );
}

export function verifyLumaWebhookSignature({
  body,
  secret,
  signatureHeader,
  timestampHeader,
}: {
  body: string;
  secret: string;
  signatureHeader: string | null;
  timestampHeader: string | null;
}): boolean {
  if (!signatureHeader || !timestampHeader) return false;

  const parts = signatureParts(signatureHeader);
  const timestamp = Number(parts.t);
  const headerTimestamp = Number(timestampHeader);

  if (
    !Number.isInteger(timestamp) ||
    !Number.isInteger(headerTimestamp) ||
    timestamp !== headerTimestamp ||
    Math.abs(Date.now() / 1000 - timestamp) > WEBHOOK_TOLERANCE_SECONDS ||
    !/^[a-f\d]{64}$/i.test(parts.v1 ?? "")
  ) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(parts.v1, "hex");

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}
