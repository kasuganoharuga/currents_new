import type { Metadata } from "next";

import { ManifestoPage } from "@/components/site/manifesto/manifesto-page";

export const metadata: Metadata = {
  title: "Currents · Manifesto",
  description:
    "The old systems are failing. Currents is for the people who see the ground floor of the next one.",
};

export default function Page() {
  return <ManifestoPage />;
}
