import { FAQ } from "@/components/modules/home/Faq";
import FeaturedCard from "@/components/modules/home/FeaturedCard";
import ReviewMarquee from "@/components/modules/home/Marque";
import SearchField from "@/components/modules/home/SearchField";
import InteractiveCarousel from "@/components/modules/home/slider";
import { WhyChooseUs } from "@/components/modules/home/WhtChoose";

export default function Home() {
  return (
    <div>
     <InteractiveCarousel/>{/* Banner */}
     <SearchField />{/* Search */}
     <FeaturedCard/>{/* Featured Product */}
     <ReviewMarquee/>{/* Testimonial */}
     <WhyChooseUs/>
     <FAQ/>
    </div>
  );
}
