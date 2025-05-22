import HouseCard from "@/components/modules/house/houseCard/HouseCard";
import { getCurrentUser } from "@/services/AuthServices";
import { getAllListingHouse } from "@/services/Home";
import { IHouse } from "@/types/house";

const page = async () => {
  const { data: houses } = await getAllListingHouse();
  const data= await getCurrentUser()
  const path = data?.role === "admin" ? "all-listing-house" : "house-list"
  return (
    <div className="flex flex-wrap gap-10">
      {houses?.map((house: IHouse, idx: string) => (
        <HouseCard key={idx} house={house} path={path} role={data?.role}/>
      ))}
    </div>
  );
};

export default page;
