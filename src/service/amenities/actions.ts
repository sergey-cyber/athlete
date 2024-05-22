"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AmenitiesType } from "./types";
import { amenitiesService } from ".";
import { toAmenitiesList } from "@/lib/routes";

export async function createAmenities(payload: Partial<AmenitiesType>) {
  try {
    await amenitiesService.create(payload);
    const redirectPath = toAmenitiesList();
    revalidatePath(redirectPath);
    redirect(redirectPath);
  } catch (err) {
    throw err;
  }
}

export async function removeAmenities(id: number) {
  try {
    await amenitiesService.remove(id);
    revalidatePath(toAmenitiesList());
  } catch (err) {
    throw err;
  }
}
