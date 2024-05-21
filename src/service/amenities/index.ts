import { Requestable } from "../requestable";
import { AmenitiesType } from "./types";

class AmenitiesService extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async create(amenities: Partial<AmenitiesType>) {
    return this.makeRequest<AmenitiesType>("/save", {
      method: "POST",
      body: JSON.stringify(amenities)
    });
  }

  public async search() {
    return this.makeRequest<AmenitiesType[]>("/all");
  }
}

export const amenitiesService = new AmenitiesService("/amenities");
