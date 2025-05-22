import HouseDetails from "@/components/modules/house/Home/HouseDetails";
import { getSingleHouseDetails } from "@/services/Home";

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
