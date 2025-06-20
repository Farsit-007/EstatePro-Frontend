"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { verifyPayment } from "@/services/Payment";
import { TPayment } from "@/types/payment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  User, 
  CreditCard, 
  MapPin, 
  Receipt, 
  Car 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const VerifyPayment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [orderData, setOrderData] = useState<TPayment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!orderId) return;
  
      try {
        setIsLoading(true); // Start loading
  
        const res = await verifyPayment(orderId);
        const data = res?.data?.[0];
        setOrderData(data);
  
        if (data?.bank_status === "Paid") {
          toast.success("Paid Successfully");
        } else if (data?.bank_status === "Pending") {
          toast.warning("Payment is Pending");
        } else if (data?.bank_status === "Failed") {
          toast.error("Payment Failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Something went wrong verifying your order.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPaymentData();
  }, [orderId]);

  const handlePush = () => {
    router.push("/tenant/my-rental-request");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-gray-600" />
          <p className="text-lg font-medium text-gray-600">Verifying Payment...</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const baseStyle = "py-1 px-3 rounded-full flex items-center gap-2 text-sm";
    switch (status) {
      case "Success":
        return (
          <Badge className={`${baseStyle} bg-emerald-100 hover:bg-emerald-100 text-emerald-700`}>
            <CheckCircle2 className="h-4 w-4" />
            Payment Successful
          </Badge>
        );
      case "Pending":
        return (
          <Badge className={`${baseStyle} bg-amber-100 hover:bg-amber-100 text-amber-700`}>
            <Clock className="h-4 w-4" />
            Payment Pending
          </Badge>
        );
      case "Failed":
        return (
          <Badge className={`${baseStyle} bg-rose-100 hover:bg-rose-100 text-rose-700`}>
            <XCircle className="h-4 w-4" />
            Payment Failed
          </Badge>
        );
      default:
        return <Badge className={baseStyle}>Unknown Status</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-50 p-4 ">
      <Card className="mx-auto max-w-4xl overflow-hidden shadow-xl transition-all hover:shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 p-6">
          <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            <div className="flex items-center space-x-4">
              <Car className="h-10 w-10 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">EstatePro</h1>
                <p className="text-gray-100">Trusted Rental Solutions</p>
              </div>
            </div>
            <div className="space-y-1 text-right text-white">
              <div className="flex items-center gap-2 text-sm">
                <Receipt className="h-5 w-5" />
                <span>Invoice #{orderData?.invoice_no || "------"}</span>
              </div>
              <p className="text-xs font-light">{orderData?.date_time || "Loading..."}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Customer Details Card */}
            <Card className="bg-gray-50">
              <CardHeader className="flex items-center space-x-2 pb-2">
                <User className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-semibold">Customer Information</h2>
              </CardHeader>
              <Separator className="mb-2" />
              <CardContent className="space-y-3">
                <DetailItem icon={<User className="h-4 w-4" />} label="Name" value={orderData?.name} />
                <DetailItem icon={<CreditCard className="h-4 w-4" />} label="Email" value={orderData?.email} />
                <DetailItem icon={<MapPin className="h-4 w-4" />} label="Phone" value={orderData?.phone_no} />
                <div className="rounded-lg bg-white p-3 text-sm">
                  <MapPin className="mr-2 inline h-4 w-4 text-gray-500" />
                  {orderData?.address}, {orderData?.city}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader className="flex items-center space-x-2 pb-2">
                <CreditCard className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-semibold">Payment Details</h2>
              </CardHeader>
              <Separator className="mb-2" />
              <CardContent className="space-y-3">
                <DetailItem label="Order ID" value={orderData?.order_id} />
                <DetailItem label="Method" value={orderData?.method} />
                <DetailItem label="Transaction ID" value={orderData?.bank_trx_id} />
                <div className="space-y-2 rounded-lg bg-white p-3">
                  <div className="flex justify-between font-medium">
                    <span>Amount Paid:</span>
                    <span className="text-gray-600">{orderData?.amount} BDT</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Payable Amount:</span>
                    <span className="text-gray-600">{orderData?.payable_amount} BDT</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {orderData?.bank_status && (
            <Card className="mt-4 border-2 border-dashed border-gray-200 bg-gradient-to-r from-gray-50 to-indigo-50">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4">{getStatusBadge(orderData.bank_status)}</div>
                <p className="max-w-md text-sm text-gray-600">
                  {orderData.bank_status === "Success" 
                    ? "Your payment has been successfully processed."
                    : orderData.bank_status === "Pending"
                    ? "We're processing your payment. This might take a few minutes. Please refresh the page to check updates."
                    : "Payment processing failed. Please check your payment method or try again later."}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>

        <CardFooter className="bg-gray-50 p-8">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-600">
              Need assistance? Contact our support team at support@estatepro.com
            </p>
            <Button 
              onClick={handlePush}
              className="gap-2 rounded-full bg-gray-600 px-8 py-6 text-lg hover:bg-gray-700"
            >
              <CreditCard className="h-5 w-5" />
              View Rental Request
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const DetailItem = ({ 
  icon, 
  label, 
  value 
}: { 
  icon?: React.ReactNode; 
  label: string; 
  value?: string | number;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-medium text-gray-800">{value || "-"}</span>
  </div>
);

export default VerifyPayment;