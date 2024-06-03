import { Requestable } from "../requestable";
import { MerchandiseType } from "./types";

class MerchandiseService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(merchandise: Partial<MerchandiseType>) {
    return this.makeRequest<MerchandiseType>("/save", {
      method: "POST",
      body: JSON.stringify(merchandise),
      headers: { "Content-Type": "application/json" },
    });
  }

  public async edit(merchandise: Partial<MerchandiseType>) {
    return this.makeRequest<MerchandiseType>("/edit", {
      method: "PUT",
      body: JSON.stringify(merchandise),
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
    return this.makeRequest<MerchandiseType[]>("/all", { cache: "no-store" });
  }
}

export const merchandiseService = new MerchandiseService("/merchandise");
