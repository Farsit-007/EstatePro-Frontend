import HouseDetails from "@/components/modules/house/Home/HouseDetails";
import { getSingleHouseDetails } from "@/services/Home";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await getSingleHouseDetails(id);
  return {
    title: `${data?.name || "House"} - EstatePro`,
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
