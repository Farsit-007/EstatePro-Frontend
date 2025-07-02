"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, ArrowRight, Plus, Minus, Star } from "lucide-react";
import Image from "next/image";
import { IHouse } from "@/types/house";
import HouseReqModal from "./HouseReqModal/HouseReqModal";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

const HouseDetails = ({ house }: { house: IHouse }) => {
  const { user } = useUser();
  const [mainImage, setMainImage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
 
  
  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.min(prev + 0.2, 3);
      if (newZoom === 1) setOffset({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.2, 1);
      if (newZoom === 1) setOffset({ x: 0, y: 0 });
      return newZoom;
    });
  };
  const handleNoUser = async () => {
    return toast.error("Please Login to make a rental request");
  };

  return (
     <div className="container mx-auto flex items-center justify-center my-20 py-8">
      <div className="grid grid-cols-1 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 rounded-3xl p-8 lg:grid-cols-2 gap-12 mb-12 shadow-2xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 border-4 border-white">
        <div className="space-y-6 relative">
          <div 
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group border-4 border-white"
           
          >
            {/* Floating Badges */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-md transition-transform duration-200 hover:scale-105">
                <Star className="h-4 w-4 text-amber-300 fill-amber-300" />
                <span className="bg-gradient-to-r from-amber-400 to-amber-400 bg-clip-text text-transparent">
                  4.98 Rating
                </span>
              </div>
              <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-md transition-transform duration-200 hover:scale-105">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Superhost
                </span>
              </div>
            </div>

            {/* Main Image Container */}
            <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing">
              <Image
                src={`${house?.imageUrl[mainImage]}`}
                alt={house?.name}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel}) translate(${offset.x}px, ${offset.y}px)`,
                  transformOrigin: "center center",
                }}
                width={800}
                height={400}
              />
            </div>

            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-gray-500 to-gray-500 px-4 py-1 rounded-full text-sm font-medium text-white shadow-md">
              {mainImage + 1}/{house?.imageUrl?.length}
            </div>

            {house?.imageUrl?.length > 1 && (
              <>
                <button
                  onClick={() => {
                    setMainImage(
                      (prev) =>
                        (prev - 1 + house?.imageUrl?.length) %
                        house?.imageUrl?.length
                    );
                    setOffset({ x: 0, y: 0 });
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-white"
                >
                  <ArrowLeft className="h-6 w-6 text-gray-800 transition-transform hover:-translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    setMainImage(
                      (prev) => (prev + 1) % house?.imageUrl?.length
                    );
                    setOffset({ x: 0, y: 0 });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-white"
                >
                  <ArrowRight className="h-6 w-6 text-gray-800 transition-transform hover:translate-x-1" />
                </button>
              </>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="h-12 w-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-105 disabled:opacity-50"
                disabled={zoomLevel >= 3}
              >
                <Plus className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={handleZoomOut}
                className="h-12 w-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-105 disabled:opacity-50"
                disabled={zoomLevel <= 1}
              >
                <Minus className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {house?.imageUrl?.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setMainImage(index);
                  setZoomLevel(1);
                  setOffset({ x: 0, y: 0 });
                }}
                className={`relative w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                  mainImage === index
                    ? " scale-105"
                    : " hover:scale-105"
                }`}
              >
                <Image
                  src={`${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
                {mainImage === index && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Rental Button */}
          <div className="flex flex-col items-end mt-36 justify-end">
            {user && user!.role === "tenant" ? (
            <HouseReqModal id={house._id!} />
          ) : !user ? (
            <div className="mt-6 transition-transform duration-300 hover:scale-[1.02]">
              <Button
                onClick={handleNoUser}
                className="w-full py-7 text-xl bg-black text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                Request Rental
              </Button>
            </div>
          ) : null}
        </div>
          </div>

        <div className="space-y-8 relative">
        
          <h1 className="text-5xl font-bold bg-black bg-clip-text text-transparent">
            {house?.name}
          </h1>
          
          <div className="flex items-center gap-3 text-xl text-gray-900">
            <MapPin className="h-6 w-6 text-gray-900" />
            <span className="font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              {house?.location}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5">
            <div className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="text-3xl font-bold bg-black bg-clip-text text-transparent">
                ৳{house?.amount}
              </div>
              <span className="text-gray-600 font-medium">Monthly Rent</span>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="text-3xl font-bold bg-black bg-clip-text text-transparent">
                {house?.rooms}
              </div>
              <span className="text-gray-600 font-medium">Rooms</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-700 leading-relaxed text-lg bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md transition-opacity duration-300 hover:opacity-90">
            {house?.description}
          </div>

          {/* Amenities */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
          Amenities
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {house?.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-gray-500" />
                  </div>
                  <span className="font-medium text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
