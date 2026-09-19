"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/data/services";
import { fallbackIcon } from "@/data/service-icons";
import { useSelection } from "@/context/selection-context";

export default function ServiceRow({
  service,
  index,
  compact = false,
}: {
  service: Service;
  index: number;
  compact?: boolean;
}) {
  const { selectedId, setSelectedId } = useSelection();
  const reduceMotion = useReducedMotion();
  const active = service.id === selectedId;
  const Icon = fallbackIcon[service.id];

  return (
    <motion.button
      type="button"
      onClick={() => {
        setSelectedId(service.id);
        document.getElementById("book")?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      aria-pressed={active}
      className={`group flex w-full flex-col text-left outline-hidden transition-colors first:pt-0 focus-visible:[--tw-outline-style:solid] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-row sm:items-center ${
        compact ? "gap-4 py-4 sm:gap-5" : "gap-5 py-8 sm:gap-8"
      } ${active ? "bg-accent/[0.05]" : "hover:bg-surface"}`}
    >
      <div
        className={`relative w-full flex-none overflow-hidden rounded-2xl ${
          compact ? "aspect-[3/2] sm:w-28" : "aspect-[4/3] sm:w-48"
        }`}
      >
        {service.image ? (
          <Image
            src={service.image}
            alt={`${service.name} at ENTECH IT, ${service.tagline}`}
            fill
            sizes={compact ? "112px" : "(min-width: 640px) 192px, 100vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          // Card labels always sit on a dark scrim, so the fallback
          // plate stays dark in both themes (matches ServiceCards).
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#222733] via-[#171a21] to-[#0e1015]">
            {Icon && (
              <Icon size={compact ? 22 : 32} className="text-accent" strokeWidth={1.5} />
            )}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display font-bold text-foreground ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {service.name}
        </h3>
        <p className={`max-w-xl text-muted ${compact ? "mt-1 text-sm" : "mt-2"}`}>
          {service.description}
        </p>
        {!compact && <p className="mt-3 text-sm text-muted">{service.turnaround}</p>}
      </div>

      <div className="flex flex-none items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
        <span
          className={`font-display font-bold text-accent-strong ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {service.priceLabel}
        </span>
        <span
          className={`inline-flex items-center rounded-full font-semibold transition-colors ${
            compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
          } ${
            active
              ? "bg-accent-button text-white"
              : "bg-surface-raised text-foreground group-hover:bg-accent-button group-hover:text-white"
          }`}
        >
          {active ? "Selected" : "Book this repair"}
        </span>
      </div>
    </motion.button>
  );
}
