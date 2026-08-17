import { NextResponse } from "next/server";

import { getPool } from "@/lib/db";
import { verifyLumaWebhookSignature } from "@/lib/luma-webhook";

export const dynamic = "force-dynamic";

interface LumaGuestWebhookData {
  approval_status?: string;
  event?: {
    id?: string;
    name?: string | null;
    start_at?: string | null;
  };
  id?: string;
  registered_at?: string | null;
  user_email?: string | null;
  user_name?: string | null;
}

interface LumaGuestWebhookPayload {
  data?: LumaGuestWebhookData;
  type?: string;
}

const GUEST_EVENT_TYPES = new Set(["guest.registered", "guest.updated"]);

export async function POST(request: Request) {
  const secret = process.env.LUMA_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Webhook integration is not configured." },
      { status: 503 },
    );
  }

  const body = await request.text();
  const signatureIsValid = verifyLumaWebhookSignature({
    body,
    secret,
    signatureHeader: request.headers.get("webhook-signature"),
    timestampHeader: request.headers.get("webhook-timestamp"),
  });

  if (!signatureIsValid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const webhookId = request.headers.get("webhook-id");
  if (!webhookId) {
    return NextResponse.json({ error: "Missing webhook ID." }, { status: 400 });
  }

  let payload: LumaGuestWebhookPayload;
  try {
    payload = JSON.parse(body) as LumaGuestWebhookPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload.type || !GUEST_EVENT_TYPES.has(payload.type)) {
    return NextResponse.json({ received: true, ignored: true });
  }

  const guest = payload.data;
  if (
    !guest?.id ||
    !guest.event?.id ||
    typeof guest.approval_status !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid guest payload." },
      { status: 400 },
    );
  }

  const client = await getPool().connect();

  try {
    await client.query("begin");
    const delivery = await client.query(
      `insert into luma_webhook_deliveries (webhook_id, event_type)
       values ($1, $2)
       on conflict (webhook_id) do nothing
       returning webhook_id`,
      [webhookId, payload.type],
    );

    if (delivery.rowCount === 0) {
      await client.query("commit");
      return NextResponse.json({ received: true, duplicate: true });
    }

    await client.query(
      `insert into luma_event_registrations (
         luma_guest_id,
         luma_event_id,
         event_name,
         event_start_at,
         user_email,
         user_name,
         approval_status,
         registered_at,
         last_webhook_id,
         raw_payload
       ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)
       on conflict (luma_guest_id) do update set
         luma_event_id = excluded.luma_event_id,
         event_name = excluded.event_name,
         event_start_at = excluded.event_start_at,
         user_email = excluded.user_email,
         user_name = excluded.user_name,
         approval_status = excluded.approval_status,
         registered_at = coalesce(excluded.registered_at, luma_event_registrations.registered_at),
         last_webhook_id = excluded.last_webhook_id,
         raw_payload = excluded.raw_payload,
         updated_at = now()`,
      [
        guest.id,
        guest.event.id,
        guest.event.name ?? null,
        guest.event.start_at ?? null,
        guest.user_email ?? null,
        guest.user_name ?? null,
        guest.approval_status,
        guest.registered_at ?? null,
        webhookId,
        body,
      ],
    );

    await client.query("commit");
    return NextResponse.json({ received: true });
  } catch (error) {
    await client.query("rollback");
    console.error("Unable to persist Luma webhook", error);
    return NextResponse.json(
      { error: "Unable to persist webhook." },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
