/**
 * Single source of truth for business details used across metadata,
 * sitemap and structured data.
 *
 * TODO — replace every PLACEHOLDER value with the real business details.
 * Search engines publish these verbatim, and wrong ones are worse than none:
 * an address or phone number that doesn't match your Google Business Profile
 * actively hurts local ranking.
 */
export const site = {
  name: "ENTECH IT",
  url: "https://entechit.co.uk", // PLACEHOLDER — real domain
  description:
    "Professional Gaming PC, MacBook, PS5 HDMI and microsoldering repairs. Free diagnostic, fixed quote before any work begins.",

  // PLACEHOLDER — must match your Google Business Profile exactly
  telephone: "+44 0000 000000",
  email: "tentsie@gmail.com",
  address: {
    street: "PLACEHOLDER street",
    locality: "PLACEHOLDER town",
    region: "PLACEHOLDER county",
    postcode: "PLACEHOLDER",
    country: "GB",
  },

  openingHours: [
    // PLACEHOLDER — real opening hours
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],
} as const;

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
