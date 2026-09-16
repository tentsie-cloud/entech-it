"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/data/services";
import { useSelection } from "@/context/selection-context";

export default function ServiceCards() {
  const { selectedId, setSelectedId } = useSelection();
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-12 max-w-xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Most common repairs
        </h2>
        <p className="mt-3 text-muted">
          Select a repair to see an instant estimate below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const active = service.id === selectedId;
          return (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => setSelectedId(service.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-pressed={active}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl text-left outline-none transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : "ring-1 ring-border hover:ring-border-strong"
              }`}
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
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : service.image ? (
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-surface-raised via-surface to-background" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/15 transition-opacity" />
              <div
                className={`absolute inset-0 bg-accent/20 transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="relative flex h-full flex-col justify-end p-5">
                <h3 className="font-display text-xl font-bold text-white">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{service.tagline}</p>
                <p className="mt-3 text-sm font-semibold text-accent-strong">
                  {service.priceLabel}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
