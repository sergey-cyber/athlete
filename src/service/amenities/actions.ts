"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AmenitiesType } from "./types";
import { amenitiesService } from ".";
import { toAmenitiesList } from "@/lib/routes";
import { ActionResult } from "@/lib/common-types";
import { handleActionError } from "@/lib/utils";

export async function createAmenities(
  payload: Partial<AmenitiesType>
): Promise<ActionResult<undefined>> {
  try {
    await amenitiesService.create(payload);
  } catch (err) {
    return handleActionError(err);
  }
  const redirectPath = toAmenitiesList();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function editAmenities(
  payload: Partial<AmenitiesType>
): Promise<ActionResult<undefined>> {
  try {
    await amenitiesService.edit(payload);
  } catch (err) {
    return handleActionError(err);
  }
  const redirectPath = toAmenitiesList();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function removeAmenities(
  id: number
): Promise<ActionResult<undefined>> {
  try {
    await amenitiesService.remove(id);
  } catch (err) {
    return handleActionError(err);
  }
  revalidatePath(toAmenitiesList());
}
