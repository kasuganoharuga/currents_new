const LUMA_API_BASE = "https://public-api.luma.com";
const DEFAULT_EVENT_LIMIT = 12;
const REVALIDATE_SECONDS = 300;

interface LumaAddress {
  address?: string | null;
  city?: string | null;
  city_state?: string | null;
  description?: string | null;
  full_address?: string | null;
}

interface LumaCalendarEvent {
  access: "manage" | "view";
  cover_url: string | null;
  end_at: string | null;
  geo_address_json: LumaAddress | null;
  id: string;
  location_type: "offline" | "online" | string;
  location_visibility?: "public" | "guests-only" | string;
  name: string;
  registration_open?: boolean | null;
  require_approval?: boolean | null;
  spots_remaining?: number | null;
  start_at: string;
  timezone: string;
  url: string;
  waitlist_status: "enabled" | "disabled" | string;
}

interface LumaEventDetail extends LumaCalendarEvent {
  description?: string | null;
}

interface LumaEventListResponse {
  entries: LumaCalendarEvent[];
  has_more: boolean;
  next_cursor?: string;
}

export interface PublicLumaEvent {
  coverUrl: string | null;
  ctaLabel: string;
  dateLabel: string;
  description: string;
  endAt: string | null;
  id: string;
  locationLabel: string;
  name: string;
  registrationStatus: string;
  startAt: string;
  timeLabel: string;
  url: string;
}

function apiKey(): string {
  const key = process.env.LUMA_API_KEY;

  if (!key) {
    throw new Error("LUMA_API_KEY is required");
  }

  return key;
}

async function lumaGet<T>(
  path: string,
  params: Record<string, string | string[]>,
): Promise<T> {
  const url = new URL(path, LUMA_API_BASE);

  for (const [key, value] of Object.entries(params)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      url.searchParams.append(key, item);
    }
  }

  const response = await fetch(url, {
    headers: { "x-luma-api-key": apiKey() },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Luma API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function fiveMinuteBucket(): string {
  const bucketMs = REVALIDATE_SECONDS * 1000;
  return new Date(Math.floor(Date.now() / bucketMs) * bucketMs).toISOString();
}

function truncateAtWord(value: string, maxLength = 190): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, Math.max(lastSpace, maxLength - 24)).trim()}…`;
}

function shortDescription(description?: string | null): string {
  if (!description) {
    return "Full event details and registration information are available on Luma.";
  }

  const paragraphs = description
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);

  return truncateAtWord(paragraphs.slice(0, 2).join(" "));
}

function locationLabel(event: LumaCalendarEvent): string {
  if (event.location_type === "online") return "Online";

  const address = event.geo_address_json;
  if (!address) return "Location on Luma";

  if (event.location_visibility === "guests-only") {
    return address.city_state || address.city || "Location shared with guests";
  }

  if (address.address && address.city_state) {
    return `${address.address}, ${address.city_state}`;
  }

  return (
    address.description ||
    address.full_address ||
    address.city_state ||
    address.city ||
    "Location on Luma"
  );
}

function dateAndTimeLabels(event: LumaCalendarEvent): {
  dateLabel: string;
  timeLabel: string;
} {
  const start = new Date(event.start_at);
  const end = event.end_at ? new Date(event.end_at) : null;
  const dateLabel = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    timeZone: event.timezone,
    weekday: "short",
    year: "numeric",
  }).format(start);
  const timeFormatter = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
  });
  const zoneName =
    new Intl.DateTimeFormat("en-AU", {
      timeZone: event.timezone,
      timeZoneName: "short",
    })
      .formatToParts(start)
      .find((part) => part.type === "timeZoneName")?.value ?? event.timezone;
  const timeLabel = end
    ? `${timeFormatter.format(start)}–${timeFormatter.format(end)} ${zoneName}`
    : `${timeFormatter.format(start)} ${zoneName}`;

  return { dateLabel, timeLabel };
}

function registrationLabels(event: LumaCalendarEvent): {
  ctaLabel: string;
  registrationStatus: string;
} {
  if (event.spots_remaining === 0 && event.waitlist_status === "enabled") {
    return { ctaLabel: "Join waitlist", registrationStatus: "Waitlist open" };
  }

  if (event.spots_remaining === 0) {
    return { ctaLabel: "View event", registrationStatus: "Sold out" };
  }

  if (event.registration_open === false) {
    return {
      ctaLabel: "View event",
      registrationStatus: "Registration closed",
    };
  }

  if (
    event.registration_open === null ||
    event.registration_open === undefined
  ) {
    return {
      ctaLabel: "View & register",
      registrationStatus: "Hosted on Luma",
    };
  }

  if (event.require_approval) {
    return {
      ctaLabel: "Apply to attend",
      registrationStatus: "Applications open",
    };
  }

  return { ctaLabel: "Register", registrationStatus: "Registration open" };
}

async function eventDescription(event: LumaCalendarEvent): Promise<string> {
  if (event.access !== "manage") return shortDescription();

  try {
    const detail = await lumaGet<LumaEventDetail>("/v1/events/get", {
      event_id: event.id,
    });
    return shortDescription(detail.description);
  } catch {
    return shortDescription();
  }
}

export async function getUpcomingLumaEvents(
  limit = DEFAULT_EVENT_LIMIT,
): Promise<PublicLumaEvent[]> {
  const response = await lumaGet<LumaEventListResponse>(
    "/v1/calendars/events/list",
    {
      access: ["manage", "view"],
      after: fiveMinuteBucket(),
      pagination_limit: String(limit),
      sort_column: "start_at",
      sort_direction: "asc",
    },
  );

  return Promise.all(
    response.entries.map(async (event) => {
      const { dateLabel, timeLabel } = dateAndTimeLabels(event);
      const { ctaLabel, registrationStatus } = registrationLabels(event);

      return {
        coverUrl: event.cover_url,
        ctaLabel,
        dateLabel,
        description: await eventDescription(event),
        endAt: event.end_at,
        id: event.id,
        locationLabel: locationLabel(event),
        name: event.name,
        registrationStatus,
        startAt: event.start_at,
        timeLabel,
        url: event.url,
      };
    }),
  );
}
