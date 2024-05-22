import { Requestable } from "../requestable";
import { StatusType } from "./types";

class StatusService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(status: Partial<StatusType>) {
    return this.makeRequest<StatusType>("/save", {
      method: "POST",
      body: JSON.stringify(status)
    });
  }

  public async edit(status: Partial<StatusType>) {
    return this.makeRequest<StatusType>("/edit", {
      method: "PUT",
      body: JSON.stringify(status)
    });
  }

  public async remove(id: number) {
    return await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE"
    });
  }

  public async search() {
    return this.makeRequest<StatusType[]>("/all");
  }
}

export const statusService = new StatusService("/status");
