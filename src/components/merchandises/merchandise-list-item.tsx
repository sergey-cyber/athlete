import { MerchandiseType } from "@/service/merchandise/types";
import { ProductListItem } from "../product-list-item";
import { AddProductToCartButton } from "../add-product-to-cart-button";

interface Props {
  item: MerchandiseType;
}

export function MerchendiseListItem({ item }: Props) {
  return (
    <ProductListItem {...item}>
      <AddProductToCartButton product={item} productType="merchendise" />
    </ProductListItem>
  );
}
