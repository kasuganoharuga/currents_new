import { z } from "zod";

import { getStates } from "@/lib/geo/geonames";

const QuerySchema = z.object({
  country: z.string().trim().toUpperCase().length(2),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = QuerySchema.safeParse({
    country: searchParams.get("country") ?? "",
  });

  if (!parsed.success) {
    return Response.json({ error: "Missing country." }, { status: 400 });
  }

  try {
    const states = await getStates(parsed.data.country);
    return Response.json({ states });
  } catch (error) {
    console.error("Unable to fetch states", error);
    return Response.json(
      { error: "We couldn't load states right now." },
      { status: 503 },
    );
  }
}
