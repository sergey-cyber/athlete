import { Requestable } from "../requestable";
import { UserType } from "./types";

class UserService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async search() {
    return this.makeRequest<UserType[]>("/all");
  }

  public async create(user: Partial<UserType>) {
    return this.makeRequest<UserType>("/save", {
      method: "POST",
      body: JSON.stringify(user)
    });
  }

  public async remove(id: number) {
    return await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE"
    });
  }
}

export const userService = new UserService("/user");
