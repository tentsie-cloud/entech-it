import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { SelectionProvider } from "@/context/selection-context";
import { JsonLd, serviceSchema } from "@/components/JsonLd";
import { services } from "@/data/services";
import ServiceRow from "@/components/ServiceRow";

const PAGE_PATH = "/services";
const PAGE_TITLE = "Repair Services & Pricing";
const PAGE_DESCRIPTION =
  "Gaming PC, PS5, MacBook, laptop and data recovery repairs across Hertfordshire, Essex and North London. Free diagnostic, fixed quote before any work begins.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function ServicesPage() {
  const featured = services.filter((s) => s.image);
  const compact = services.filter((s) => !s.image);

  return (
    <SelectionProvider>
      {services.map((service) => (
        <JsonLd
          key={service.id}
          schema={serviceSchema({
            name: service.name,
            description: service.description,
            path: PAGE_PATH,
            priceRange: service.priceLabel.replace(/–/g, "-"),
          })}
        />
      ))}
      <Nav />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-5 pt-32 pb-12 sm:px-8 sm:pt-40">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Repair services &amp; pricing
          </h1>
          <p className="mt-4 text-lg text-muted">
            Every repair starts with a free diagnostic. You get a fixed quote
            before we start work, and that&apos;s the number you pay when you
            collect it.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
          <h2 className="mb-2 font-display text-lg font-bold text-foreground">
            Featured repairs
          </h2>
          <div className="divide-y divide-border border-t border-border">
            {featured.map((service, i) => (
              <ServiceRow key={service.id} service={service} index={i} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
          <h2 className="mb-2 font-display text-lg font-bold text-foreground">
            More repairs
          </h2>
          <div className="divide-y divide-border border-t border-border">
            {compact.map((service, i) => (
              <ServiceRow key={service.id} service={service} index={i} compact />
            ))}
          </div>
        </section>

        <BookingForm />
      </main>
      <Footer />
    </SelectionProvider>
  );
}
