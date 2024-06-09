"use client";

import { useState } from "react";
import { MerchandiseType } from "@/service/merchandise/types";
import { Button } from "../ui/button";
import { createMerchandise } from "@/service/merchandise/actions";
import { useToast } from "../ui/use-toast";
import { MerchandiseForm } from "./merchandise-form";
import { merchandiseFormSchema } from "./schemas";

export function MerchandiseCreateForm() {
  const { toast } = useToast();
  const [values, setValues] = useState<Partial<MerchandiseType>>({});
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      const result = merchandiseFormSchema.safeParse(values);
      if (!result.success) {
        toast({
          title: result.error.issues[0].message,
          variant: "destructive",
        });
        return;
      }
      await createMerchandise(values);
      toast({
        title: "Товар создан успешно.",
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при создании товара.",
        description: err.message ?? "",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  const onChange = (fieldName: string, value: any) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <MerchandiseForm values={values} onChange={onChange}>
      <Button disabled={pending} onClick={onSubmit}>
        Создать
      </Button>
    </MerchandiseForm>
  );
}
