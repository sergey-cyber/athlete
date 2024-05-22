"use client";

import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StatusType } from "@/service/status/types";

export type StatusFormValues = Omit<StatusType, "id">;

interface Props extends PropsWithChildren {
  title: string;
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  onChange?: (field: string, value: any) => void;
  loading?: boolean;
  values: StatusFormValues;
}

export function StatusForm({
  title,
  values,
  children,
  open,
  onClose,
  onSubmit,
  onChange,
  loading
}: Props) {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClose={onClose} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Введите значение статуса</DialogDescription>
        </DialogHeader>
        <Input
          onChange={(e) => onChange?.("status", e.currentTarget.value)}
          value={values.status}
          id="status"
          className=""
          placeholder="Статус..."
        />
        <DialogFooter>
          <Button disabled={loading} onClick={onSubmit}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
