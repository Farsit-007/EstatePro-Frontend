import { FAQ } from "@/components/modules/home/Faq";
import FeaturedCard from "@/components/modules/home/FeaturedCard";
import ReviewMarquee from "@/components/modules/home/Marque";
import SearchField from "@/components/modules/home/SearchField";
import InteractiveCarousel from "@/components/modules/home/slider";
import { WhyChooseUs } from "@/components/modules/home/WhtChoose";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home - EstatePro",
  description: "User-friendly rental platform connecting tenants and landlords. Browse properties, pay securely via ShurjoPay. Manage listings, payments, and interactions efficiently.",
};
export default function Home() {
  return (
    <div>
      {/* <MaintenanceModal/> */}
      <InteractiveCarousel />
      <SearchField />
      <FeaturedCard />
      <WhyChooseUs />
      <ReviewMarquee />

      <FAQ />
    </div>
  );
}
