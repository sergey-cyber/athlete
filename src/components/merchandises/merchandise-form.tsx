"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { MerchandiseType } from "@/service/merchandise/types";
import { Button } from "../ui/button";
import { createMerchandise } from "@/service/merchandise/actions";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

export function MerchandiseForm() {
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
    <div className="flex flex-col w-1/3 gap-y-4 pt-4">
      <Input
        type="string"
        placeholder="Название"
        value={values.title}
        onChange={(e) => onChange("title", e.currentTarget.value)}
      />
      <Textarea
        placeholder="Описание"
        value={values.description}
        onChange={(e) => onChange("description", e.currentTarget.value)}
      />
      <Input
        type="number"
        placeholder="Стоимость"
        value={values.price}
        onChange={(e) => onChange("price", e.currentTarget.value)}
      />
      <Button disabled={pending} onClick={onSubmit}>
        Создать
      </Button>
    </div>
  );
}
