/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { approvalSchema } from "./approvalSchema";
import { updateStatus } from "@/services/Rental-Request";

const RequestConfirmedModal = ({ id }: { id: string }) => {
  const form = useForm({
    resolver: zodResolver(approvalSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedData = {
      ...data,
      status: "approved",
    };
    try {
      if (id) {
        const res = await updateStatus(id, updatedData);
        console.log(res);
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
          className="transition-all hover:bg-primary/90 active:scale-95 group"
          variant="secondary"
        >
          <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 group-hover:text-green-700" />
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center mb-4">
            <div className="mb-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-2xl">Confirm Approval</DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="landlordPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landlord Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+880-*******"
                        {...field}
                        value={field.value || ""}
                        className="py-5 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-start p-4 border border-amber-100 bg-amber-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">
                    Are you sure you want to approve this request?
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    This action will notify the tenant and cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="w-full py-5 text-base font-semibold transition-all hover:shadow-lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Confirm Approval
                </span>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestConfirmedModal;
