import ManageRequest from "@/components/modules/rentalRequest/ManageRequest";
import { getRequestOwnHouse } from "@/services/Rental-Request";

const page =async () => {
    const {data} = await getRequestOwnHouse()
    return (
        <div>
            <ManageRequest request= {data}/>
        </div>
    );
};

export default page;