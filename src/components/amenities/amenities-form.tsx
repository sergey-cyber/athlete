"use client";

import { PropsWithChildren } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AmenitiesType } from "@/service/amenities/types";
import { Label } from "../ui/label";

interface Props extends PropsWithChildren {
  values: Partial<AmenitiesType>;
  onChange: (fieldName: string, value: any) => void;
}

export function AmenitiesForm({ values, onChange, children }: Props) {
  return (
    <div className="flex flex-col w-1/3 gap-y-4 pt-4">
      <div>
        <Label>Название</Label>
        <Input
          type="string"
          value={values.title}
          onChange={(e) => onChange("title", e.currentTarget.value)}
        />
      </div>
      <div>
        <Label>Описание</Label>
        <Textarea
          value={values.description}
          onChange={(e) => onChange("description", e.currentTarget.value)}
        />
      </div>
      <div>
        <Label>Стоимость</Label>
        <Input
          type="number"
          value={values.price || ""}
          onChange={(e) => onChange("price", e.currentTarget.value)}
        />
      </div>
      {/*Submit button placement*/}
      {children}
    </div>
  );
}
