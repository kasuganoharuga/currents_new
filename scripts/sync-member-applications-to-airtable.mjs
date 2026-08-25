import pg from "pg";

const { Pool } = pg;
const batchSize = 10;
const batchIntervalMs = 250;
const categoryLabels = {
  founder: "Founder",
  investor: "Investor",
  operator: "Operator",
  ecosystem: "Eco-System",
};

function requiredEnvironmentValue(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function fieldsFor(application) {
  const fields = {
    "Application ID": application.id,
    Name: application.name,
    Email: application.email,
    Category: categoryLabels[application.category] ?? application.category,
    "LinkedIn URL": application.linkedinUrl,
    "Submitted At": new Date(application.createdAt).toISOString(),
  };

  if (application.legacyLocation)
    fields["Legacy Location"] = application.legacyLocation;
  if (application.countryName) fields.Country = application.countryName;
  if (application.stateName) fields["State / Region"] = application.stateName;
  if (application.cityName) fields.City = application.cityName;
  if (application.whatsapp) fields.WhatsApp = application.whatsapp;
  if (application.lookingFor) fields["Looking For"] = application.lookingFor;
  if (application.heardAbout) fields["Heard About"] = application.heardAbout;

  return fields;
}

async function upsertBatch({ token, baseId, tableId }, applications) {
  const endpoint = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableId)}`;
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      performUpsert: { fieldsToMergeOn: ["Application ID"] },
      records: applications.map((application) => ({
        fields: fieldsFor(application),
      })),
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(
      `Airtable sync failed (${response.status}): ${(await response.text()).slice(0, 500)}`,
    );
  }

  const result = await response.json();
  return result.records.length;
}

async function run() {
  const connectionString = requiredEnvironmentValue("DATABASE_URL");
  const config = {
    token: requiredEnvironmentValue("AIRTABLE_TOKEN"),
    baseId: requiredEnvironmentValue("AIRTABLE_BASE_ID"),
    tableId: requiredEnvironmentValue("AIRTABLE_MEMBER_APPLICATIONS_TABLE_ID"),
  };
  const pool = new Pool({ connectionString });

  try {
    const result = await pool.query(`
      select
        id::text,
        name,
        email,
        location as "legacyLocation",
        whatsapp,
        linkedin_url as "linkedinUrl",
        category,
        looking_for as "lookingFor",
        heard_about as "heardAbout",
        country_name as "countryName",
        state_name as "stateName",
        city_name as "cityName",
        created_at as "createdAt"
      from member_applications
      order by id
    `);

    let synced = 0;
    for (let index = 0; index < result.rows.length; index += batchSize) {
      synced += await upsertBatch(
        config,
        result.rows.slice(index, index + batchSize),
      );
      if (index + batchSize < result.rows.length) {
        await new Promise((resolve) => setTimeout(resolve, batchIntervalMs));
      }
    }

    console.log(`Synced ${synced} member application(s) to Airtable.`);
  } finally {
    await pool.end();
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
