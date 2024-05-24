"use client";

import { useState } from "react";
import { MerchandiseType } from "@/service/merchandise/types";
import { Button } from "../ui/button";
import { editMerchandise } from "@/service/merchandise/actions";
import { useToast } from "../ui/use-toast";
import { MerchandiseForm } from "./merchandise-form";
import { merchandiseFormSchema } from "./schemas";

interface Props {
  merchandise: MerchandiseType;
}

export function MerchandiseEditForm({ merchandise }: Props) {
  const { toast } = useToast();
  const [values, setValues] = useState<Partial<MerchandiseType>>(merchandise);
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      const result = merchandiseFormSchema.safeParse(values);
      if (!result.success) {
        toast({
          title: result.error.issues[0].message,
          variant: "destructive"
        });
        return;
      }
      await editMerchandise(values);
      toast({
        title: "Товар изменен успешно."
      });
    } catch (err) {
      toast({
        title: "Ошибка при изменении товара.",
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
    <MerchandiseForm values={values} onChange={onChange}>
      <Button disabled={pending} onClick={onSubmit}>
        Сохранить
      </Button>
    </MerchandiseForm>
  );
}
