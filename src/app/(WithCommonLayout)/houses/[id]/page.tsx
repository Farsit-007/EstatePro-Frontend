import HouseDetails from "@/components/modules/house/Home/HouseDetails";
import { getSingleHouseDetails } from "@/services/Home";

import type { Metadata } from "next";

type PageParams = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = params;
  const { data } = await getSingleHouseDetails(id);

  return {
    title: `${data?.title || "House"} | EstatePro`,
    description: data?.description || "View house details on EstatePro",
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getSingleHouseDetails(id);
  return (
    <div>
      <HouseDetails house={data} />
    </div>
  );
};

export default page;
