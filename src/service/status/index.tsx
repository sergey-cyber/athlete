import { Requestable } from "../requestable";
import { StatusType } from "./types";

class StatusService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(status: Partial<StatusType>) {
    return this.makeRequest<StatusType>("/save", {
      method: "POST",
      body: JSON.stringify(status),
      headers: { "Content-Type": "application/json" },
    });
  }

  public async edit(status: Partial<StatusType>) {
    return this.makeRequest<StatusType>("/edit", {
      method: "PUT",
      body: JSON.stringify(status),
      headers: { "Content-Type": "application/json" },
    });
  }

  public async remove(id: number) {
    const response = await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Request error " + response.status ?? "");
    }
  }

  public async search() {
    return this.makeRequest<StatusType[]>("/all", { cache: "no-store" });
  }
}

export const statusService = new StatusService("/status");
