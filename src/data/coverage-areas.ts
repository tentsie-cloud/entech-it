export type CoverageGroup = "herts" | "essex" | "london";

export type CoverageArea = {
  name: string;
  group: CoverageGroup;
  /** Percent position on the schematic corridor diagram, topological, not to scale. */
  x: number;
  y: number;
  /** Where the mobile team is based. */
  isBase?: boolean;
};

// Laid out along the real Lea Valley corridor (Hertford → Tottenham), with the
// Essex towns branching east and the Enfield-border towns branching west.
// Positions are schematic, not surveyed coordinates.
export const coverageAreas: CoverageArea[] = [
  { name: "Hertford", group: "herts", x: 52, y: 4 },
  { name: "Ware", group: "herts", x: 55, y: 12 },
  { name: "Stanstead Abbotts", group: "herts", x: 51, y: 20 },
  { name: "Hoddesdon", group: "herts", x: 47, y: 28, isBase: true },
  { name: "Broxbourne", group: "herts", x: 50, y: 35 },
  { name: "Nazeing", group: "essex", x: 73, y: 31 },
  { name: "Waltham Abbey", group: "essex", x: 75, y: 44 },
  { name: "Cheshunt", group: "herts", x: 44, y: 46 },
  { name: "Waltham Cross", group: "herts", x: 49, y: 55, isBase: true },
  { name: "Potters Bar", group: "london", x: 24, y: 53 },
  { name: "Hadley Wood", group: "london", x: 20, y: 47 },
  { name: "Crews Hill", group: "london", x: 28, y: 62 },
  { name: "Bullsmoor", group: "london", x: 37, y: 65 },
  { name: "Enfield Lock", group: "london", x: 56, y: 71 },
  { name: "Enfield", group: "london", x: 44, y: 80 },
  { name: "Edmonton", group: "london", x: 42, y: 93 },
  { name: "Tottenham", group: "london", x: 40, y: 106 },
];

export const groupLabels: Record<CoverageGroup, string> = {
  herts: "Hertfordshire",
  essex: "Essex",
  london: "North London",
};
