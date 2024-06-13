import { cookies } from "next/headers";

export const isAuthorized = () => {
  const cookieStore = cookies();
  const login = cookieStore.get("login");
  const password = cookieStore.get("password");
  return !!login && !!password;
};

export const getAuthCockies = () => {
  const cookieStore = cookies();
  const login = cookieStore.get("login")?.value ?? "";
  const password = cookieStore.get("password")?.value ?? "";

  return { login, password };
};
