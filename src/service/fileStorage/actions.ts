"use server";

import { revalidatePath } from "next/cache";
import { fileStorageService } from ".";
import { toFiles } from "@/lib/routes";

export async function uploadFile(payload: FormData) {
  try {
    await fileStorageService.upload(payload);
  } catch (err) {
    console.error("File upload error: ", err);
    throw err;
  }
  revalidatePath(toFiles());
}
