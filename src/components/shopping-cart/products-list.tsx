"use client";

import { CreditCard, HandPlatter, ShoppingBag } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { CartProductSection } from "./product-section";
import { Price } from "./price";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { createOrder } from "@/service/order/actions";
import { useToast } from "../ui/use-toast";
import { useOrderStorage } from "../providers/order-storage-provider";

export function CartProductsList() {
  const oderStorage = useOrderStorage();
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const merchandises = oderStorage.get("merchandises") || [];
  const amenities = oderStorage.get("amenities") || [];

  const onSubmit = async () => {
    try {
      setPending(true);
      await createOrder({
        merchandises,
        amenities
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

  function getTotalPrice() {
    return [...merchandises, ...amenities].reduce(
      (acc, { price }) => acc + price,
      0
    );
  }

  return (
    <div className="space-y-6">
      <CartProductSection
        title={<Title title="Товары" icon={<ShoppingBag />} />}
        productType="merchandises"
      />
      <CartProductSection
        title={<Title title="Услуги" icon={<HandPlatter />} />}
        productType="amenities"
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex gap-x-3 items-center">
              <span>Итого к оплате:</span> <Price price={getTotalPrice()} />
            </div>
            <Button
              onClick={onSubmit}
              disabled={pending || merchandises.length < 1}
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
