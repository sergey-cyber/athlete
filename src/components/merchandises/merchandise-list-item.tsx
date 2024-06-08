import { MerchandiseType } from "@/service/merchandise/types";
import { ProductListItem } from "../product/product-list-item";
import { AddProductToCartButton } from "../product/add-product-to-cart-button";
import { MerchandiseItemMenu } from "./merchandise-item-menu";
import Link from "next/link";
import { toMerchandise } from "@/lib/routes";

interface Props {
  item: MerchandiseType;
}

export function MerchendiseListItem({ item }: Props) {
  return (
    <ProductListItem
      {...item}
      title={<Link href={toMerchandise(item.id)}>{item.title}</Link>}
    >
      <MerchandiseItemMenu merchandise={item} />
      <AddProductToCartButton product={item} productType="merchandises" />
    </ProductListItem>
  );
}
