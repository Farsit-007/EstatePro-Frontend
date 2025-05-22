import ManageTenantRequest from "@/components/modules/rentalRequest/ManageTenantRequest";
import { getTenantRequest } from "@/services/Tenant";

const page = async () => {
  const { data } = await getTenantRequest();
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium">My Request</h1>
      </div>
      <ManageTenantRequest request={data} />
    </div>
  );
};

export default page;
