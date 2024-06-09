"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { signIn } from "@/service/auth/actions";
import { useState } from "react";

const formSchema = z.object({
  login: z.string().min(1, {
    message: "Обязательное поле",
  }),
  password: z.string().min(6, {
    message: "Минимум 6 символов",
  }),
});

export function SignInForm() {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { login, password } = values;
    setPending(true);
    try {
      await signIn(login, password);
    } catch (e: any) {
      toast({
        title: "Ошибка",
        variant: "destructive",
        description: e?.message ?? "",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-96">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} className="w-full" type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
