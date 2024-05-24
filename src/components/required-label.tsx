"use client";

import { PropsWithChildren } from "react";
import { Label } from "./ui/label";

interface Props extends PropsWithChildren {}

export function RequiredLabel({ children }: Props) {
  return (
    <Label>
      <span>{children}</span>
      <span className="text-red-500">*</span>
    </Label>
  );
}
