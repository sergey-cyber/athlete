import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "Обязательное поле",
    }),
    secondName: z.string(),
    middleName: z.string(),
    email: z.string(),
    phone: z.coerce.number(),
    address: z.string(),
    login: z.string().min(1, {
      message: "Обязательное поле",
    }),
    password: z.string().min(6, {
      message: "Минимум 6 символов",
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  });
