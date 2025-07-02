/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPayment } from "@/services/Payment";
import { getSingleRequest } from "@/services/Rental-Request";
import { TRequest } from "@/types/request";
import {
  CheckCircle2,
  Home,
  User,
  CalendarDays,
  Clock,
  FileText,
  ClipboardList,
} from "lucide-react";
import { useEffect, useState } from "react";

const PaymentModal = ({ id }: { id: string }) => {
  const [data, setData] = useState<TRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const { data: request } = await getSingleRequest(id);
      setData(request);
    } catch (error) {
      console.error("Error fetching request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const value = {
      email: data?.tenantId.email,
      name: data?.tenantId.name,
      requestId: id,
      houseId: data?.houseId._id,
      houseName: data?.houseId.name,
      totalPrice: data?.houseId.amount,
    };
    try {
      const res = await createPayment(value);
      if (res.success) {
        window.location.href = res.data
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="transition-all hover:bg-primary/90 active:scale-95 group cursor-pointer"
          variant="secondary"
        >
          Make Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg mx-auto overflow-y-auto h-[600px] md:h-auto w-[90%] md:max-w-2xl lg:min-w-4xl xl:min-w-6xl">
        <DialogHeader>
          <div className="flex flex-col items-center text-center mb-4">
            <div className="mb-3">
              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                  data?.status === "approved"
                    ? "bg-green-100"
                    : data?.status === "rejected"
                    ? "bg-red-100"
                    : "bg-yellow-100"
                }`}
              >
                <CheckCircle2
                  className={`h-6 w-6 ${
                    data?.status === "approved"
                      ? "text-green-600"
                      : data?.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              House Rental Checkout
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Home className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">House Information</h3>
              </div>
              <div className="space-y-2">
                <DetailItem label="Property Name" value={data?.houseId.name} />
                <DetailItem label="Location" value={data?.houseId.location} />
                <DetailItem
                  label="Rent Amount"
                  value={`$${data?.houseId.amount}/month`}
                />
                <DetailItem label="Rooms" value={data?.houseId.rooms} />
              </div>
            </div>

            {/* Tenant Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Tenant Details</h3>
              </div>
              <div className="space-y-2">
                <DetailItem label="Name" value={data?.tenantId.name} />
                <DetailItem label="Email" value={data?.tenantId.email} />
                <DetailItem label="Phone" value={data?.tenantId.phone} />
                <DetailItem
                  label="Address"
                  value={`${data?.tenantId.city}, ${data?.tenantId.address}`}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Request Information */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Request Details</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Move-in Date:</span>
                  <span>
                    {new Date(data?.moveInDate || "").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Rental Duration:</span>
                  <span className="bg-blue-100 px-2 py-1 rounded-md">
                    {data?.rentalDuration}
                  </span>
                </div>

                {/* Highlighted Requirements Section */}
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold text-amber-800">
                      Special Requirements
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {data?.requirement || "No specific requirements provided"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => handleSubmit()} className="w-full my-2">
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex justify-between items-center border-b pb-2 last:border-b-0">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value || "-"}</span>
  </div>
);

export default PaymentModal;
