const AIRTABLE_API_ROOT = "https://api.airtable.com/v0";
const AIRTABLE_BATCH_SIZE = 10;
const AIRTABLE_BATCH_INTERVAL_MS = 250;
const AIRTABLE_REQUEST_TIMEOUT_MS = 8_000;

const CATEGORY_LABELS: Record<string, string> = {
  founder: "Founder",
  investor: "Investor",
  operator: "Operator",
  ecosystem: "Eco-System",
};

export interface MemberApplicationForAirtable {
  id: string;
  name: string;
  email: string;
  legacyLocation: string | null;
  whatsapp: string | null;
  linkedinUrl: string;
  category: string;
  lookingFor: string | null;
  heardAbout: string | null;
  countryName: string | null;
  stateName: string | null;
  cityName: string | null;
  createdAt: Date | string;
}

interface AirtableConfig {
  token: string;
  baseId: string;
  tableId: string;
}

interface AirtableUpsertResponse {
  records: Array<{ id: string }>;
}

function optionalEnvironmentValue(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function getAirtableConfig(): AirtableConfig | null {
  const token = optionalEnvironmentValue("AIRTABLE_TOKEN");
  const baseId = optionalEnvironmentValue("AIRTABLE_BASE_ID");
  const tableId = optionalEnvironmentValue(
    "AIRTABLE_MEMBER_APPLICATIONS_TABLE_ID",
  );

  if (!token && !baseId && !tableId) {
    return null;
  }

  if (!token || !baseId || !tableId) {
    throw new Error(
      "Airtable member application sync is partially configured. " +
        "AIRTABLE_TOKEN, AIRTABLE_BASE_ID and " +
        "AIRTABLE_MEMBER_APPLICATIONS_TABLE_ID must be set together.",
    );
  }

  return { token, baseId, tableId };
}

function fieldsFor(application: MemberApplicationForAirtable) {
  const fields: Record<string, string> = {
    "Application ID": application.id,
    Name: application.name,
    Email: application.email,
    Category: CATEGORY_LABELS[application.category] ?? application.category,
    "LinkedIn URL": application.linkedinUrl,
    "Submitted At": new Date(application.createdAt).toISOString(),
  };

  if (application.legacyLocation) {
    fields["Legacy Location"] = application.legacyLocation;
  }
  if (application.countryName) {
    fields.Country = application.countryName;
  }
  if (application.stateName) {
    fields["State / Region"] = application.stateName;
  }
  if (application.cityName) {
    fields.City = application.cityName;
  }
  if (application.whatsapp) {
    fields.WhatsApp = application.whatsapp;
  }
  if (application.lookingFor) {
    fields["Looking For"] = application.lookingFor;
  }
  if (application.heardAbout) {
    fields["Heard About"] = application.heardAbout;
  }

  return fields;
}

async function upsertBatch(
  config: AirtableConfig,
  applications: MemberApplicationForAirtable[],
): Promise<number> {
  const endpoint = `${AIRTABLE_API_ROOT}/${encodeURIComponent(config.baseId)}/${encodeURIComponent(config.tableId)}`;
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      performUpsert: { fieldsToMergeOn: ["Application ID"] },
      records: applications.map((application) => ({
        fields: fieldsFor(application),
      })),
    }),
    signal: AbortSignal.timeout(AIRTABLE_REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    const responseBody = (await response.text()).slice(0, 500);
    throw new Error(
      `Airtable member application sync failed (${response.status}): ${responseBody}`,
    );
  }

  const result = (await response.json()) as AirtableUpsertResponse;
  return result.records.length;
}

export function isAirtableMemberApplicationSyncConfigured(): boolean {
  return Boolean(
    optionalEnvironmentValue("AIRTABLE_TOKEN") &&
    optionalEnvironmentValue("AIRTABLE_BASE_ID") &&
    optionalEnvironmentValue("AIRTABLE_MEMBER_APPLICATIONS_TABLE_ID"),
  );
}

export async function syncMemberApplicationsToAirtable(
  applications: MemberApplicationForAirtable[],
): Promise<number> {
  const config = getAirtableConfig();
  if (!config || applications.length === 0) {
    return 0;
  }

  let synced = 0;
  for (
    let index = 0;
    index < applications.length;
    index += AIRTABLE_BATCH_SIZE
  ) {
    synced += await upsertBatch(
      config,
      applications.slice(index, index + AIRTABLE_BATCH_SIZE),
    );

    if (index + AIRTABLE_BATCH_SIZE < applications.length) {
      await new Promise((resolve) =>
        setTimeout(resolve, AIRTABLE_BATCH_INTERVAL_MS),
      );
    }
  }

  return synced;
}

export async function syncMemberApplicationToAirtable(
  application: MemberApplicationForAirtable,
): Promise<boolean> {
  return (await syncMemberApplicationsToAirtable([application])) === 1;
}
