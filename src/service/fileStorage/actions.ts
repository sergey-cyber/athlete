"use server";

import { revalidatePath } from "next/cache";
import { fileStorageService } from ".";
import { toFiles } from "@/lib/routes";
import { ActionResult } from "@/lib/common-types";
import { handleActionError } from "@/lib/utils";

export async function uploadFile(
  payload: FormData
): Promise<ActionResult<undefined>> {
  try {
    await fileStorageService.upload(payload);
  } catch (err) {
    return handleActionError(err);
  }
  revalidatePath(toFiles());
}

export async function downloadFile(
  fileId: string
): Promise<ActionResult<Response>> {
  try {
    return await fileStorageService.downloadFile(fileId);
  } catch (err) {
    return handleActionError(err);
  }
}

export async function deleteFile(id: string): Promise<ActionResult<undefined>> {
  try {
    await fileStorageService.remove(id);
  } catch (err) {
    return handleActionError(err);
  }
  revalidatePath(toFiles());
}
