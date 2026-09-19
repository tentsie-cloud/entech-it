import { absoluteUrl, site } from "@/lib/site";
import { coverageAreas } from "@/data/coverage-areas";

export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function localBusinessSchema(rating: { value: number; count: number } | null) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.telephone,
    email: site.email,
    image: absoluteUrl("/og.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: coverageAreas.map((area) => ({
      "@type": "Place",
      name: area.name,
    })),
    // Real reviews only. Schema.org structured data with a fabricated
    // review count violates Google's guidelines and risks losing rich
    // results entirely, so this is omitted until Google Reviews is live.
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.value,
        reviewCount: rating.count,
      },
    }),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  priceRange,
}: {
  name: string;
  description: string;
  path: string;
  priceRange: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": absoluteUrl("/#business") },
    areaServed: site.address.locality,
    offers: { "@type": "Offer", priceCurrency: "GBP", priceRange },
  };
}

export function faqSchema(faqs: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
