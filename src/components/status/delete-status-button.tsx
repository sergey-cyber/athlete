"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { removeStatus } from "@/service/status/actions";
import { Confirm } from "../confirm";

interface Props {
  id: number;
}

export function DeleteStatusButton({ id }: Props) {
  const { toast } = useToast();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    try {
      const res = await removeStatus(id);
      if (res?.error) {
        toast({
          title: "Ошибка при удалении статуса.",
          variant: "destructive",
          description: res.error.message,
        });
        return;
      }
      toast({
        title: `Статус удален успешно.`,
      });
    } finally {
      setPending(false);
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <Confirm
        loading={pending}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        title={`Статус будет удален, продолжить?`}
        onConfirm={onDelete}
      />
      <Button
        onClick={() => setOpenConfirm(true)}
        variant={"outline"}
        size={"mini"}
      >
        <Trash2 size={16} />
      </Button>
    </>
  );
}
