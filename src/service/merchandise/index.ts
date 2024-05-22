import { Requestable } from "../requestable";
import { MerchandiseType } from "./types";

class MerchandiseService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(merchandise: Partial<MerchandiseType>) {
    return this.makeRequest<MerchandiseType>("/save", {
      method: "POST",
      body: JSON.stringify(merchandise)
    });
  }

  public async remove(id: number) {
    return await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE"
    });
  }

  public async search() {
    return this.makeRequest<MerchandiseType[]>("/all");
  }
}

export const merchandiseService = new MerchandiseService("/merchandise");
