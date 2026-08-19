import type { Metadata } from "next";

import { SponsorsPage } from "@/components/site/sponsors/sponsors-page";

export const metadata: Metadata = {
  title: "Currents · Sponsors",
  description:
    "The people and companies backing Currents — and how to bring a partnership.",
};

export default function Page() {
  return <SponsorsPage />;
}
