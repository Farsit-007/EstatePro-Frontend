
"use client";
import { NMTable } from "@/components/ui/core/NMTable/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/types/user";
import { UserProfile } from "../rentalRequest/Modal/UserProfile";

type TUserProps = {
  users: IUser[];
};

const Usermanagement = ({ users }: TUserProps) => {
  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "Name",
      header: () => <div className="text-center">User Name</div>,
      cell: ({ row }) => (
        <div className="">
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "user-email",
      header: () => <div className="text-center">User Email</div>,
      cell: ({ row }) => (
        <div className="">
          <span className="truncate">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "city",
      header: () => <div className="text-center">Location</div>,
      cell: ({ row }) => (
        <div className="">
          <span className="truncate">
            {row.original.city}, {row.original.address}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-center">Role</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
              row.original.role === "tenant"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {row.original.role === "tenant" ? "Tenant" : "Landlord"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
              row.original.isBlock
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {row.original.isBlock ? "Blocked" : "Active"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <UserProfile user={row.original}/>
        </div>
      ),
    },
  ];
 
  return (
    <div className="overflow-x-auto">
      <NMTable data={users} columns={columns} />
    </div>
  );
};

export default Usermanagement;