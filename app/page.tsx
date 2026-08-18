import type { Metadata } from "next";

import { HomePage } from "@/components/site/home/home-page";

export const metadata: Metadata = {
  title: "Currents · Rising tides lift all boats",
  description:
    "Innovators making waves, here to break new ground, build new systems, and inspire the next generation.",
};

export default function Home() {
  return <HomePage />;
}
