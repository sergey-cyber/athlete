import { AmenitiesType } from "../amenities/types";
import { MerchandiseType } from "../merchandise/types";
import { StatusType } from "../status/types";
import { UserType } from "../user/types";

export type OrderType = {
  id: number;

  orderName: string;

  priority: number;

  status: StatusType;

  description: string;

  amenities: AmenitiesType[];

  merchandises: MerchandiseType[];

  comments: string;

  client: UserType;

  users: UserType;

  totalNumberOfMerchandise: number;

  totalNumberOfAmenities: number;

  totalCostOfOrder: number;
};
