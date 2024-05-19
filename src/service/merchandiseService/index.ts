import { Requestable } from "../requestable";
import { MerchandiseType } from "./types";

class MerchandiseService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async search() {
    return this.makeRequest<MerchandiseType[]>({ path: "/all" });
  }
}

export const merchandiseService = new MerchandiseService("/merchandise");
