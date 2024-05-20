"use client";

import { Button } from "../ui/button";
import { MerchandiseType } from "@/service/merchandiseService/types";
import { useCartStorage } from "../providers/cart-provider";

interface Props {
  item: MerchandiseType;
}

export function AddToCartButton({ item }: Props) {
  const { addItem, removeItem, isInCart } = useCartStorage();

  return isInCart(item) ? (
    <Button onClick={() => removeItem(item.id)} variant={"outline"}>
      Удалить из корзины
    </Button>
  ) : (
    <Button onClick={() => addItem({ item, type: "merchendise" })}>
      В корзину
    </Button>
  );
}
