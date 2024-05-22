"use client";

import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";

interface Props extends PropsWithChildren {
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description?: string;
  open: boolean;
}

export function Confirm({
  loading,
  title,
  description,
  onConfirm,
  onCancel,
  open
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent onClose={onCancel} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={onCancel}>
            Отмена
          </Button>
          <Button disabled={loading} onClick={onConfirm}>
            Продолжить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
