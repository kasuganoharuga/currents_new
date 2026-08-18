import { getPool } from "@/lib/db";

const CATEGORIES = new Set(["Founder", "Investor", "Innovator"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stringValue(
  record: Record<string, unknown>,
  key: string,
  maxLength: number,
): string {
  const value = record[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

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

  if (stringValue(record, "website", 200)) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const name = stringValue(record, "name", 120);
  const email = stringValue(record, "email", 254).toLowerCase();
  const category = stringValue(record, "category", 40);

  if (!name || !EMAIL_PATTERN.test(email) || !CATEGORIES.has(category)) {
    return Response.json(
      { error: "Please enter your name, email and category." },
      { status: 400 },
    );
  }

  const values = [
    name,
    email,
    stringValue(record, "location", 160) || null,
    stringValue(record, "whatsapp", 40) || null,
    stringValue(record, "linkedin", 500) || null,
    category,
    stringValue(record, "lookingFor", 160) || null,
    stringValue(record, "heardAbout", 160) || null,
  ];

  try {
    const result = await getPool().query<{ id: string }>(
      `insert into member_applications (
        name,
        email,
        location,
        whatsapp,
        linkedin_url,
        category,
        looking_for,
        heard_about
      ) values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning id`,
      values,
    );

    return Response.json(
      { ok: true, applicationId: result.rows[0].id },
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
