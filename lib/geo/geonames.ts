// Server-side proxy helpers for GeoNames — the standardized source for
// State/Region and City data in the join form's location picker (Country is
// a static list, see lib/geo/countries.ts). Requires a free GeoNames account
// username: http://www.geonames.org/login — set as GEONAMES_USERNAME.

// Free accounts use the plain http host — secure.geonames.org requires a
// premium/commercial GeoNames account.
const GEONAMES_API_BASE = "http://api.geonames.org";
const STATE_REVALIDATE_SECONDS = 2_592_000; // 30 days — admin divisions rarely change.
const CITY_REVALIDATE_SECONDS = 86_400; // 1 day.

export interface GeoState {
  code: string;
  name: string;
  geonamesAdminCode1: string;
}

export interface GeoCity {
  id: string;
  name: string;
}

interface GeonamesAdminCodes1 {
  ISO3166_2?: string;
}

interface GeonamesAlternateName {
  isPreferredName?: boolean;
  isShortName?: boolean;
  lang?: string;
  name: string;
}

interface GeonamesSearchResult {
  adminCode1?: string;
  adminCodes1?: GeonamesAdminCodes1;
  alternateNames?: GeonamesAlternateName[];
  geonameId: number;
  name: string;
  toponymName?: string;
}

// GeoNames' default toponymName for a state is often the formal, verbose
// form ("State of South Australia") — prefer the plain English short name
// from alternateNames when GeoNames provides one.
function displayName(result: GeonamesSearchResult): string {
  const shortEnglishName = result.alternateNames?.find(
    (alt) => alt.lang === "en" && (alt.isShortName || alt.isPreferredName),
  )?.name;

  return shortEnglishName ?? result.toponymName ?? result.name;
}

interface GeonamesSearchResponse {
  geonames?: GeonamesSearchResult[];
  status?: { message: string; value: number };
}

function username(): string {
  const value = process.env.GEONAMES_USERNAME;

  if (!value) {
    throw new Error("GEONAMES_USERNAME is required");
  }

  return value;
}

async function geonamesSearch(
  params: Record<string, string>,
  revalidateSeconds: number,
): Promise<GeonamesSearchResult[]> {
  const url = new URL("/searchJSON", GEONAMES_API_BASE);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("username", username());

  const response = await fetch(url, {
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    throw new Error(`GeoNames request failed with status ${response.status}`);
  }

  const body = (await response.json()) as GeonamesSearchResponse;

  if (body.status) {
    throw new Error(`GeoNames error: ${body.status.message}`);
  }

  return body.geonames ?? [];
}

export async function getStates(countryCode: string): Promise<GeoState[]> {
  const results = await geonamesSearch(
    {
      country: countryCode,
      featureCode: "ADM1",
      maxRows: "500",
      style: "full",
    },
    STATE_REVALIDATE_SECONDS,
  );

  return results
    .map((result) => ({
      code: result.adminCodes1?.ISO3166_2 ?? result.adminCode1 ?? "",
      name: displayName(result),
      geonamesAdminCode1: result.adminCode1 ?? "",
    }))
    .filter((state) => state.code && state.name)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function searchCities(
  countryCode: string,
  geonamesAdminCode1: string,
  query: string,
): Promise<GeoCity[]> {
  if (!query.trim()) return [];

  const results = await geonamesSearch(
    {
      ...(geonamesAdminCode1 ? { adminCode1: geonamesAdminCode1 } : {}),
      country: countryCode,
      featureClass: "P",
      maxRows: "15",
      name_startsWith: query.trim(),
      orderby: "relevance",
      style: "short",
    },
    CITY_REVALIDATE_SECONDS,
  );

  return results.map((result) => ({
    id: String(result.geonameId),
    name: result.toponymName ?? result.name,
  }));
}
