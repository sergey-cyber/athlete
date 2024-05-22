import { Requestable } from "../requestable";
import { StatusType } from "./types";

class StatusService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(amenities: Partial<StatusType>) {
    return this.makeRequest<StatusType>("/save", {
      method: "POST",
      body: JSON.stringify(amenities)
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
