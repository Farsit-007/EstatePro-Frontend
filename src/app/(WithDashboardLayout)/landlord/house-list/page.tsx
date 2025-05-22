import HouseCard from "@/components/modules/house/houseCard/HouseCard";
import { getOwnHouse } from "@/services/Landlord/Houses";
import { IHouse } from "@/types/house";

const page = async () => {
  const { data: houses } = await getOwnHouse();
  return (
    <div className="flex flex-wrap gap-10">
       {
        houses?.map((house : IHouse,idx : string)=><HouseCard key={idx} role={'landlord'} path="house-list" house={house}/>)
       }
    </div>
  );
};

export default page;
