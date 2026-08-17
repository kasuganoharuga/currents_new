import { NextResponse } from "next/server";

import { getUpcomingLumaEvents } from "@/lib/luma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await getUpcomingLumaEvents();
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Unable to load Luma events", error);
    return NextResponse.json(
      { error: "Calendar events are temporarily unavailable." },
      { status: 502 },
    );
  }
}
