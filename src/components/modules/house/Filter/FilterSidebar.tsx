"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Slider } from "@/components/ui/slider";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ArrowBigRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DistrictSelect } from "./SearchLocation";

export function FilterSidebar() {
  const [rooms, setRooms] = useState(10);
  const [amountRange, setAmountRange] = useState([0, 10]);
  const [district, setDistrict] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const onClose = () => {
    setIsSidebarOpen(false);
  };

  const onOpen = () => {
    setIsSidebarOpen(true);
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSearchQuery = (query: string, value: string | number) => {
    console.log(value);
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="relative lg:w-64">
      <button
        onClick={onOpen}
        className="lg:hidden fixed top-20 -left-2 z-50 bg-background border px-3 py-1 rounded shadow"
      >
        <ArrowBigRight />
      </button>
      <div
        className={`fixed max-h-[500px] lg:max-h-screen overflow-y-auto  border-r bg-background p-6 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
      >
        <div className="flex mb-6 items-center justify-between">
          <h2 className=" text-lg font-semibold">Filter Properties</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-accent rounded-sm"
          >
            <Cross1Icon className="h-4 w-4" />
          </button>
        </div>
        {/* <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">Location</label>
          <Select
            value={location}
            onValueChange={(value) => {
              setLocation(value);
              handleSearchQuery("location", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="suburbs">Suburbs</SelectItem>
              <SelectItem value="rural">Rural Area</SelectItem>
              <SelectItem value="coastal">Coastal Area</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <DistrictSelect district={district} handleSearchQuery={handleSearchQuery} setDistrict={setDistrict} />

        {/* Amount Filter */}
        <div className="">
          <Slider
            value={amountRange}
            onValueChange={(value: [number, number]) => {
              setAmountRange(value);
              handleSearchQuery("minPrice", value[0]);
            }}
            onValueCommit={(value: [number, number]) => {
              handleSearchQuery("maxPrice", value[1]);
            }}
            min={0}
            max={50000}
            step={100}
            className="my-6 w-full"
          />
          <div className="flex mb-5 items-center gap-4">
            <div className="flex  flex-col gap-2">
              <span className="text-sm text-muted-foreground">Min $</span>
              <Input
                type="number"
                value={amountRange[0]}
                onChange={(e) =>
                  setAmountRange([Number(e.target.value), amountRange[1]])
                }
                className="w-28"
              />
            </div>
            <div className="flex flex-col  gap-2">
              <span className="text-sm text-muted-foreground">Max $</span>
              <Input
                type="number"
                value={amountRange[1]}
                onChange={(e) =>
                  setAmountRange([amountRange[0], Number(e.target.value)])
                }
                className="w-28"
              />
            </div>
          </div>
        </div>

        {/* Rooms Filter - Radio Buttons */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">
            Rooms ({rooms})
          </label>
          <div className="grid grid-cols-2 gap-2">
            {roomOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 rounded border p-2 hover:bg-accent/50 has-[:checked]:bg-accent"
              >
                <input
                  type="radio"
                  name="rooms"
                  value={option}
                  checked={rooms === option}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  onClick={() => handleSearchQuery("rooms", option)}
                  className="h-4 w-4 accent-primary focus:ring-0"
                />
                <span className="text-sm">
                  {option} {option === 1 ? "Room" : "Rooms"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          {searchParams.toString().length > 0 && (
            <Button
              onClick={() => {
                router.push(`${pathname}`, {
                  scroll: false,
                });
              }}
            >
              Clear Filter
            </Button>
          )}
        </div>

        {/* Location Filter */}
      </div>
    </div>
  );
}
