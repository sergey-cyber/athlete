import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Обязательное поле",
  }),
  secondName: z.string(),
  middleName: z.string(),
  email: z.string(),
  phone: z.coerce.number(),
  address: z.string(),
  role: z.string(),
});
