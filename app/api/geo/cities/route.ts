import { z } from "zod";

import { searchCities } from "@/lib/geo/geonames";

const QuerySchema = z.object({
  country: z.string().trim().toUpperCase().length(2),
  // Optional — some countries (e.g. Singapore) have no state/region division
  // in GeoNames, so the search falls back to country-only in that case.
  adminCode1: z.string().trim().max(16).optional().default(""),
  q: z.string().trim().max(200).optional().default(""),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = QuerySchema.safeParse({
    country: searchParams.get("country") ?? "",
    adminCode1: searchParams.get("adminCode1") ?? "",
    q: searchParams.get("q") ?? "",
  });

  if (!parsed.success) {
    return Response.json({ error: "Missing country." }, { status: 400 });
  }

  try {
    const cities = await searchCities(
      parsed.data.country,
      parsed.data.adminCode1,
      parsed.data.q,
    );
    return Response.json({ cities });
  } catch (error) {
    console.error("Unable to fetch cities", error);
    return Response.json(
      { error: "We couldn't load cities right now." },
      { status: 503 },
    );
  }
}
