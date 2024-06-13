"use server";

import { redirect } from "next/navigation";
import { authService } from ".";
import { toMerchandises, toSignIn } from "@/lib/routes";
import { cookies } from "next/headers";
import { ActionResult } from "@/lib/common-types";
import { handleActionError } from "@/lib/utils";

export async function signIn(
  login: string,
  password: string
): Promise<ActionResult<undefined>> {
  try {
    await authService.signIn(login, password);
  } catch (e) {
    return handleActionError(e);
  }
  redirect(toMerchandises());
}

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.delete("login");
  cookieStore.delete("password");
  redirect(toSignIn());
}
