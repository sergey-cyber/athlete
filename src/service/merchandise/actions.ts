"use server";

import { revalidatePath } from "next/cache";
import { merchandiseService } from ".";
import { MerchandiseType } from "./types";
import { toMerchandises } from "@/lib/routes";
import { redirect } from "next/navigation";
import { ActionResult } from "@/lib/common-types";
import { handleActionError } from "@/lib/utils";

export async function createMerchandise(
  payload: Partial<MerchandiseType>
): Promise<ActionResult<undefined>> {
  try {
    await merchandiseService.create(payload);
  } catch (err) {
    return handleActionError(err);
  }
  const redirectPath = toMerchandises();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function editMerchandise(
  payload: Partial<MerchandiseType>
): Promise<ActionResult<undefined>> {
  try {
    await merchandiseService.edit(payload);
  } catch (err) {
    return handleActionError(err);
  }
  const redirectPath = toMerchandises();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function removeMerchandise(
  id: number
): Promise<ActionResult<undefined>> {
  try {
    await merchandiseService.remove(id);
  } catch (err) {
    return handleActionError(err);
  }
  revalidatePath(toMerchandises());
}
