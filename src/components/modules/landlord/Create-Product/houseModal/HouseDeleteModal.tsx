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
import { deleteHouse } from "@/services/Landlord/Houses";
import { Delete } from "lucide-react";
import { toast } from "sonner";
const HouseDeleteModal = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    try {
      const res = await deleteHouse(id);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.errorSources[0]);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" transition-all hover:bg-primary/90 active:scale-95"
          variant="secondary"
        >
          <Delete/>
        </Button>
      </DialogTrigger>

      <DialogContent className="border-red-100 bg-gradient-to-br from-white to-red-50 rounded-xl shadow-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-bounce bg-red-100 p-4 rounded-full">
              <svg
                className="w-12 h-12 text-red-600 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-red-600">Hold On!</span> 🚨
            </DialogTitle>

            <DialogDescription className="text-center text-gray-600">
              You&rsquo;re about to permanently erase your
              <span className="mx-1 font-extrabold text-red-600 ">
                Rental House
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
                onClick={handleDelete}
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
                Confirm
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HouseDeleteModal;
