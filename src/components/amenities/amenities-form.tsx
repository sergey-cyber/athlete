"use client";

import { PropsWithChildren } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AmenitiesType } from "@/service/amenities/types";

interface Props extends PropsWithChildren {
  values: Partial<AmenitiesType>;
  onChange: (fieldName: string, value: any) => void;
}

export function AmenitiesForm({ values, onChange, children }: Props) {
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
        value={values.price || ""}
        onChange={(e) => onChange("price", e.currentTarget.value)}
      />
      {/*Submit button placement*/}
      {children}
    </div>
  );
}
