/**
 * Return the current calendar date in the hospital's operating time zone.
 * Appointment dates are calendar dates (not UTC instants), so use the same
 * zone on the client and server to avoid pre-filling yesterday around midnight.
 */
export function getHospitalDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}
