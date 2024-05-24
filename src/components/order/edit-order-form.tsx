"use client";

import { StatusType } from "@/service/status/types";
import { Button } from "../ui/button";
import { OrderForm } from "./order-form";
import { UserType } from "@/service/user/types";
import { useToast } from "../ui/use-toast";
import { editOrder } from "@/service/order/actions";
import { useState } from "react";
import { Save } from "lucide-react";
import { validateOrderSchema } from "./schemas";
import { OrderType } from "@/service/order/types";

interface Props {
  statuses: StatusType[];
  clients: UserType[];
  initialValue: Partial<OrderType>;
}

export function EditOrderForm({ statuses, clients, initialValue }: Props) {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState(initialValue);

  const onSubmit = async () => {
    setPending(true);
    try {
      const result = validateOrderSchema.safeParse(order);
      if (!result.success) {
        toast({
          title: result.error.issues[0].message,
          variant: "destructive"
        });
        return;
      }
      await editOrder(order);
      toast({
        title: "Заявка изменена успешно."
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при изменении заявки.",
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
      onChange={(key, value) => setOrder({ ...order, [key]: value })}
      values={order}
    >
      <Button onClick={onSubmit} disabled={pending}>
        <Save className="pr-2" />
        Сохранить
      </Button>
    </OrderForm>
  );
}
