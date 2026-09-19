"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { useSelection } from "@/context/selection-context";

export default function EstimatePanel() {
  const { selectedId, setSelectedId } = useSelection();
  const service = services.find((s) => s.id === selectedId) ?? services[0];
  const reduceMotion = useReducedMotion();
  const offsetY = reduceMotion ? 0 : 8;
  const restScale = reduceMotion ? 1 : 0.96;

  return (
    <section id="estimate" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent-strong">
              Instant estimate
            </p>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, transform: `translateY(${offsetY}px)` }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: `translateY(${-offsetY}px)` }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              >
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {service.name}
                </h3>
                <p className="mt-2 max-w-md text-muted">{service.priceNote}</p>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={15} className="text-accent" />
                    {service.turnaround}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-accent" />
                    Free diagnostic quote
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="mt-6 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Choose a repair for an estimate"
            >
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={s.id === service.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    s.id === service.id
                      ? "bg-accent text-white"
                      : "bg-surface-raised text-muted hover:text-foreground"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={service.id}
                initial={{ opacity: 0, transform: `scale(${restScale})` }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: `scale(${restScale})` }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                className="font-display text-4xl font-extrabold text-foreground sm:text-5xl"
              >
                {service.priceLabel}
              </motion.p>
            </AnimatePresence>
            <a
              href="#book"
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:w-auto"
            >
              Book this repair
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
