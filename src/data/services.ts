export type Service = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  priceLabel: string;
  priceNote: string;
  turnaround: string;
};

export const services: Service[] = [
  {
    id: "gaming-pc",
    name: "Gaming PC Repair",
    tagline: "Diagnostics, upgrades & builds",
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "From £50",
    priceNote: "Full diagnostic, quote before any work begins.",
    turnaround: "Same-day diagnostic",
  },
  {
    id: "ps5-hdmi",
    name: "PS5 HDMI Repair",
    tagline: "Port replacement, no-signal fixes",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "£70–90",
    priceNote: "Fixed price — HDMI port replaced and tested.",
    turnaround: "24–48 hours",
  },
  {
    id: "microsoldering",
    name: "Microsoldering",
    tagline: "Board-level component repair",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "From £90",
    priceNote: "Precision chip-level repair for logic boards.",
    turnaround: "2–5 working days",
  },
  {
    id: "macbook",
    name: "MacBook Repair",
    tagline: "Screens, batteries, logic boards",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "£80–250",
    priceNote: "Genuine-spec parts, depends on model & fault.",
    turnaround: "1–3 working days",
  },
  {
    id: "laptop",
    name: "Laptop Repair",
    tagline: "All major brands, hardware & software",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "£60–180",
    priceNote: "Covers most screen, keyboard & hinge repairs.",
    turnaround: "1–3 working days",
  },
  {
    id: "data-recovery",
    name: "Data Recovery",
    tagline: "HDD, SSD & failed drive recovery",
    image:
      "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "From £120",
    priceNote: "No data, no fee — assessment included.",
    turnaround: "2–7 working days",
  },
];
