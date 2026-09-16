export type Review = {
  name: string;
  device: string;
  quote: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    name: "James H.",
    device: "PS5",
    quote: "HDMI port fixed same day. Console looks brand new, no sign it was ever opened.",
    rating: 5,
  },
  {
    name: "Priya S.",
    device: "MacBook Pro",
    quote: "Logic board issue two other shops turned away. Sorted in three days, fair price.",
    rating: 5,
  },
  {
    name: "Callum R.",
    device: "Gaming PC",
    quote: "Clear diagnosis, no upselling, explained exactly what was wrong before touching it.",
    rating: 5,
  },
];
