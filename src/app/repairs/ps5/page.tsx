import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import BeforeAfter from "@/components/BeforeAfter";
import { SelectionProvider } from "@/context/selection-context";
import { JsonLd, faqSchema, serviceSchema } from "@/components/JsonLd";

const PAGE_PATH = "/repairs/ps5";
const PAGE_TITLE = "PS5 Repair — HDMI Port Replacement & Liquid Metal";
const PAGE_DESCRIPTION =
  "Board-level PS5 repair: HDMI port replacement from £70 and liquid metal reapplication for overheating consoles. Free diagnostic, fixed quote before any work.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "article",
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: "/repairs/liquid-metal-after.jpg", width: 1200, height: 1200, alt: "PS5 APU with liquid metal reapplied" }],
  },
};

const symptoms = {
  hdmi: [
    "Console powers on but the TV shows no signal",
    "Picture cuts out when the cable is moved",
    "Bent, loose or visibly damaged HDMI port",
    "Works on one TV but not another",
  ],
  thermal: [
    "Fan runs loud and constant, even in menus",
    "Console shuts down mid-game without warning",
    "Chassis hot to the touch around the vents",
    "Performance drops after 20–30 minutes of play",
  ],
};

const steps = [
  {
    title: "Free diagnostic",
    body: "We open the console, inspect the board under a microscope and confirm the actual fault.",
  },
  {
    title: "Fixed quote",
    body: "You get the price before we start. No work happens until you say yes.",
  },
  {
    title: "Board-level repair",
    body: "Port replacement or liquid metal resurfacing carried out at the bench, not swapped out for a refurb unit.",
  },
  {
    title: "Tested and returned",
    body: "Stress-tested under load to confirm temperatures and video output are stable before it goes back to you.",
  },
];

const faqs = [
  {
    q: "Will I lose my games or save data?",
    a: "No. Storage isn't touched during either repair — your console comes back exactly as you left it.",
  },
  {
    q: "Is liquid metal better than thermal paste?",
    a: "For a PS5, yes. Sony fits liquid metal at the factory because the APU runs hot. Replacing it with regular paste is a downgrade, so we resurface and reapply liquid metal properly.",
  },
  {
    q: "My console was opened by someone else. Can you still help?",
    a: "Usually. Bring it in and we'll assess it — previous attempts don't automatically rule out a repair.",
  },
  {
    q: "How long does it take?",
    a: "HDMI port replacement is typically 24–48 hours. Liquid metal work is usually same week, depending on parts and workload.",
  },
];

export default function Ps5RepairPage() {
  return (
    <SelectionProvider initialId="ps5-hdmi">
      <JsonLd
        schema={serviceSchema({
          name: "PS5 HDMI & Liquid Metal Repair",
          description: PAGE_DESCRIPTION,
          path: PAGE_PATH,
          priceRange: "£70-£90",
        })}
      />
      <JsonLd schema={faqSchema(faqs)} />
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pt-16">
          <div className="absolute inset-0">
            <Image
              src="/repairs/ps5-hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <p className="font-display text-sm font-semibold text-accent-strong">
              PlayStation 5
            </p>
            <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl">
              PS5 HDMI &amp; Liquid Metal Repair
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Board-level work done under a microscope — no signal, damaged
              ports and overheating consoles fixed properly.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#book"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_0_1px_rgba(76,141,255,0.4),0_8px_30px_-8px_rgba(76,141,255,0.6)] transition-transform hover:scale-[1.02] hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Book a Repair
              </a>
              <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
                HDMI port <strong className="text-foreground">£70–90</strong>
              </span>
              <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
                Liquid metal <strong className="text-foreground">From £80</strong>
              </span>
            </div>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Sound familiar?
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold">
                HDMI &amp; no-signal faults
              </h3>
              <p className="mt-2 text-sm text-accent-strong">£70–90, ready in 24–48 hours</p>
              <ul className="mt-5 space-y-2.5 text-muted">
                {symptoms.hdmi.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold">
                Overheating &amp; thermal faults
              </h3>
              <p className="mt-2 text-sm text-accent-strong">From £80, ready the same week</p>
              <ul className="mt-5 space-y-2.5 text-muted">
                {symptoms.thermal.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="mb-8 max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Liquid metal, resurfaced
            </h2>
            <p className="mt-3 text-muted">
              Factory liquid metal dries out and pumps away from the die over
              time. Left alone, the console throttles and shuts down.
            </p>
          </div>
          <BeforeAfter
            before={{
              src: "/repairs/liquid-metal-before.jpg",
              label: "Before",
              caption:
                "Degraded liquid metal pulled away from the APU, leaving the die poorly covered.",
            }}
            after={{
              src: "/repairs/liquid-metal-after.jpg",
              label: "After",
              caption:
                "Cleaned, resurfaced and reapplied evenly across the contact plate.",
            }}
          />
        </section>

        {/* Process */}
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <BookingForm />

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Common questions
          </h2>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <dt className="font-display text-lg font-bold">{faq.q}</dt>
                <dd className="mt-2 text-muted">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <Footer />
    </SelectionProvider>
  );
}
