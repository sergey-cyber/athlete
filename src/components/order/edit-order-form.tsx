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
import { FileStorageType } from "@/service/fileStorage/types";
import { Roles } from "@/lib/common-types";

interface Props {
  statuses: StatusType[];
  clients: UserType[];
  currentFile?: FileStorageType;
  initialValue: Partial<OrderType>;
  access: string;
}

export function EditOrderForm({
  statuses,
  clients,
  initialValue,
  currentFile,
  access,
}: Props) {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState(initialValue);
  const [file, setFile] = useState<File | undefined>();

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
      const res = await editOrder(formData);
      if (res?.error) {
        toast({
          title: "Ошибка при изменении заявки.",
          description: res.error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Заявка изменена успешно.",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <OrderForm
      currentFile={currentFile}
      onFileChange={(file) => setFile(file)}
      statuses={statuses}
      clients={clients}
      onChange={(key, value) => setOrder({ ...order, [key]: value })}
      values={order}
      hiddenParamsSection={access !== Roles.ADMIN}
    >
      <Button onClick={onSubmit} disabled={pending}>
        <Save className="pr-2" />
        Сохранить
      </Button>
    </OrderForm>
  );
}
