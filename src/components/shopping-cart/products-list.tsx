"use client";

import { CreditCard, HandPlatter, ShoppingBag } from "lucide-react";
import { useCartStorage } from "../providers/cart-provider";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { CartProductSection } from "./product-section";
import { Price } from "./price";
import { ReactNode } from "react";

export function CartProductsList() {
  const { getCartItems, getTotalPrice } = useCartStorage();

  return (
    <div className="space-y-6">
      <CartProductSection
        title={<Title title="Товары" icon={<ShoppingBag />} />}
        type="merchendise"
      />
      <CartProductSection
        title={<Title title="Услуги" icon={<HandPlatter />} />}
        type="amenities"
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex gap-x-3 items-center">
              <span>Итого к оплате:</span> <Price price={getTotalPrice()} />
            </div>
            <Button disabled={getCartItems("merchendise").length < 1}>
              <CreditCard className="pr-2" />
              Оформить заказ
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

function Title(props: { title: string; icon: ReactNode }) {
  return (
    <div className="flex gap-x-2">
      {props.icon}
      <span>{props.title}</span>
    </div>
  );
}
