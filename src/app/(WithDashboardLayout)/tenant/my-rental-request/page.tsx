import ManageTenantRequest from "@/components/modules/rentalRequest/ManageTenantRequest";
import { getTenantRequest } from "@/services/Tenant";

const page = async () => {
  const { data } = await getTenantRequest();
  return <div>
    <ManageTenantRequest request={data}/>
  </div>;
};

export default page;
