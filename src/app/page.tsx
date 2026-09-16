import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import EstimatePanel from "@/components/EstimatePanel";
import BookingForm from "@/components/BookingForm";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { SelectionProvider } from "@/context/selection-context";

export default function Home() {
  return (
    <SelectionProvider>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ServiceCards />
        <EstimatePanel />
        <BookingForm />
        <Reviews />
      </main>
      <Footer />
    </SelectionProvider>
  );
}
