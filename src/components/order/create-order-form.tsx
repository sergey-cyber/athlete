"use client";

import { StatusType } from "@/service/status/types";
import { Button } from "../ui/button";
import { OrderForm } from "./order-form";
import { UserType } from "@/service/user/types";
import { useToast } from "../ui/use-toast";
import { createOrder } from "@/service/order/actions";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import { validateOrderSchema } from "./schemas";
import { OrderType } from "@/service/order/types";
import { Roles } from "@/lib/common-types";

interface Props {
  statuses: StatusType[];
  clients: UserType[];
  client: UserType;
}

export function CreaeteOrderForm({ statuses, clients, client }: Props) {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [order, setOrder] = useState<Partial<OrderType>>({});

  const orderOnChange = <K extends keyof OrderType>(
    key: K,
    value: OrderType[K]
  ) => {
    const newOrder = { ...order, [key]: value };
    setOrder(newOrder);
  };

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
      formData.append(
        "orderDTO",
        JSON.stringify({
          ...order,
          client: { id: client.id, userDetails: client },
        })
      );
      const res = await createOrder(formData);
      if (res?.error) {
        toast({
          title: "Ошибка при оформлении заявки.",
          description: res.error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Заявка создана успешно.",
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
      onChange={(key, value) => orderOnChange(key, value)}
      values={order}
      hiddenParamsSection={client.role !== Roles.ADMIN}
    >
      <Button onClick={onSubmit} disabled={pending}>
        <CreditCard className="pr-2" />
        Создать заявку
      </Button>
    </OrderForm>
  );
}
