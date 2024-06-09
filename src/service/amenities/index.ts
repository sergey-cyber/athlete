import { getAuthCockies } from "@/lib/auth";
import { Requestable } from "../requestable";
import { AmenitiesType } from "./types";

class AmenitiesService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(amenities: Partial<AmenitiesType>) {
    return this.makeRequest<AmenitiesType>("/save", {
      method: "POST",
      body: JSON.stringify(amenities),
      headers: { "Content-Type": "application/json" },
    });
  }

  public async edit(amenities: Partial<AmenitiesType>) {
    return this.makeRequest<AmenitiesType>("/edit", {
      method: "PUT",
      body: JSON.stringify(amenities),
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

  public async search() {
    return this.makeRequest<AmenitiesType[]>("/all", { cache: "no-store" });
  }
}

export const amenitiesService = new AmenitiesService("/amenities");
