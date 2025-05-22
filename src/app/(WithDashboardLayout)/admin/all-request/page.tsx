import ManageRequest from "@/components/modules/rentalRequest/ManageRequest";
import { getAdminRequest } from "@/services/Rental-Request";

const page = async () => {
  const { data } = await getAdminRequest();
  return (
    <div>
      <ManageRequest request={data} />
    </div>
  );
};

export default page;
