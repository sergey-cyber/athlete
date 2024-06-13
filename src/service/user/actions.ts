"use server";

import { toUsers } from "@/lib/routes";
import { userService } from ".";
import { UserType } from "./types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/lib/common-types";
import { handleActionError } from "@/lib/utils";

export async function createUser(
  payload: Partial<UserType>
): Promise<ActionResult<undefined>> {
  try {
    await userService.create(payload);
  } catch (e) {
    return handleActionError(e);
  }
  const redirectPath = toUsers();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function removeUser(id: number): Promise<ActionResult<undefined>> {
  try {
    await userService.remove(id);
  } catch (err: unknown) {
    return handleActionError(err);
  }
  revalidatePath(toUsers());
}

export async function editUser(
  payload: Partial<UserType>
): Promise<ActionResult<undefined>> {
  try {
    await userService.edit(payload);
  } catch (err) {
    return handleActionError(err);
  }
  const redirectPath = toUsers();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}
