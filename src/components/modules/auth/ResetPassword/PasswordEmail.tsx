/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendResetEmail } from "@/services/AuthServices";
import { resetPasswordChangeSchema } from "./resetPassword";
import { useRouter } from "next/navigation";

const PasswordEmail = () => {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false); 

  const form = useForm({
    resolver: zodResolver(resetPasswordChangeSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await sendResetEmail(data);
   
      if (res.success) {
        toast.success(res?.message);
        setEmailSent(true);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md w-full border-2 rounded-xl p-5">
      {!emailSent ? (
        <>
          <div className="mb-4">
            <h1 className="text-xl font-semibold">Reset Your Password</h1>
            <p className="text-gray-600 text-sm">
              Enter your email address and we&rsquo;ll send you a link to reset your password.
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full mb-3" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending Email..." : "Send Reset Link"}
              </Button>

              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <div className="text-center space-y-4">
          <h1 className="text-xl font-semibold">Check Your Email</h1>
          <p className="text-gray-600">
            We&rsquo;ve sent a password reset link to your email. Please check your inbox and follow the instructions.
          </p>
          <Button onClick={() => router.push("/login")} className="w-full">
            Back to Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default PasswordEmail;
