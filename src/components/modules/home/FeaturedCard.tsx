import { getFeaturedListingHouse } from "@/services/Home";
import { Suspense } from "react";
import { HouseCardSkeleton } from "../house/Home/CardScheleton";
import HouseCardH from "../house/Home/HouseCardH";
import { IHouse } from "@/types/house";

const FeaturedCard = async () => {
  const { data: houses } = await getFeaturedListingHouse();

  return (
    <div className="my-20">
      <div className="px-3">
        <h1 className="font-medium text-3xl pb-8">Features Listings</h1>
      </div>
      <div className="flex-1 grid px-5 lg:grid-cols-4 gap-5 lg:gap-10 md:grid-cols-2 justify-center items-center">
        <Suspense
          fallback={Array(6)
            .fill(0)
            .map((_, idx) => (
              <HouseCardSkeleton key={idx} />
            ))}
        >
          {houses?.map((house: IHouse, idx: string) => (
            <HouseCardH key={idx} house={house} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default FeaturedCard;
