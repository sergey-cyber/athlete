"use client";

import { AmenitiesType } from "@/service/amenities/types";
import { MerchandiseType } from "@/service/merchandise/types";
import { CartItemType, useCartStorage } from "../providers/cart-provider";
import { Button } from "../ui/button";

type Product = MerchandiseType | AmenitiesType;

interface Props {
  product: Product;
  productType: CartItemType;
}

export function AddProductToCartButton({ product, productType }: Props) {
  const { addItem, removeItem, isInCart } = useCartStorage();
  return isInCart(product.id, productType) ? (
    <Button
      onClick={() => removeItem(product.id, productType)}
      variant={"outline"}
    >
      Удалить из корзины
    </Button>
  ) : (
    <Button onClick={() => addItem({ item: product, type: productType })}>
      В корзину
    </Button>
  );
}
