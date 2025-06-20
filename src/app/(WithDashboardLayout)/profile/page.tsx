import { getMe } from "@/services/AuthServices";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, ShieldCheck, Ban } from "lucide-react";
import ProfileCard from "@/components/modules/profile/update-profile/ProfileCard";
const page = async () => {
  const { data } = await getMe();
  return (
    <div className="grid lg:grid-cols-6 gap-10 p-6">
      <div className="lg:col-span-2">
        <Card className="w-full relative rounded-3xl border-none shadow-2xl  transition-all duration-300 hover:scale-[1.01]">
          <CardHeader className="flex flex-col items-center text-center space-y-2">
            <Avatar className="w-24 h-24 shadow-md ring-2 ring-gray-500">
              {data?.image && (
                <AvatarImage
                  src={data?.image}
                  alt="User avatar"
                  className="object-cover"
                />
              )}
              <AvatarFallback className="text-2xl font-bold bg-black text-white">
                {data?.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {data?.name}
            </h2>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{data?.email}</span>
            </div>
            <div className="flex gap-2">
              <Badge className="flex items-center gap-1 px-3 py-1 bg-black text-white">
                <ShieldCheck
                  className={`w-4 h-4 ${
                    data?.isBlock ? "text-red-500" : "text-green-500"
                  }`}
                />
                {data?.role.toUpperCase()}
              </Badge>
              {data?.isBlock && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1 px-2"
                >
                  <Ban className="w-4 h-4" />
                  Blocked
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="lg:col-span-4">
        <ProfileCard data={data} />
      </div>
    </div>
  );
};
export default page;
