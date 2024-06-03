import { z } from "zod";

const REQUIRED_MESSAGE = { message: "Не заполнены обязательные поля" };

export const amenitiesFormSchema = z.object({
  title: z.string(REQUIRED_MESSAGE).min(1, REQUIRED_MESSAGE),
  price: z
    .number(REQUIRED_MESSAGE)
    .gt(0, { message: "Стоимость должна быть больше нуля" }),
});
