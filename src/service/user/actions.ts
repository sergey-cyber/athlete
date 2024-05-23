"use server";

import { toUsers } from "@/lib/routes";
import { userService } from ".";
import { UserType } from "./types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createUser(payload: Partial<UserType>) {
  try {
    await userService.create(payload);
    const redirectPath = toUsers();
    revalidatePath(redirectPath);
    redirect(redirectPath);
  } catch (e: any) {
    console.error("User creation error: ", e?.message);
    throw e;
  }
}

export async function removeUser(id: number) {
  try {
    await userService.remove(id);
    revalidatePath(toUsers());
  } catch (err) {
    throw err;
  }
}
