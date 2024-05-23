import { AmenitiesType } from "../amenities/types";
import { MerchandiseType } from "../merchandise/types";
import { StatusType } from "../status/types";

export type OrderType = {
  id: number;

  orderName: string;

  priority: number;

  status: StatusType;

  description: string;

  amenities: AmenitiesType[];

  merchandises: MerchandiseType[];

  comments: string;

  client: {};

  users: {};

  totalNumberOfMerchandise: number;

  totalNumberOfAmenities: number;

  totalCostOfOrder: number;
};
