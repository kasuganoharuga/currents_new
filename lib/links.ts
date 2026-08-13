// TODO(business): confirm this is the calendar ID we want live on the site long-term.
const LUMA_CALENDAR_ID = "cal-97DAgWBFfaaIiye";

export function lumaCalendarEmbedUrl(theme: "light" | "dark" = "light") {
  return `https://luma.com/embed/calendar/${LUMA_CALENDAR_ID}/events?lt=${theme}`;
}
