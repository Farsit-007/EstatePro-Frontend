/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { TPayment } from "@/types/payment";
export const createPayment = async (payload: {
  email: string | undefined;
  name: string | undefined;
  requestId: string;
  houseId: string | undefined;
  houseName: string | undefined;
  totalPrice: number | undefined;
}) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const verifyPayment = async (
  order_id: string
): Promise<{ data: TPayment[] }> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/verify?order_id=${order_id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res",res);
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
