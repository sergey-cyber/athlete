"use client";

import { StatusType } from "@/service/status/types";
import { useOrderStorage } from "../providers/order-storage-provider";
import { Button } from "../ui/button";
import { OrderForm } from "./order-form";
import { UserType } from "@/service/user/types";
import { useToast } from "../ui/use-toast";
import { createOrder } from "@/service/order/actions";
import { useState } from "react";
import { CreditCard } from "lucide-react";

interface Props {
  statuses: StatusType[];
  clients: UserType[];
}

export function CreaeteOrderForm({ statuses, clients }: Props) {
  const orderStorage = useOrderStorage();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    try {
      setPending(true);
      await createOrder(orderStorage.getOrder());
      orderStorage.clear();
      toast({
        title: "Заявка создана успешно."
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при оформлении заявки.",
        description: err?.message,
        variant: "destructive"
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <OrderForm
      statuses={statuses}
      clients={clients}
      onChange={(key, value) => orderStorage.set(key, value)}
      values={orderStorage.getOrder()}
    >
      <Button onClick={onSubmit} disabled={pending}>
        <CreditCard className="pr-2" />
        Оформить заказ
      </Button>
    </OrderForm>
  );
}
