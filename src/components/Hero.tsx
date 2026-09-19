"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const offsetY = reduceMotion ? 0 : 18;

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0">
        <Image
          src="/repairs/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-25 dark:opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/20" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: offsetY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-balance font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl sm:tracking-[-0.03em] lg:text-7xl lg:tracking-[-0.035em]">
            Professional Computer, MacBook &amp; Console Repairs
          </h1>

          <p className="mt-6 text-lg text-muted sm:text-xl">
            Gaming PCs, MacBooks, PS5 HDMI and microsoldering
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full bg-accent-button px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_0_1px_rgba(76,141,255,0.4),0_8px_30px_-8px_rgba(76,141,255,0.6)] transition-transform hover:scale-[1.02] hover:bg-accent-button-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Book a Repair
            </a>

            <div className="flex items-center gap-2.5 text-sm text-muted">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>
              <span>
                <strong className="text-foreground">4.9</strong> on Google ·
                300+ reviews
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
