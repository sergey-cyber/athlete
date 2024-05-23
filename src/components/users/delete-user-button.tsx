"use client";

import { UserType } from "@/service/user/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Confirm } from "../confirm";
import { removeUser } from "@/service/user/actions";
import { useToast } from "../ui/use-toast";

interface Props {
  user: UserType;
}

export function DeleteUserButton({ user }: Props) {
  const { toast } = useToast();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    try {
      await removeUser(user.id);
      // TODO: удалить пользователя из заказа
      toast({
        title: `Пользователь '${user.firstName}' удален успешно.`
      });
    } catch (err: any) {
      toast({
        title: "Ошибка при удалении пользователя.",
        variant: "destructive"
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
        title={`Пользователь '${user.firstName}' будет удален, продолжить?`}
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
