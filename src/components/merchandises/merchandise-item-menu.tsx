"use client";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { ProductItemMenu } from "../product/product-item-menu";
import { Confirm } from "../confirm";
import { useRouter } from "next/navigation";
import { removeMerchandise } from "@/service/merchandise/actions";
import { toEditMerchandise } from "@/lib/routes";
import { MerchandiseType } from "@/service/merchandise/types";
import { useCartStorage } from "../providers/cart-provider";

interface Props {
  merchandise: MerchandiseType;
}

export function MerchandiseItemMenu({ merchandise }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { removeItem } = useCartStorage();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    try {
      await removeMerchandise(merchandise.id);
      removeItem(merchandise.id, "merchendise");
      toast({
        title: `Товар '${merchandise.title}' удален успешно.`
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при удалении товара.",
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
