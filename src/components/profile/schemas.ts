import { z } from "zod";

export const profileFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Обязательное поле",
  }),
  secondName: z.string(),
  middleName: z.string(),
  email: z.string(),
  phone: z.coerce.number(),
  address: z.string(),
  role: z.string(),
  login: z.string().min(1, {
    message: "Обязательное поле",
  }),
  password: z.string().min(6, {
    message: "Минимум 6 символов",
  }),
});
