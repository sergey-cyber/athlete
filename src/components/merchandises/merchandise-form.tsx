"use client";

import { PropsWithChildren } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MerchandiseType } from "@/service/merchandise/types";
import { Label } from "../ui/label";
import { RequiredLabel } from "../required-label";

interface Props extends PropsWithChildren {
  values: Partial<MerchandiseType>;
  onChange: <K extends keyof MerchandiseType>(
    key: K,
    value: MerchandiseType[K]
  ) => void;
}

export function MerchandiseForm({ values, onChange, children }: Props) {
  return (
    <div className="flex flex-col w-1/3 gap-y-4 pt-4">
      <div>
        <RequiredLabel>Название</RequiredLabel>
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
        <RequiredLabel>Стоимость</RequiredLabel>
        <Input
          type="number"
          value={values.price || ""}
          onChange={(e) => onChange("price", Number(e.currentTarget.value))}
        />
      </div>
      <div>
        <RequiredLabel>Количество на складе</RequiredLabel>
        <Input
          required
          type="number"
          value={values.numberInWarehouse || ""}
          onChange={(e) =>
            onChange("numberInWarehouse", Number(e.currentTarget.value))
          }
        />
      </div>
      <div>
        <Label>Коэффициент стоимости</Label>
        <Input
          type="number"
          value={values.ratio || ""}
          onChange={(e) => onChange("ratio", Number(e.currentTarget.value))}
        />
      </div>
      {/*Submit button placement*/}
      {children}
    </div>
  );
}
