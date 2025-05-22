/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
export const getTenantRequest = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/request/tenant`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["REQUEST"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};


export const getCountTenantRequest = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/request/count-tenant`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["REQUEST"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
