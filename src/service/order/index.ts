import { Requestable } from "../requestable";
import { OrderType } from "./types";

class OrderService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(order: Partial<OrderType>) {
    return this.makeRequest<OrderType>("/save", {
      method: "POST",
      body: JSON.stringify(order)
    });
  }

  public async search() {
    return this.makeRequest<OrderType[]>("/getAllOrders");
  }
}

export const merchandiseService = new OrderService("/order");
