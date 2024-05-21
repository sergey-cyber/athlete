import { ProductListItem } from "../product-list-item";
import { AddProductToCartButton } from "../add-product-to-cart-button";
import { AmenitiesType } from "@/service/amenities/types";

interface Props {
  amenities: AmenitiesType;
}

export function AmenitiesListItem({ amenities }: Props) {
  return (
    <ProductListItem {...amenities}>
      <AddProductToCartButton product={amenities} productType="amenities" />
    </ProductListItem>
  );
}
