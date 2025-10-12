/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import UserModel from "@/models/usersSchema"; 

export const verifyUser = async (req: any) => {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false };
  }

  try {
    const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, encodedSecret, {
      algorithms: ["HS256"],
    });

    return {
      success: true,
      id: payload.id as string,
      role: payload.role as string,
    };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const getUserWithId = async (id: string) => {
  const user = await UserModel.findById(id).lean();
  return user;
};
