import { z } from "zod";

const REQUIRED_MESSAGE = { message: "Не заполнены обязательные поля" };

export const validateOrderSchema = z.object({
  //orderName: z.string(REQUIRED_MESSAGE).min(1, REQUIRED_MESSAGE)
});
