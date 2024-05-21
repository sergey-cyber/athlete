import { AmenitiesType } from "../amenities/types";
import { MerchandiseType } from "../merchandise/types";

export interface OrderType {
  id: number;

  orderName: string;

  priority: number;

  status: string;

  description: string;

  amenities: AmenitiesType[];

  merchandises: MerchandiseType[];

  comments: string;

  client: {};

  users: {};

  totalNumberOfMerchandise: number;

  totalNumberOfAmenities: number;

  totalCostOfOrder: number;
}
