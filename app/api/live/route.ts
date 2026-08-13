import { NextResponse } from "next/server";

/** Liveness for ALB/ECS — does not require DATABASE_URL / RDS. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "ok", app: "currents" });
}
