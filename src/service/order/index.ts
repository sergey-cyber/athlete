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

  public async edit(order: Partial<OrderType>) {
    return this.makeRequest<OrderType>("/edit", {
      method: "PUT",
      body: JSON.stringify(order)
    });
  }

  public async remove(id: number) {
    return await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE"
    });
  }

  public async search() {
    return this.makeRequest<OrderType[]>("/getAllOrders");
  }
}

export const orderService = new OrderService("/order");
