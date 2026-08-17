import type { Metadata } from "next";

import { CalendarPage } from "@/components/site/calendar-page";
import { getUpcomingLumaEvents, type PublicLumaEvent } from "@/lib/luma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Currents · Events",
  description: "Every Currents event, live off our calendar.",
};

export default async function Page() {
  let events: PublicLumaEvent[] = [];
  let loadFailed = false;

  try {
    events = await getUpcomingLumaEvents();
  } catch (error) {
    console.error("Unable to render Luma calendar", error);
    loadFailed = true;
  }

  return <CalendarPage events={events} loadFailed={loadFailed} />;
}
