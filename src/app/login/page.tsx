import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login - EstatePro",
  description: "User-friendly rental platform connecting tenants and landlords. Browse properties, pay securely via ShurjoPay. Manage listings, payments, and interactions efficiently.",
};
const page = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <LoginForm/>
        </div>
    );
};

export default page;