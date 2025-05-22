/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createHouses = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("HOUSE");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getOwnHouse = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/own`,
      {
        method: "GET",
        headers: {
          Authorization: token,
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





export const deleteHouse = async (houseId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/${houseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("HOUSE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleHouse = async (houseId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/${houseId}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
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

export const updateHouse = async (
  payload: FieldValues,
  houseId: string
): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-house/${houseId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("HOUSE");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
