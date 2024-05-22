import { AddProductToCartButton } from "../product/add-product-to-cart-button";
import { ProductListItem } from "../product/product-list-item";
import { AmenitiesType } from "@/service/amenities/types";
import { AmenitiesItemMenu } from "./amenities-item-menu";

interface Props {
  amenities: AmenitiesType;
}

export function AmenitiesListItem({ amenities }: Props) {
  return (
    <ProductListItem {...amenities}>
      <AmenitiesItemMenu amenities={amenities} />
      <AddProductToCartButton product={amenities} productType="amenities" />
    </ProductListItem>
  );
}
