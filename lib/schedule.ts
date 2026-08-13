// Timezone helpers for blog scheduling. Scheduled instants are stored in the DB
// as absolute UTC Dates; these convert to/from the admin's chosen IANA zone.

// Curated zone list for the editor selector (default: Asia/Kolkata / IST).
// ponytail: a short list, not the full 400+ IANA db — extend if editors need more.
export const TIMEZONES: { value: string; label: string }[] = [
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "US Eastern" },
  { value: "America/Los_Angeles", label: "US Pacific" },
  { value: "Europe/London", label: "UK (GMT/BST)" },
  { value: "Europe/Berlin", label: "Central Europe" },
  { value: "Asia/Dubai", label: "Gulf (GST)" },
  { value: "Asia/Singapore", label: "Singapore" },
  { value: "Australia/Sydney", label: "Sydney" },
];

export const DEFAULT_TIMEZONE = "Asia/Kolkata";

// Short label for display (spec wants "…AM IST"). Falls back to the IANA name.
const ABBREV: Record<string, string> = {
  "Asia/Kolkata": "IST",
  UTC: "UTC",
  "America/New_York": "ET",
  "America/Los_Angeles": "PT",
  "Europe/London": "UK",
  "Europe/Berlin": "CET",
  "Asia/Dubai": "GST",
  "Asia/Singapore": "SGT",
  "Australia/Sydney": "AEST",
};

// Interpret a datetime-local string ("2026-08-11T10:30") as a wall-clock time in
// `timeZone` and return the absolute UTC instant.
// Method: treat the naive components as UTC, then correct by the zone's offset at
// that instant (difference of the same instant rendered in the zone vs. in UTC,
// both re-parsed through the runtime's local tz so the runtime cancels out).
// ponytail: ~1h ambiguity only exactly on a DST fall-back repeated hour; harmless
// for scheduling. Swap in a tz lib if that edge ever matters.
export function zonedToUtc(wallClock: string, timeZone: string): Date {
  const naiveUtc = new Date(wallClock + ":00Z");
  if (isNaN(naiveUtc.getTime())) return naiveUtc; // invalid input → caller validates
  const inZone = new Date(naiveUtc.toLocaleString("en-US", { timeZone }));
  const inUtc = new Date(naiveUtc.toLocaleString("en-US", { timeZone: "UTC" }));
  const offsetMs = inUtc.getTime() - inZone.getTime();
  return new Date(naiveUtc.getTime() + offsetMs);
}

// UTC instant → "YYYY-MM-DDTHH:mm" wall-clock in `timeZone`, for prefilling
// <input type="datetime-local"> when rescheduling.
export function utcToZonedInput(d: Date | string, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date(d));
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${g("year")}-${g("month")}-${g("day")}T${g("hour")}:${g("minute")}`;
}

// UTC instant → human display, e.g. "11 Aug 2026, 10:30 AM IST".
export function formatInZone(d: Date | string, timeZone = DEFAULT_TIMEZONE): string {
  const base = new Date(d).toLocaleString("en-GB", {
    timeZone, day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
  return `${base} ${ABBREV[timeZone] ?? timeZone}`;
}
