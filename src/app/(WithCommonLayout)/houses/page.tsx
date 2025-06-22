// app/houses/page.tsx
import { FilterSidebar } from "@/components/modules/house/Filter/FilterSidebar";
import { HouseCardSkeleton } from "@/components/modules/house/Home/CardScheleton";
import HouseCardH from "@/components/modules/house/Home/HouseCardH";
import Pagination from "@/components/ui/core/Pagination/Pagination";
import { getAllListingHouse } from "@/services/Home";
import { IHouse } from "@/types/house";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "All Properties - EstatePro",
  description: "User-friendly rental platform connecting tenants and landlords. Browse properties, pay securely via ShurjoPay. Manage listings, payments, and interactions efficiently.",
};
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data: houses, meta } = await getAllListingHouse(
    query.page as string,
    "6",
    query
  );

  return (
    <div className="flex lg:gap-10 my-10 ">
      <div className="">
        <FilterSidebar />
      </div>
      <div>
        <div className="flex-1 grid px-5 lg:grid-cols-3 gap-5 lg:gap-10 md:grid-cols-2 justify-center items-center">
          <Suspense fallback={
            Array(6).fill(0).map((_, idx) => (
              <HouseCardSkeleton key={idx} />
            ))
          }>
            {houses?.map((house: IHouse, idx: string) => (
              <HouseCardH key={idx} house={house} />
            ))}
          </Suspense>
        </div>
        <Pagination page={Number(query.page)} totalPage={meta?.totalPage}/>
      </div>
    </div>
  );
};

export default page;