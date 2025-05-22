/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
export const getAllListingHouse = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams()
  if(query?.minPrice){
    params.append('minPrice',query?.minPrice as string)
  }
  if(query?.maxPrice){
    params.append('maxPrice',query?.maxPrice as string)
  }
   if(query?.rooms){
    params.append('rooms',query?.rooms as string)
  }
   if(query?.location){
    params.append('district',query?.location as string)
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house?limit=${limit}&page=${page}&${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["HOUSE"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSearchedAllListingHouse = async (query: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.append("searchTerm", query?.searchTerm.toString());
  }
  console.log(
    `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/search?${params}`
  );
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/search?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["HOUSE"],
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleHouseDetails = async (houseId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/${houseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["HOUSE"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};




export const getFeaturedListingHouse = async () => {
 
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/feature`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["HOUSE"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};