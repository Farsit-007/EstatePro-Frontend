"use client";
import { Button } from "@/components/ui/button";
import UpdateProfile from "./UpdateProfile";
import { Edit, X } from "lucide-react";
import { useState } from "react";
const ProfileCard = ({
  data,
}: {
  data: {
    name: string;
    phone: string;
    city: string;
    image : string
    address: string;
    email: string;
  };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <div className="  shadow-xl rounded-2xl p-4">
        <div className="flex items-center border-b-2 border-dashed pb-2 justify-between ">
          <h1 className="text-lg font-semibold">My Profile</h1>
          <Button
          className="cursor-pointer"
            onClick={() => setIsEditing((prev) => !prev)}
            variant={ "default"}
          >
            {isEditing ? (
              <X className="w-4 h-4" />
            ) : (
              <Edit className="w-4 h-4" />
            )}
          </Button>
        </div>
        {isEditing ? (
          <div className="py-4">
            <UpdateProfile data={data} />
          </div>
        ) : (
          <div>
            <div className="grid lg:grid-cols-2 py-4">
              <div className="space-y-3">
                <small>Full Name </small>
                <h1> {data.name}</h1>
              </div>
              <div className="space-y-3">
                <small>Phone </small>
                <h1> {data.phone}</h1>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 py-4  ">
              <div className="space-y-3">
                <small>City </small>
                <h1> {data.city}</h1>
              </div>
              <div className="space-y-3">
                <small>Address</small>
                <h1> {data.address}</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
