# ENTECH IT — Homepage

Premium, dark, mobile-first homepage redesign built with Next.js (App Router), Tailwind CSS v4, TypeScript and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

## Structure

- `src/app/page.tsx` — assembles the homepage sections
- `src/components/` — Hero, ServiceCards, EstimatePanel, BookingForm, Reviews, Nav, Footer
- `src/data/services.ts` — the 6 repair types, pricing and copy shown in the cards and estimate panel
- `src/data/reviews.ts` — testimonial content
- `src/app/api/enquiry/route.ts` — receives the booking form submission and emails it

## Sending enquiries to your inbox

The booking form POSTs to `/api/enquiry`, which sends via [Resend](https://resend.com). Until you set an API key, submissions are accepted and logged to the server console instead of emailed — nothing is lost, but you won't get a real email until this is configured.

Add to `.env.local`:

```
RESEND_API_KEY=your_resend_api_key
ENQUIRY_TO_EMAIL=you@yourdomain.com
ENQUIRY_FROM_EMAIL="ENTECH IT <enquiries@yourdomain.com>"
```

`ENQUIRY_TO_EMAIL` defaults to `tentsie@gmail.com` if unset. `ENQUIRY_FROM_EMAIL` must be a domain verified in Resend before it'll deliver in production.

## Photography

Card and hero images currently point to Unsplash placeholder URLs (`src/data/services.ts`, `src/components/Hero.tsx`) so the layout can be judged with real photography weight. Swap these for your own shots before launch — same aspect ratios (hero: wide/landscape, cards: 4:3).

## Editing prices

All pricing lives in `src/data/services.ts` — update `priceLabel` and `priceNote` there; both the service cards and the instant estimate panel read from the same source, so they can't drift out of sync.
