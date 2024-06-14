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
import { UserType } from "@/service/user/types";
import { profileFormSchema } from "./schemas";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../ui/passwordInput";

interface Props {
  onSubmit?: (values: z.infer<typeof profileFormSchema>) => void;
  loading?: boolean;
  submitButtonCaption?: string;
  initialValues?: Partial<UserType>;
  className?: string;
}

export function ProfileForm({
  onSubmit,
  submitButtonCaption,
  loading,
  initialValues,
  className,
}: Props) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialValues || {
      firstName: "",
      secondName: "",
      middleName: "",
      email: "",
      phone: 0,
      address: "",
      role: "",
      login: "",
      password: "",
    },
  });

  const readOnly = !onSubmit;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => onSubmit?.(v))}
        className={cn("w-96", className)}
      >
        <FormField
          control={form.control}
          name="secondName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input readOnly={readOnly} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input readOnly={readOnly} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отчество</FormLabel>
              <FormControl>
                <Input readOnly={readOnly} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input readOnly={readOnly} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnly}
                  type="number"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input readOnly={readOnly} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Роль</FormLabel>
              <FormControl>
                <Input readOnly={readOnly} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input readOnly={readOnly} placeholder="" {...field} />
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
                <PasswordInput readOnly={readOnly} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitButtonCaption ? (
          <Button disabled={loading} className="w-full mt-6" type="submit">
            {submitButtonCaption}
          </Button>
        ) : null}
      </form>
    </Form>
  );
}
