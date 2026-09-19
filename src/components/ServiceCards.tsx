"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, HardDrive, Laptop, Thermometer, type LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { useSelection } from "@/context/selection-context";

const fallbackIcon: Record<string, LucideIcon> = {
  macbook: Laptop,
  laptop: Cpu,
  "data-recovery": HardDrive,
  "ps5-overheating": Thermometer,
};

export default function ServiceCards() {
  const { selectedId, setSelectedId } = useSelection();
  const reduceMotion = useReducedMotion();

  const featured = services.filter((s) => s.image);
  const compact = services.filter((s) => !s.image);

  return (
    <section id="services" className="py-24">
      <div className="mx-auto mb-12 max-w-xl px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Most common repairs
        </h2>
        <p className="mt-3 text-muted">
          Select a repair to see an instant estimate below.
        </p>
      </div>

      <div>
        {featured.map((service, i) => {
          const active = service.id === selectedId;
          const reversed = i % 2 === 1;
          return (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => setSelectedId(service.id)}
              aria-pressed={active}
              className={`group grid w-full grid-cols-1 items-stretch text-left outline-none lg:grid-cols-2 ${
                active ? "bg-accent/[0.06]" : ""
              }`}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto ${
                  reversed ? "lg:order-2" : ""
                }`}
              >
                <motion.div
                  initial={reduceMotion ? false : { scale: 1.15, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  {service.video && !reduceMotion ? (
                    <video
                      src={service.video}
                      poster={service.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={service.image!}
                      alt={`${service.name} at ENTECH IT, ${service.tagline}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </motion.div>
                {active && (
                  <div className="absolute inset-0 ring-4 ring-inset ring-accent" />
                )}
              </div>

              <div
                className={`flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 ${
                  reversed ? "lg:order-1" : ""
                }`}
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                    {service.name}
                  </h3>
                  <p className="mt-3 max-w-sm text-muted">{service.tagline}</p>
                  <p className="mt-5 font-display text-2xl font-bold text-accent-strong">
                    {service.priceLabel}
                  </p>
                  <span
                    className={`mt-6 inline-flex w-fit items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-accent-button text-white"
                        : "bg-surface-raised text-foreground group-hover:bg-accent-button group-hover:text-white"
                    }`}
                  >
                    {active ? "Selected" : "Select this repair"}
                  </span>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto mt-4 max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap gap-3 border-t border-border pt-8">
          {compact.map((service, i) => {
            const active = service.id === selectedId;
            const Icon = fallbackIcon[service.id];
            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => setSelectedId(service.id)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                aria-pressed={active}
                className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent/10 text-accent-strong"
                    : "border-border text-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                <span className="font-semibold text-foreground">{service.name}</span>
                <span>{service.priceLabel}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
