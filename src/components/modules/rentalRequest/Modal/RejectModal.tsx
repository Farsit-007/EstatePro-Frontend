/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateStatus } from "@/services/Rental-Request";
import {  XCircle } from "lucide-react";
import { toast } from "sonner";
const RejectModal = ({ id }: { id: string }) => {
  const handleStatus = async ( ) => {
      try {
        if (id) {
          const res = await updateStatus(id, { status : "rejected" });
          if (res.success) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        }
      } catch (err: any) {
        console.error(err?.message);
      }
    };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" transition-all hover:bg-primary/90 active:scale-95"
          variant="secondary"
        >
         <XCircle size={30} className="h-10 w-10 text-red-500" />
         Reject
        </Button>
      </DialogTrigger>

      <DialogContent className="border-red-100 bg-gradient-to-br from-white to-red-50 rounded-xl shadow-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-bounce bg-red-100 p-4 rounded-full">
            <XCircle className="h-5 w-5 text-red-500" />
            </div>

            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-red-600">Hold On!</span> 🚨
            </DialogTitle>

            <DialogDescription className="text-center text-gray-600">
              You are about to reject the rental request for
              <span className="mx-1 font-extrabold text-red-600 ">
                Rental House Request
              </span>
              from existence. This digital shredder is{" "}
              <span className="text-red-600">irreversible!</span>
            </DialogDescription>

            <div className="w-full border-t mt-4 pt-4 flex justify-center gap-10">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="hover:bg-gray-100 transition-colors border-gray-300"
                >
                  No
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleStatus}
                className="flex items-center gap-2 hover:bg-red-700 transition-colors transform hover:scale-105"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Confirm Rejection
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RejectModal;
