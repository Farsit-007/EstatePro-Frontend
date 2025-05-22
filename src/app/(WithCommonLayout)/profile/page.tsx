import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, ShieldCheck, Ban } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/AuthServices";

const UserProfileCard = async () => {
  const { data } = await getMe();
  return (
    <div className="flex justify-center items-center pt-20 p-6">
      <Card className="w-full max-w-md relative rounded-3xl border-none shadow-2xl  transition-all duration-300 hover:scale-[1.01]">
        <CardHeader className="flex flex-col items-center text-center space-y-2">
          <Avatar className="w-20 h-20 shadow-md ring-2 ring-indigo-500">
            <AvatarFallback className="text-2xl font-bold bg-indigo-500 text-white">
              {data?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.name}
          </h2>
          <div className="flex gap-2">
            <Badge className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <ShieldCheck
                className={`w-4 h-4 ${
                  data.isBlock ? "text-red-500" : "text-green-500"
                }`}
              />
              {data.role.toUpperCase()}
            </Badge>
            {data.isBlock && (
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

        <CardContent className="grid gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-500" />
            <span>{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-indigo-500" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span>
              {data.city}, {data.address}
            </span>
          </div>
          <div className="flex justify-evenly p-4">
            <div>
              <Link href={`/edit-profile`}>
                <Button size="sm" className="cursor-pointer">
                  Edit Profile
                </Button>
              </Link>
            </div>
            <div>
              <Link href={`/change-password`}>
                <Button size="sm" className="cursor-pointer">
                  Change Password
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default UserProfileCard;
