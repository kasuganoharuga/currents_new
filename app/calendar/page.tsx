import type { Metadata } from "next";

import { CalendarPage } from "@/components/site/calendar-page";

export const metadata: Metadata = {
  title: "Currents · Events",
  description: "Every Currents event, live off our calendar.",
};

export default function Page() {
  return <CalendarPage />;
}
