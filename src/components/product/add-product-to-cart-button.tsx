"use client";

import { AmenitiesType } from "@/service/amenities/types";
import { MerchandiseType } from "@/service/merchandise/types";
import { Button } from "../ui/button";
import { useOrderStorage } from "../providers/order-storage-provider";
import { OrderType } from "@/service/order/types";

type Product = MerchandiseType | AmenitiesType;

interface Props {
  product: Product;
  productType: keyof Pick<OrderType, "merchandises" | "amenities">;
}

export function AddProductToCartButton({ product, productType }: Props) {
  const orderStorage = useOrderStorage();

  function isInOrder() {
    return (orderStorage.get(productType) || []).some(
      (el) => el.id === product.id
    );
  }

  const products = orderStorage.get(productType) || [];

  return isInOrder() ? (
    <Button
      onClick={() =>
        orderStorage.set(
          productType,
          products.filter(({ id }) => id !== product.id)
        )
      }
      variant={"outline"}
    >
      Удалить из корзины
    </Button>
  ) : (
    <Button
      onClick={() => orderStorage.set(productType, [...products, product])}
    >
      В корзину
    </Button>
  );
}
