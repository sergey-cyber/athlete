"use server";

import { redirect } from "next/navigation";
import { authService } from ".";
import { toMerchandises, toSignIn } from "@/lib/routes";
import { cookies } from "next/headers";

export async function signIn(login: string, password: string) {
  try {
    await authService.signIn(login, password);
    redirect(toMerchandises());
  } catch (e) {
    throw e;
  }
}

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.delete("login");
  cookieStore.delete("password");
  redirect(toSignIn());
}
