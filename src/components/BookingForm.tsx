"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/data/services";
import { useSelection } from "@/context/selection-context";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const { selectedId, setSelectedId } = useSelection();
  const [status, setStatus] = useState<Status>("idle");
  const reduceMotion = useReducedMotion();
  const offsetY = reduceMotion ? 0 : 16;

  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => setStatus("idle"), 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setSelectedId(services[0].id);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="book" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Book a repair
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Tell us what&apos;s wrong and we&apos;ll come back to you with a
            firm quote and drop-off time, usually within a few hours.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: offsetY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
              />
            </Field>

            <Field label="Phone" htmlFor="phone">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={inputClass}
              />
            </Field>

            <Field label="Email" htmlFor="email" className="sm:col-span-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </Field>

            <Field label="Device" htmlFor="device">
              <select
                id="device"
                name="device"
                required
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className={inputClass}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </Field>

            <Field label="Preferred booking date" htmlFor="date">
              <input
                id="date"
                name="date"
                type="date"
                required
                className={inputClass}
              />
            </Field>

            <Field
              label="Fault description"
              htmlFor="fault"
              className="sm:col-span-2"
            >
              <textarea
                id="fault"
                name="fault"
                required
                rows={4}
                placeholder="What's happening with your device?"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent-button px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-button-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </button>

          <p aria-live="polite" className="mt-3 text-sm">
            {status === "success" && (
              <span className="text-accent-strong">
                Thanks! We&apos;ve got your enquiry and will be in touch shortly.
              </span>
            )}
            {status === "error" && (
              <span className="text-red-400">
                Something went wrong. Please try again or call us directly.
              </span>
            )}
          </p>
        </motion.form>
      </div>
    </section>
  );
}

// text-base keeps inputs at 16px, which also stops iOS zooming on focus.
const inputClass =
  "w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent";

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
