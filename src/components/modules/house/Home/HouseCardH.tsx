import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BedDouble, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { IHouse } from "@/types/house";

const HouseCardH = ({ house }: { house: IHouse }) => {
  return (
    <Card className="group relative w-[350px] overflow-hidden rounded-2xl border-0 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[0.5deg]">
      <div  className="w-full">
        <CardContent className="p-0 overflow-hidden">
          {/* Image Container with Floating Effect */}
          <div className="relative h-52 w-full overflow-hidden">
            {house.imageUrl?.length > 0 ? (
              <>
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                <Image
                  src={house.imageUrl[0]}
                  alt={house.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                />
                
                {/* Floating Price Bubble */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg 
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    ৳{house.amount}
                    <span className="text-sm font-medium text-gray-600">/month</span>
                  </span>
                </div>

                {/* Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500 -skew-x-12" />
              </>
            ) : (
              <div className="h-60 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}
          </div>

          {/* Content Container with Parallax Effect */}
          <div className="px-6  pt-4 space-y-4 transform transition-transform duration-500 group-hover:-translate-y-2">
            {/* Location with Animated Pin */}
            <div className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <MapPin className="h-5 w-5 text-primary animate-bounce cursor-pointer" />
              <span className="font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                {house.district}
              </span>
            </div>

            {/* Title with Gradient Text */}
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent 
              hover:from-blue-600 hover:to-primary transition-all duration-500">
              {house.name}
            </CardTitle>

            {/* Description with Fade Effect */}
            <p className="text-gray-600 line-clamp-2 leading-relaxed relative 
              before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-gradient-to-t before:from-white before:via-white/80 before:to-transparent">
              {house.description}
            </p>

            {/* Animated Divider */}
            <div className="relative h-px bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 w-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </div>

            {/* Feature Badge with Hover Effect */}
            <div className="flex justify-center">
              <div className="bg-gray-100 hover:bg-primary/10 rounded-full px-4 py-2 transition-all duration-300 
                group-hover:scale-105 group-hover:shadow-sm">
                <div className="flex items-center space-x-2">
                  <BedDouble className="h-6 w-6 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-primary">
                    {house.rooms} Dreamy Beds
                  </span>
                  <Sparkles className="h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Magic Hover Button */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
              <Link href={`/houses/${house._id}`} className="bg-primary text-white px-8 py-3 rounded-full shadow-xl hover:shadow-2xl 
                transform transition-all duration-300 hover:scale-105 hover:bg-primary/90 
                border-2 border-white/30 hover:border-white/50 relative overflow-hidden">
                <span className="relative z-10">Explore Paradise</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full 
                  group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default HouseCardH;