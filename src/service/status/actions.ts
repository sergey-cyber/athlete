"use server";

import { revalidatePath } from "next/cache";
import { statusService } from ".";
import { StatusType } from "./types";
import { toStatuses } from "@/lib/routes";
import { ActionResult } from "@/lib/common-types";
import { handleActionError } from "@/lib/utils";

export async function createStatus(
  payload: Partial<StatusType>
): Promise<ActionResult<undefined>> {
  try {
    await statusService.create(payload);
  } catch (err: any) {
    return handleActionError(err);
  }
  revalidatePath(toStatuses());
}

export async function removeStatus(
  id: number
): Promise<ActionResult<undefined>> {
  try {
    await statusService.remove(id);
  } catch (err) {
    return handleActionError(err);
  }
  revalidatePath(toStatuses());
}

export async function editStatus(
  payload: StatusType
): Promise<ActionResult<undefined>> {
  try {
    await statusService.edit(payload);
  } catch (err) {
    return handleActionError(err);
  }
  revalidatePath(toStatuses());
}
