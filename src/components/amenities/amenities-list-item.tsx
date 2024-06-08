import { AddProductToCartButton } from "../product/add-product-to-cart-button";
import { ProductListItem } from "../product/product-list-item";
import { AmenitiesType } from "@/service/amenities/types";
import { AmenitiesItemMenu } from "./amenities-item-menu";
import Link from "next/link";
import { toAmenities } from "@/lib/routes";

interface Props {
  amenities: AmenitiesType;
}

export function AmenitiesListItem({ amenities }: Props) {
  return (
    <ProductListItem
      {...amenities}
      title={<Link href={toAmenities(amenities.id)}>{amenities.title}</Link>}
    >
      <AmenitiesItemMenu amenities={amenities} />
      <AddProductToCartButton product={amenities} productType="amenities" />
    </ProductListItem>
  );
}
