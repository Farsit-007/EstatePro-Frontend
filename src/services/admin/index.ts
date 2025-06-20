/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const allUsers = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["USER"],
      },
    });
    const data = await res.json()
    return data
  } catch (error : any) {
   return Error(error)
  }
};


export const singleUser = async (email : string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${email}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["USER"],
      },
    });
    const data = await res.json()
    return data
  } catch (error : any) {
   return Error(error)
  }
};


export const meta = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meta/`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json()
    return data
  } catch (error : any) {
   return Error(error)
  }
};



export const updateUserStatus = async (id : string,value : {isBlock?: boolean}) => {
   
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body : JSON.stringify(value),
      
    });
    revalidateTag("USER")
    const data = await res.json()
   
    return data
  } catch (error : any) {
   return Error(error)
  }
};
