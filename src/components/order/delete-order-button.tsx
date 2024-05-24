"use client";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Confirm } from "../confirm";
import { useToast } from "../ui/use-toast";
import { OrderType } from "@/service/order/types";
import { deleteOrder } from "@/service/order/actions";

interface Props {
  order: OrderType;
}

export function DeleteOrderButton({ order }: Props) {
  const { toast } = useToast();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    try {
      await deleteOrder(order.id);
      toast({
        title: `Заявка '${order.orderName}' удалена успешно.`
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при удалении заявки.",
        variant: "destructive"
      });
    } finally {
      setPending(false);
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <Confirm
        loading={pending}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        title={`Заявка '${order.orderName}' будет удалена, продолжить?`}
        onConfirm={onDelete}
      />
      <Button
        onClick={() => setOpenConfirm(true)}
        variant={"outline"}
        size={"mini"}
      >
        <Trash2 size={16} />
      </Button>
    </>
  );
}
