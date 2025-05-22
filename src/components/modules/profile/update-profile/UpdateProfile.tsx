"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { updateProfile } from "@/services/AuthServices";
import ProfileImageUploader from "@/components/ui/core/ProfileImageUploader/ProfileImageUploader";
import ChangePassword from "../../auth/passwordChange/ChangePassword";
import { useState } from "react";
import { uploadFile } from "@/lib/uploadImage";
const UpdateProfile = ({
  data: userData,
}: {
  data: {
    name: string;
    phone: string;
    city: string;
    image: string;
    address: string;
    email: string;
  };
}) => {
  const { setIsLoading } = useUser();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm({
    defaultValues: {
      name: userData?.name || "",
      phone: userData?.phone || "",
      city: userData?.city || "",
      address: userData?.address || "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl;
    if (selectedImage) {
      imageUrl = await uploadFile(selectedImage);
    }
    const formData = {
      ...data,
      image: imageUrl,
    };
    try {
      const res = await updateProfile(formData);
      setIsLoading(true);
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className=" w-full ">
      <div className="flex items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg font-semibold">Update Your Profile</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username..."
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Contact number..."
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your city..."
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your address..."
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center ">
            {" "}
            <ProfileImageUploader
              initialImage={userData.image}
              onImageChange={(file) => setSelectedImage(file)}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              {" "}
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
      <ChangePassword />
    </div>
  );
};

export default UpdateProfile;
