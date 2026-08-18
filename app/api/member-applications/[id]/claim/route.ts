import { auth } from "@/lib/auth";
import { getPool } from "@/lib/db";
import { verifyClaimToken } from "@/lib/member-applications/claim";

interface PgError {
  code?: string;
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as PgError).code === "23505"
  );
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const claimToken =
    body && typeof body === "object" && "claimToken" in body
      ? (body as Record<string, unknown>).claimToken
      : undefined;

  if (typeof claimToken !== "string" || !claimToken) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const pool = getPool();

  const applicationResult = await pool.query<{ email: string }>(
    "select email from member_applications where id = $1",
    [id],
  );
  const application = applicationResult.rows[0];

  if (!application) {
    return Response.json({ error: "Application not found." }, { status: 404 });
  }

  if (!verifyClaimToken(id, application.email, claimToken)) {
    return Response.json({ error: "Invalid claim token." }, { status: 403 });
  }

  try {
    const updateResult = await pool.query(
      `update user_profiles
       set member_application_id = $1, updated_at = now()
       where user_id = $2 and member_application_id is null`,
      [id, session.user.id],
    );

    if (updateResult.rowCount === 1) {
      return Response.json({ ok: true });
    }

    const existing = await pool.query<{ member_application_id: string | null }>(
      "select member_application_id from user_profiles where user_id = $1",
      [session.user.id],
    );

    if (existing.rows[0]?.member_application_id === id) {
      return Response.json({ ok: true });
    }

    return Response.json(
      { ok: false, error: "already-claimed" },
      { status: 409 },
    );
  } catch (error) {
    if (isUniqueViolation(error)) {
      return Response.json(
        { ok: false, error: "already-claimed" },
        { status: 409 },
      );
    }

    console.error("Unable to claim member application", error);
    return Response.json(
      { error: "We couldn't link your application. Please try again." },
      { status: 503 },
    );
  }
}
