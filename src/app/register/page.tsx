import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register - EstatePro",
  description: "User-friendly rental platform connecting tenants and landlords. Browse properties, pay securely via ShurjoPay. Manage listings, payments, and interactions efficiently.",
};
const page = () => {
    return (
        <div className="h-screen  flex justify-center items-center">
            <RegisterForm/>
        </div>
    );
};

export default page;