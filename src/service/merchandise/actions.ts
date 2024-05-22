"use server";

import { revalidatePath } from "next/cache";
import { merchandiseService } from ".";
import { MerchandiseType } from "./types";
import { toMerchandises } from "@/lib/routes";
import { redirect } from "next/navigation";

export async function createMerchandise(payload: Partial<MerchandiseType>) {
  try {
    await merchandiseService.create(payload);
    const redirectPath = toMerchandises();
    revalidatePath(redirectPath);
    redirect(redirectPath);
  } catch (err) {
    throw err;
  }
}

export async function removeMerchandise(id: number) {
  try {
    await merchandiseService.remove(id);
    revalidatePath(toMerchandises());
  } catch (err) {
    throw err;
  }
}
