import HouseEditModal from "@/components/modules/landlord/Create-Product/houseModal/HouseEditModal";
import { getSingleHouse } from "@/services/Landlord/Houses";


const page = async ({params}: {params : Promise<{id : string}>}) => {
    const {id} = await params
    const {data : house} = await getSingleHouse(id)
  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <HouseEditModal house={house}/>
    </div>
  );
};

export default page;
