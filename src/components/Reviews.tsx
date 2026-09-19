"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

export default function Reviews() {
  const reduceMotion = useReducedMotion();
  const offsetY = reduceMotion ? 0 : 16;

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What customers say
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted">
          <div className="flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="fill-accent text-accent" />
            ))}
          </div>
          <span>
            <strong className="text-foreground">4.9</strong> average on Google
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.figure
            key={review.name}
            initial={{ opacity: 0, y: offsetY }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <Star key={idx} size={14} className="fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-4 text-xs text-muted">
              {review.name} ({review.device})
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
