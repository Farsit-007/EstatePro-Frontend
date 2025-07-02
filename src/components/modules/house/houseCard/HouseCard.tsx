import { Card, CardContent,  CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  DollarSign, Edit2, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { IHouse } from "@/types/house";
import HouseDeleteModal from "../../landlord/Create-Product/houseModal/HouseDeleteModal";

const HouseCard = ({ house, role, path }: { house: IHouse; role?: string; path?: string }) => {
  return (
    <Card className="group relative w-[360px] overflow-hidden rounded-2xl border-0 bg-background shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        {house.imageUrl?.length > 0 ? (
          <>
            <Image
              src={house.imageUrl[0]}
              alt={house.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}

        {/* Floating Price Tag */}
        <div className="absolute right-4 top-4 rounded-full bg-background/90 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 font-bold text-primary">
            <DollarSign className="h-4 w-4" />
            <span>{house.amount}</span>
            <span className="text-sm font-medium text-muted-foreground">/mo</span>
          </div>
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-white drop-shadow-md" />
          <span className="text-lg font-semibold text-white drop-shadow-md">
            {house.district}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="px-6">
        <CardTitle className="mb-4 line-clamp-1 text-2xl font-bold transition-colors group-hover:text-primary">
          {house.name}
        </CardTitle>

        <p className="mb-3 line-clamp-2 min-h-[48px]  text-muted-foreground">
          {house.description}
        </p>
        <div className="border-b-2  mb-2">

        </div>

      </CardContent>

      {/* Action Buttons */}
      <div className="flex gap-2 px-6 pb-6">
        <Link href={`/houses/${house._id}`} className="flex-1">
          <Button
            variant="default"
            className="w-full transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            View Details
          </Button>
        </Link>
        
        {role && path && (
          <div className="flex gap-2">
            <Link href={`/${role}/${path}/${house._id}`}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl cursor-pointer transition-transform hover:scale-105"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </Link>
            <HouseDeleteModal id={house._id as string} />
          </div>
        )}
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 -z-10 transform rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  );
};

export default HouseCard;