"use client";

import { Minus, Plus } from "lucide-react";
import { Empty } from "../empty";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Price } from "./price";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";
import { OrderType } from "@/service/order/types";
import { useOrderStorage } from "../providers/order-storage-provider";

interface Props {
  title: ReactNode;
  productType: keyof Pick<OrderType, "merchandises" | "amenities">;
}

export function CartProductSection({ title, productType }: Props) {
  const orderStorage = useOrderStorage();

  const products = orderStorage.get(productType) || [];

  function getProductCount(id: number) {
    return products.filter((el) => el.id === id).length;
  }

  const uniqueProducts: typeof products = [];

  for (const product of products) {
    if (!uniqueProducts.some(({ id }) => id === product.id)) {
      uniqueProducts.push(product);
    }
  }

  function getTotalPrice() {
    return products.reduce((acc, item) => acc + item.price, 0);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {uniqueProducts.length ? (
          uniqueProducts.map((product, i) => (
            <>
              <div key={product.id} className="grid grid-cols-5 gap-4 min-h-20">
                <div className="col-span-3">
                  <p className="text-xl font-semibold">{product.title}</p>
                  <p className="text-gray-500 line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                  <Button
                    onClick={() => {
                      const indexOfRemove = products.findIndex(
                        ({ id }) => id === product.id
                      );
                      orderStorage.set(
                        productType,
                        products.filter((_, index) => index !== indexOfRemove)
                      );
                    }}
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Minus size={12} />
                  </Button>
                  {getProductCount(product.id)}
                  <Button
                    onClick={() =>
                      orderStorage.set(productType, [...products, product])
                    }
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <Price price={product.price * getProductCount(product.id)} />
                </div>
              </div>
              <Separator />
            </>
          ))
        ) : (
          <>
            <Empty />
            <Separator />
          </>
        )}
        <div className="grid grid-cols-5 gap-4">
          <span className="text-xl font-bold">Итого</span>
          <span className="col-start-5 col-end-5 flex justify-center">
            <Price price={getTotalPrice()} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
