/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordChangeSchema } from "./resetpasswordChangeSchema";
import { changeResetPassword } from "@/services/AuthServices";

const ChangeResetPassword = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("id");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(passwordChangeSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const newPassword = form.watch("newPassword");
  const confirmPassword = form.watch("confirmPassword");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const password = {password : data.newPassword}
    try {
      const res = await changeResetPassword(password,email as string, token as string);
     
      if (res.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-md w-full border-2 rounded-xl p-5 ">
      <div className="flex items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg  font-semibold">Change Your Password</h1>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                {confirmPassword && newPassword !== confirmPassword ? (
                  <FormMessage>Password dose not matched</FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              disabled={newPassword !== confirmPassword}
              className="cursor-pointer"
              type="submit"
            >
              {isSubmitting ? "Savings..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangeResetPassword;
