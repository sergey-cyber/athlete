"use server";

import { toOrders } from "@/lib/routes";
import { orderService } from ".";
import { OrderType } from "./types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(payload: FormData) {
  try {
    await orderService.create(payload);
    const redirectPath = toOrders();
    revalidatePath(redirectPath);
    redirect(redirectPath);
  } catch (err) {
    console.error("Order creation error: ", err);
    throw err;
  }
}

export async function editOrder(payload: FormData) {
  try {
    await orderService.edit(payload);
    const redirectPath = toOrders();
    revalidatePath(redirectPath);
    redirect(redirectPath);
  } catch (err) {
    console.error("Order edition error: ", err);
    throw err;
  }
}

export async function deleteOrder(id: number) {
  try {
    await orderService.remove(id);
    revalidatePath(toOrders());
  } catch (err) {
    console.error("Delete Order error: ", err);
    throw err;
  }
}
