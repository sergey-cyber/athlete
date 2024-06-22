import { getAuthCockies } from "@/lib/auth";
import { Requestable } from "../requestable";
import { UserType } from "./types";

class UserService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async search() {
    return this.makeRequest<UserType[]>("/all", { cache: "no-store" });
  }

  public async searchAdmins() {
    return this.makeRequest<UserType[]>("/allAdmins", { cache: "no-store" });
  }

  public async create(user: Partial<UserType>) {
    return this.makeRequest<UserType>("/save", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
  }

  public async remove(id: number) {
    const response = await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE",
      headers: getAuthCockies(),
    });
    this.checkResponseForErrors(response);
  }

  public async edit(user: Partial<UserType>) {
    return this.makeRequest<UserType>("/edit", {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const userService = new UserService("/user");
