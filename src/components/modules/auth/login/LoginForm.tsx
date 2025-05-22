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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginschema";
import { loginUser } from "@/services/AuthServices";
import { useUser } from "@/context/UserContext";
const LoginForm = () => {
  const searchParams = useSearchParams();
  const { setIsLoading } = useUser();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);
      if (res.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full border-2 rounded-xl p-5">
      <div className="flex items-center mb-3 gap-2">
        <div>{/* <Logo /> */}</div>

        <div>
          <h1 className="text-lg  font-semibold">Login</h1>
          <small className="text-gray-600">
            Join us today and start your journey
          </small>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full my-3" type="submit">
            {isSubmitting ? "Logging..." : "login"}
          </Button>
          <div className="flex items-center justify-center">
            <small className="text-gray-600">
              Don&apos;t have any account?{" "}
              <Link href={"/register"} className="text-primary">
                Register
              </Link>
            </small>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
