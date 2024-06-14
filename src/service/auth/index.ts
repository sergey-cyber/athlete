import { cookies } from "next/headers";
import { Requestable } from "../requestable";
import { RequestExeption } from "../exeption/request-exeption";
import { getHttpStatusMessage } from "@/lib/utils";
import { getAuthCockies } from "@/lib/auth";
import { UserType } from "../user/types";

class AuthService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async signIn(login: string, password: string) {
    const response = await fetch(this.path + "/all", {
      headers: { login: login, password: password },
    });

    if (response.ok) {
      const cookieStore = cookies();
      cookieStore.set("login", login);
      cookieStore.set("password", password);
    } else {
      throw new RequestExeption(
        response.status,
        getHttpStatusMessage(response.status)
      );
    }
  }

  public async getPrincipal() {
    const { login, password } = getAuthCockies();
    return this.makeRequest<UserType>(
      `/loginAndPassword?login=${login}&password=${password}`,
      { cache: "no-store" }
    );
  }
}

// На бэке нет эндпоинта /signIn , поэтому проверка кредов будет проверяться по пути /user
export const authService = new AuthService("/user");
