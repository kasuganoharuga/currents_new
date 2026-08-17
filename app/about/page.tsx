import type { Metadata } from "next";

import { AboutPage } from "@/components/site/about/about-page";

export const metadata: Metadata = {
  title: "Currents · About",
  description:
    "A community of leaders. Innovators, each leading in their own direction, toward the same goal.",
};

export default function Page() {
  return <AboutPage />;
}
