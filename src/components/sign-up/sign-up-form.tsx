"use client";

import { z } from "zod";
import { useState } from "react";
import { createUser } from "@/service/user/actions";
import { useToast } from "../ui/use-toast";
import { userFormSchema } from "../users/schemas";
import { UserForm } from "../users/user-form";

export function SignUpForm() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    setPending(true);
    try {
      await createUser(values);
      toast({
        title: "Пользователь успешно зарегистрирован.",
      });
    } catch (err) {
      toast({
        title: "Ошибка при регистрации пользователя.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <UserForm
      onSubmit={onSubmit}
      loading={pending}
      submitButtonCaption="Зарегистрироваться"
    />
  );
}
