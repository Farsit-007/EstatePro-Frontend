import ManageRequest from "@/components/modules/rentalRequest/ManageRequest";
import { getRequestOwnHouse } from "@/services/Rental-Request";

const page = async () => {
  const { data } = await getRequestOwnHouse();
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium">Rental Request</h1>
      </div>
      <ManageRequest request={data} />
    </div>
  );
};

export default page;
