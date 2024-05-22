"use server";

import { revalidatePath } from "next/cache";
import { statusService } from ".";
import { StatusType } from "./types";
import { toStatuses } from "@/lib/routes";

export async function createStatus(payload: Partial<StatusType>) {
  try {
    await statusService.create(payload);
    revalidatePath(toStatuses());
  } catch (e: any) {
    console.error("Satus creation error: ", e?.message);
    throw e;
  }
}

export async function removeStatus(id: number) {
  try {
    await statusService.remove(id);
    revalidatePath(toStatuses());
  } catch (err) {
    throw err;
  }
}

export async function editStatus(payload: StatusType) {
  try {
    await statusService.edit(payload);
    revalidatePath(toStatuses());
  } catch (err) {
    throw err;
  }
}
