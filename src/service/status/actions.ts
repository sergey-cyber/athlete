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
