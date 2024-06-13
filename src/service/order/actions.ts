"use server";

import { toOrders } from "@/lib/routes";
import { orderService } from ".";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ActionResult } from "@/lib/common-types";
import { handleActionError } from "@/lib/utils";

export async function createOrder(
  payload: FormData
): Promise<ActionResult<undefined>> {
  try {
    await orderService.create(payload);
  } catch (err) {
    return handleActionError(err);
  }
  const redirectPath = toOrders();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function editOrder(
  payload: FormData
): Promise<ActionResult<undefined>> {
  try {
    await orderService.edit(payload);
  } catch (err) {
    return handleActionError(err);
  }
  const redirectPath = toOrders();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function deleteOrder(
  id: number
): Promise<ActionResult<undefined>> {
  try {
    await orderService.remove(id);
  } catch (err) {
    return handleActionError(err);
  }
  revalidatePath(toOrders());
}
