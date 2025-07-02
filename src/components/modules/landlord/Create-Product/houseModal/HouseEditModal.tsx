/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/ImagePreviewer/ImagePreviewer";
import NMImageUploader from "@/components/ui/core/NMImageUploader/NMImageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/lib/uploadImage";
import { updateHouse } from "@/services/Landlord/Houses";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { IHouse } from "@/types/house";
import { DistrictSelect } from "@/components/modules/house/Filter/SearchLocation";

const HouseEditModal = ({ house }: { house: IHouse }) => {
  const { user } = useUser();
  const [district, setDistrict] = useState("");
  const path = user!.role === "admin" ? "all-listing-house" : "house-list";
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    house?.imageUrl || []
  );
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: house?.name || "",
      location: house?.location || "",
      description: house?.description || "",
      amount: house?.amount || "",
      rooms: house?.rooms || "",
      amenities: house?.amenities?.join(", ") || "",
    },
  });
  useEffect(() => {
    if (house) {
      form.reset({
        name: house.name,
        location: house.location,
        description: house.description,
        amount: String(house.amount),
        rooms: String(house.rooms),
        amenities: house.amenities.join(", "),
        
      });
      setDistrict(house.district)
      setImagePreview(house.imageUrl);
    }
  }, [house]);

  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const amenities = data?.amenities
      ?.split(",")
      .map((service: string) => service.trim())
      .filter((service: string) => service !== "");

    const existingImages = imagePreview.filter((url) => url.startsWith("http"));
    const newImages = await Promise.all(
      imageFiles.map((file) => uploadFile(file))
    );
    const allImages = [...existingImages, ...newImages];

    const modifiedData = {
      ...data,
      amenities,
      amount: Number(data.amount),
      imageUrl: allImages,
      district
    };
    try {
      const res = await updateHouse(modifiedData, house._id!);
      if (res?.success) {
        toast.success(res?.message);
        router.push(`/${user?.role}/${path}`);
        setImagePreview([]);
        setImageFiles([]);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
      <div className="flex items-center space-x-4 mb-5">
        <div>
          <h1 className="text-xl font-semibold">Update Rental House</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>House Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rooms</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DistrictSelect district={district} setDistrict={setDistrict} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
            <div className="col-span-4 md:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4 md:col-span-2">
              <FormField
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amenities</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <div className="flex justify-between items-center py-3 ">
                <p className="text-primary font-bold text-xl">Images</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 ">
                {imageFiles.length < 10 && (
                  <NMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Image"
                  />
                )}
                <ImagePreviewer
                  className="grid grid-cols-12  gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>
            </div>
          </div>
          <Button className="w-full my-5 cursor-pointer" type="submit">
            {isSubmitting ? "Updating Shop..." : "Update Shop"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default HouseEditModal;
