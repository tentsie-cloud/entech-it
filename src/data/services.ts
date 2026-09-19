export type Service = {
  id: string;
  name: string;
  tagline: string;
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
    image: "/repairs/ps5-hdmi.jpg",
    priceLabel: "From £110",
    priceNote: "£110 with 48-hour turnaround, or £130 for next-day rush.",
    turnaround: "24–48 hours",
  },
  {
    id: "ps5-overheating",
    name: "PS5 Overheating Repair",
    tagline: "Liquid metal repad & internal clean",
    priceLabel: "From £65",
    priceNote:
      "£65 internal clean, or £120 for our most popular liquid metal repad (clean included).",
    turnaround: "Usually same-day",
  },
  {
    id: "microsoldering",
    name: "Microsoldering",
    tagline: "Board-level component repair",
    image: "/repairs/microsoldering.jpg",
    priceLabel: "From £90",
    priceNote: "Precision chip-level repair for logic boards.",
    turnaround: "2–5 working days",
  },
  {
    id: "macbook",
    name: "MacBook Repair",
    tagline: "Screens, batteries, logic boards",
    priceLabel: "£80–250",
    priceNote: "Genuine-spec parts, depends on model & fault.",
    turnaround: "1–3 working days",
  },
  {
    id: "laptop",
    name: "Laptop Repair",
    tagline: "All major brands, hardware & software",
    priceLabel: "£60–180",
    priceNote: "Covers most screen, keyboard & hinge repairs.",
    turnaround: "1–3 working days",
  },
  {
    id: "data-recovery",
    name: "Data Recovery",
    tagline: "HDD, SSD & failed drive recovery",
    priceLabel: "From £120",
    priceNote: "No data, no fee. Assessment included.",
    turnaround: "2–7 working days",
  },
];
