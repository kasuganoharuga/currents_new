import { NextResponse } from "next/server";

import { getPool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getPool().query<{ ok: number }>("select 1 as ok");
    const ok = result.rows[0]?.ok === 1;

    if (!ok) {
      return NextResponse.json(
        { status: "error", database: "unexpected" },
        { status: 503 },
      );
    }

    return NextResponse.json({ status: "ok", database: "up" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "database unavailable";

    return NextResponse.json(
      { status: "error", database: "down", message },
      { status: 503 },
    );
  }
}
