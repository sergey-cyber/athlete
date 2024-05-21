"use client";

import { CreditCard, HandPlatter, ShoppingBag } from "lucide-react";
import { useCartStorage } from "../providers/cart-provider";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { CartProductSection } from "./product-section";
import { Price } from "./price";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { createOrder } from "@/service/order/actions";
import { useToast } from "../ui/use-toast";

export function CartProductsList() {
  const { getCartItems, getTotalPrice } = useCartStorage();
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    try {
      setPending(true);
      await createOrder({
        merchandises: getCartItems("merchendise").map(({ item }) => item),
        amenities: getCartItems("amenities").map(({ item }) => item)
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при оформлении заказа.",
        description: err?.message,
        variant: "destructive"
      });
    } finally {
      setPending(false);
    }
  };

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
            <Button
              onClick={onSubmit}
              disabled={pending || getCartItems("merchendise").length < 1}
            >
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
