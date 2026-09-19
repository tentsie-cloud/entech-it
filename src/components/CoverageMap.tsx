"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { coverageAreas, type CoverageArea } from "@/data/coverage-areas";
import { useSelection } from "@/context/selection-context";

const byName = new Map(coverageAreas.map((a) => [a.name, a]));
const point = (name: string) => byName.get(name)!;

// Decorative route lines, schematic, not surveyed. Follows the real Lea
// Valley corridor north (Hertford) to south (Tottenham), with Essex and the
// Enfield-border towns branching off it.
const spine = [
  "Hertford",
  "Ware",
  "Stanstead Abbotts",
  "Hoddesdon",
  "Broxbourne",
  "Cheshunt",
  "Waltham Cross",
  "Bullsmoor",
  "Enfield Lock",
  "Enfield",
  "Edmonton",
  "Tottenham",
];
const essexBranch = ["Broxbourne", "Nazeing", "Waltham Abbey"];
const westBranch = ["Waltham Cross", "Potters Bar", "Hadley Wood"];
const crewsHillSpur = ["Potters Bar", "Crews Hill"];

function pathFor(names: string[]) {
  return names
    .map((name, i) => `${i === 0 ? "M" : "L"} ${point(name).x} ${point(name).y}`)
    .join(" ");
}

// Manual label placement so text doesn't collide in the tighter clusters
// (Bullsmoor/Enfield Lock, Potters Bar/Hadley Wood/Crews Hill).
const labelSide: Partial<Record<string, "left" | "right">> = {
  Cheshunt: "left",
  "Waltham Cross": "right",
  Bullsmoor: "left",
  "Enfield Lock": "right",
  "Hadley Wood": "left",
  "Potters Bar": "left",
  "Crews Hill": "left",
  Nazeing: "right",
  "Waltham Abbey": "right",
};

export default function CoverageMap() {
  const { selectedArea, setSelectedArea } = useSelection();
  const reduceMotion = useReducedMotion();
  const offsetY = reduceMotion ? 0 : 16;

  function selectArea(area: CoverageArea) {
    setSelectedArea(area.name);
    const target = document.getElementById("book");
    target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <section id="coverage" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: offsetY }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-border bg-surface p-6 sm:p-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-display text-sm font-semibold text-accent-strong">
              Where we cover
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Mobile repairs across Herts, Essex &amp; North London
            </h2>
            <p className="mt-3 text-muted">
              We come to you. Pick your area and we&apos;ll carry it
              straight into your booking.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={15} className="text-accent" />
            Based in Hoddesdon / Waltham Cross
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {selectedArea ? (
            <motion.div
              key={selectedArea}
              initial={{ opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-8px)" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-surface-raised px-4 py-3"
            >
              <p className="text-sm text-foreground">
                <strong>{selectedArea}</strong> selected
              </p>
              <a
                href="#book"
                className="ml-auto text-sm font-semibold text-accent-strong hover:underline"
              >
                Continue to booking
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-[inset_0_1px_0_var(--border-strong)]">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
              aria-hidden="true"
            />

            {coverageAreas
              .filter((a) => a.isBase)
              .map((area) => (
                <div
                  key={area.name}
                  className="pointer-events-none absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-2xl"
                  style={{ left: `${area.x}%`, top: `${area.y}%` }}
                  aria-hidden="true"
                />
              ))}

            <svg
              viewBox="0 0 100 108"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d={pathFor(spine)}
                fill="none"
                stroke="var(--accent)"
                strokeOpacity={0.55}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={pathFor(essexBranch)}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray="1.5 2"
              />
              <path
                d={pathFor(westBranch)}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray="1.5 2"
              />
              <path
                d={pathFor(crewsHillSpur)}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray="1.5 2"
              />
            </svg>

            {coverageAreas.map((area, i) => {
              const active = area.name === selectedArea;
              const side = labelSide[area.name] ?? "bottom";
              return (
                <motion.button
                  key={area.name}
                  type="button"
                  onClick={() => selectArea(area)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.02 }}
                  aria-label={`Book a repair in ${area.name}`}
                  aria-pressed={active}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-2.5 outline-none"
                  style={{ left: `${area.x}%`, top: `${area.y}%` }}
                >
                  <span className="relative flex items-center justify-center">
                    {area.isBase && (
                      <span className="motion-safe:absolute motion-safe:h-4 motion-safe:w-4 motion-safe:animate-ping motion-safe:rounded-full motion-safe:bg-accent/50" />
                    )}
                    <span
                      className={`relative block rounded-full border-2 shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-all duration-150 group-hover:scale-125 group-focus-visible:scale-125 group-active:scale-95 ${
                        active
                          ? "h-3.5 w-3.5 border-accent bg-accent"
                          : area.isBase
                            ? "h-3 w-3 border-accent bg-accent"
                            : "h-2.5 w-2.5 border-accent-strong bg-surface group-hover:bg-accent"
                      }`}
                    />
                  </span>
                  <span
                    className={`pointer-events-none absolute whitespace-nowrap text-[10px] font-medium text-muted transition-colors group-hover:text-foreground group-focus-visible:text-foreground ${
                      side === "left"
                        ? "right-full top-1/2 mr-1.5 -translate-y-1/2"
                        : side === "right"
                          ? "left-full top-1/2 ml-1.5 -translate-y-1/2"
                          : "left-1/2 top-full mt-1 -translate-x-1/2"
                    }`}
                  >
                    {area.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
