import FooterSection from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/AuthServices";

const CommonLayout = async({ children }: { children: React.ReactNode }) => {
  const {data} = await getMe();
  return (
    <div>
      <div className="h-[100px]">
        <Navbar user={data}/>
      </div>
      
      <main className="min-h-[calc(100vh-200px)] container mx-auto"> {children}</main>
      <FooterSection />
      
    </div>
  );
};

export default CommonLayout;
