"use client";

import { useState } from "react";
import { MerchandiseType } from "@/service/merchandise/types";
import { Button } from "../ui/button";
import { createMerchandise } from "@/service/merchandise/actions";
import { useToast } from "../ui/use-toast";
import { ProductForm } from "../product/product-form";

export function MerchandiseCreateForm() {
  const { toast } = useToast();
  const [values, setValues] = useState<Partial<MerchandiseType>>({});
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      await createMerchandise(values);
      toast({
        title: "Товар создан успешно."
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Ошибка при создании товара.",
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
