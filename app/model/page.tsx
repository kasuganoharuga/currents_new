import type { Metadata } from "next";

import { ModelPage } from "@/components/site/model/model-page";

export const metadata: Metadata = {
  title: "Currents · The Model",
  description:
    "A community of leaders. Innovators, each leading in their own direction, toward the same goal.",
};

export default function Page() {
  return <ModelPage />;
}
