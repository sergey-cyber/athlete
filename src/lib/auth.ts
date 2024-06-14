import { cookies } from "next/headers";

export const getAuthCockies = () => {
  const cookieStore = cookies();
  const login = cookieStore.get("login")?.value ?? "";
  const password = cookieStore.get("password")?.value ?? "";

  return { login, password };
};

export enum Roles {
  ADMIN = "admin",
  USER = "user",
}
