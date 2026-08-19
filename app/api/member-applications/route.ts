import { z } from "zod";

import { getPool } from "@/lib/db";
import { createClaimToken } from "@/lib/member-applications/claim";

const CATEGORIES = ["founder", "investor", "operator", "ecosystem"] as const;

const trimmed = (max: number) => z.string().trim().max(max);
const required = (max: number) => trimmed(max).min(1);

const ApplicationSchema = z.object({
  name: required(120),
  // Order matters: trim/lowercase must run before the format check, and
  // chaining off z.email() itself applies checks before those transforms —
  // so build the pipeline on a plain string and apply .email() last.
  email: z.string().trim().toLowerCase().max(254).email(),
  category: z.enum(CATEGORIES),
  linkedin: required(500),
  countryCode: required(8),
  countryName: required(120),
  stateCode: required(16),
  stateName: required(120),
  cityId: required(40),
  cityName: required(120),
  whatsapp: trimmed(40).optional(),
  lookingFor: trimmed(160).optional(),
  heardAbout: trimmed(160).optional(),
});

const VALIDATION_ERROR =
  "Please fill in your name, email, location, LinkedIn URL and role.";

export async function POST(request: Request) {
  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid application data." },
      { status: 400 },
    );
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return Response.json(
      { error: "Invalid application data." },
      { status: 400 },
    );
  }

  const record = input as Record<string, unknown>;

  const website =
    typeof record.website === "string" ? record.website.trim() : "";
  if (website) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const parsed = ApplicationSchema.safeParse(record);

  if (!parsed.success) {
    return Response.json({ error: VALIDATION_ERROR }, { status: 400 });
  }

  const {
    name,
    email,
    category,
    linkedin,
    countryCode,
    countryName,
    stateCode,
    stateName,
    cityId,
    cityName,
    whatsapp,
    lookingFor,
    heardAbout,
  } = parsed.data;

  const values = [
    name,
    email,
    whatsapp || null,
    linkedin,
    category,
    lookingFor || null,
    heardAbout || null,
    countryCode,
    countryName,
    stateCode,
    stateName,
    cityId,
    cityName,
  ];

  try {
    const result = await getPool().query<{ id: string }>(
      `insert into member_applications (
        name,
        email,
        whatsapp,
        linkedin_url,
        category,
        looking_for,
        heard_about,
        country_code,
        country_name,
        state_code,
        state_name,
        city_id,
        city_name
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      returning id`,
      values,
    );

    const applicationId = result.rows[0].id;

    return Response.json(
      {
        ok: true,
        applicationId,
        claimToken: createClaimToken(applicationId, email),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to save member application", error);
    return Response.json(
      { error: "We couldn't save your application. Please try again." },
      { status: 503 },
    );
  }
}
