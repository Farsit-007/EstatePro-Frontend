import Usermanagement from "@/components/modules/usermanagement/Usermanagement";
import { allUsers } from "@/services/admin";

const page = async() => {
    const {data} = await allUsers()
    return (
        <div>
            <Usermanagement users={data}/>
        </div>
    );
};

export default page;