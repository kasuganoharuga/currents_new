import type { Metadata } from "next";

import { SponsorsPage } from "@/components/site/sponsors/sponsors-page";

export const metadata: Metadata = {
  title: "Currents · Sponsors",
  description: "Partner with Currents.",
};

export default function Page() {
  return <SponsorsPage />;
}
