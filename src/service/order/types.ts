import { AmenitiesType } from "../amenities/types";
import { MerchandiseType } from "../merchandise/types";
import { StatusType } from "../status/types";
import { UserDetails, UserType } from "../user/types";

export type OrderType = {
  id: number;

  orderName?: string;

  priority?: number;

  status?: StatusType;

  description?: string;

  amenities?: AmenitiesType[];

  merchandises?: MerchandiseType[];

  comments?: string;

  client?: { id: number; role?: string; userDetails?: UserDetails };

  users?: { id: number; role?: string; userDetails?: UserDetails };

  totalNumberOfMerchandise?: number;

  totalNumberOfAmenities?: number;

  totalCostOfOrder?: number;
};
