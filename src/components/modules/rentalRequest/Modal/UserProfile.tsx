"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { IUser } from "@/types/user";
import { updateUserStatus } from "@/services/admin";

export const UserProfile = ({ user }: { user: IUser }) => {
  const [isBlocked, setIsBlocked] = useState(user.isBlock);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const handleUpdateStatus = async () => {
    const value = { isBlock: isBlocked , role : selectedRole };
    const update = await updateUserStatus(user._id!, value);
    console.log(update);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg max-w-md bg-gradient-to-br from-white via-50% to-blue-50/50">
        <DialogHeader>
          <DialogTitle className="text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Manage User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-blue-100 bg-white shadow-sm">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                {isBlocked ? "Unblock User" : "Block User"}
              </Label>
              <p className="text-xs text-muted-foreground">
                {isBlocked
                  ? "User will regain access to their account"
                  : "User will lose access to their account"}
              </p>
            </div>
            <Switch
              checked={isBlocked}
              onCheckedChange={setIsBlocked}
              className="data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-200"
            />
          </div>

          <div className="p-4 rounded-lg border border-blue-100 bg-white shadow-sm">
            <Label className="text-sm font-medium">User Role</Label>
            <p className="text-xs text-muted-foreground mb-3">
              Select the new role for this user
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between cursor-pointer font-normal"
                >
                  {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onSelect={() => setSelectedRole("tenant")}>
                  Tenant
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedRole("landlord")}>
                  Landlord
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
         
          <Button
            onClick={() => {
              handleUpdateStatus();
            }}
            variant="default"
            className=""
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
