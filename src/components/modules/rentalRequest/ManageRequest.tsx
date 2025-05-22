
"use client";
import { NMTable } from "@/components/ui/core/NMTable/NMTable";
import { TRequest } from "@/types/request";
import { ColumnDef } from "@tanstack/react-table";
import RequestDetailModal from "./Modal/RequestConfirmedModal";
import RequestDetailsModal from "./Modal/RequestDetailsModal";
import RejectModal from "./Modal/RejectModal";
type TRequestProps = {
  request: TRequest[];
};

const ManageRequest = ({ request }: TRequestProps) => {
  
  const columns: ColumnDef<TRequest>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-center">Tenant Name</div>,
      cell: ({ row }) => (
        <div className="">
          <span className="truncate">{row.original.tenantId.name}</span>
        </div>
      ),
    },

    {
      accessorKey: "rental-house",
      header: () => <div className="text-center">Rental House</div>,
      cell: ({ row }) => (
        <div className="">
          <span className="truncate">{row.original.houseId.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "rental-house-date",
      header: () => <div className="text-center">Move In Date</div>,
      cell: ({ row }) => (
        <div className="">
          <span className="truncate">
            {new Date(row.original.moveInDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "rental-house-duration",
      header: () => <div className="text-center">Request Details</div>,
      cell: ({ row }) => (
        <div className="">
          <RequestDetailsModal id={row.original._id!} />
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div>
          {row.original.status === "pending" ? (
            <div className="flex justify-center items-center gap-10">
              <RequestDetailModal id={row.original._id!} />
              <RejectModal id={row.original._id!}/>
            </div>
          ) : (
            <span
              className={
                row.original.status === "approved"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {row.original.status === "approved" ? "Approved" : "Rejected"}
            </span>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="overflow-x-auto">
      <NMTable data={request} columns={columns} />
    </div>
  );
};

export default ManageRequest;
