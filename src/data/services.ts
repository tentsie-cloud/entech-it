export type Service = {
  id: string;
  name: string;
  tagline: string;
  /** Longer copy for the services page. Homepage cards use tagline instead. */
  description: string;
  priceLabel: string;
  priceNote: string;
  turnaround: string;
  /** Card artwork. Cards without one fall back to a plain surface plate. */
  image?: string;
  /** Looping, muted clip used in place of the still image. */
  video?: string;
};

export const services: Service[] = [
  {
    id: "gaming-pc",
    name: "Gaming PC Repair",
    tagline: "Diagnostics, upgrades & builds",
    description:
      "We diagnose boot failures, blue screens and graphics faults on custom and pre-built PCs for free, then test the fix under load before it goes back to you.",
    image: "/repairs/gaming-pc.jpg",
    video: "/repairs/gaming-pc.mp4",
    priceLabel: "From £50",
    priceNote: "Full diagnostic, quote before any work begins.",
    turnaround: "Same-day diagnostic",
  },
  {
    id: "ps5-hdmi",
    name: "PS5 HDMI Repair",
    tagline: "Port replacement for no-display faults",
    description:
      "If the TV shows nothing, or the picture cuts out when the cable's nudged, the HDMI port usually needs replacing. We do that at board level and check full output before it leaves the bench.",
    image: "/repairs/ps5-hdmi.jpg",
    priceLabel: "From £110",
    priceNote: "£110 with 48-hour turnaround, or £130 for next-day rush.",
    turnaround: "24–48 hours",
  },
  {
    id: "ps5-overheating",
    name: "PS5 Overheating Repair",
    tagline: "Liquid metal repad & internal clean",
    description:
      "Fans running flat out, shutdowns mid-game, a chassis that's hot to the touch: usually dried-out thermal paste. We clean the internals and, when it's needed, reapply liquid metal to the APU at Sony's own spec.",
    priceLabel: "From £65",
    priceNote:
      "£65 internal clean, or £120 for our most popular liquid metal repad (clean included).",
    turnaround: "Usually same-day",
  },
  {
    id: "microsoldering",
    name: "Microsoldering",
    tagline: "Board-level component repair",
    description:
      "We take on logic board faults other shops turn away: chip-level shorts, damaged traces, failed components, repaired under a microscope instead of swapped for a refurbished board.",
    image: "/repairs/microsoldering.jpg",
    priceLabel: "From £90",
    priceNote: "Precision chip-level repair for logic boards.",
    turnaround: "2–5 working days",
  },
  {
    id: "macbook",
    name: "MacBook Repair",
    tagline: "Screens, batteries, logic boards",
    description:
      "We fix cracked screens, swollen batteries, liquid damage and logic board faults on MacBook Air and Pro, with genuine-spec parts fitted by technicians who work on Apple hardware every day.",
    priceLabel: "£80–250",
    priceNote: "Genuine-spec parts, depends on model & fault.",
    turnaround: "1–3 working days",
  },
  {
    id: "laptop",
    name: "Laptop Repair",
    tagline: "All major brands, hardware & software",
    description:
      "We handle screen, keyboard, hinge and battery replacements on Windows laptops from every major brand, plus the software side: slow performance, faults, virus removal.",
    priceLabel: "£60–180",
    priceNote: "Covers most screen, keyboard & hinge repairs.",
    turnaround: "1–3 working days",
  },
  {
    id: "data-recovery",
    name: "Data Recovery",
    tagline: "HDD, SSD & failed drive recovery",
    description:
      "We assess failed hard drives, corrupted SSDs and accidental deletions for free. No data recovered means no fee, so there's no risk in asking.",
    priceLabel: "From £120",
    priceNote: "No data, no fee. Assessment included.",
    turnaround: "2–7 working days",
  },
];
