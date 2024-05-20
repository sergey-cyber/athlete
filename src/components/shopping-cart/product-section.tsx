"use client";

import { Minus, Plus } from "lucide-react";
import { Empty } from "../empty";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CartItemType, useCartStorage } from "../providers/cart-provider";
import { Price } from "./price";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  type: CartItemType;
}

export function CartProductSection({ type, title }: Props) {
  const { decrementItem, addItem, getTotalPrice, getCartItems } =
    useCartStorage();

  const cartItems = getCartItems(type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.length ? (
          cartItems.map(({ item, count }, i) => (
            <>
              <div key={item.id} className="grid grid-cols-5 gap-4 min-h-20">
                <div className="col-span-3">
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-gray-500 line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                  <Button
                    onClick={() => decrementItem(item.id)}
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Minus size={12} />
                  </Button>
                  {count}
                  <Button
                    onClick={() => addItem({ item, type })}
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <Price price={item.price * count} />
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
            <Price price={getTotalPrice(type)} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
