import { MerchandiseType } from "@/service/merchandise/types";
import { ProductListItem } from "../product/product-list-item";
import { AddProductToCartButton } from "../product/add-product-to-cart-button";
import { MerchandiseItemMenu } from "./merchandise-item-menu";

interface Props {
  item: MerchandiseType;
}

export function MerchendiseListItem({ item }: Props) {
  return (
    <ProductListItem {...item}>
      <MerchandiseItemMenu merchandise={item} />
      <AddProductToCartButton product={item} productType="merchandises" />
    </ProductListItem>
  );
}
