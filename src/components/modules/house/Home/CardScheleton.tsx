// components/HouseCardSkeleton.tsx
import { Card, CardContent,  CardTitle } from "@/components/ui/card";
import React from "react";

export const HouseCardSkeleton = () => {
  return (
    <Card className="group w-[350px] py-0 transition-all duration-300">
      <CardContent className="p-0 overflow-hidden">
        <div className="space-y-4 animate-pulse">
          {/* Image Skeleton */}
          <div className="relative w-full rounded-lg h-60 overflow-hidden bg-gray-200">
            <div className="absolute top-5 left-5">
              <div className="h-6 w-24 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-4">
            <CardTitle>
              <div className="h-6 bg-gray-200 rounded w-3/4" />
            </CardTitle>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
            
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};