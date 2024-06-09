import { cookies } from "next/headers";
import { Requestable } from "../requestable";
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
      throw new Error("Ошибка входа");
    }
  }
}

// На бэке нет эндпоинта /signIn , поэтому проверка кредов будет проверяться по пути /user
export const authService = new AuthService("/user");
