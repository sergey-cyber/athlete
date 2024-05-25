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
import { validateOrderSchema } from "./schemas";

interface Props {
  statuses: StatusType[];
  clients: UserType[];
}

export function CreaeteOrderForm({ statuses, clients }: Props) {
  const orderStorage = useOrderStorage();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const order = orderStorage.getOrder();

  const onSubmit = async () => {
    setPending(true);
    try {
      const result = validateOrderSchema.safeParse(order);
      if (!result.success) {
        toast({
          title: result.error.issues[0].message,
          variant: "destructive",
        });
        return;
      }
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("orderDTO", JSON.stringify(order));
      await createOrder(formData);
      orderStorage.clear();
      toast({
        title: "Заявка создана успешно.",
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при оформлении заявки.",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <OrderForm
      onFileChange={(file) => setFile(file)}
      statuses={statuses}
      clients={clients}
      onChange={(key, value) => orderStorage.set(key, value)}
      values={order}
    >
      <Button onClick={onSubmit} disabled={pending}>
        <CreditCard className="pr-2" />
        Оформить заказ
      </Button>
    </OrderForm>
  );
}
