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

interface Props extends PropsWithChildren {
  title: string;
  value?: string;
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  onChange?: (field: string, value: any) => void;
  loading?: boolean;
}

export function StatusForm({
  title,
  value,
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
          value={value}
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
