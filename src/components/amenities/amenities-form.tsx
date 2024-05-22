"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ProductForm } from "../product/product-form";
import { AmenitiesType } from "@/service/amenities/types";
import { createAmenities } from "@/service/amenities/actions";

export function AmenitiesForm() {
  const { toast } = useToast();
  const [values, setValues] = useState<Partial<AmenitiesType>>({});
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      await createAmenities(values);
      toast({
        title: "Услуга создана успешно."
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Ошибка при создании услуги.",
        variant: "destructive"
      });
    } finally {
      setPending(false);
    }
  };

  const onChange = (fieldName: string, value: any) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <ProductForm values={values} onChange={onChange}>
      <Button disabled={pending} onClick={onSubmit}>
        Создать
      </Button>
    </ProductForm>
  );
}
