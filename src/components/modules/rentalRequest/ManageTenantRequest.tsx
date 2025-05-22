
"use client";
import { NMTable } from "@/components/ui/core/NMTable/NMTable";
import { TRequest } from "@/types/request";
import { ColumnDef } from "@tanstack/react-table";
import RequestDetailsModal from "./Modal/RequestDetailsModal";
import { Button } from "@/components/ui/button";
import PaymentModal from "./Modal/PaymentModal";
type TRequestProps = {
  request: TRequest[];
};

const ManageTenantRequest = ({ request }: TRequestProps) => {
  const columns: ColumnDef<TRequest>[] = [
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
      accessorKey: "status",
      header: () => <div className="text-center">Request Status</div>,
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="text-center">
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5  ${
                status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span className="ml-1 font-medium  capitalize">
                {status === "pending"
                  ? "Pending ⏳"
                  : status === "approved"
                  ? "Approved ✅"
                  : status === "rejected"
                  ? "Rejected ❌"
                  : status}
              </span>
            </div>
          </div>
        );
      },
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
      header: () => <div className="text-center">Payment</div>,
      cell: ({ row }) => (
        <div>
          {row.original.status === "pending" ? (
            <div className="flex justify-center items-center gap-10">
              <Button
                size="sm"
                disabled={row.original.status === "pending"}
                title="Please wait for the Landlord Response"
              >
                Pay
              </Button>
            </div>
          ) : (
            <span
              className={
                row.original.status === "approved"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {row.original.paymentStatus !== "Paid" &&
              row.original.paymentStatus !== "Pending" &&
              row.original.paymentStatus !== "Failed" ? (
             
                <PaymentModal id={row.original._id!}/>
              ) : (
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5  ${
                    row.original.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : row.original.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <span className="ml-1 font-medium  capitalize">
                    {row.original.paymentStatus === "Pending"
                      ? "Pending "
                      : row.original.paymentStatus === "Paid"
                      ? "Paid "
                      : row.original.paymentStatus === "Failed"
                      ? "Failed "
                      : row.original.paymentStatus}
                  </span>
                </div>
              )}
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

export default ManageTenantRequest;
