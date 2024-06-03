"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AmenitiesType } from "@/service/amenities/types";
import { editAmenities } from "@/service/amenities/actions";
import { AmenitiesForm } from "./amenities-form";
import { amenitiesFormSchema } from "./schemas";

interface Props {
  amenities: AmenitiesType;
}

export function AmenitiesEditForm({ amenities }: Props) {
  const { toast } = useToast();
  const [values, setValues] = useState<Partial<AmenitiesType>>(amenities);
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      const result = amenitiesFormSchema.safeParse(values);
      if (!result.success) {
        toast({
          title: result.error.issues[0].message,
          variant: "destructive",
        });
        return;
      }
      await editAmenities(values);
      toast({
        title: "Услуга изменена успешно.",
      });
    } catch (err) {
      toast({
        title: "Ошибка при изменении услуги.",
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
    <AmenitiesForm values={values} onChange={onChange}>
      <Button disabled={pending} onClick={onSubmit}>
        Сохранить
      </Button>
    </AmenitiesForm>
  );
}
