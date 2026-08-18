import type { Metadata } from "next";

import { ManifestoPage } from "@/components/site/manifesto/manifesto-page";

export const metadata: Metadata = {
  title: "Currents · Manifesto",
  description:
    "Innovation isn't for its own sake. It's how we leave this place better than we found it, for the next generation.",
};

export default function Page() {
  return <ManifestoPage />;
}
