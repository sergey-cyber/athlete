"use server";

import { revalidatePath } from "next/cache";
import { fileStorageService } from ".";
import { toFiles } from "@/lib/routes";

export async function uploadFile(payload: FormData) {
  try {
    await fileStorageService.upload(payload);
  } catch (err) {
    throw err;
  }
  revalidatePath(toFiles());
}

export async function downloadFile(fileId: string) {
  try {
    return await fileStorageService.downloadFile(fileId);
  } catch (err) {
    throw err;
  }
}
