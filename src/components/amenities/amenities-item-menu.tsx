"use client";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { removeAmenities } from "@/service/amenities/actions";
import { ProductItemMenu } from "../product/product-item-menu";
import { Confirm } from "../confirm";
import { useRouter } from "next/navigation";
import { toEditAmenities } from "@/lib/routes";
import { AmenitiesType } from "@/service/amenities/types";
import { useCartStorage } from "../providers/cart-provider";

interface Props {
  amenities: AmenitiesType;
}

export function AmenitiesItemMenu({ amenities }: Props) {
  const router = useRouter();
  const { removeItem } = useCartStorage();
  const { toast } = useToast();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    try {
      await removeAmenities(amenities.id);
      removeItem(amenities.id, "amenities");
      toast({
        title: `Услуга '${amenities.title}' удалена успешно.`
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при удалении услуги.",
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
        title={`Услуга '${amenities.title}' будет удалена, продолжить?`}
        onConfirm={onDelete}
      />
      <ProductItemMenu
        onEdit={() => router.push(toEditAmenities(amenities.id))}
        onDelete={() => setOpenConfirm(true)}
      />
    </>
  );
}
