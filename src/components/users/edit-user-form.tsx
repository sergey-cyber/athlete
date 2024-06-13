"use client";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { UserType } from "@/service/user/types";
import { userFormSchema } from "./schemas";
import { z } from "zod";
import { editUser } from "@/service/user/actions";
import { UserForm } from "./user-form";

interface Props {
  user: UserType;
}

export function EditUserForm({ user }: Props) {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    setPending(true);
    try {
      const res = await editUser({ ...user, ...values });
      if (res?.error) {
        toast({
          title: "Ошибка при сохранении пользователя.",
          variant: "destructive",
          description: res.error.message,
        });
        return;
      }
      toast({
        title: "Пользователь сохранён успешно.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <UserForm
      initialValues={user}
      onSubmit={onSubmit}
      loading={pending}
      submitButtonCaption="Сохранить"
    />
  );
}
