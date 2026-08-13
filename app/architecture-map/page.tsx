import type { Metadata } from "next";

import ArchitectureMap from "@/components/architecture-map/ArchitectureMap";

export const metadata: Metadata = {
  title: "Currents · Product architecture map",
  description:
    "What we build, in what order, and why — with relationships as the product and everything else supporting them.",
};

export default function ArchitectureMapPage() {
  return <ArchitectureMap />;
}
