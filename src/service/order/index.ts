import { getAuthCockies } from "@/lib/auth";
import { Requestable } from "../requestable";
import { OrderType } from "./types";

class OrderService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(payload: FormData) {
    return this.makeRequest<OrderType>("/save", {
      method: "POST",
      body: payload,
    });
  }

  public async edit(payload: FormData) {
    return this.makeRequest<OrderType>("/edit", {
      method: "PUT",
      body: payload,
    });
  }

  public async remove(id: number) {
    const response = await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE",
      headers: getAuthCockies(),
    });
    this.checkResponseForErrors(response);
  }

  public async search() {
    return this.makeRequest<OrderType[]>("/getAllOrders", {
      cache: "no-store",
    });
  }
}

export const orderService = new OrderService("/order");
