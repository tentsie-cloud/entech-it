"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, HardDrive, Laptop, Thermometer, type LucideIcon } from "lucide-react";
import { services, type Service } from "@/data/services";
import { useSelection } from "@/context/selection-context";

// Services without real photography yet sit in a compact, icon-led tier
// instead of pretending to be equal-weight photo tiles.
const fallbackIcon: Record<string, LucideIcon> = {
  macbook: Laptop,
  laptop: Cpu,
  "data-recovery": HardDrive,
  "ps5-overheating": Thermometer,
};

export default function ServiceCards() {
  const { selectedId, setSelectedId } = useSelection();
  const reduceMotion = useReducedMotion();
  const offsetY = reduceMotion ? 0 : 16;

  const featured = services.filter((s) => s.image);
  const compact = services.filter((s) => !s.image);

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[190px]">
        {featured.map((service, i) => {
          const active = service.id === selectedId;
          const isHero = i === 0;
          return (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => setSelectedId(service.id)}
              initial={{ opacity: 0, y: offsetY }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-pressed={active}
              className={`group relative overflow-hidden rounded-2xl text-left outline-none transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isHero
                  ? "aspect-[4/3] sm:col-span-2 sm:aspect-video lg:col-span-2 lg:row-span-2 lg:aspect-auto"
                  : "aspect-square lg:col-span-2 lg:aspect-auto"
              } ${
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
              ) : (
                <Image
                  src={service.image!}
                  alt={`${service.name} at ENTECH IT, ${service.tagline}`}
                  fill
                  sizes={
                    isHero
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/15 transition-opacity" />
              <div
                className={`absolute inset-0 bg-accent/20 transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="relative flex h-full flex-col justify-end p-5">
                <h3
                  className={`font-display font-bold text-white ${isHero ? "text-2xl" : "text-xl"}`}
                >
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{service.tagline}</p>
                <p className="mt-3 text-sm font-semibold text-[#8fb6ff]">
                  {service.priceLabel}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {compact.map((service, i) => {
          const active = service.id === selectedId;
          const Icon = fallbackIcon[service.id];
          return (
            <CompactCard
              key={service.id}
              service={service}
              active={active}
              Icon={Icon}
              delay={featured.length * 0.05 + i * 0.05}
              offsetY={offsetY}
              onSelect={() => setSelectedId(service.id)}
            />
          );
        })}
      </div>
    </section>
  );
}

function CompactCard({
  service,
  active,
  Icon,
  delay,
  offsetY,
  onSelect,
}: {
  service: Service;
  active: boolean;
  Icon: LucideIcon;
  delay: number;
  offsetY: number;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      aria-pressed={active}
      className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "border-accent bg-accent/10"
          : "border-border bg-surface hover:border-border-strong"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
          active ? "bg-accent text-white" : "bg-surface-raised text-accent"
        }`}
      >
        <Icon size={20} />
      </span>
      <span className="min-w-0">
        <span className="block font-display font-bold text-foreground">
          {service.name}
        </span>
        <span className="block text-sm text-muted">{service.tagline}</span>
        <span className="mt-1 block text-sm font-semibold text-accent-strong">
          {service.priceLabel}
        </span>
      </span>
    </motion.button>
  );
}
