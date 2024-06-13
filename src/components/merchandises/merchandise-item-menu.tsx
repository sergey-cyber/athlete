"use client";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { ProductItemMenu } from "../product/product-item-menu";
import { Confirm } from "../confirm";
import { useRouter } from "next/navigation";
import { removeMerchandise } from "@/service/merchandise/actions";
import { toEditMerchandise } from "@/lib/routes";
import { MerchandiseType } from "@/service/merchandise/types";
import { useOrderStorage } from "../providers/order-storage-provider";

interface Props {
  merchandise: MerchandiseType;
}

export function MerchandiseItemMenu({ merchandise }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const orderStorage = useOrderStorage();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    try {
      const res = await removeMerchandise(merchandise.id);
      if (res?.error) {
        toast({
          title: "Ошибка при удалении товара.",
          variant: "destructive",
          description: res.error.message,
        });
        return;
      }
      orderStorage.deleteMerchandise(merchandise.id);
      toast({
        title: `Товар '${merchandise.title}' удален успешно.`,
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
        title={`Товар '${merchandise.title}' будет удален, продолжить?`}
        onConfirm={onDelete}
      />
      <ProductItemMenu
        onEdit={() => router.push(toEditMerchandise(merchandise.id))}
        onDelete={() => setOpenConfirm(true)}
      />
    </>
  );
}
