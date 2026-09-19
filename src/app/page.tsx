import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import EstimatePanel from "@/components/EstimatePanel";
import CoverageMap from "@/components/CoverageMap";
import BookingForm from "@/components/BookingForm";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { SelectionProvider } from "@/context/selection-context";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function Home() {
  const reviewsData = await getGoogleReviews();
  const rating = reviewsData
    ? { value: reviewsData.rating, count: reviewsData.reviewCount }
    : null;

  return (
    <SelectionProvider>
      <JsonLd schema={localBusinessSchema(rating)} />
      <Nav />
      <main className="flex-1">
        <Hero rating={rating?.value ?? null} reviewCount={rating?.count ?? null} />
        <ServiceCards />
        <EstimatePanel />
        <CoverageMap />
        <BookingForm />
        <Reviews data={reviewsData} />
      </main>
      <Footer />
    </SelectionProvider>
  );
}
