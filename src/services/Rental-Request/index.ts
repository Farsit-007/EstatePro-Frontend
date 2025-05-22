/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";


export const createRentalReq = async (reqData : FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/request`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body : JSON.stringify(reqData)
    });
    revalidateTag("REQUEST")
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};


export const getRequestOwnHouse = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/request`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["REQUEST"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};


export const getAdminRequest = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/request/admin`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["REQUEST"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};



export const updateStatus = async (
  requestId: string,
  data: { status?: string; landlordPhone?: string }
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/request/${requestId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("REQUEST")
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const getSingleRequest = async (requestId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/request/${requestId}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["REQUEST"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};