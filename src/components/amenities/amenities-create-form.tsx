"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AmenitiesType } from "@/service/amenities/types";
import { createAmenities } from "@/service/amenities/actions";
import { AmenitiesForm } from "./amenities-form";
import { amenitiesFormSchema } from "./schemas";

export function AmenitiesCreateForm() {
  const { toast } = useToast();
  const [values, setValues] = useState<Partial<AmenitiesType>>({});
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
      await createAmenities(values);
      toast({
        title: "Услуга создана успешно.",
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при создании услуги.",
        variant: "destructive",
        description: err.message ?? "",
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
        Создать
      </Button>
    </AmenitiesForm>
  );
}
